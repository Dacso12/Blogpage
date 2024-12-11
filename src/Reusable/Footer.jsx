import { Box, Typography } from '@mui/material';

function Footer () {
  return (
    <Box 
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '100px 0',
      fontSize: '16px',
      color: '#333',
      bottom: 0,
      left: 0, 
      width: '100%',
      textAlign: 'center',
    }}
    >
      <Typography variant="body2">
        Blogpage @David
      </Typography>
    </Box>
  );
};

export default Footer;