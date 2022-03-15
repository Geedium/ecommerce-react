import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@geedium/server/mongodb";

interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method != "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  if (!body) {
    res.statusCode = 404;
    res.end();
    return;
  }

  const { username, password, remember_me } = body;

  if (!username || !password) {
    res.statusCode = 400;
    res.end();
    return;
  }

  const client = await clientPromise;
  const db = client.db("shop");

  await db
    .collection("users")
    .findOne({
      $or: [
        {
          username: {
            $regex: new RegExp("^" + username + "$"),
            $options: "i",
          },
        },
        { email: username },
      ],
    })
    .then(async (user: Partial<User>) => {
      // user was not found in the database
      if (!user) {
        res.statusCode = 404;
        res.end();
        return;
      }

      const comparePassword = (src, dist) => {
        return new Promise((resolve, reject) => {
          bcrypt.compare(src, dist, (err, result) => {
            if (err) reject();
            resolve(result);
          });
        });
      };

      await comparePassword(password, user.password)
        .then((result) => {
          //
          if (!result) {
            res.statusCode = 401;
            res.json({ error: "Password mismatch" });
            return;
          }
          //
          const access_token = jwt.sign(
            {
              _id: user._id,
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: process.env.TTL_ACCESS_TOKEN,
            }
          );

          const refresh_token = crypto.randomBytes(20).toString("hex");

          db.collection("users").updateOne(
            { _id: new ObjectId(user._id) },
            [{ $set: { refresh_token } }],
            {
              upsert: true,
            }
          );

          res.status(200).json({
            access_token,
            refresh_token,
          });
        })
        .catch((err) => {
          res.statusCode = 400;
          res.json({ error: err.message });
        });
    })
    .catch((_) => {
      // can't leave an empty response
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end();
      }
    });
}
