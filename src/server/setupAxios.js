import axios from "axios";

import { toast } from "vue3-toastify";

const baseURL = import.meta.env.VITE_APP_API_URL;

export default function Api() {
  const token = localStorage.getItem("token");

  const appClient = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
      "Accept-Language": "en",
      "Content-Language": "en",
    },
  });
  appClient.interceptors.response.use(
    (response) => {
      if (response?.data?.message) {
        toast.success(response.data.message);
      }
      return response;
    },
    (error) => {
      if (error.response) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.pathname = "/auth";
        }
      }

      return Promise.reject(error.response);
    },
  );

  return appClient;
}
