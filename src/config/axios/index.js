import axios from "axios";
import { responseInterceptor, errorInterceptor } from "./interceptors";

axios.defaults.withCredentials = true;

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export default Api;
