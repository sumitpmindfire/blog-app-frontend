import React, { FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { apiPostLogin } from "services/userServices";
import { LoginForm } from "services/types";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit, reset } = useForm<LoginForm>();

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      try {
        const response = await apiPostLogin(data);
        reset();
        if (response) {
          Cookies.set("user", JSON.stringify(response.data), { expires: 7 });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

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
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
