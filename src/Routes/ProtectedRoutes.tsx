import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "contexts/AuthContext";
import { Box } from "@mui/material";
import Header from "containers/Header";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuthContext();
  return isLoggedIn ? (
    <>
      <Header />
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
