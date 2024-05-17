import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// api.interceptors.request.use(async (config) => {
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   return config;
// });
