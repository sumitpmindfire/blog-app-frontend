import React, { FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { apiPostCreateBlog } from "services/blogServices";
import { categoryOptions } from "configuration";
import { NewBlogFormFields } from "../types";

const CreateBlog = () => {
  const { register, handleSubmit, reset, control } =
    useForm<NewBlogFormFields>();
  const navigate = useNavigate();

  const handleCreateBlog: FormEventHandler = (e) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      try {
        const response = await apiPostCreateBlog(data);
        reset();
        if (response) {
          navigate("/blogs");
        }
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        onSubmit={handleCreateBlog}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 2.5,
          height: "100%",
        }}
      >
        <Typography variant="h5">Add a new Blog</Typography>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            width: "100%",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            {...register("title")}
            type="text"
            label="Title"
            size="small"
          />
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <FormControl fullWidth size="small">
                <InputLabel id="category">Category</InputLabel>
                <Select
                  {...field}
                  label="Category"
                  labelId="category"
                  id="category"
                  placeholder="Category"
                >
                  {categoryOptions.map((option: string) => (
                    <MenuItem value={option}>
                      {option.replaceAll("_", " ")}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Box>

        <TextField
          fullWidth
          multiline
          rows={10}
          {...register("content")}
          label="Content"
        />

        <Button type="submit" variant="contained">
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default CreateBlog;
