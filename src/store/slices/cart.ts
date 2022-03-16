import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "..";

/**
 * Redux Wrapper for Next.js
 *
 * A HOC that brings Next.js and Redux
 * together. HYDRATE must be added to
 * synchronize the server and client
 * reducer data, otherwise the
 * inconsistent data on the two ends will
 * cause conflicts.
 */
import { HYDRATE } from "next-redux-wrapper";

import type Product from "../../types/product";

const initialState = {
  items: [],
  updated: false,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    discardFromCart: (
      state,
      action: {
        payload: Product;
      }
    ) => {
      // get target item from given payload
      var item = action.payload;

      // make a copy of an array of items
      var items: Product[] = [...state.items];

      for (var i = 0; i < state.items.length; i++) {
        // skip non-target items
        if (state.items[i]._id !== item._id) continue;

        // calculate new amount
        const amount = state.items[i].amount - 1;

        // if amount is greater than zero
        // reduce amount else remove item from an array
        if (amount > 0) {
          const j = state.items.findIndex((e) => e._id === item._id);
          if (items[j]) {
            items[j].amount -= 1;
          }
        } else {
          items.splice(i, 1);
        }
      }

      // apply changes to original array
      state.items = items;
    },
    clearCart: (state, action) => {
      state = initialState;
    },
    onCartView: (state, _) => {
      state.updated = false;
    },
    addToCart: (state, action) => {
      var item: Product = { ...action.payload, amount: 0 };
      var items: Product[] = state.items;
      const product: Product = items.find((p: Product) => p._id === item._id);
      if (product) {
        if (product.quantity > 0 && product.amount + 1 <= product.quantity) {
          product.amount += 1;
          state.updated = true;
        }
      } else {
        if (item.quantity > 0) {
          if (!item.amount) {
            item.amount = 1;
            state.updated = true;
          }
          items = [...items, item];
        }
      }
      state.items = items;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return Object.assign({}, state, { ...action.payload.cart });
    },
  },
});

export const { addToCart, discardFromCart, onCartView, clearCart } =
  CartSlice.actions;

export const selectItems = (state: AppState) => state.cart?.items;

export const isUpdated = (state: AppState) => state.cart?.updated;

export default CartSlice.reducer;
