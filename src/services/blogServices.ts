import axios, { AxiosRequestConfig } from "axios";
import {
  ADD_COMMENT_TO_BLOG,
  BLOG_DETAILS_API,
  BLOG_LIST_API,
  CREATE_BLOG_API,
  DELETE_BLOG_API,
  GET_BLOG_COMMENTS,
} from "constants/apiUrls";
import { NewBlogFormFields } from "pages/Blogs/types";
import { CommentForm } from "./types";

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

const apiPostAddComment = (
  blogId: string,
  data: CommentForm,
  config: AxiosRequestConfig = {}
) => axios.post(ADD_COMMENT_TO_BLOG(blogId), data, config);

const apiGetComments = (blogId: string, config: AxiosRequestConfig = {}) =>
  axios.get(GET_BLOG_COMMENTS(blogId), config);

const apiGetBlogs = (config: AxiosRequestConfig = {}) =>
  axios.get(BLOG_LIST_API, config);

const apiGetBlogDetails = (blogId: string, config: AxiosRequestConfig = {}) =>
  axios.get(BLOG_DETAILS_API(blogId), config);

export {
  apiPostCreateBlog,
  apiGetBlogs,
  apiPostDeleteBlog,
  apiGetBlogDetails,
  apiPostAddComment,
  apiGetComments,
};
