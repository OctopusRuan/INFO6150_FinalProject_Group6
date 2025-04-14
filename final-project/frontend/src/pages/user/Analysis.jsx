import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PageWrapper from "../../components/PageWrapper";
import { useSelector } from 'react-redux';

export default function Analysis() {
    const user = useSelector((state) => state.user.user);

  return (
    <PageWrapper>
      <Box className="text-center bg-white py-4">
        <Typography variant="h4" gutterBottom>
          📸 AI Ingredient Analysis
        </Typography>
        <Typography variant="body1">
          Upload a picture of your fridge ingredients and let AI recommend recipes automatically!
        </Typography>
        <Box mt={3}>
          <input type="file" className="form-control w-50 mx-auto" />
          <Button variant="contained" color="success" sx={{ mt: 2 }}>
            Analyze Ingredients
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  );
}
