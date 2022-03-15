import { combineReducers } from "redux";
import * as types from "./types";

const productsReducer = (
  state = {
    loading: true,
    products: [],
  },
  action
) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { loading: false, products: action.payload };
    case "PRODUCTS_HALT":
      return { loading: true, ...state };
    case "PRODUCTS_ERROR":
      return { loading: false, error: action.payload, ...state };
    case "CREATE":
      return state;
    default:
      return state;
  }
};

const reducers = {
  products: productsReducer,
  product: (
    state = {
      data: null,
      loading: false,
    },
    action
  ) => {
    console.log(action);
    switch (action.type) {
      case "PRODUCT_SET_LOADING":
        return { loading: action.payload, ...state };
      case "PRODUCT_SET_DATA":
        console.log(action.payload);
        return { data: action.payload, loading: false };
      default:
        return state;
    }
  },
};

export default combineReducers(reducers);
