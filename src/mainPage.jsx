import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Header from "./Reusable/Header";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Reusable/Footer";
import { Pagination } from "@mui/material";
function MainPage() {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalPage = 9
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          setBlogs(response.data);
        });

      await axios
        .get("https://jsonplaceholder.typicode.com/photos")
        .then((response) => {
          setPhotos(response.data.slice(0, response.length ));
        });
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const getPostsAndPhotos = () => {
    if (page < 1) {
      setPage(1);
    }

    const maxPage = blogs.length / 12;
    if (maxPage < page) {
      setPage(maxPage-1);
    }

    const slicedBlogs = blogs.slice((page - 1) * 12, page * 12);
    const slicedPhotos = photos.slice((page - 1) * 12, page * 12);
  
    return slicedBlogs.map((blog, index) => ({
      ...blog,
      photo: slicedPhotos[index]?.url || ""
    }));
  }

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading posts...</Typography>;
  }

  return (
    <div>
      <Header />

      <Grid container spacing={2} columns={12} style={{marginTop : "20px"}}>
        {getPostsAndPhotos().map((item, index) => {
          return (
            <Grid item xs={3} key={item.id}>
              <Card xs={2} md={2} className="w-2">
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.photo}
                  title={item.title}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.body}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/Post/${item.id}`)}
                  >
                    View blog
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mt={2}
      >
        <Button
          variant="contained"
          onClick={prevPage}
          disabled={page === 1}
          color="primary"
        >
          Prev Page
        </Button>
        <Pagination count={totalPage} page={page} color="primary" />
        <Button
          variant="contained"
          onClick={nextPage}
          disabled={page === totalPage}
          color="primary"
        >
          Next Page
        </Button>
      </Box>

      <Footer />
    </div>
  );
}

export default MainPage;
