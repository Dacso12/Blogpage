import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(false);
  const { login } = useKindeAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        username: "Bret",
        email: "Sincere@april.biz",
      });
      if (response?.status === 200) {
        console.log("Login successful:", response);
      } else {
        setSuccess(true);
        console.log("Invalid login details");
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {success && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Successfully logged in.
          </Alert>
        )}

        <p>Sample: username: Bret, email: Sincere@april.biz</p>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <Button
        variant="contained"
        color="success"
        type="submit"
        sx={{ marginBottom: '15px', marginRight: '10px' }} 

      >
        Login
      </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
            sx={{ marginBottom: '15px' }}
          >
            Back to homepage
          </Button>
        </form>
      </Box>
      <Footer />
    </Container>
  );
}

export default Login;
