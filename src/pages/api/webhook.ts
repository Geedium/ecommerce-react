import type { NextApiRequest, NextApiResponse } from "next";

import getRawBody from "raw-body";

import stripe from "stripe";

const stripeAPI = new stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rawBody = await getRawBody(req);

  const endpointSecret = "whsec_tUZVWpj5z9Q9R9jgtVD2hRt9cQa66qv7";
  const signature = req.headers["stripe-signature"] ?? "";

  try {
    const event = stripeAPI.webhooks.constructEvent(
      rawBody,
      signature,
      endpointSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Event data", session);
    }
  } catch (error) {
    return res.status(400).json({ error: `Webhook error ${error.message}` });
  }

  res.status(200).json({ ok: 1 });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
