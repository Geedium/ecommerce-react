import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "..";

export interface SettingsProps {
  footer_text?: Object;
  footer_video?: string;
  facebook_link?: string;
  pinterest_link?: string;
  twitter_link?: string;
  instagram_link?: string;
}

export const SiteSlice = createSlice({
  name: "site",
  initialState: {
    settings: {},
    title: "",
    domain: "",
  },
  reducers: {
    setSiteData: (state, action) => {
      state.title = action.payload?.title || "";
      state.settings = action.payload?.settings || {};
      state.domain = action.payload?.domain || "";
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return Object.assign({}, state, { ...action.payload.site });
    },
  },
});

export const { setSiteData } = SiteSlice.actions;

export const appTitle = (state: AppState) =>
  state.site?.title || ("" as string);

export const appDomain = (state: AppState) =>
  state.site?.domain || ("" as string);

export const getSettings = (state: AppState) =>
  state.site?.settings as SettingsProps;

export default SiteSlice.reducer;
