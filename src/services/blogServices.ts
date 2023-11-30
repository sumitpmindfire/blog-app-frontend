import axios, { AxiosRequestConfig } from "axios";
import {
  BLOG_DETAILS_API,
  BLOG_LIST_API,
  CREATE_BLOG_API,
  DELETE_BLOG_API,
} from "constants/apiUrls";
import { NewBlogFormFields } from "pages/Blogs/types";

const apiPostCreateBlog = (
  data: NewBlogFormFields,
  config: AxiosRequestConfig = {}
) =>
  axios.post(
    CREATE_BLOG_API,
    {
      ...data,
    },
    config
  );

const apiPostDeleteBlog = (blogId: string, config: AxiosRequestConfig = {}) =>
  axios.post(DELETE_BLOG_API(blogId), {}, config);

const apiGetBlogs = (config: AxiosRequestConfig = {}) =>
  axios.get(BLOG_LIST_API, config);

const apiGetBlogDetails = (blogId: string, config: AxiosRequestConfig = {}) =>
  axios.get(BLOG_DETAILS_API(blogId), config);

export { apiPostCreateBlog, apiGetBlogs, apiPostDeleteBlog, apiGetBlogDetails };
