import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

// Redux
import { configureStore, createSlice } from "@reduxjs/toolkit";

import thunkMiddleware from "redux-thunk";
// import reducers from "./reducers";

let store;

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts(state, action) {
      return action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const selectProducts = () => (state) => state?.[productsSlice.name];

export const productSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {
    setProduct(_, action) {
      return action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const selectProduct = (state) => state?.[productSlice.name];

const makeStore = () =>
  configureStore({
    reducer: {
      product: productSlice.reducer,
      products: productsSlice.reducer,
    },
    devTools: false,
  });

// export function initStore(initialState) {
//   return createStore(
//     reducers,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunkMiddleware))
//   );
// }

// export const initializeStore = (preloadedState) => {
//   let _store = store ?? initStore(preloadedState);

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (preloadedState && store) {
//     _store = initStore({
//       ...store.getState(),
//       ...preloadedState,
//     });
//     // Reset the current store
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === "undefined") return _store;
//   // Create the store once in the client
//   if (!store) store = _store;

//   return _store;
// };

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState]);
//   return store;
// }

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
