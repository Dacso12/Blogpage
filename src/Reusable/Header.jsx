import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', 
      light: '#4791db',
      dark: '#115293',
    },
    secondary: {
      main: '#dc004e', 
      light: '#e33371',
      dark: '#9a0036',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
    },
  },
});

function Header() {
  const { isAuthenticated, logout, register } = useKindeAuth();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <AppBar 
        position="sticky" 
        elevation={2}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: '#ffffff',
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography 
            variant="h6" 
            onClick={() => navigate("/")}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: theme.palette.primary.light,
              },
              transition: 'color 0.3s ease',
            }}
          >
            Blogpage
          </Typography>
          <Box>
            {isAuthenticated ? (
              <>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/Addblog')}
                  sx={{
                    marginRight: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Add Blog
                </Button>
                <Button 
                  variant="outlined"
                  onClick={() => logout()}
                  sx={{
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: '#ffffff',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/Login')}
                  sx={{
                    marginRight: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="outlined"
                  onClick={() => register()}
                  sx={{
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: '#ffffff',
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;

