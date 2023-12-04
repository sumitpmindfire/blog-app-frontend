import React, { FormEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { apiPostLogin } from "services/userServices";
import { LoginForm } from "services/types";
import { useAuthContext } from "contexts/AuthContext";

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { setUserData, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      try {
        setIsLoggingIn(true);
        const response = await apiPostLogin(data);
        if (response) {
          Cookies.set("user", JSON.stringify(response.data), { expires: 7 });
          setUserData(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoggingIn(false);
      }
    })();
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/blogs");
  }, [isLoggedIn]);

  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2.5,
          height: "100%",
        }}
      >
        <Typography variant="h4">Login</Typography>
        <TextField
          {...register("username")}
          type="text"
          label="Username"
          size="small"
        />
        <TextField
          {...register("password")}
          type="password"
          label="Password"
          size="small"
        />
        <Button type="submit" variant="contained" disabled={isLoggingIn}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
