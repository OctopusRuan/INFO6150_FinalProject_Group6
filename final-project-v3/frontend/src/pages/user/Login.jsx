import React, { useState } from 'react';
import axios from "../../utils/axios";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';

import PageWrapper from '../../components/PageWrapper';
import { jwtDecode } from 'jwt-decode';

import { useDispatch } from 'react-redux';
import { setUser, setFavorites } from '../../redux/userSlice';

import bgImage from '../../assets/Healthy-Eating.jpg'


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/user/login', { email, password })
      .then(async res => {
        console.log('Login success:', res.data.token);
        const token = res.data.token;
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000;

        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', expiry);

        console.log("Decoded token:", decoded);

        dispatch(setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          type: decoded.role,
        }));

        // ✅ 立即获取用户收藏
        try {
          const favRes = await axios.get(`/user/${decoded.id}/favorites`);
          dispatch(setFavorites(favRes.data));  // 存入 Redux
        } catch (err) {
          console.error("Fetching favorites failed:", err);
        }

        onLogin();

        // Redirect based on user type
        if (decoded.type === 'admin') {
          navigate('/admin/home');
        } else {
          navigate('/user/home');
        }
      })
      .catch(err => {
        console.error('Login error:', err.response?.data);
        alert('Invalid credentials');
      });
  };

  return (

    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 4,
      }}
    >
      {/* 新增内层 Flex 容器控制 Welcome 与 Login Card 的左右间距 */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: 4, md: 10 },
      }}>
        {/* Left Side: Welcome Text */}
        <Typography
          variant="h2"
          fontWeight="bold"
          color="white"
          sx={{
            textAlign: 'center',
            textShadow: '4px 4px 12px rgba(0,0,0,0.6)',
            fontFamily: 'Segoe UI, sans-serif',
          }}
        >
          Welcome to Smart Recipe!
        </Typography>

        {/* Right Side: Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', maxWidth: 500 }}
        >
          <Paper elevation={10} sx={{ p: 5, borderRadius: 3, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.95)', mt: { xs: 2, md: 3 } }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2, py: 1.3, borderRadius: 2, fontWeight: 'bold' }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </motion.div>
      </Box>
    </Box>

  );
};

export default Login;
