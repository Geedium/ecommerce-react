import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/util/mongodb";

import stripe from "stripe";

const stripeAPI = new stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "POST") {
    const domain = process.env.NEXT_PUBLIC_API_HOST;
    const { line_items, customer_email } = req.body;

    if (!line_items || !customer_email) {
      return res
        .status(400)
        .json({ error: "missing required session parameters" });
    }

    let session;

    try {
      session = await stripeAPI.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        customer_email,
        success_url: `${domain}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domain}/checkout/canceled`,
        shipping_address_collection: { allowed_countries: ["GB", "US", "LT"] },
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      res
        .status(400)
        .json({ error: "an error occuried, unable to get create session" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
