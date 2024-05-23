import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL ?? "http://localhost:3333",
});

console.log("apr",process.env.NEXT_PUBLIC_BASE_API_URL);



// api.interceptors.request.use(async (config) => {
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   return config;
// });
