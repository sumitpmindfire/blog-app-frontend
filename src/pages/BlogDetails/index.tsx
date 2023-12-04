import React, { FormEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  apiGetBlogDetails,
  apiGetComments,
  apiPostAddComment,
} from "services/blogServices";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Card,
  Stack,
} from "@mui/material";
import { CommentForm } from "services/types";
import { Blog } from "../Blogs/types";
import { Comment } from "./types";
import { getFormattedDate } from "utilities/functions";

const BlogDetails = () => {
  const { blogId } = useParams();
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const [blogDetails, setBlogDetails] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const fetchBlogDetails = async () => {
    try {
      if (blogId) {
        setIsLoading(true);
        const response = await apiGetBlogDetails(blogId);
        setBlogDetails(response.data.blogDetails);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogComments = async () => {
    try {
      if (blogId) {
        const response = await apiGetComments(blogId);
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment: FormEventHandler = (e) => {
    e.preventDefault();
    handleSubmit(async (data) => {
      if (blogId) {
        try {
          await apiPostAddComment(blogId, data);
          await fetchBlogComments();
          reset();
        } catch (error) {
          console.error(error);
        }
      }
    })();
  };

  useEffect(() => {
    fetchBlogDetails();
    fetchBlogComments();
  }, [blogId]);

  if (isLoading) return <Box>Loading...</Box>;

  return (
    blogDetails && (
      <Container maxWidth="md">
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
            variant="h3"
          >
            {blogDetails.title}
          </Typography>

          <Typography variant="caption">{blogDetails.category}</Typography>

          <Typography>{blogDetails.content}</Typography>
        </Box>

        <Typography
          variant="caption"
          component="p"
          sx={{
            mt: 5,
          }}
        >{`${comments?.length || 0} comments`}</Typography>

        <Box
          component="form"
          onSubmit={handleAddComment}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <TextField
            {...register("text", {
              required: true,
            })}
            fullWidth
            multiline
            placeholder="Add a comment..."
          />
          <Button type="submit" variant="contained" disabled={isAddingComment}>
            Comment
          </Button>

          <Stack
            sx={{
              gap: 2,
              width: "100%",
            }}
          >
            {comments.map((comment) => (
              <Card sx={{ width: "100%", p: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    flexShink: 0,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        whiteSpace: "pre-line",
                        fontWeight: 600,
                      }}
                      component="span"
                    >
                      @{comment.createdBy.username}{" "}
                    </Typography>
                    <Typography
                      sx={{
                        whiteSpace: "pre-line",
                      }}
                      component="span"
                    >
                      said {comment.text}
                    </Typography>
                  </Box>

                  <Typography variant="caption">
                    {comment.createdAt &&
                      getFormattedDate(new Date(comment.createdAt))}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Stack>
        </Box>
      </Container>
    )
  );
};

export default BlogDetails;
