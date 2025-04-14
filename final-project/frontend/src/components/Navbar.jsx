import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  console.log("Current User：", user);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '1.5rem' }}>
          Fuel Your Body
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {user?.type === 'user' && (
            <>
              <Button color="inherit" component={Link} to="/user/home">Home</Button>
              <Button color="inherit" component={Link} to="/user/recommendations">Recommendations</Button>
              <Button color="inherit" component={Link} to="/user/analysis">Analysis</Button>
              <Button color="inherit" component={Link} to="/user/subscription">Subscription</Button>
              <Button color="inherit" component={Link} to="/user/community">Community</Button>
            </>
          )}
          {user?.type === 'admin' && (
            <>
              <Button color="inherit" component={Link} to="/admin/home">Home</Button>
              <Button color="inherit" component={Link} to="/admin/addrecipe">Add Recipe</Button>
              <Button color="inherit" component={Link} to="/admin/QA">Q&A</Button>



            </>
          )}

          {/* 👋 Welcome message */}
          {user?.name && (
            <Typography
              variant="body2"
              sx={{
                color: '#ffeb3b', 
                fontWeight: 'bold',
                mx: 2.5,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Welcome, {user.name}! 🎉
            </Typography>
          )}

          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;