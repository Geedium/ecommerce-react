import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/util/mongodb";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  if (!body) {
    res.statusCode = 404;
    res.end();
    return;
  }

  const { username, email, password, privacy_policy } = body;

  const hashedPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject();
        resolve(hash);
      });
    });
  };

  if (!(username || email) || !password || !privacy_policy) {
    res.statusCode = 400;
    res.end();
    return;
  }

  const client = await clientPromise;
  const db = client.db("shop");

  await hashedPassword(password, 10)
    .then(async (hash) => {
      await db
        .collection("users")
        .countDocuments({
          $or: [
            {
              username: {
                $regex: new RegExp("^" + username + "$"),
                $options: "i",
              },
            },
            {
              email,
            },
          ],
        })
        .then(async (count: number) => {
          // resource with the same identifier already exists
          if (count > 0) {
            res.statusCode = 409;
            res.end();
            return;
          }
          await db
            .collection("users")
            .insertOne({
              username,
              email,
              password: hash,
            })
            .then(() => {
              res.status(201).end();
            });
        });
    })
    .catch((err) => {
      res.statusCode = 400;
      res.json({ error: err.message });
    });
}
