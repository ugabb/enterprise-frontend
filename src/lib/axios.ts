import axios from "axios";
import { env } from "../env";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return config;
});
