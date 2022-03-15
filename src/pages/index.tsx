import type { NextPage } from "next";

import {
  Grid,
  Button,
  Typography,
  Container,
  Card,
  CardActions,
  CardContent,
  Box,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
  NoSsr,
} from "@mui/material";

import { motion, useViewportScroll, useTransform } from "framer-motion";

// Import Swiper React components
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import {
  EffectCreative,
  EffectCoverflow,
  Navigation,
  Pagination,
  Parallax,
  Lazy,
} from "swiper";

import Collection from "../components/Collection";

import { fetchUser } from "../store/slices/auth";

// Next
import Image from "next/image";
import NextLink from "next/link";

// Material-UI components
import Fab from "@mui/material/Fab";
import Rating from "@mui/material/Rating";

// Material-UI icons
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Stack from "@mui/material/Stack";

// Redux store, actions, reducers
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../store";
import {
  fetchCategories,
  selectProducts,
  selectCategories,
} from "../store/slices/product";
import { getFeaturedProducts } from "../actions";

import { addToCart } from "../store/slices/cart";

// Routing
import Link from "@mui/material/Link";

import Footer from "@/components/app/Footer";

import React, { RefAttributes } from "react";

// import { Slide } from "react-slideshow-image";

import SnapContainer from "../components/SnapContainer";
import Section from "../components/Section";

import StoreLayout from "../layouts/StoreLayout";

import API from "../actions";

import ImageMagnify from "../components/ImageMagnify";

// App
import { formatPrice } from "../../lib/utils";

// interface Props {
//   categories?: any[];
// }

const RefSwiper: React.FunctionComponent<
  SwiperProps & RefAttributes<SwiperCore>
> = Swiper;

function Slide({ current, description, active, next }) {
  return (
    <>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
          width: 260,
          height: 350,
        })}
        className="slider-triangle"
      >
        <Image
          layout="fill"
          objectFit="cover"
          className="slider-image"
          src="https://source.unsplash.com/random"
          quality={75}
          priority={true}
          placeholder="blur"
          blurDataURL="https://dri.es/files/images/blog/lazy-loading-images-placeholder-1.jpg"
        />
        <Typography
          sx={{
            position: "absolute",
            zIndex: 99,
            top: 190,
          }}
          noWrap={true}
        >
          0 out of 0 images
        </Typography>
        <Button
          sx={{ zIndex: 99, position: "relative" }}
          color="primary"
          variant="contained"
        >
          Peržiūrėti
        </Button>
      </Box>

      {(active || next) && (
        <Box
          sx={{
            width: 364,
            height: 490,
          }}
          className="slider-image-wrapper"
        >
          <ImageMagnify height={490}>
            <Image
              layout="fill"
              className="slider-image"
              objectFit="cover"
              src="https://source.unsplash.com/random"
              quality={75}
              priority={true}
              placeholder="blur"
              blurDataURL="https://dri.es/files/images/blog/lazy-loading-images-placeholder-1.jpg"
            />
          </ImageMagnify>
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          left: "calc(50% - 175px)",
          top: "50%",
          transform: "translate(-50%, -50%, 0)",
          userSelect: "none",
          pointerEvents: "none",
          padding: 3,
          zIndex: 99,
        }}
        className="collection"
      >
        <Typography variant="h3" component="div" sx={{ fontWeight: 600 }}>
          {current}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontSize: 21 }}>
          {description}
        </Typography>
      </Box>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
          width: 260,
          height: 350,
        })}
        className="sliders-next"
      >
        <Stack direction="column">
          <Typography>NEXT</Typography>
          <Typography variant="h5">{current}</Typography>
        </Stack>
      </Box>
    </>
  );
}

