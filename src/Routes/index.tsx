import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Signup from "pages/Auth/Signup";
import Login from "pages/Auth/Login";
import Users from "pages/Users";
import Blogs from "pages/Blogs";
import BlogDetails from "pages/BlogDetails";
import CreateBlog from "pages/Blogs/CreateBlog";
import { useAuthContext } from "contexts/AuthContext";
import { setupAxiosInterceptor } from "services/networkService";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  const { logout } = useAuthContext();
  setupAxiosInterceptor({ logout });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:blogId" element={<BlogDetails />} />
          <Route path="/blogs/create" element={<CreateBlog />} />
          <Route path="/admin" element={<AdminRoutes />}>
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
