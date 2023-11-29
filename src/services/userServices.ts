import axios, { AxiosRequestConfig } from "axios";
import { SignupForm, LoginForm } from "./types";
import { LOGIN_API, SIGNUP_API } from "constants/apiUrls";

const apiPostSignup = (data: SignupForm, config: AxiosRequestConfig = {}) =>
  axios.post(
    SIGNUP_API,
    {
      ...data,
    },
    config
  );

const apiPostLogin = (data: LoginForm, config: AxiosRequestConfig = {}) =>
  axios.post(
    LOGIN_API,
    {
      ...data,
    },
    config
  );

export { apiPostSignup, apiPostLogin };
