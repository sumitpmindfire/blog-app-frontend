import axios, { AxiosRequestConfig } from "axios";
import { SignupForm, LoginForm } from "./types";
import {
  GET_USERS_LIST,
  LOGIN_API,
  POST_ACTIVATE_USER,
  POST_DEACTIVATE_USER,
  SIGNUP_API,
} from "constants/apiUrls";

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

const apiGetUsers = (config: AxiosRequestConfig = {}) =>
  axios.get(GET_USERS_LIST, config);

const apiPostActivateUser = (
  userId: string,
  data: any = {},
  config: AxiosRequestConfig = {}
) =>
  axios.post(
    POST_ACTIVATE_USER(userId),
    {
      ...data,
    },
    config
  );

const apiPostDeactivateeUser = (
  userId: string,
  data: any = {},
  config: AxiosRequestConfig = {}
) =>
  axios.post(
    POST_DEACTIVATE_USER(userId),
    {
      ...data,
    },
    config
  );

export {
  apiPostSignup,
  apiPostLogin,
  apiGetUsers,
  apiPostActivateUser,
  apiPostDeactivateeUser,
};
