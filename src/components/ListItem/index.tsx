import Image from "next/image";
import NextLink from "next/link";

import { useDispatch } from "react-redux";

import {
  Card,
  CardContent,
  CardActions,
  Box,
  Link,
  Typography,
  Rating,
  Chip,
  Divider,
  Stack,
  Button,
} from "@mui/material";

import ImageMagnify from "../ImageMagnify";
import CardLabel from "../CardLabel";

import { formatPrice } from "../../utils";

import { addToCart } from "../../store/slices/cart";

import { AddShoppingCart } from "@mui/icons-material";

function ListItem({ product }: { product: any }) {
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "unset",
        "&.MuiPaper-root": {
          backgroundColor: "transparent",
          backgroundImage: "none",
          boxShadow: "none",
        },
      }}
    >
      <CardLabel>New</CardLabel>
      <Rating
        sx={{
          position: "absolute",
          right: 10,
          zIndex: 99,
          top: 10,
        }}
        name="read-only"
        value={product.rating}
        readOnly
      />
      <CardContent
        sx={{
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component={ImageMagnify} width={256} height={256}>
          <NextLink href={`/product/${product.slug}`} passHref>
            <Link style={{ textDecoration: "none" }}>
              <Image layout="fill" src={product.image} />
            </Link>
          </NextLink>
        </Box>
        <Box sx={{ padding: 2, height: 40 }}>
          <Typography
            component={"div"}
            align="center"
            variant="subtitle1"
            noWrap={true}
            color="textSecondary"
            sx={{ fontWeight: 500 }}
            gutterBottom
          >
            {product.name}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ flexDirection: "column" }}>
        <Divider sx={{ margin: "0 !important" }} light={true} flexItem={true} />
        <Stack
          sx={{ height: 48 }}
          alignItems="center"
          justifyContent="center"
          direction="row"
          spacing={2}
        >
          <Button
            sx={{
              borderRadius: "50%",
              width: 20,
              height: 20,
              minWidth: 20,
              backgroundColor: "#fa6e7c",
              outlineOffset: "5px",
              outline: "2px solid grey",
              "&:hover": {
                outlineOffset: "5px",
                outline: "2px solid grey",
                backgroundColor: "#fa6e7c",
              },
            }}
          />
          <Button
            sx={{
              borderRadius: "50%",
              width: 20,
              height: 20,
              minWidth: 20,
              backgroundColor: "#79b1ff",
              "&:hover": {
                outlineOffset: "5px",
                outline: "2px solid grey",
                backgroundColor: "#79b1ff",
              },
            }}
          />
          <Button
            sx={{
              borderRadius: "50%",
              width: 20,
              height: 20,
              minWidth: 20,
              backgroundColor: "#f79f6c",
              "&:hover": {
                outlineOffset: "5px",
                outline: "2px solid grey",
                backgroundColor: "#f79f6c",
              },
            }}
          />
          <Button
            sx={{
              borderRadius: "50%",
              width: 20,
              height: 20,
              minWidth: 20,
              backgroundColor: "#cdd5fc",
              "&:hover": {
                outlineOffset: "5px",
                outline: "2px solid grey",
                backgroundColor: "#cdd5fc",
              },
            }}
          />
        </Stack>
        <Divider sx={{ margin: "0 !important" }} light={true} flexItem={true} />
        <Stack
          sx={{ mt: 2 }}
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Chip
            size="small"
            variant="outlined"
            label={formatPrice(product.price)}
          />
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            fullWidth={true}
            onClick={() => addItemToCart(product)}
            endIcon={<AddShoppingCart />}
            aria-label={`Add ${product.name} to shopping cart`}
          >
            Į krepšelį
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default ListItem;
