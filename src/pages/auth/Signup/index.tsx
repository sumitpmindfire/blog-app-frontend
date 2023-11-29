import React, { FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { apiPostSignup } from "services/userServices";
import { SignupForm } from "services/types";

const Signup = () => {
  const { register, handleSubmit } = useForm<SignupForm>();
  const navigate = useNavigate();

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      try {
        await apiPostSignup(data);
        navigate("/login");
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
        <Typography variant="h4">Sign Up</Typography>
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
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
