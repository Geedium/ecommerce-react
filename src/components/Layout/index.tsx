import * as React from "react";

import NextLink from "next/link";

import { useDispatch, useSelector } from "react-redux";

import { isUpdated, onCartView } from "../../store/slices/cart";

import theme from "../../themes/default";

import MobileMenu from "@/components/MobileMenu";
import Cart from "@/components/Cart";

import CategoryDropdown from "@/components/CategoryDropdown";

import { useScrollTrigger } from "@mui/material";

import {
  Badge,
  AppBar,
  Avatar,
  Toolbar,
  IconButton,
  Tooltip,
  Box,
  Link,
  Typography,
  NoSsr,
  Stack,
  Button,
  Container,
  MenuItem,
  Menu as Dropdown,
} from "@mui/material";

import {
  Menu,
  SearchOutlined,
  FavoriteBorderOutlined,
  ShoppingBagOutlined,
  PaletteOutlined,
  KeyboardArrowUp,
} from "@mui/icons-material";

import { isLoggedIn } from "../../store/slices/auth";

import { selectCategories } from "../../store/slices/product";

import Footer from "@/components/app/Footer";
import FooterSection from "@/components/FooterSection";
import ElevationScroll from "@/components/ElevationScroll";
import AccountMenu from "@/components/AccountMenu";

import type Category from "../../types/category";

import CookieConsent from "react-cookie-consent";
import Settings from "../Settings";

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}

function Layout({ children }: LayoutProps): JSX.Element {
  const [state, setState] = React.useState({
    left: false,
    right: false,
    settingsDrawer: false,
    modal: false,
    langId: 0,
    anchorEl: null,
  });

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: undefined,
  });

  const dispatch = useDispatch();

  const cartUpdated = useSelector(isUpdated);

  const categories: Category[] | null | undefined =
    useSelector(selectCategories);

  const loggedIn = useSelector(isLoggedIn);

  const toggleDrawer = (id: string, open: boolean) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (id === "right") {
      dispatch(onCartView(true));
    }

    setState({
      ...state,
      [id]: open,
    });
  };

  function handleMenuClose() {
    setState({
      ...state,
      anchorEl: null,
    });
  }

  function handleMenuClick(event) {
    if (state.anchorEl !== event.currentTarget) {
      setState({
        ...state,
        anchorEl: event.currentTarget,
      });
    }
  }

  const links = [
    {
      title: "Home",
      url: "/",
    },
  ];

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            backgroundColor: "background.default",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              mr: 2,
              display: { xs: "inline-flex", md: "none", color: "white" },
            }}
            onClick={toggleDrawer("left", true)}
          >
            <Menu />
          </IconButton>
          <MobileMenu
            open={state.left}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
            links={links}
          />
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchOutlined />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              [theme.breakpoints.down("lg")]: {
                position: "relative",
                justifyContent: "flex-start",
                display: "flex",
                alignItems: "center",
                transform: "none",
                flexGrow: 1,
                left: 0,
              },
            }}
          >
            <NextLink href="/" passHref>
              <Link style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontFamily: "Bon Voyage",
                    fontWeight: 400,
                    letterSpacing: 1,
                    [theme.breakpoints.down("md")]: {
                      display: "none",
                    },
                  }}
                  color="white"
                  variant="h5"
                  component="div"
                >
                  Keyla Estetique
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <IconButton
            color="inherit"
            aria-label="cart"
            onClick={toggleDrawer("right", true)}
            size="large"
          >
            <Badge
              invisible={cartUpdated ? false : true}
              color="secondary"
              variant="dot"
            >
              <ShoppingBagOutlined />
            </Badge>
          </IconButton>
          <NoSsr>
            <Cart open={state.right} onClose={toggleDrawer("right", false)} />
          </NoSsr>
          <IconButton
            size="large"
            aria-label="settings"
            onClick={toggleDrawer("settingsDrawer", true)}
            color="inherit"
          >
            <PaletteOutlined />
          </IconButton>
          {/* Settings Drawer */}
          <NoSsr>
            <Settings
              open={state.settingsDrawer}
              onClose={toggleDrawer("settingsDrawer", false)}
            />
          </NoSsr>
          <AccountMenu />
        </Toolbar>

        <Toolbar
          variant="dense"
          sx={(theme) => ({
            backgroundColor: "background.default",
            display: "flex",
            [theme.breakpoints.down("md")]: {
              display: trigger ? "none" : "flex",
            },
          })}
        >
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              justifyContent: "flex-start",
              display: "none",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                display: "flex",
              },
              flexGrow: 1,
            }}
          >
            <NextLink href="/" passHref>
              <Link sx={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontFamily: "Bon Voyage",
                  }}
                  color="white"
                  variant="h5"
                  component="div"
                >
                  Keyla Estetique
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Container
            sx={{
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
          >
            <Stack
              justifyContent="center"
              alignItems="stretch"
              direction="row"
              spacing={2}
            >
              <>
                {categories.map((category) => {
                  return category.children && category.children.length > 0 ? (
                    <CategoryDropdown
                      value={category}
                      key={String(category._id)}
                    />
                  ) : (
                    <Button
                      className="menu-button"
                      color="primary"
                      disableElevation
                      key={String(category._id)}
                    >
                      {category.name}
                    </Button>
                  );
                })}
              </>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
        }}
      >
        {children}
        <FooterSection />
        <Footer />
      </Box>
      <NoSsr defer={true}>
        <CookieConsent buttonText="Sutinku ✓" expires={365}>
          {
            "Siekdami užtikrinti geriausią Jūsų naršymo patirtį, šioje svetainėje"
          }
          {
            ' naudojame slapukus. Spausdami "Sutinku" arba bet kurią nuorodą, Jūs'
          }
          {" sutinkate su mūsų slapukų ir privatumo politika."}
        </CookieConsent>
      </NoSsr>
    </React.Fragment>
  );
}

export default Layout;
