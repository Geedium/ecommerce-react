/**
 * axios-auth-refresh
 *
 * Library that helps you implement
 * automatic refresh of authorization via
 * axios interceptors. You can easily
 * intercept the original request when it
 * fails, refresh the authorization and
 * continue with the original request,
 * without any user interaction.
 */
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { initStore } from ".";
import axiosInstance from "./axios";
import { refreshToken } from "./slices/auth";

export const axiosMiddleware = (store) => (next) => (action) => {
  // refresh token when 401
  createAuthRefreshInterceptor(axiosInstance, async (failedRequest) => {
    // @ts-ignore
    const { dispatch } = initStore;

    const res = await dispatch(refreshToken());
    console.log(
      "============createAuthRefreshInterceptor callback=======",
      res.payload.accessToken
    );

    failedRequest.response.config.headers.Authorization =
      "Bearer " + res.payload.accessToken;

    return Promise.resolve();
  });
  return next(action);
};
