import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import adminBg from '../../assets/admin-bg.jpg'

const AdminHome = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${adminBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="md">
          <Box
            textAlign="center"
            py={5}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(6px)',
              px: 5,
              py: 6,
              borderRadius: 4,
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              textAlign: 'center',
              width: '90%',
              maxWidth: '700px'
            }}
          >
            <Typography variant="h3" gutterBottom>
              👩‍🍳 Welcome, {user.name}!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              You can manage and publish healthy recipe recommendations for users.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column', // 垂直排列
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2, // 按钮之间的间距
                mt: 4 // 顶部间距可调
              }}
            >
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                size="large"
                onClick={() => navigate('/admin/addrecipe')}
              >
                ADD NEW RECIPE
              </Button>

              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                size="large"
                onClick={() => navigate('/admin/QA')}
              >
                ANSWER QUESTIONS
              </Button>
            </Box>

          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default AdminHome;
