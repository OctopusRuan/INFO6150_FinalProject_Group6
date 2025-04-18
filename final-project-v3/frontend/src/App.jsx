import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/user/Login';
import Home from './pages/user/Home';
import AdminHome from './pages/admin/Home';
import QA from './pages/admin/QA';
import AddRecipe from './pages/admin/AddRecipe';
import adminProfile from './pages/admin/adminProfile';
import Recommendations from './pages/user/Recommendations';
import Analysis from './pages/user/Analysis';
import Subscription from './pages/user/Subscription';
import Community from './pages/user/Community';
import Profile from './pages/user/Profile';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import CircularProgress from '@mui/material/CircularProgress';

import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, setFavorites } from './redux/userSlice';

const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (err) {
    console.error('Invalid token:', err);
    return false;
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const expiry = localStorage.getItem('tokenExpiry');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          dispatch(setUser({
            id: decoded.id,     
            name: decoded.name,
            email: decoded.email,
            type: decoded.role,
          }));
        } else {
          setIsAuthenticated(false);
          dispatch(clearUser());
        }
      } catch (err) {
        console.error('Token decode error:', err);
        setIsAuthenticated(false);
        dispatch(clearUser());
      }
    } else {
      setIsAuthenticated(false);
      dispatch(clearUser());
    }
    setLoading(false);

    const handleStorageChange = () => {
      setIsAuthenticated(isTokenValid());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser()); // Clear the user in Redux
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        {/* Login page, no protection required */}
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

        {/* user pages */}
        <Route path="/user/home" element={<ProtectedRoute element={Home} allowedTypes={['user']} />} />
        <Route path="/user/recommendations" element={<ProtectedRoute element={Recommendations} allowedTypes={['user']} />} />
        <Route path="/user/analysis" element={<ProtectedRoute element={Analysis} allowedTypes={['user']} />} />
        <Route path="/user/subscription" element={<ProtectedRoute element={Subscription} allowedTypes={['user']} />} />
        <Route path="/user/community" element={<ProtectedRoute element={Community} allowedTypes={['user']} />} />
        <Route path="/user/profile" element={<ProtectedRoute element={Profile} allowedTypes={['user']} />} />


        {/* admin pages */}
        <Route path="/admin/home" element={<ProtectedRoute element={AdminHome} allowedTypes={['admin']} />} />
        <Route path="/admin/addrecipe" element={<ProtectedRoute element={AddRecipe} allowedTypes={['admin']} />} />
        <Route path="/admin/QA" element={<ProtectedRoute element={QA} allowedTypes={['admin']} />} />
        <Route path="/admin/adminProfile" element={<ProtectedRoute element={adminProfile} allowedTypes={['admin']} />} />

        {/* fallback route */}
        <Route
          path="*"
          element={
            isAuthenticated
              ? (user?.type === 'admin'
                ? <Navigate to="/admin/home" />
                : <Navigate to="/user/home" />)
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>

  );
}

export default App;