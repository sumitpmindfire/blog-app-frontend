import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import "./index.css";
import { useAuthContext } from "contexts/AuthContext";

const Header = () => {
  const { logout, userData } = useAuthContext();
  const routes = [
    {
      label: "Blogs",
      href: "/blogs",
      end: true,
      visible: true,
    },
    {
      label: "Create Blog",
      href: "/blogs/create",
      visible: true,
    },
    {
      label: "All Users",
      href: "/admin/users",
      visible: userData?.role === "ADMIN",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
        gap: 2,
      }}
      className="navbar"
    >
      {routes.map(
        (routeData) =>
          routeData.visible && (
            <NavLink to={routeData.href} end={routeData.end}>
              {routeData.label}
            </NavLink>
          )
      )}

      <Button
        onClick={logout}
        sx={{
          marginLeft: "auto",
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Header;
