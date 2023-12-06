export const SIGNUP_API = `${process.env.REACT_APP_API_URL}/signup`;
export const LOGIN_API = `${process.env.REACT_APP_API_URL}/login`;

export const BLOG_LIST_API = `${process.env.REACT_APP_API_URL}/blogs`;
export const BLOG_DETAILS_API = (blogId: string) =>
  `${process.env.REACT_APP_API_URL}/blogs/${blogId}`;
export const CREATE_BLOG_API = `${process.env.REACT_APP_API_URL}/blogs`;
export const DELETE_BLOG_API = (blogId: string) =>
  `${process.env.REACT_APP_API_URL}/blog/${blogId}/delete`;

export const ADD_COMMENT_TO_BLOG = (blogId: string) =>
  `${process.env.REACT_APP_API_URL}/comment/${blogId}`;
export const GET_BLOG_COMMENTS = (blogId: string) =>
  `${process.env.REACT_APP_API_URL}/comment/${blogId}`;

export const GET_USERS_LIST = `${process.env.REACT_APP_API_URL}/users`;
export const POST_DEACTIVATE_USER = (userId: string) =>
  `${process.env.REACT_APP_API_URL}/users/${userId}/deactivate`;
export const POST_ACTIVATE_USER = (userId: string) =>
  `${process.env.REACT_APP_API_URL}/users/${userId}/activate`;
