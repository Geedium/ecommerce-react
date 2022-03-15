import * as React from "react";

import { Button, Menu, MenuItem } from "@mui/material";

import { KeyboardArrowUp } from "@mui/icons-material";

import type Category from "../../types/category";

import NextLink from "next/link";

interface CategoryDropdownProps {
  value: Category;
}

function CategoryDropdown({ value }: CategoryDropdownProps): JSX.Element {
  const [state, setState] = React.useState(null);

  const handleMenuClick = (event: { currentTarget: any }) => {
    if (state !== event.currentTarget) {
      setState(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setState(null);
  };

  return (
    <React.Fragment>
      <Button
        className={`menu-button ${
          Boolean(state) === true ? "menu-button--active" : ""
        }`}
        aria-owns={state ? "simple-menu" : undefined}
        aria-haspopup="true"
        endIcon={<KeyboardArrowUp />}
        color="primary"
        disableElevation
        onClick={handleMenuClick}
      >
        {value.name}
      </Button>
      <Menu
        transitionDuration={0}
        className="menu"
        PaperProps={{
          square: true,
          sx: {
            width: "100%",
            maxWidth: "100%",
            left: 0,
            right: 0,
          },
        }}
        marginThreshold={0}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
        id="simple-menu"
        anchorEl={state}
        open={Boolean(state)}
        onClose={handleMenuClose}
      >
        {value.children &&
          value.children.map((child) => {
            return (
              <NextLink
                href={{
                  pathname: "/catalog/[slug]",
                  query: { slug: child.slug },
                }}
                key={child.slug}
                passHref
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component="a"
                  autoFocus={false}
                >
                  {child.name}
                </MenuItem>
              </NextLink>
            );
          })}
      </Menu>
    </React.Fragment>
  );
}

export default CategoryDropdown;
