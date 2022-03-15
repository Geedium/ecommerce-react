function StoreLayout({
  children,
  locked,
  title,
}: {
  children?: any;
  locked?: boolean;
  title?: string;
}) {
  return { children };
}

export default StoreLayout;

// import { cloneElement, useState, MouseEvent, useEffect } from "react";

// import { ThemeProvider } from "@mui/material/styles";
// import { Badge, CssBaseline, Divider, GlobalStyles } from "@mui/material";

// import FooterSection from "../components/FooterSection";

// import {
//   FormControl,
//   FormControlLabel,
//   FormGroup,
//   InputLabel,
//   InputAdornment,
//   OutlinedInput,
//   Switch,
//   Select,
//   Menu,
//   MenuItem,
//   NoSsr,
//   Container,
// } from "@mui/material";

// import CookieConsent from "react-cookie-consent";

// import { KeyboardArrowUp } from "@mui/icons-material";

// import { formatPrice } from "../utils";

// import {
//   PersonAdd,
//   Settings,
//   Logout,
//   Translate,
//   RadioButtonUnchecked,
//   RadioButtonChecked,
//   ShoppingBag,
//   ShoppingBagOutlined,
//   Palette,
//   PaletteOutlined,
//   FavoriteBorderOutlined,
//   Delete,
//   Add,
//   Remove,
// } from "@mui/icons-material";

// import {
//   discardFromCart,
//   addToCart,
//   isUpdated,
//   onCartView,
// } from "../store/slices/cart";

// import { isLoggedIn, getUser } from "../store/slices/auth";

// import Backdrop from "@mui/material/Backdrop";
// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import PercentIcon from "@mui/icons-material/Percent";

// // SEO & Metadata
// import Head from "next/head";

// import Modal from "@mui/material/Modal";

// // Routing
// import NextLink from "next/link";
// import Link from "@mui/material/Link";

// import Box from "@mui/material/Box";

// import PropTypes from "prop-types";

// import Stack from "@mui/material/Stack";

// import { useDispatch, useSelector } from "react-redux";
// import { selectItems } from "../store/slices/cart";

// import { doLogout } from "../actions";

// // Drawer parts
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import Drawer from "@mui/material/Drawer";

// import Footer from "../components/Footer";
// import Toolbar from "@mui/material/Toolbar";
// import { AppBar } from "@mui/material";
// import Typography from "@mui/material/Typography";

// import { useTheme } from "@mui/material";

// import IconButton from "@mui/material/IconButton";
// import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import HomeIcon from "@mui/icons-material/Home";

// import Button from "@mui/material/Button";

// import useScrollTrigger from "@mui/material/useScrollTrigger";

// import Tooltip from "@mui/material/Tooltip";

// import Avatar from "@mui/material/Avatar";

// import SettingsIcon from "@mui/icons-material/Settings";

// import AccountMenu from "../components/AccountMenu";

// import theme from "../themes/default";

// import Logo from "../components/Logo";

// import enUS from "../../locales/en-US.js";
// import ltLT from "../../locales/lt-LT.js";
// import de from "../../locales/de";
// import { useRouter } from "next/router";

// import { css, Global } from "@emotion/react";

// import Cookie from "js-cookie";

// function ElevationScroll(props) {
//   const theme = useTheme();

//   const { children, window, locked } = props;
//   // Note that you normally won't need to set the window ref as useScrollTrigger
//   // will default to window.
//   // This is only being set here because the demo is in an iframe.
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//     target: window ? window() : undefined,
//   });

//   return cloneElement(children, {
//     elevation: locked || trigger ? 4 : 0,
//     color: "primary",
//     enableColorOnDark: true,
//   });
// }

// ElevationScroll.propTypes = {
//   children: PropTypes.element.isRequired,
//   locked: PropTypes.bool,
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

// function StoreLayout({
//   children,
//   locked,
//   title,
// }: {
//   children?: any;
//   locked?: boolean;
//   title?: string;
// }) {
//   const [state, setState] = useState({
//     left: false,
//     right: false,
//     settingsDrawer: false,
//     modal: false,
//     langId: 0,
//     anchorEl: null,
//   });

//   const dispatch = useDispatch();

