// React
import React from "react";
import { useRouter } from "next/router";

// Next
import Image from "next/image";

import { addToCart } from "../../store/slices/cart";

import { formatPrice } from "../../utils";

import { TabPanel, TabList, TabContext } from "@mui/lab";

import { Box, Tab, Paper, Avatar } from "@mui/material";

// Material-UI
import Stack from "@mui/material/Stack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import axios from "../../store/axios";

// Redux
import { selectProduct } from "../../store/slices/product";

import { getProduct } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../../store";

import Fab from "@mui/material/Fab";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductPage({ product }) {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  //   if (product.loading) {
  //     return <div>Loading...</div>;
  //   }

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <Container sx={{ py: 12 }}>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          {product.image && (
            <>
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                layout="responsive"
              />
              <ImageList
                sx={{
                  gridAutoFlow: "column",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(160px,1fr)) !important",
                  gridAutoColumns: "minmax(160px, 1fr)",
                }}
                variant="standard"
              >
                <ImageListItem>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    layout="fixed"
                  />
                </ImageListItem>
                <ImageListItem>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    layout="fixed"
                  />
                </ImageListItem>
                <ImageListItem>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    layout="fixed"
                  />
                </ImageListItem>
                <ImageListItem>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    layout="fixed"
                  />
                </ImageListItem>
              </ImageList>
            </>
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          <List>
            <ListItem sx={{ gap: 1 }}>
              <Typography variant="h5">{product.name}</Typography>
              <Rating
                name="contolled"
                value={product.rating}
                readOnly={true}
                onChange={(event, newValue) => {}}
              />
            </ListItem>
            <ListItem>
              <Typography variant="subtitle1">{product.description}</Typography>
            </ListItem>
            <ListItem divider={true}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Quantity</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Chip
                    size="small"
                    label={
                      product.quantity > 0
                        ? `${product.quantity} in stock`
                        : "Out of stock"
                    }
                    color={product.quantity > 0 ? "success" : "error"}
                  />
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Typography variant="h6">
                    {formatPrice(product.price)}
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Stack spacing={2} direction="row">
                    <TextField
                      size="small"
                      type="number"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      value={1}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Button
                      onClick={() => {
                        addItemToCart(product);
                      }}
                      fullWidth
                      variant="contained"
                    >
                      <AddShoppingCartIcon />
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
        {/* {product.data.title} */}
        {/* <pre>{JSON.stringify(product, 4)}</pre> */}
      </Grid>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              backgroundColor: "#868686",
              borderColor: "divider",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Reviews" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Paper style={{ padding: "40px 20px" }}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>Lorem Ispum</h4>
                  <p style={{ textAlign: "left" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean luctus ut est sed faucibus. Duis bibendum ac ex
                    vehicula laoreet. Suspendisse congue vulputate lobortis.
                    Pellentesque at interdum tortor. Quisque arcu quam,
                    malesuada vel mauris et, posuere sagittis ipsum. Aliquam
                    ultricies a ligula nec faucibus. In elit metus, efficitur
                    lobortis nisi quis, molestie porttitor metus. Pellentesque
                    et neque risus. Aliquam vulputate, mauris vitae tincidunt
                    interdum, mauris mi vehicula urna, nec feugiat quam lectus
                    vitae ex.{" "}
                  </p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    posted 1 minute ago
                  </p>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  return await axios
    .get(`/products/${slug}`)
    .then((res) => res.data)
    .then((data) => {
      return {
        props: {
          product: data,
        },
      };
    })
    .catch((_) => {
      return {
        notFound: true,
      };
    });
}

// This gets called on every request
// export async function getServerSideProps({ store, query }) {
//   await store.dispatch(getProduct(query.slug));
// }

export default ProductPage;
