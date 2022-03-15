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

    const site = await db
      .collection("sites")
      .find(
        {
          domain: "keyla-estetique.com",
        },
        {
          settings: 1,
          title: 1,
          domain: 0,
        }
      )
      .limit(1)
      .next();

    res.json(site);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
