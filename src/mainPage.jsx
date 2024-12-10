import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "./header/Header";
import "./Card.css";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./footer/Footer";


function MainPage() {
  const [blogs, setBlogs] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const blogResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const photoResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        console.log(blogResponse.data);
        setBlogs(blogResponse.data);
        setPhotos(photoResponse.data.slice(0, blogResponse.data.length));
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading posts...</Typography>;
  }

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };
  const chunkedItems = chunkArray(blogs, 4);

  return (
    <div>
      <Header />
      {chunkedItems.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", marginBottom: "20px" }}>
          {row.map((item, index) => {
            const photoIndex = rowIndex * 4 + index;
            return (
              <Card key={item.id} sx={{ maxWidth: 345 }} className="Card">
                <CardMedia
                  sx={{ height: 140 }}
                  image={photos[photoIndex]?.url}
                  title={photos[index]?.title || ""}
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
              
            );
          })}
        </div>
      ))}
      <Footer/>
</div>
  );
}

export default MainPage;