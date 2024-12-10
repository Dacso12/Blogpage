import { useState, useEffect } from "react";
import axios from "axios";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function commentPost() {
  const { isAuthenticated, user } = useKindeAuth();
  const data = { name: "", title: "", body: "", name: "", email: "" };
  const [newcomment, setnewComment] = useState(data);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (user?.given_name || user?.email) {
      setnewComment((prev) => ({
        ...prev,
        name: user?.given_name || prev.name,
        email: user?.email || prev.email,
      }));
    }
  }, [user?.given_name, user?.email]);

  const handleChange = (e) => {
    setnewComment({ ...newcomment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (newcomment.title === "" || newcomment.body === "") {
      return;
    }
    axios
      .post("https://jsonplaceholder.typicode.com/comments", newcomment)
      .then((response) => {
        console.log("Comment response:", response.data);
        setnewComment({ title: "", body: "" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {isAuthenticated && (
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              margin="normal"
              name="title"
              value={newcomment.title}
              onChange={handleChange}
              error={isSubmitted && newcomment.title === ""}
              helperText={
                isSubmitted && newcomment.title === "" ? "Title is required" : ""
              }
            />

            <TextField
              label="Write a comment"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              name="body"
              value={newcomment.body}
              onChange={handleChange}
              error={isSubmitted && newcomment.body === ""}  
                helperText={isSubmitted && newcomment.body === "" ? " Blog detalis is required" : ""}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 2 }}
            >
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default commentPost;
