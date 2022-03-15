import { wrapper } from "../../store";

import { useSelector } from "react-redux";

import { selectProducts } from "../../store/slices/product";

import { Container, Grid, Slider, Typography } from "@mui/material";

// Filters
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import ListItem from "@/components/ListItem";

import Section from "@/components/Section";

import { selectPriceRange } from "../../store/slices/product";

import { Alert } from "@mui/material";

import { Search } from "@mui/icons-material";

import API from "../../actions";

import type Product from "../../types/product";

function Catalog({ title }) {
  const products: Product[] = useSelector(selectProducts);

  const prices: { min?: number; max?: number } = useSelector(selectPriceRange);

  return (
    <Section
      id={2}
      expand={true}
      sx={{
        flex: "1 1",
      }}
    >
      <Container
        sx={{
          display: "flex",
          paddingBottom: 3,
        }}
      >
        <Grid style={{ marginTop: 8, marginBottom: 8 }} container spacing={3}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography
              variant="h6"
              sx={{ padding: 1, textTransform: "uppercase" }}
              component="h2"
            >
              Filtruoti pagal
            </Typography>
            <FormControl margin="normal" variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Search
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Typography>
              Price ({prices.min} - {prices.max})
            </Typography>
            <Slider
              aria-label="Small steps"
              defaultValue={prices.min}
              step={1}
              marks
              min={prices.min}
              max={prices.max}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={9} lg={9}>
            <Typography variant="h5" sx={{ padding: 1 }} component="h1">
              {title}
            </Typography>
            <Grid container spacing={3}>
              {products && products.length > 0 ? (
                products.map((product) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={product._id}>
                      <ListItem product={product} />
                    </Grid>
                  );
                })
              ) : (
                <Alert sx={{ my: 2 }} severity="info">
                  No products found in this category.
                </Alert>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  // @ts-ignore
  (store) =>
    // @ts-ignore
    async ({ query }) => {
      await store.dispatch(API.getProductsByCategory(query.slug));
      await store.dispatch(API.categories());
      await store.dispatch(API.initials());

      const { categories } = store.getState().product;

      var title = "Product List";

      const category = categories.find((c) => c.slug == query.slug);

      if (category && category.name) {
        title = category.name;
      }

      return {
        props: {
          title,
        },
      };
    }
);

export default Catalog;
