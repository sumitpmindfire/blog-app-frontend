import axios from "axios";
import Cookies from "js-cookie";

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
      return response;
    },
    function (error) {
      if (error.response && error.response.status === 401) logout();
      return Promise.reject(error);
    }
  );
};
