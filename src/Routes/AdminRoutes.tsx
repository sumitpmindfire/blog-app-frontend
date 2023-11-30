import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "contexts/AuthContext";

const AdminRoutes = () => {
  const { userData } = useAuthContext();
  return userData?.role === "ADMIN" ? <Outlet /> : <div>Unauthorised</div>;
};

export default AdminRoutes;
