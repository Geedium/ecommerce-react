import { NextApiRequest, NextApiResponse } from "next";

import { ObjectId } from "mongodb";

import jwt from "jsonwebtoken";

import clientPromise from "@geedium/server/mongodb";

import type User from "../../../types/user";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { authorization } = req.headers;

  if (
    authorization &&
    typeof authorization === "string" &&
    authorization.split(" ")[0] === "Bearer"
  ) {
    const token = String(authorization.split(" ")[1]);

    const client = await clientPromise;
    const db = client.db("shop");

    const verifyToken = (token) => {
      return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
          if (err) reject();
          resolve(decoded);
        });
      });
    };

    await verifyToken(token)
      .then(async (decoded: any) => {
        await db
          .collection("users")
          .findOne({
            _id: new ObjectId(decoded._id),
          })
          .then((user: Partial<User>) => {
            res.json({
              username: user.username,
              email: user.email,
              given_name: user.given_name,
              family_name: user.family_name,
              role: user.role,
            });
          });
      })
      .catch(() => {
        res.statusCode = 401;
        res.json({ error: "Unable to validate an user" });
      });
  } else {
    res.statusCode = 401;
    res.json({ error: "Unable to validate an user" });
  }
}
