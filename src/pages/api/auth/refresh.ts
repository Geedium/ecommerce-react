import { NextApiRequest, NextApiResponse } from "next";

import { ObjectId } from "mongodb";

import crypto from "crypto";

import jwt from "jsonwebtoken";

import clientPromise from "@geedium/server/mongodb";

import type { User } from "@geedium/server";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method != "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const { refresh_token = "" } = req.body;

  const client = await clientPromise;
  const db = client.db("shop");

  db.collection("users")
    .findOne({
      refresh_token,
    })
    .then((user: User | null) => {
      if (!user) {
        res.statusCode = 401;
        res.json({ error: "Unable to validate an user" });
        return;
      }

      // Sign new access token for the user.
      const access_token: string = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.TTL_ACCESS_TOKEN,
        }
      );

      // Generate a new refresh token for the user.
      const refresh_token = crypto.randomBytes(20).toString("hex");

      // Update refresh_token in the database.
      db.collection("users").updateOne(
        { _id: new ObjectId(user._id) },
        [{ $set: { refresh_token } }],
        {
          upsert: true,
        }
      );

      // Send back refreshed tokens.
      res.status(200).json({
        access_token,
        refresh_token,
      });
    })
    .catch((err) => {
      res.statusCode = 401;
      res.json({ error: err.message });
      return;
    });
}
