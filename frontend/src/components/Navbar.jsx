import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  console.log("Current User：", user);

  // State for user dropdown menu (hover-triggered)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle hover enter to show menu
  const handleMenuOpen = (event) => {                    // ✅ 新增
    setAnchorEl(event.currentTarget);
  };

  // Handle hover leave to hide menu
  const handleMenuClose = () => {                        // ✅ 新增
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    if (user?.type === 'admin') {
      navigate('/admin/adminProfile');
    } else {
      navigate('/user/profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="#ffffff">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto' }}>
        <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontSize: '1.8rem',
            fontFamily: "'Anta', sans-serif",
            fontWeight: 600,
            letterSpacing: 1,
            color: '#264d3c',  
          }}
        >
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
            <>
              <Typography
                variant="body2"
                sx={{
                  color: '#5DBB63',
                  fontWeight: 'bold',
                  mx: 2.5,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={handleMenuOpen}   // ✅ 添加 hover 触发
              >
                Welcome, {user.name}! 🎉
              </Typography>

              {/* Dropdown menu under username */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onMouseLeave={handleMenuClose}

              >
                <MenuItem onClick={handleProfileClick}>Personal Profile</MenuItem>
              </Menu>
            </>
          )}
          {/* Logout Button */}
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;