import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetBlogDetails } from "services/blogServices";
import { Box, Typography, Container } from "@mui/material";
import { Blog } from "../Blogs/types";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blogDetails, setBlogDetails] = useState<Blog | null>(null);

  const fetchBlogDetails = async () => {
    try {
      if (blogId) {
        const response = await apiGetBlogDetails(blogId);
        setBlogDetails(response.data.blogDetails);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [blogId]);

  return (
    blogDetails && (
      <Container maxWidth="md">
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
            <Typography variant="caption">{blogDetails.category}</Typography>
          </Box>
        </Box>

        <Typography>{blogDetails.content}</Typography>

        <Typography
          variant="caption"
          component="p"
          sx={{
            mt: 5,
          }}
        >{`${blogDetails?.comments?.length || 0} comments`}</Typography>
      </Container>
    )
  );
};

export default BlogDetails;
