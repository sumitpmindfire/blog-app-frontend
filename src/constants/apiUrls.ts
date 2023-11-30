export const SIGNUP_API = `${process.env.REACT_APP_API_URL}/signup`;
export const LOGIN_API = `${process.env.REACT_APP_API_URL}/login`;

export const BLOG_LIST_API = `${process.env.REACT_APP_API_URL}/blogs`;
export const BLOG_DETAILS_API = (blogId: string) =>
  `${process.env.REACT_APP_API_URL}/blogs/${blogId}`;
export const CREATE_BLOG_API = `${process.env.REACT_APP_API_URL}/blogs`;
export const DELETE_BLOG_API = (blogId: string) =>
  `${process.env.REACT_APP_API_URL}/blog/${blogId}/delete`;
