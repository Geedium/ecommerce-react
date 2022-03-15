import * as React from "react";

import PropTypes from "prop-types";

import { useScrollTrigger } from "@mui/material";

import type { AppBarProps } from "@mui/material";

interface ElevationProps {
  children: React.ReactElement<AppBarProps>;
}

function ElevationScroll({ children }: ElevationProps): JSX.Element {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: undefined,
  });

  return React.cloneElement(children, {
    sx: {
      display: trigger ? "none" : "flex",
    },
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ElevationScroll;
