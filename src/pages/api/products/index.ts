import type { NextApiRequest, NextApiResponse } from "next";

import { ObjectId } from "mongodb";

import clientPromise from "@geedium/server/mongodb";

const util = require("util");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  if (method === "GET") {
    const client = await clientPromise;

    const db = client.db("shop");

    if (query.category) {
      // Get direct ancestors
      const regex = "^/" + query.category + "\\W";

      // if (!products) {
      const ancestors = await db
        .collection("products")
        .aggregate([
          {
            $match: {
              category_slug: {
                $regex: regex,
                $options: "m",
              },
            },
          },
          {
            $group: {
              _id: null,
              products: { $push: "$$ROOT" },
            },
          },
          {
            $addFields: {
              min_price: { $min: "$products.price" },
              max_price: { $max: "$products.price" },
            },
          },
        ])
        .next();

      if (!ancestors) {
        const products = await db
          .collection("products")
          .aggregate([
            {
              $lookup: {
                from: "categories",
                let: { localField: "$category" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$_id", "$$localField"] } } },
                  { $project: { _id: 1, slug: 1 } },
                ],
                as: "category",
              },
            },
            {
              $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $match: {
                "category.slug": query.category,
              },
            },
            {
              $project: {
                category: 0,
              },
            },
            {
              $group: {
                _id: null,
                products: { $push: "$$ROOT" },
              },
            },
            {
              $addFields: {
                min_price: { $min: "$products.price" },
                max_price: { $max: "$products.price" },
              },
            },
          ])
          .next();

        if (!products) {
          res.statusCode = 404;
          res.json({ error: "Products not found" });
          return;
        }

        res.json(products);
        return;
      }

      res.json(ancestors);

      // let items: any = {
      //   _id: null,
      //   products: null,
      //   minPrice: 0,
      //   maxPrice: 0,
      // };

      // for await (let data of refetch) {
      //   let item = { ...data };
      //   let valid = false;

      //   if (item.children && util.isArray(item.children)) {
      //     for await (let child of item.children) {
      //       let child_id = String(child.slug);
      //       if (child_id == query.category) valid = true;
      //     }
      //   }

      //   if (valid) {
      //     if (!items.products) {
      //       items.products = [];
      //     }
      //     delete item.category;
      //     delete item.children;
      //     items.products.push(item);
      //   }
      // }

      // if (!items.products) {
      //   res.statusCode = 404;
      //   res.json({ error: "No products found" });
      //   return;
      // }

      return;
    }

    const products = await db
      .collection("products")
      .find({})
      .limit(20)
      .toArray();

    res.json(products);
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