//   const cart = useSelector(selectItems);

//   const cartUpdated = useSelector(isUpdated);

//   function handleMenuClick(event) {
//     if (state.anchorEl !== event.currentTarget) {
//       setState({
//         ...state,
//         anchorEl: event.currentTarget,
//       });
//     }
//   }

//   function handleMenuClose() {
//     setState({
//       ...state,
//       anchorEl: null,
//     });
//   }

//   const handleOpen = () =>
//     setState({
//       ...state,
//       modal: true,
//     });

//   const handleClose = () =>
//     setState({
//       ...state,
//       modal: false,
//     });

//   const discardItem = (item) => {
//     dispatch(discardFromCart(item));
//   };

//   const addItemToCart = (item) => {
//     dispatch(addToCart(item));
//   };

//   const toggleDrawer = (id, open) => (event) => {
//     if (
//       event &&
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     if (id === "right") {
//       dispatch(onCartView(true));
//     }

//     setState({
//       ...state,
//       [id]: open,
//     });
//   };

//   const iOS =
//     typeof navigator !== "undefined" &&
//     /iPad|iPhone|iPod/.test(navigator.userAgent);

//   const loggedIn = useSelector(isLoggedIn);

//   // LanguageMenu
//   const router = useRouter();
//   const { locale, locales, defaultLocale } = router;

//   // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
//     if (locales && Array.isArray(locales)) {
//       for (var i = 0; i < locales.length; i++) {
//         if (locales[i] === locale) {
//           setState({
//             ...state,
//             langId: i,
//           });
//         }
//       }
//     }
//   }, []);

//   const t = (msg) => {
//     switch (locale) {
//       case "en":
//         return enUS[msg];
//       case "lt":
//         return ltLT[msg];
//       case "de":
//         return de[msg];
//       default:
//         return "";
//     }
//   };

//   const totalPrice = (): string => {
//     if (!cart) {
//       return "0";
//     }
//     var price = 0.0;
//     for (var i = 0; i < cart.length; i++) {
//       price += cart[i].price * cart[i].amount;
//     }
//     return formatPrice(price);
//   };

//   const changeLanguage = (locale, index) => {
//     setState({
//       ...state,
//       langId: index,
//     });

//     Cookie.set("NEXT_LOCALE", locale, { expires: 7 });

//     router.push(router.pathname, router.pathname, {
//       locale,
//     });
//   };

//   const currencies = [
//     "United Arab Emirates Dirham (AED)",
//     "Argentine Peso (ARS)",
//     "Australian Dollar (A$)",
//     "Brazilian Real (R$)",
//     "Canadian Dollar (CA$)",
//     "Swiss Franc (CHF)",
//     "Chilean Peso (CLP)",
//     "Colombian Peso (COP)",
//     "Costa Rican Colón (CRC)",
//     "Czech Koruna (CZK)",
//     "Danish Krone (DKK)",
//     "Euro (€)",
//     "Pound Sterling (£)",
//     "Israeli New Shekel (₪)",
//     "Mexican Peso (MX$)",
//     "Norwegian Krone (NOK)",
//     "New Zealand Dollar (NZ$)",
//     "Peruvian Sol (PEN)",
//     "Polski złoty (PLN)",
//     "Romanian Leu (RON)",
//     "Saudi Riyal (SAR)",
//     "Swedish Krona (SEK)",
//     "Turkish Lira (TRY)",
//     "US Dollar ($)",
//     "Uruguayan Peso (UYU)",
//     "Hungarian Forint (HUF)",
//     "Russian Ruble (RUB)",
//   ];

//   const resolveName = (lng: string) => {
//     switch (lng) {
//       case "en":
//         return "English";
//       case "lt":
//         return "lietuvių kalba";
//       case "de":
//         return "Deutsch";
//       default:
//         return lng === defaultLocale ? null : resolveName(defaultLocale);
//     }
//   };

//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//         <CssBaseline />
//         <GlobalStyles
//           styles={{
//             background: theme.palette.background.default,
//           }}
//         />
//         <Global
//           styles={css`
//             html {
//               scrollbar-color: #c2d2e4 rgb(70, 70, 70);
//               scrollbar-width: thin;
//             }

//             ::-webkit-scrollbar {
//               width: 15px;
//               height: 15px;
//             }

//             ::-webkit-scrollbar-track-piece {
//               background-color: #c2d2e4;
//             }

//             ::-webkit-scrollbar-thumb:vertical {
//               height: 30px;
//               background-color: rgb(70, 70, 70);
//             }

//             .fab {
//               box-shadow: none !important;
//               background: none !important;
//               color: #fff !important;
//             }

//             .cart-paper {
//               width: 360px;
//               justify-content: center;
//             }

//             .absolute {
//               position: absolute;
//             }

//             .inset-0 {
//               top: 0;
//               right: 0;
//               bottom: 0;
//               left: 0;
//             }

//             .flex {
//               display: flex;
//             }

//             .items-center {
//               align-items: center;
//             }

//             .justify-center {
//               justify-content: center;
//             }

//             .aspect-\[2\/1\] {
//               aspect-ratio: 2/1;
//             }

//             /* Cart */
//             .cart-wrap .information,
//             .cart-wrap .buttons {
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//             }

//             .cart-wrap-items {
//               display: flex;
//               justify-content: space-between;
//             }

//             .cart-wrap-details {
//               display: flex;
//               flex-flow: column nowrap;
//               padding-left: 16px;
//             }

//             .cart-wrap {
//               display: flex;
//               justify-content: space-between;
//               flex-flow: column nowrap;
//             }

//             .cart-wrap div {
//               flex: 1;
//             }

//             .cart-wrap img {
//               max-width: 80px;
//               object-fit: cover;
//             }

//             .each-slide > div {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               background-size: cover;
//               height: 100%;
//             }

//             .each-slide span {
//               padding: 20px;
//               font-size: 20px;
//               background: #efefef;
//               text-align: center;
//             }

//             a:hover,
//             button:hover,
//             button:hover > svg {
//               color: #a3a3a3 !important;
//             }

//             .MuiFormControlLabel-label {
//               color: #fff !important;
//             }

//             .MuiSvgIcon-root {
//               color: #fff !important;
//             }

//             .react-slideshow-container + ul.indicators {
//               gap: 1rem;
//             }
//             .react-slideshow-container + ul.indicators li {
//               width: 16px !important;
//               height: 16px !important;
//             }
//             .react-slideshow-container
//               + ul.indicators
//               .each-slideshow-indicator::before {
//               width: 16px !important;
//               height: 16px !important;
//             }
//             .react-slideshow-container .default-nav {
//               background: none !important;
//             }

//             .react-slideshow-container .default-nav:first-of-type {
//               margin-left: 30px;
//             }
//             .react-slideshow-container .default-nav:last-of-type {
//               margin-right: 30px;
//             }

//             .section-video {
// variant; //               position: absolute;
//               user-select: none;
//               pointer-events: none;
//               top: 0;
//               left: 0;
//               width: 100%;
//               height: 100%;
//               object-fit: cover;
//               opacity: 0.8;
//             }

//             .section-overlay {
//               position: absolute;
//               top: 0;
//               left: 0;
//               width: 100%;
//               height: 100%;
//               background: #85776a;
//               mix-blend-mode: overlay;
//             }

//             .card-interact {
//               perspective: 1000px;
//               transform-style: preserve-3d;
//               box-shadow: 68px 0 18px 4px #5c5c5c;
//             }

//             .menu-button {
//               color: #fff !important;
//             }

//             .menu-button .MuiButton-endIcon {
//               transform: rotateZ(0deg);
//               transition: transform 0.5s;
//             }

//             .menu-button--active .MuiButton-endIcon {
//               transform: rotateZ(180deg);
//             }

//             main {
//               display: flex;
//               flex-direction: column;
//               min-height: 100%;
//             }

//             body,
//             html,
//             #__next {
//               height: 100%;
//             }

//             .link-titlea0 {
//               overflow: hidden;
//               text-decoration: none;
//               border: 0;
//               background: #27022d;
//             }

//             .linka0 .MuiCardContent-root::before {
//               content: "";
//               position: absolute;
//               z-index: 2;
//               top: 0;
//               left: -120%;
//               width: 100%;
//               height: 100%;
//               background: linear-gradient(
//                 to right,
//                 rgba(255, 255, 255, 0) 0%,
//                 rgba(255, 255, 255, 0.3) 100%
//               );
//               transform: skewX(-25deg);
//               transition: 1s;
//             }

//             .linka0:hover .MuiCardContent-root::before {
//               left: 100%;
//             }

//             .linka0 .link-titlea0 {
//               transition: transform 0.5s;
//             }

//             .linka0:hover .link-titlea2 {
//               opacity: 1;
//               height: auto;
//               width: auto;
//             }

//             .link-titlea2 {
//               opacity: 0;
//               height: 0;
//               width: 0;
//               transition: all 2s;
//             }

//             .linka0:hover .link-titlea0 {
//               transform: translate(-50%, -30%);
//             }

//             .MuiMenuItem-root {
//               width: auto;
//             }

//             .menu .MuiPaper-root {
//               background: #181818;
//               border-radius: 0 !important;
//             }

//             .menu .MuiMenuItem-root:hover,
//             .menu .MuiMenuItem-root:active,
//             .menu .MuiMenuItem-root:active:hover {
//               background: none !important;
//               color: #a3a3a3 !important;
//             }
//           `}
//         />
//         <Head>
//           <title>{title ? `${title} - Store` : "Store"}</title>
//           <meta property="og:title" content="Store | Home" key="title" />
//           <meta name="keywords" content="Store" />
//         </Head>
//         <ElevationScroll locked={locked}>
//           <AppBar position={locked ? "sticky" : "fixed"}>
//             <Toolbar
//               sx={{
//                 backgroundColor: "background.default",
//               }}
//             >
//               <IconButton
//                 size="large"
//                 edge="start"
//                 color="inherit"
//                 aria-label="open drawer"
//                 sx={{
//                   mr: 2,
//                   display: { xs: "inline-flex", md: "none", color: "white" },
//                 }}
//                 onClick={toggleDrawer("left", true)}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <SwipeableDrawer
//                 disableBackdropTransition={!iOS}
//                 disableDiscovery={iOS}
//                 anchor="left"
//                 open={state.left}
//                 onClose={toggleDrawer("left", false)}
//                 onOpen={toggleDrawer("left", true)}
//               >
//                 <Box
//                   sx={{
//                     width: 250,
//                   }}
//                   role="presentation"
//                   onClick={toggleDrawer("left", false)}
//                   onKeyDown={toggleDrawer("left", false)}
//                 >
//                   <List>
//                     <NextLink href="/" passHref>
//                       <ListItem component="a" button key="Titulinis">
//                         <ListItemIcon>
//                           <HomeIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Titulinis" />
//                       </ListItem>
//                     </NextLink>
//                     <ListItem button key="Katalogas">
//                       <ListItemIcon>
//                         <InventoryIcon />
//                       </ListItemIcon>
//                       <ListItemText primary="Katalogas" />
//                     </ListItem>
//                     <Divider />
//                     <ListItem button key="Akcijos">
//                       <ListItemIcon>
//                         <PercentIcon />
//                       </ListItemIcon>
//                       <ListItemText primary="Akcijos" />
//                     </ListItem>
//                   </List>
//                 </Box>
//               </SwipeableDrawer>
//               <IconButton size="large" aria-label="search" color="inherit">
//                 <SearchIcon />
//               </IconButton>
//               <Box
//                 sx={{
//                   flexGrow: 1,
//                   justifyContent: "center",
//                   alignItems: "center",
//                   display: "flex",
//                   [theme.breakpoints.down("lg")]: {
//                     display: "none",
//                   },
//                 }}
//               />
//               <Box
//                 sx={{
//                   position: "absolute",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   [theme.breakpoints.down("lg")]: {
//                     position: "relative",
//                     justifyContent: "flex-start",
//                     display: "flex",
//                     alignItems: "center",
//                     transform: "none",
//                     flexGrow: 1,
//                     left: 0,
//                   },
//                 }}
//               >
//                 <NextLink href="/" passHref>
//                   <Link style={{ textDecoration: "none" }}>
//                     <Typography
//                       sx={{
//                         fontFamily: "Bon Voyage",
//                         [theme.breakpoints.down("md")]: {
//                           display: "none",
//                         },
//                       }}
//                       color="white"
//                       variant="h5"
//                       component="div"
//                     >
//                       Keyla Estetique
//                     </Typography>
//                   </Link>
//                 </NextLink>
//               </Box>
//               <IconButton size="large" aria-label="settings" color="inherit">
//                 <FavoriteBorderOutlined />
//               </IconButton>
//               <IconButton
//                 color="inherit"
//                 aria-label="cart"
//                 onClick={toggleDrawer("right", true)}
//                 size="large"
//               >
//                 <Badge
//                   invisible={cartUpdated ? false : true}
//                   color="secondary"
//                   variant="dot"
//                 >
//                   <ShoppingBagOutlined />
//                 </Badge>
//               </IconButton>
//               {/* Cart Drawer */}
//               <NoSsr defer={false}>
//                 <Drawer
//                   anchor="right"
//                   open={state.right}
//                   onClose={toggleDrawer("right", false)}
//                   classes={{
//                     paper: cart && cart.length > 0 ? "cart" : "cart-paper",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 360,
//                     }}
//                     role="presentation"
//                   >
//                     {cart.length > 0 ? (
//                       <Box sx={{ px: 2 }}>
//                         <Typography my={2} variant="h5">
//                           <Stack direction="row" sx={{ alignItems: "center" }}>
//                             <ShoppingBag sx={{ mr: 1 }} />
//                             Your Shopping Cart
//                           </Stack>
//                         </Typography>
//                         <Typography variant="body2">
//                           Total: {totalPrice()}
//                         </Typography>

//                         <Divider light={true} sx={{ my: 2 }} />

//                         {cart.map((item, index) => {
//                           return (
//                             <>
//                               <div className="cart-wrap">
//                                 <div className="cart-wrap-items">
//                                   <img src={item.image} alt={item.name} />
//                                   <div className="cart-wrap-details">
//                                     <Typography ="subtitle1">
//                                       {item.name}
//                                     </Typography>
//                                     <Typography variant="subtitle2">
//                                       <Stack>
//                                         <Box>
//                                           Price: {formatPrice(item.price)}
//                                         </Box>
//                                         <Box>
//                                           Total:{" "}
//                                           {formatPrice(
//                                             item.price * item.amount
//                                           )}
//                                         </Box>
//                                       </Stack>
//                                     </Typography>
//                                   </div>
//                                 </div>
//                                 <div className="buttons">
//                                   <IconButton
//                                     sx={{
//                                       width: 32,
//                                       height: 32,
//                                     }}
//                                     size="small"
//                                     onClick={(event) => {
//                                       event.preventDefault();
//                                       discardItem(item);
//                                     }}
//                                   >
//                                     <Remove />
//                                   </IconButton>
//                                   <p>{item.amount}</p>
//                                   <IconButton
//                                     sx={{
//                                       width: 32,
//                                       height: 32,
//                                     }}
//                                     size="small"
//                                     onClick={(event) => {
//                                       event.preventDefault();
//                                       addItemToCart(item);
//                                     }}
//                                   >
//                                     <Add />
//                                   </IconButton>
//                                 </div>
//                               </div>
//                               {index !== cart.length - 1 && (
//                                 <Divider light={true} sx={{ mt: 1, mb: 2 }} />
//                               )}
//                             </>
//                           );
//                         })}

//                         <NextLink href="/checkout" passHref>
//                           <Button
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             component="a"
//                             sx={{ my: 2 }}
//                           >
//                             Checkout
//                           </Button>
//                         </NextLink>
//                       </Box>
//                     ) : (
//                       <Stack
//                         alignItems="center"
//                         justifyContent="center"
//                         spacing={2}
//                         sx={{ px: 4 }}
//                       >
//                         <Box sx={{ textAlign: "center" }}>
//                           <ShoppingBag fontSize="large" />
//                         </Box>
//                         <Typography align="center" variant="h5">
//                           {t("shopping_cart_empty")}
//                         </Typography>
//                         <Typography align="center" variant="subtitle1">
//                           {t("shopping_cart_hint")}
//                         </Typography>
//                       </Stack>
//                     )}
//                   </Box>
//                 </Drawer>
//               </NoSsr>
//               <IconButton
//                 size="large"
//                 aria-label="settings"
//                 onClick={toggleDrawer("settingsDrawer", true)}
//                 color="inherit"
//               >
//                 <PaletteOutlined />
//               </IconButton>
//               {/* Settings Drawer */}
//               <NoSsr defer={false}>
//                 <Drawer
//                   anchor="right"
//                   open={state.settingsDrawer}
//                   onClose={toggleDrawer("settingsDrawer", false)}
//                 >
//                   <Box
//                     sx={{
//                       width: 300,
//                       px: 3,
//                       py: 1,
//                     }}
//                     role="presentation"
//                   >
//                     <Typography my={2} variant="h5">
//                       <Stack direction="row" sx={{ alignItems: "center" }}>
//                         <Palette sx={{ mr: 1 }} />
//                         {t("personalization")}
//                       </Stack>
//                     </Typography>
//                     <Typography my={2} variant="body2">
//                       {t("personalization_desc")}
//                     </Typography>
//                     <FormControl sx={{ my: 2, width: "100%" }}>
//                       <InputLabel id="demo-multiple-name-label">
//                         {t("locale")}
//                       </InputLabel>
//                       <Select
//                         labelId="demo-multiple-name-label"
//                         id="demo-multiple-name"
//                         value={state.langId}
//                         onChange={() => {}}
//                         input={<OutlinedInput label="Name" />}
//                         MenuProps={{
//                           PaperProps: {
//                             style: {
//                               maxHeight: 48 * 4.5 + 8,
//                               width: 150,
//                             },
//                           },
//                         }}
//                       >
//                         {locales &&
//                           locales.map((loc, index) => (
//                             <MenuItem
//                               onClick={(event) => changeLanguage(loc, index)}
//                               key={index}
//                               value={index}
//                             >
//                               {loc === locale ? (
//                                 <>{resolveName(loc)}</>
//                               ) : (
//                                 <>{resolveName(loc)}</>
//                               )}
//                             </MenuItem>
//                           ))}

//                         {/* <MenuItem
//                           onClick={changeLanguage("lt")}
//                           key="lt"
//                           value={0}
//                         >
//                           <RadioButtonChecked /> Lietuvių - LT
//                         </MenuItem>
//                         <MenuItem
//                           onClick={changeLanguage("en")}
//                           key="en"
//                           value={1}
//                         >
//                           <RadioButtonUnchecked /> English - EN
//                         </MenuItem> */}
//                       </Select>
//                     </FormControl>
//                     <FormControl sx={{ my: 2, width: "100%" }}>
//                       <InputLabel id="demo-multiple-name-label">
//                         {t("currency")}
//                       </InputLabel>
//                       <Select
//                         labelId="demo-multiple-name-label"
//                         id="demo-multiple-name"
//                         value={0}
//                         onChange={() => {}}
//                         input={<OutlinedInput label="Name" />}
//                         MenuProps={{
//                           PaperProps: {
//                             style: {
//                               maxHeight: 48 * 4.5 + 8,
//                               width: 320,
//                             },
//                           },
//                         }}
//                       >
//                         {currencies &&
//                           currencies.map((currency, index) => (
//                             <MenuItem key={index} value={index}>
//                               {currency}
//                             </MenuItem>
//                           ))}

//                         {/* <MenuItem
//                           onClick={changeLanguage("lt")}
//                           key="lt"
//                           value={0}
//                         >
//                           <RadioButtonChecked /> Lietuvių - LT
//                         </MenuItem>
//                         <MenuItem
//                           onClick={changeLanguage("en")}
//                           key="en"
//                           value={1}
//                         >
//                           <RadioButtonUnchecked /> English - EN
//                         </MenuItem> */}
//                       </Select>
//                     </FormControl>
//                     <FormGroup>
//                       <FormControlLabel
//                         control={
//                           <Switch
//                             sx={{ m: 1 }}
//                             defaultChecked
//                             disabled
//                             color="secondary"
//                           />
//                         }
//                         label={t("dark_mode")}
//                       />
//                     </FormGroup>
//                   </Box>
//                 </Drawer>
//               </NoSsr>
//               <NextLink href="/auth" passHref>
//                 {loggedIn ? (
//                   <AccountMenu />
//                 ) : (
//                   <Tooltip title="Prisijungimas">
//                     <IconButton sx={{ p: 0, ml: 1 }} size="large">
//                       <Avatar />
//                     </IconButton>
//                   </Tooltip>
//                 )}
//               </NextLink>
//             </Toolbar>
//             <Toolbar
//               variant="dense"
//               sx={{
//                 backgroundColor: "background.default",
//                 display: "flex",
//               }}
//             >
//               <Box
//                 sx={{
//                   position: "absolute",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   justifyContent: "flex-start",
//                   display: "none",
//                   alignItems: "center",
//                   [theme.breakpoints.down("md")]: {
//                     display: "flex",
//                   },
//                   flexGrow: 1,
//                 }}
//               >
//                 <NextLink href="/" passHref>
//                   <Link sx={{ textDecoration: "none" }}>
//                     <Typography
//                       sx={{
//                         fontFamily: "Bon Voyage",
//                       }}
//                       color="white"
//                       variant="h5"
//                       component="div"
//                     >
//                       Keyla Estetique
//                     </Typography>
//                   </Link>
//                 </NextLink>
//               </Box>
//               <Container
//                 sx={{
//                   [theme.breakpoints.down("md")]: {
//                     display: "none",
//                   },
//                 }}
//               >
//                 <Stack
//                   justifyContent="flex-start"
//                   alignItems="stretch"
//                   direction="row"
//                   spacing={2}
//                 >
//                   <>
//                     <Button
//                       className={`menu-button ${
//                         Boolean(state.anchorEl) === true
//                           ? "menu-button--active"
//                           : ""
//                       }`}
//                       disableElevation
//                       endIcon={<KeyboardArrowUp />}
//                       color="primary"
//                       aria-owns={state.anchorEl ? "simple-menu" : undefined}
//                       aria-haspopup="true"
//                       onClick={handleMenuClick}
//                     >
//                       Pavadinimas
//                     </Button>
//                     <Menu
//                       transitionDuration={0}
//                       className="menu"
//                       PaperProps={{
//                         square: true,
//                         sx: {
//                           width: "100%",
//                           maxWidth: "100%",
//                           left: 0,
//                           right: 0,
//                         },
//                       }}
//                       marginThreshold={0}
//                       anchorOrigin={{
//                         horizontal: "left",
//                         vertical: "bottom",
//                       }}
//                       transformOrigin={{
//                         horizontal: "left",
//                         vertical: "top",
//                       }}
//                       id="simple-menu"
//                       anchorEl={state.anchorEl}
//                       open={Boolean(state.anchorEl)}
//                       onClose={handleMenuClose}
//                       // MenuListProps={{ onMouseLeave: handleMenuClose }}
//                     >
//                       <MenuItem
//                         onClick={handleMenuClose}
//                         component="div"
//                         autoFocus={false}
//                       >
//                         Clothes
//                       </MenuItem>
//                       <MenuItem component="div" autoFocus={false}>
//                         Beauty products
//                       </MenuItem>
//                     </Menu>
//                   </>
//                   <Button classes="menu-button" color="secondary">
//                     Category 1
//                   </Button>
//                   <Button classes="menu-button" color="secondary">
//                     Category 2
//                   </Button>
//                 </Stack>
//               </Container>
//             </Toolbar>
//           </AppBar>
//         </ElevationScroll>
//         <Box
//           component="main"
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             minHeight: "100%",
//           }}
//         >
//           {children}
//           <FooterSection />
//           <Footer />
//         </Box>
//         <NoSsr defer={false}>
//           <CookieConsent
//             style={{ background: "white", color: "black" }}
//             buttonText="Suprantu"
//             expires={365}
//           >
//             Ši svetainė naudoja slapukus, kad pagerinti svetainės turinį ir
//             paslaugas.
//           </CookieConsent>
//         </NoSsr>
//       </ThemeProvider>
//     </>
//   );
// }

// export default StoreLayout;
