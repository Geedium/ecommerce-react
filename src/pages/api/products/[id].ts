import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/util/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  if (method === "GET") {
    const client = await clientPromise;

    const db = client.db("shop");

    const products = await db.collection("products").findOne({
      slug: id,
    });

    res.json(products);
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
