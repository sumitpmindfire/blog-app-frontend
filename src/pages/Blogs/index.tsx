import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Container,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiGetBlogs, apiPostDeleteBlog } from "services/blogServices";
import { Blog } from "./types";
import { categoryOptions } from "configuration";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { useAuthContext } from "contexts/AuthContext";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { userData } = useAuthContext();
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchBlogs = async () => {
    try {
      const response = await apiGetBlogs({
        params: { category: selectedCategory },
      });
      setBlogList(response.data.blogs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectCategory: SelectInputProps<any>["onChange"] = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDeleteBlog = async (blogId: string) => {
    try {
      await apiPostDeleteBlog(blogId);
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
          }}
        >
          Blogs
        </Typography>

        <FormControl
          size="small"
          sx={{
            width: "200px",
          }}
        >
          <InputLabel id="category">Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleSelectCategory}
            label="Category"
            labelId="category"
            id="category"
            placeholder="Category"
            sx={{ textTransform: "capitalize" }}
          >
            {categoryOptions.map((option: string) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {option ? option.replaceAll("_", " ")?.toLowerCase() : "All"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        {blogList.length
          ? blogList.map((blogDetails) => (
              <Link to={`/blogs/${blogDetails._id}`} key={blogDetails._id}>
                <Card
                  sx={{
                    boxShadow: 0.5,
                    p: 2,
                  }}
                  key={blogDetails._id}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {blogDetails.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        flexShink: 0,
                      }}
                    >
                      <Typography variant="caption">
                        {blogDetails.category}
                      </Typography>

                      {userData?.role === "ADMIN" && (
                        <Button
                          variant="text"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteBlog(blogDetails._id);
                          }}
                          sx={{
                            p: 0,
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      "-webkitLineClamp": "1",
                      "-webkitBoxOrient": "vertical",
                    }}
                  >
                    {blogDetails.content}
                  </Typography>
                </Card>
              </Link>
            ))
          : "No blogs found"}
      </Box>
    </Container>
  );
};

export default Blogs;
