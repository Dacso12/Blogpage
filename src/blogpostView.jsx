import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Header from "./header/Header";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./blogpostView.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import CommentPost from "./commentPost";
import Footer from "./footer/Footer";

function blogpostView() {
  const { isAuthenticated } = useKindeAuth();

  const { id } = useParams();
  const [deleteblog, setdeleteBlog] = useState(false);
  const [post, setPost] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPostData() {
      try {
        const postResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const photoResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/photos/${id}`
        );
        const commentRepsone = await axios.get(
          `https://jsonplaceholder.typicode.com/comments/${id}`
        );

        console.log(commentRepsone.data);
        setComment(commentRepsone.data);
        setPost(postResponse.data);
        setPhoto(photoResponse.data);
      } catch (error) {
        console.error("Error fetching post details", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPostData();
  }, [id]);

  const deleteSumbit = (e) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        console.log("Deleted data", response.data);
        if (setPost) {
          setdeleteBlog(true);
        }
      });
  };


  if (loading) {
    return <Typography>Loading post details...</Typography>;
  }

  if (!post) {
    return <Typography>No post found</Typography>;
  }

  return (
    <div className="Aontainer">
      <Header />

      <div className="Container">
        <div style={{ textAlign: "left", padding: "20px" }}>
          {deleteblog && (
            <Alert icon={<DeleteIcon fontSize="inherit" />} severity="error">
              The blog was successful deleted.
            </Alert>
          )}
          <Card key={post?.id} sx={{ maxWidth: 500, }} className="Card2">
            <Typography variant="h4" gutterBottom>
              {post?.title}
            </Typography>
            {photo && (
              <img
                src={photo.url}
                alt={photo.title}
                style={{ maxWidth: "100%", marginBottom: "20px" }}
              />
            )}
           
                <Typography variant="body1">{post?.body}</Typography>
                </Card>

                {isAuthenticated && (
              <div style={{ marginTop: '20px' }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate(`edit`)}
                  style={{ marginRight: '10px' }}
                >
             
                  Update the blog
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={deleteSumbit}
                >
                  Delete the blog
                </Button>
              </div>
            )}
            
          <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/")}
                  style={{ marginTop: '10px' }}
                >
                  Back to homepage
                </Button>
        </div>
        <div
          style={{ padding: 14, textAlign: "right", display: "inline-block" }}
          className="box"
        > 
                </div>
                <div>
          <h1>Comments</h1>
          <Paper style={{ padding: "40px 20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item></Grid>
              <Grid justifyContent="right" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "right" }}>
                  {comment?.name}
                </h4>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "right" }}
                >
                  {comment?.email}
                </Typography>
                <p style={{ textAlign: "right" }}>{comment?.body}</p>
              </Grid>
            </Grid>
          </Paper>
      </div>
      </div>
      <CommentPost/>
      <Footer/>
      </div>
  );
}

export default blogpostView;
