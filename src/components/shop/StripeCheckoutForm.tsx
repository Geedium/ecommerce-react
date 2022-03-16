import React, { useContext, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectItems } from "../../store/slices/cart";

import type { ObjectId } from "mongodb";

import axios from "../../store/axios";

interface IProduct {
  _id: ObjectId;
  name: string;
  slug?: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  quantity: number;
  published: boolean;
  category: ObjectId;
  category_slug?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ...
 */
const StripeCheckoutForm = () => {
  const [email, setEmail] = useState("");

  const cart = useSelector<any, IProduct[] | null | undefined>(selectItems);

  const stripe = useStripe();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const line_items = cart.map((item) => {
      return {
        quantity: item.quantity,
        price_data: {
          currency: "eur",
          unit_amount: item.price * 100, // amount is in cents
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.image],
          },
        },
      };
    });

    const sessionId = await axios
      .post("/checkout", {
        line_items,
        customer_email: email,
      })
      .then((res) => res.data)
      .then((data) => data.sessionId)
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data?.error);
        } else {
          console.log(err);
        }
      });

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
      </div>
      <div>
        <button type="submit">Checkout</button>
      </div>
    </form>
  );
};

export default StripeCheckoutForm;
