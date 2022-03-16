import NextLink from "next/link";

import * as React from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import {
  Drawer,
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  IconButton,
} from "@mui/material";

import { t } from "../../providers/LocaleProvider";

import type { DrawerProps } from "@mui/material";

import Image from "next/image";

import { ShoppingBag, Add, Remove } from "@mui/icons-material";

import {
  selectItems,
  addToCart,
  discardFromCart,
} from "../../store/slices/cart";

import { formatPrice } from "../../utils";

import type Product from "../../types/product";

interface CartProps extends DrawerProps {}

function Cart({ open, onClose }: CartProps): JSX.Element {
  const dispatch = useDispatch();

  const cart = useSelector(selectItems);

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  const discardItem = (item: Product) => {
    dispatch(discardFromCart(item));
  };

  const totalPrice = (): string => {
    if (!cart) {
      return "0";
    }
    var price = 0.0;
    for (var i = 0; i < cart.length; i++) {
      price += cart[i].price * cart[i].amount;
    }
    return formatPrice(price);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      classes={{
        paper: cart && cart.length > 0 ? "cart" : "cart-paper",
      }}
    >
      <Box
        sx={{
          width: 360,
        }}
        role="presentation"
      >
        {cart.length > 0 ? (
          <Box sx={{ px: 2 }}>
            <Typography my={2} variant="h5">
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <ShoppingBag sx={{ mr: 1 }} />
                Your Shopping Cart
              </Stack>
            </Typography>
            <Typography variant="body2">Total: {totalPrice()}</Typography>
            <Divider light={true} sx={{ my: 2 }} />
            {cart.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="cart-wrap">
                    <div className="cart-wrap-items">
                      <Image
                        width={80}
                        height={80}
                        placeholder="empty"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="cart-wrap-details">
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Typography variant="subtitle2">
                          <Stack>
                            <Box>Price: {formatPrice(item.price)}</Box>
                            <Box>
                              Total: {formatPrice(item.price * item.amount)}
                            </Box>
                          </Stack>
                        </Typography>
                      </div>
                    </div>
                    <div className="buttons">
                      <IconButton
                        sx={{
                          width: 32,
                          height: 32,
                        }}
                        size="small"
                        onClick={(event) => {
                          event.preventDefault();
                          discardItem(item);
                        }}
                      >
                        <Remove />
                      </IconButton>
                      <p>{item.amount}</p>
                      <IconButton
                        sx={{
                          width: 32,
                          height: 32,
                        }}
                        size="small"
                        onClick={(event) => {
                          event.preventDefault();
                          addItemToCart(item);
                        }}
                      >
                        <Add />
                      </IconButton>
                    </div>
                  </div>
                  {index !== cart.length - 1 && (
                    <Divider light={true} sx={{ mt: 1, mb: 2 }} />
                  )}
                </React.Fragment>
              );
            })}
            <NextLink prefetch={false} href="/checkout" passHref>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component="a"
                sx={{ my: 2 }}
              >
                Checkout
              </Button>
            </NextLink>
          </Box>
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ px: 4 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <ShoppingBag fontSize="large" />
            </Box>
            <Typography align="center" variant="h5">
              {t("shopping_cart_empty")}
            </Typography>
            <Typography align="center" variant="subtitle1">
              {t("shopping_cart_hint")}
            </Typography>
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}

Cart.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Cart;
