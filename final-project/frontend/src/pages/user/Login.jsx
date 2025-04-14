import React, { useState } from 'react';
import axios from "../../utils/axios"; 
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import PageWrapper from '../../components/PageWrapper';
import {jwtDecode}  from 'jwt-decode';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

const Login = ( {onLogin} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/user/login', { email, password })
      .then(res => {
        console.log('Login success:', res.data.token);
        const token = res.data.token;
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000;

        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', expiry);
        
        console.log("Decoded token:", decoded);

        dispatch(setUser({
          name: decoded.name,
          email: decoded.email,
          type: decoded.role,
        }));
        
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
    <PageWrapper>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Login</Typography>
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
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Container>
    </PageWrapper>
  );
};

export default Login;
