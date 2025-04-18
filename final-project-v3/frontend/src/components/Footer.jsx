import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',   
        color: 'black',          
        fontWeight: 'bold',      
        textAlign: 'center',
        py: 2,
        mt: 'auto',
        borderTop: '1px solid #e0e0e0',
        fontSize: '0.9rem',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          © {new Date().getFullYear()} Fuel Your Body. All rights reserved.
        </Typography>
        <Typography variant="caption">
          Built with Group 6
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
