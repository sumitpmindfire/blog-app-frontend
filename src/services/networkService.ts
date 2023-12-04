import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const setupAxiosInterceptor = ({ logout }: { logout: Function }) => {
  axios.interceptors.request.use(
    function (config) {
      const tokenData = Cookies.get("user")
        ? JSON.parse(Cookies.get("user") as string)
        : {};
      if (tokenData) {
        config.headers["Authorization"] = `Bearer ${tokenData?.accessToken}`;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      if (
        response?.data?.message &&
        typeof response?.data?.message === "string"
      )
        toast.success(response.data.message);
      return response;
    },
    function (error) {
      if (
        Cookies.get("user") &&
        error.response &&
        error.response.status === 401
      )
        logout();
      const errorMessage = error?.response?.data?.message || error.message;
      if (errorMessage && typeof errorMessage === "string")
        toast.error(errorMessage);
      return Promise.reject(error);
    }
  );
};
