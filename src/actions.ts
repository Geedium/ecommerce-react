import * as types from "./types";
import * as api from "./api";

import { AxiosError } from "axios";

// import { productSlice, productsSlice } from "./store";
import {
  setProduct,
  setProducts,
  setCategories,
  setMinPrice,
  setMaxPrice,
} from "./store/slices/product";
import { logout } from "./store/slices/auth";
import { setSiteData } from "./store/slices/site";

export default class API {
  static register(data, cb, ecb) {
    return async function (dispatch) {
      await api
        .register(data)
        .then(() => {
          cb();
        })
        .catch((err) => {
          ecb(err);
        });
    };
  }
  static getProductsByCategory(categoryName) {
    return async function (dispatch) {
      dispatch(setProducts([]));
      dispatch(setMinPrice(0));
      dispatch(setMaxPrice(0));

      await api
        .fetchProductsByCategory(categoryName)
        .then((data) => {
          if (data.products && data.products.length > 0) {
            dispatch(setProducts(data.products));
          }
          if (data.min_price && data.max_price) {
            dispatch(setMinPrice(data.min_price));
            dispatch(setMaxPrice(data.max_price));
          }
        })
        .catch((error) => {
          console.log("Error: " + error.message);
        });
    };
  }
  static initials() {
    return async function (dispatch) {
      await api
        .site()
        .then((data) => {
          dispatch(setSiteData(data));
        })
        .catch((_) => {});
    };
  }
  static categories() {
    return async function (dispatch) {
      await api
        .categories()
        .then((data) => {
          dispatch(setCategories(data));
        })
        .catch((_) => {});
    };
  }
}

export const getProducts = () => async (dispatch) => {
  dispatch({ type: types.PRODUCTS_HALT });

  await api
    .fetchProducts()
    .then((res) => dispatch({ type: types.FETCH_ALL, payload: res.data }))
    .catch((error) =>
      dispatch({ type: types.PRODUCTS_ERROR, payload: error.message })
    );
};

// export const login =
//   (
//     data: {
//       username: any;
//       password: any;
//     },
//     cb?: Function,
//     ecb?: Function
//   ) =>
//   (dispatch) => {
//     console.log("Logging in...");
//     api
//       .login(data?.username, data?.password)
//       .then((tokens) => {
//         dispatch(setUserToken(tokens?.access_token));
//       })
//       .then(() => {
//         dispatch(fetchUser());
//       })
//       .then(() => {
//         cb();
//       })
//       .catch((err) => {
//         ecb(err);
//       });
//   };

// export const doLogout = () => (dispatch) => {
//   dispatch(logout({}));
// };

// export const fetchUser = () => async (dispatch) => {
//   // distinguish between server and client environment
//   if (typeof window !== "undefined") {
//     if (!localStorage.getItem("auth.local")) {
//       return;
//     }
//   }

//   await api
//     .fetchUser()
//     .then((data) => {
//       dispatch(setUser(data));
//     })
//     .catch((reason: AxiosError) => {
//       if (reason.response!.status === 401) {
//         dispatch(doLogout());
//       }
//     });
// };

export const getFeaturedProducts = () => async (dispatch) => {
  await api
    .fetchFeaturedProducts()
    .then((res) => res.data)
    .then((data) => {
      dispatch(setProducts(data));
    })
    .catch((error) => {
      console.log("Error: " + error.message);
    });
};

export const getProduct = (slug) => async (dispatch) => {
  await api
    .fetchProduct(slug)
    .then((res) => res.data)
    .then((data) => {
      dispatch(setProduct(data));
    })
    .catch((error) => {
      console.log("Error: " + error.message);
    });
};
