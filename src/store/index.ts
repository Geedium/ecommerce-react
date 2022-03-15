import { configureStore, ThunkAction, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { Action } from "redux";

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
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";

import authMiddleware from "./middleware/auth";

import productReducer from "./slices/product";
import cartReducer from "./slices/cart";
import authReducer from "./slices/auth";
import siteReducer from "./slices/site";

import { axiosMiddleware } from "./axiosMiddleware";

const combinedReducers = combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  site: siteReducer,
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  }
  return combinedReducers(state, action);
};

export const initStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(
          nextReduxCookieMiddleware({
            subtrees: [
              "auth.accessToken",
              "auth.loggedIn",
              "auth.refreshToken",
              "auth.user",
              "cart.items",
            ],
          })
        )
        .concat(authMiddleware)
        .concat(axiosMiddleware),
  });

export type AppStore = ReturnType<typeof initStore>;
export type AppDispatch = ReturnType<AppStore["dispatch"]>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

// export an assembled wrapper
export const wrapper = createWrapper<AppStore>(wrapMakeStore(initStore));
