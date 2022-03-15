/**
 * React
 * {@link https://reactjs.org}
 *
 * React is a JavaScript library for
 * creating user interfaces.
 */
import * as React from "react";

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
import type { StackProps } from "@mui/material/Stack";
import { Stack, Link, IconButton } from "@mui/material";

/**
 * @mui/icons-material
 * {@link https://www.npmjs.com/package/@mui/icons-material}
 *
 * Provides the Google Material icons
 * packaged as a set of React components.
 */
import {
  Pinterest as PinterestIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";

import type { SettingsProps } from "../../store/slices/site";

interface ISocialsProps extends StackProps {
  links: SettingsProps;
}

/**
 * Socials
 */
function Socials({ links, ...props }: ISocialsProps) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      {links.facebook_link && (
        <IconButton
          component={Link}
          size="medium"
          sx={{
            color: "#7a7a7a",
            "&:hover": {
              color: "#1778F2 !important",
            },
          }}
          target="_blank"
          rel="noreferrer"
          href={links.facebook_link}
        >
          <FacebookIcon fontSize="inherit" />
        </IconButton>
      )}
      {links.instagram_link && (
        <IconButton
          component={Link}
          size="medium"
          sx={{
            color: "#7a7a7a",
            "&:hover": {
              color: "#833AB4 !important",
            },
          }}
          target="_blank"
          rel="noreferrer"
          href={links.instagram_link}
        >
          <InstagramIcon fontSize="inherit" />
        </IconButton>
      )}
      {links.pinterest_link && (
        <IconButton
          component={Link}
          size="medium"
          sx={{
            color: "#7a7a7a",
            "&:hover": {
              color: "#e7082a !important",
            },
          }}
          target="_blank"
          rel="noreferrer"
          href={links.pinterest_link}
        >
          <PinterestIcon fontSize="inherit" />
        </IconButton>
      )}
      {links.twitter_link && (
        <IconButton
          component={Link}
          size="medium"
          sx={{
            color: "#7a7a7a",
            "&:hover": {
              color: "#60bded !important",
            },
          }}
          target="_blank"
          rel="noreferrer"
          href={links.twitter_link}
        >
          <TwitterIcon fontSize="inherit" />
        </IconButton>
      )}
    </Stack>
  );
}

export default React.memo(Socials);
