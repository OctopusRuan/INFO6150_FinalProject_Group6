import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Container maxWidth="md">
        <Box textAlign="center" py={5}>
          <Typography variant="h3" gutterBottom>
            👩‍🍳 Welcome Admin!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            You can manage and publish healthy recipe recommendations for users.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/admin/addrecipe')}
          >
            ➕ Add New Recipe
          </Button>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default AdminHome;
