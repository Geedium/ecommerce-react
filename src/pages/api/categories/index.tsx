import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@geedium/server/mongodb";

import type Category from "../../../types/category";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const client = await clientPromise;

    const db = client.db("shop");

    let categories = [];

    if (req.query.level == "top") {
      categories = await db
        .collection("categories")
        .find({ parentId: null })
        .toArray();
    } else {
      categories = await db
        .collection("categories")
        .aggregate([
          {
            $match: {
              parentId: null,
            },
          },
          {
            $graphLookup: {
              from: "categories",
              startWith: "$_id",
              connectFromField: "_id",
              connectToField: "parentId",
              as: "children",
              depthField: "order",
            },
          },
          {
            $unwind: {
              path: "$children",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $sort: {
              "children.name": 1,
            },
          },
          {
            $group: {
              _id: "$_id",
              name: { $first: "$name" },
              slug: { $first: "$slug" },
              order: { $first: "$order" },
              thumbnail: { $first: "$thumbnail" },
              parentId: { $first: "$parentId" },
              children: {
                $push: "$children",
              },
            },
          },
          {
            $sort: {
              order: 1,
            },
          },
        ])
        .toArray();
    }

    if (!categories || !categories.length) {
      res.statusCode = 500;
      res.json({ error: "Error occuried!" });
      return;
    }

    res.json(categories);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
