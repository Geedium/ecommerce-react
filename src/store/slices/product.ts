import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "..";

import axios from "../axios";

export const fetchCategories = createAsyncThunk(
  "product/categories",
  async (query, thunkAPI) => {
    try {
      const res = await axios.get("/categories", {
        params: query,
      });
      const data = res.data;

      if (data) {
        return {
          categories: data,
        };
      } else {
        return thunkAPI.rejectWithValue({
          categories: [],
        });
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ categories: [] });
    }
  }
);

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    categories: [],
    minPrice: 0,
    maxPrice: 0,
    data: {},
  },
  reducers: {
    setProduct: (state, action) => {
      state.data = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return Object.assign({}, state, { ...action.payload.product });
    },
    // @ts-ignore
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload.categories;
    },
  },
});

export const {
  setProduct,
  setProducts,
  setCategories,
  setMinPrice,
  setMaxPrice,
} = ProductSlice.actions;

export const selectPriceRange = (state: AppState) => {
  return { min: state.product?.minPrice, max: state.product?.maxPrice };
};

export const selectMaxPrice = (state: AppState) => state.product?.maxPrice;

export const selectProduct = (state: AppState) => state.product?.data;

export const selectCategories = (state: AppState) => state.product?.categories;

export const selectProducts = (state: AppState) => state.product?.products;

export default ProductSlice.reducer;
