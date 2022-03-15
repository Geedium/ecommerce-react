import Head from "next/head";

import { ThemeProvider } from "@mui/material/styles";

import { CssBaseline } from "@mui/material";

import theme from "../themes/default";

import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../lib/emotion";

import { connect } from "react-redux";

import { wrapper, AppState, AppStore } from "../store";

import Layout from "../components/Layout";

import API from "../actions";

import { LocaleProvider } from "../providers/LocaleProvider";

import "react-slideshow-image/dist/styles.css";
import "../../styles/globals.css";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/lazy";
import App, { AppProps } from "next/app";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <LocaleProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LocaleProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export const getInitialProps = async (context) => ({
  pageProps: {
    // https://nextjs.org/docs/advanced-features/custom-app#caveats
    ...(await App.getInitialProps(context)).pageProps,
  },
});

export default wrapper.withRedux(MyApp);
