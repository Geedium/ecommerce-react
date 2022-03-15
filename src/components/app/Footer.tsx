/**
 * Next.js
 * {@link nextjs.org}
 *
 * Next.js is an open-source web
 * development framework built on top of
 * Node.js enabling React based web
 * applications functionalities such as
 * server-side rendering and generating
 * static websites.
 */
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";

/**
 * React
 * {@link https://reactjs.org}
 *
 * React is a JavaScript library for
 * creating user interfaces.
 */
import * as React from "react";

/**
 * React Redux
 * {@link react-redux.js.org}
 *
 * Official React bindings for Redux.
 * Performant and flexible.
 */
import { useSelector } from "react-redux";

/**
 * MUI
 * {@link https://mui.com}
 *
 * MUI provides a robust, customizable,
 * and accessible library of foundational
 * and advanced components, enabling you
 * to build your design system and develop
 * React applications faster.
 */
import {
  Grid,
  Container,
  Link,
  Stack,
  Divider,
  Box,
  Input,
  Typography,
  FormControl,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Email as EmailIcon } from "@mui/icons-material";

import Socials from "@/components/app/Socials";

import ReactStoreBadges from "react-store-badges";

import Logo from "../Logo";

import { getSettings, appTitle, appDomain } from "../../store/slices/site";

function Footer() {
  const router = useRouter();
  const { locale } = router;

  const settings = useSelector(getSettings);
  const title = useSelector(appTitle);
  const domain = useSelector(appDomain);

  const columns = [
    {
      title: "Parduotuvė",
      items: [
        {
          title: "Apie mus",
          page: "/about-us",
        },
        {
          title: "Prekių grąžinimas",
          page: "/returns",
        },
        {
          title: "Prekių pristatymas",
          page: "/delivery",
        },
        {
          title: "Teisinė informacija",
          page: "/legal-notice",
        },
        {
          title: "Atsiskaitymo būdai",
          page: "/secure-payments",
        },
      ],
    },
    {
      title: "Prekės",
      items: [
        {
          title: "Sumažinta kaina",
          page: "/",
        },
        {
          title: "Naujos prekės",
          page: "/",
        },
        {
          title: "Perkamiausios prekės",
          page: "/",
        },
      ],
    },
    {
      title: "Klientams",
      items: [
        {
          title: "Naudojimo terminai ir sąlygos",
          page: "/terms-and-use",
        },
        {
          title: "Privatumo politika",
          page: "/terms-and-use",
        },
        {
          title: "Dovanų kortelės",
          page: "/gift-cards",
        },
      ],
    },
  ];

  var lang = "en-us";

  switch (locale) {
    case "lt":
      lang = "lt-lt";
      break;
    case "de":
      lang = "de-de";
      break;
  }

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      <Box
        boxShadow={12}
        px={{ xs: 3, sm: 8 }}
        py={{ xs: 5, sm: 8 }}
        color="text.primary"
        sx={{ position: "relative" }}
      >
        <Container>
          <Typography
            variant="h4"
            align="center"
            sx={{ textTransform: "uppercase", fontWeight: 300 }}
            component="div"
            noWrap
          >
            Naujienlaiškis
          </Typography>
          <Typography
            align="center"
            variant="body2"
            paragraph={true}
            sx={{ color: "#7a7a7a" }}
          >
            Prenumeratos galėsite atsisakyti bet kuriuo metu. Tam tikslui mūsų
            kontaktinę informaciją rasite paspaudė apie mus.
          </Typography>
          <Stack justifyContent="center" alignItems="center" pb={3} spacing={1}>
            <FormControl sx={{ m: 1 }} variant="filled">
              <Input
                value=""
                onChange={() => {}}
                name="subscribe"
                id="subscribe"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {}}
                      onMouseDown={() => {}}
                      edge="end"
                    >
                      <EmailIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Stack>
          <Grid container spacing={5} py={{ xs: 3, sm: 4 }}>
            {columns.map((column, index) => {
              return (
                <Grid item xs={12} sm={4} md={3} key={index}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ fontSize: 20, pb: 1 }}
                  >
                    <Typography
                      noWrap={true}
                      sx={{ textTransform: "uppercase", fontWeight: 400 }}
                      variant="h6"
                    >
                      {column.title}
                    </Typography>
                  </Stack>
                  {column.items.map((item, index) => {
                    return (
                      <Box key={index}>
                        <NextLink href={item.page} prefetch={false} passHref>
                          <Link variant="body2" underline="none">
                            {item.title}
                          </Link>
                        </NextLink>
                      </Box>
                    );
                  })}
                </Grid>
              );
            })}
            <Grid item xs={12} sm={12} md={3}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ fontSize: 20, pb: 1 }}
              >
                <Typography
                  noWrap={true}
                  sx={{ textTransform: "uppercase", fontWeight: 400 }}
                  variant="h6"
                >
                  Programėlės
                </Typography>
              </Stack>
              <Box sx={{ display: "flex", flexFlow: "row wrap", gap: 2 }}>
                <Image
                  width={135}
                  height={40}
                  alt="Get it on Google Play"
                  src="/img/fil_get.svg"
                  loading="eager"
                />
                <Image
                  width={135}
                  height={40}
                  alt="Download on the App Store"
                  src="/img/badge_appstore-lrg.svg"
                  loading="eager"
                />
              </Box>
              <Typography mt={2} paragraph variant="body2">
                Google Play and the Google Play logo are trademarks of Google
                LLC. Apple logo are trademarks of Apple Inc.
              </Typography>
            </Grid>
          </Grid>
          <Divider light={true} />
          <Socials spacing={2} links={settings} pt={{ xs: 3, sm: 4 }} />
          <Stack textAlign="center" pt={3}>
            <Typography noWrap variant="body2">
              &copy; {new Date().getFullYear().toString() + " "}
              <Link underline="none" href={`https://${domain}/`}>
                {title}
              </Link>
              {","}
            </Typography>
            <Typography noWrap variant="body2">
              <Link underline="none" href="https://geedium.com">
                Geedium
              </Link>
              {". All rights reserved."}
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
