import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./footer/Footer";
function UpdateBlog() {
  const { id } = useParams();
  const data = { title: "", body: "" };
  const [post, setPost] = useState(data);
  const [success, setSucces] = useState(false);

  useEffect(() => {
    async function fetchPostData() {
      try {
        const postResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        console.log(postResponse);
        setPost(postResponse.data);
      } catch (error) {
        console.error("Error fetching post", error);
      }
    }
    fetchPostData();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, post)
      .then((response) => {
        console.log("Response", response.data);
        if (setPost) {
          setSucces(true);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update a Blog
        </Typography>
        {success && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            The blog was successful updated.
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            margin="normal"
            name="title"
            value={post.title || ""}
            onChange={handleChange}
          />
          <TextField
            label="Body"
            fullWidth
            variant="outlined"
            margin="normal"
            name="body"
            value={post.body || ""}
            multiline
            rows={4}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="success"
            type="submit"
          >
            Submit
          </Button>
          <Button
            onClick={() => window.history.back()}
            sx={{ margin: "2px" }}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Back
          </Button>
        </form>
      </Box>
      <Footer/>
    </Container>
    
  );
}

export default UpdateBlog;
