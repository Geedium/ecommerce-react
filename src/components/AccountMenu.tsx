import { useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  NoSsr,
} from "@mui/material";

import NextLink from "next/link";

/**
 * @mui/icons-material
 * {@link https://www.npmjs.com/package/@mui/icons-material}
 *
 * Provides the Google Material icons
 * packaged as a set of React components.
 */
import {
  Settings as SettingsIcon,
  Speed as AdminPanelIcon,
  Logout as LogoutIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";

import { getUser, doLogout } from "../store/slices/auth";

import { t } from "../providers/LocaleProvider";

function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  if (!hasWhiteSpace(name)) {
    let firstStringChar: string =
      typeof name === "string" ? name.charAt(0).toUpperCase() : "";

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: firstStringChar,
    };
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function AccountMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  // User is not loaded.
  if (!user) {
    return (
      <NextLink href="/auth" passHref>
        <IconButton component="a" sx={{ p: 0, ml: 1 }} size="large">
          <Avatar />
        </IconButton>
      </NextLink>
    );
  }

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        sx={{ p: 0, ml: 1 }}
        onClick={handleClick}
        size="large"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar {...stringAvatar(user.username)} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 200,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user.role === "ADMIN" && (
          <NextLink
            href={{
              pathname: "/admin",
            }}
            locale={false}
            passHref
          >
            <MenuItem component="a">
              <ListItemIcon>
                <AdminPanelIcon />
              </ListItemIcon>
              Prietaisų skydelis
            </MenuItem>
          </NextLink>
        )}
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          {t("wishlist")}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          {t("orders")}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          {t("account_settings")}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => dispatch(doLogout())}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          {t("logout")}
        </MenuItem>
      </Menu>
    </>
  );
}

export default AccountMenu;
