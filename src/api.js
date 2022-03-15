import axios from "axios";

// import { writeFileSync } from 'fs'

// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// writeFileSync(__dirname + '/data.log', JSON.stringify(process.env) );

const getBaseURL = () => {
  return typeof window === "undefined" ? `${process.env.BASE_URL}/api` : "/api";
};

const API = axios.create({ baseURL: getBaseURL() });

// distinguish between server and client environment
if (typeof window !== "undefined") {
  API.interceptors.request.use((req) => {
    if (localStorage.getItem("auth.local")) {
      req.headers.Authorization = `Bearer ${localStorage.getItem(
        "auth.local"
      )}`;
    }

    return req;
  });
}

export const site = () => API.get("/").then((res) => res?.data);

export const categories = () => API.get("/categories").then((res) => res?.data);

export const fetchProductsByCategory = (category) =>
  API.get("/products", {
    params: {
      category,
    },
  }).then((res) => res?.data);

export const login = (username, password) =>
  API.post("/auth/login", {
    username,
    password,
  }).then((res) => {
    return res.data;
  });

export const register = (data) =>
  API.post("/auth/register", {
    email: data.email,
    username: data.username,
    password: data.password,
    privacy_policy: data.privacy_policy,
  });

export const fetchUser = () => API.get("/auth/user").then((res) => res?.data);

export const fetchProducts = () => API.get("/products");

export const fetchFeaturedProducts = () => API.get("/products/featured");

export const fetchProduct = (slug) => API.get(`/products/${slug}`);

export const fetchCategories = () => API.get("/categories");

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
