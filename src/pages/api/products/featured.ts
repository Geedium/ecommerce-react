import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@geedium/server/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const client = await clientPromise;

    const db = client.db("shop");

    const products = await db
      .collection("products")
      .find({
        $or: [
          {
            quantity: { $gt: 0 },
          },
          {
            rating: { $gt: 4 },
          },
          {
            published: true,
          },
        ],
      })
      .limit(8)
      .toArray();

    res.json(products);
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
