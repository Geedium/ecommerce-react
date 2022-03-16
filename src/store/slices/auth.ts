import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, AppState } from "..";

// type Strategy = string;
import Cookie from "js-cookie";

import type User from "../../types/user";

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

/**
 * qs
 *
 * A querystring parsing and stringifying
 * library with some added security.
 */
import qs from "qs";

import axios from "../axios";
import { stat } from "fs";

export const fetchUser = createAsyncThunk(
  "auth/user",
  async (_, thunkApi) => {
    // @ts-ignore
    const state = thunkApi.getState().auth;

    // Client side local storage pull
    // if (typeof window !== "undefined" && !state.accessToken) {
    //   const auth: any = JSON.parse(localStorage.getItem("auth"));

    //   console.log("Obtaining tokens: ", auth);

    //   const res = await axios.get("/auth/user", {
    //     headers: {
    //       // @ts-ignore
    //       Authorization: `Bearer ${auth.accessToken}`,
    //     },
    //   });

    //   console.log("Fetched user data after cold start: ", res.data);

    //   return {
    //     user: res.data,
    //     accessToken: auth.accessToken,
    //     refreshToken: auth.refreshToken,
    //   };
    // }

    try {
      const res = await axios.get("/auth/user", {
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      console.log("Fetched user data: ", res.data);
      return {
        user: res.data,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({ errorMsg: error.message });
    }
  },
  {
    // @ts-ignore
    condition: (_, { getState }) => {
      // @ts-ignore
      const { auth } = getState();

      // if (!auth.loggedIn) {
      //   return false;
      // }
    },
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", qs.stringify(credentials));
      const data = res.data;

      // console.log("Logged in with data of ", data);

      if (data.access_token) {
        const refetch = await axios.get("/auth/user", {
          headers: { Authorization: `Bearer ${data.access_token}` },
        });

        // console.log("Refetch: ", refetch.data);

        // Client side local storage pull
        // if (typeof window !== "undefined") {
        //   let expiryTime = Date.now() + 60 * 60 * 24 * 30;

        //   localStorage.setItem("auth.strategy", "local");
        //   localStorage.setItem("auth._token.local", String(data.access_token));
        //   localStorage.setItem(
        //     "auth._refresh_token.local",
        //     String(data.refresh_token)
        //   );
        //   localStorage.setItem(
        //     "auth._refresh_token_expiration.local",
        //     String(expiryTime)
        //   );
        // }

        return {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          loggedIn: true,
          user: refetch.data,
        };
      } else {
        return thunkAPI.rejectWithValue({ errorMsg: data.message });
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ errorMsg: error.message });
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (params, thunkAPI) => {
    try {
      // @ts-ignore
      const { refreshToken } = thunkAPI.getState().auth;

      const response = await axios.post(
        "/auth/refresh",
        qs.stringify({
          // grant_type: "refresh_token",
          refresh_token: refreshToken,
        })
      );
      const resdata = response.data;
      if (resdata.access_token) {
        const refetch = await axios.get("/auth/user", {
          headers: { Authorization: `Bearer ${resdata.access_token}` },
        });
        return {
          accessToken: resdata.access_token,
          refreshToken: resdata.refresh_token,
          loggedIn: true,
          user: refetch.data,
        };
      } else {
        return thunkAPI.rejectWithValue({ errorMsg: response.data.message });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMsg: error.message });
    }
  }
);

export const doLogout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMsg: error.message });
  }
});

const initialState = {
  accessToken: null,
  refreshToken: null,
  loggedIn: false,
  errorMsg: null,
  user: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.loggedIn = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      // console.log("action=>", action);
      state = Object.assign(Object.assign({}, initialState), {
        // @ts-ignore
        errorMsg: action.payload.errorMsg,
      });
      // console.log("state=>", state);
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // @ts-ignore
      const { user, accessToken, refreshToken } = action.payload;

      if (accessToken && refreshToken) {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      }

      if (user) {
        state.user = user;
        state.loggedIn = true;
      }
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state = Object.assign(Object.assign({}, initialState), {
        // @ts-ignore
        errorMsg: action.errorMsg,
      });
    });
    builder.addCase(doLogout.fulfilled, (state, action) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.loggedIn = false;
    });
  },
});

export const { updateAuth, logout } = AuthSlice.actions;

export const getUser = (state: AppState): Partial<User> | null =>
  state.auth?.user;

export const isLoggedIn = (state: AppState) => state.auth?.loggedIn;

export default AuthSlice.reducer;