const HomePage: NextPage = () => {
  const products = useSelector(selectProducts);

  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();

  // fetch user on client side
  dispatch(fetchUser());

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box
        sx={{
          marginTop: "112px",
        }}
      >
        <RefSwiper
          grabCursor={true}
          effect={"slide"}
          // coverflowEffect={{
          //   rotate: 40,
          //   stretch: 0,
          //   depth: 50,
          //   modifier: 1,
          //   slideShadows: false,
          // }}
          spaceBetween={0}
          hashNavigation={{
            watchState: true,
          }}
          initialSlide={0}
          slidesPerGroup={1}
          slidesPerView={2}
          centeredSlides
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[EffectCoverflow, Lazy, Navigation]}
          className="mySwiper"
        >
          {/* <Image
            slot="container-start"
            className="parallax-bg"
            priority={true}
            data-swiper-parallax="-23%"
            src="/img/WallpaperDog-10832794.jpg"
            layout="fill"
          /> */}
          <SwiperSlide data-hash="slide1">
            {({ isActive, isNext }) => (
              <Slide
                active={isActive}
                next={isNext}
                current="Slide 1"
                description="1 drabužių kolekcija"
              />
            )}
          </SwiperSlide>
          <SwiperSlide data-hash="slide2">
            {({ isActive, isNext }) => (
              <Slide
                active={isActive}
                next={isNext}
                current="Slide 2"
                description="STAR drabužių kolekcija"
              />
            )}
          </SwiperSlide>
          <SwiperSlide data-hash="slide3">
            {({ isActive, isNext }) => (
              <Slide
                active={isActive}
                next={isNext}
                current="Slide 3"
                description="3 drabužių kolekcija"
              />
            )}
          </SwiperSlide>
        </RefSwiper>
      </Box>

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
            {categories ? (
              categories.map((category, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={
                      index % 2 == 0 && index === categories.length - 1 ? 12 : 6
                    }
                    md={
                      index % 2 == 0 && index === categories.length - 1 ? 12 : 6
                    }
                    lg={
                      index % 2 == 0 && index === categories.length - 1 ? 12 : 6
                    }
                    key={category._id}
                  >
                    <NextLink
                      prefetch={false}
                      href={`/catalog/${category.slug}`}
                      passHref
                    >
                      <Link underline="none" className="linka0">
                        <Card
                          raised={true}
                          sx={{
                            padding: 0,
                            minHeight: 300,
                            position: "relative",
                          }}
                        >
                          <CardContent sx={{ padding: "0 !important" }}>
                            {category.thumbnail && (
                              <Box
                                sx={{
                                  height: 300,
                                  position: "relative",
                                }}
                              >
                                <Image
                                  layout="fill"
                                  objectFit="cover"
                                  src={category.thumbnail}
                                  quality={100}
                                  placeholder="blur"
                                  blurDataURL="https://dri.es/files/images/blog/lazy-loading-images-placeholder-1.jpg"
                                />
                              </Box>
                            )}
                            <Paper
                              className="link-titlea0"
                              square={true}
                              sx={{
                                position: "absolute",
                                padding: 1,
                                bottom: "0",
                                left: "50%",
                                transform: "translate(-50%, 0)",
                              }}
                            >
                              {category.name}
                            </Paper>
                          </CardContent>
                        </Card>
                      </Link>
                    </NextLink>
                  </Grid>
                );
              })
            ) : (
              <div>No products found</div>
            )}
          </Grid>
        </Container>
      </Section>

      {/* <ParallaxBanner
        layers={[
          { image: "/img/banner-background.jpg", speed: -20 },
          {
            speed: -15,
            children: (
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-8xl text-white font-thin">
                  Parallax scrolling!
                </h1>
              </div>
            ),
          },
          { image: "/img/banner-foreground.png", speed: -16 },
        ]}
        className="aspect-[2/1]"
      /> */}

      {/* <Section id={2}>
        <Container
          style={{ height: "100%", display: "flex", alignItems: "center" }}
        >
          <Grid container spacing={8}>
            <Grid
              item
              xs={12}
              md={4}
              order={{ xs: 1, md: 2 }}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  color: "#fff",
                }}
              >
                <Typography component={"div"}>
                  <Box sx={{ textTransform: "uppercase", fontSize: 32, mb: 2 }}>
                    Lorem ipsum
                  </Box>
                  <Divider />
                  <Box sx={{ fontSize: 16, mt: 2 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec nec urna sapien. Quisque vehicula arcu dolor, in
                    tincidunt metus dignissim nec. Suspendisse interdum ligula
                    blandit odio convallis, eget dictum arcu tempor. Donec a
                    diam vitae ipsum venenatis iaculis. Ut id rhoncus tellus,
                    sit amet placerat tortor. Nunc placerat finibus viverra.
                    Quisque elementum facilisis ipsum nec efficitur. Curabitur
                    euismod laoreet enim, vel blandit lectus facilisis sed.
                  </Box>
                  <Box sx={{ marginTop: 3 }}>
                    <Button variant="outlined" color="secondary">
                      Discover
                    </Button>
                  </Box>
                </Typography>
              </Box>
            </Grid>
            <Grid
              order={{ xs: 2, md: 1 }}
              item
              xs={12}
              md={8}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Image
                src="https://via.placeholder.com/475/633"
                width={475}
                height={633}
              />
            </Grid>
          </Grid>
        </Container>
      </Section> */}

      {/* <Grid container>
        <Box width={"100%"}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Categories"></Tab>
            <Tab label="Latest"></Tab>
            <Tab label="New (0)"></Tab>
            <Tab label="Top"></Tab>
          </Tabs>
        </Box> */}

      {/* {value === 0 && (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Topic</TableCell>
                  <TableCell align="right">Replies</TableCell>
                  <TableCell align="right">Views</TableCell>
                  <TableCell align="right">Activity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Name
                  </TableCell>
                  <TableCell align="right">0</TableCell>
                  <TableCell align="right">0</TableCell>
                  <TableCell align="right">0m</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )} */}

      {/* <Box
          component={Paper}
          elevation={1}
          square={true}
          variant="outlined"
          p={2}
          width={"100%"}
        >
          Topic
        </Box> */}
      {/* <Container>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper elevation={1} className="p-9">
                <Typography align="center" variant="h6">
                  <ShoppingCartIcon className="icon-block" />
                  Free Shipping
                </Typography>
                <Typography align="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas rutrum aliquam odio, nec bibendum velit. Nam at est
                  ut 125.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={1} className="p-9">
                <Typography align="center" variant="h6">
                  <ClockIcon className="icon-block" />
                  24/7 Hour Support
                </Typography>
                <Typography align="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas rutrum aliquam odio, nec bibendum velit. Nam at est
                  ut 125.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={1} className="p-9">
                <Typography align="center" variant="h6">
                  <CashIcon className="icon-block" />
                  Cryptocurrency Enabled
                </Typography>
                <Typography align="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas rutrum aliquam odio, nec bibendum velit. Nam at est
                  ut 125.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container> */}

      {/* <Grid container>
          <Grid item md={12}>
            <Box m={3} p={3}>
              <Typography align="center" variant="h4">
                Featured Products
              </Typography>
            </Box>
          </Grid>
        </Grid> */}

      {/* <Grid container>
        <Grid item md={12}> */}
      {/* {productsState.loading && (
              <Box alignContent="center" alignItems="center">
                <CircularProgress disableShrink />
                <Typography align="center">Loading...</Typography>
              </Box>
            )} */}

      {/* {productsState.error && <div>{productsState.error}</div>}

            {productsState.products &&
              productsState.products.map(function (item, index) {
                return (
                  <div className="card-wrapper" key={index}>
                    <Product item={item} />
                  </div>
                );
              })} */}
      {/* </Grid> */}
      {/* </Grid> */}
    </>
  );
};

// export default function Home() {
//   // const dispatch = useDispatch();
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   // useEffect(() => {
//   //   dispatch(getProducts());
//   // }, [dispatch]);

//   // const productsState = useSelector((state) => {
//   //   console.log(state.products);
//   //   return state.products;
//   // });
// }

// This gets called on every request
export const getServerSideProps = wrapper.getServerSideProps(
  // @ts-ignore
  (store) => async (context) => {
    await store.dispatch(fetchCategories());
    await store.dispatch(API.initials());
  }
);

// Home.getLayout = function getLayout(page) {
//   return <StoreLayout>{page}</StoreLayout>;
// };

export default HomePage;
