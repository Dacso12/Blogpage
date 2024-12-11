import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Footer from "../Reusable/Footer";

function AddBlog() {
  const navigate = useNavigate();
  const data = { title: "", body: "", img: "" };
  const [blogs, setBlogs] = useState(data);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const { isAuthenticated } = useKindeAuth();

  const handleChange = (e) => {
    setBlogs({ ...blogs, [e.target.name]: e.target.value });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); 
    if (blogs.title === "" || blogs.body === "") {
      return; 
    }

    axios
      .post("https://jsonplaceholder.typicode.com/posts", blogs)
      .then((response) => {
        console.log("Response:", response.data);
        navigate("/", { state: { newPost: response.data } });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div>
      {isAuthenticated ? (
        <Container maxWidth="sm">
          <Box sx={{ padding: 3, marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
              Create a New Blog
            </Typography>
            <form onSubmit={handleSumbit}>
              <TextField
                label="Title"
                fullWidth
                variant="outlined"
                margin="normal"
                name="title"
                value={blogs.title}
                onChange={handleChange}
                error={isSubmitted && blogs.title === ""}  
                helperText={isSubmitted && blogs.title === "" ? "Title is required" : ""}
              />
              <TextField
                label="Blog detalis"
                fullWidth
                variant="outlined"
                margin="normal"
                name="body"
                multiline
                rows={4}
                value={blogs.body}
                onChange={handleChange}
                error={isSubmitted && blogs.body === ""}  
                helperText={isSubmitted && blogs.body === "" ? " Blog detalis is required" : ""}
              />
              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                style={{ display: 'block' }} 
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  value={blogs.img}
                  onChange={handleChange}
                  multiple
                />
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ display: 'block', marginTop: '10px' }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Container>
      ) : (
        <h1>You are not logged in</h1>
      )}
      <Footer/>
    </div>
  );
}

export default AddBlog;