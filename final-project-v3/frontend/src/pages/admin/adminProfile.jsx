import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import PageWrapper from '../../components/PageWrapper';
import Footer from '../../components/Footer';
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const admin = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 编辑状态控制
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });

  // 最后登录时间
  const [loginTime, setLoginTime] = useState('');
  useEffect(() => {
    const now = new Date().toLocaleString();
    setLoginTime(now);
  }, []);

  // 修改用户名
  const handleUpdateName = async () => {
    if (!formData.name.trim()) return alert('Name cannot be empty.');

    try {
      await axios.put('/user/update', { email: admin.email, name: formData.name });
      alert('Name updated successfully');
      dispatch(setUser({ ...admin, name: formData.name }));
      setEditMode(null);
      setFormData({ ...formData, name: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to update name');
    }
  };

  // 修改密码
  const handleUpdatePassword = async () => {
    const { password, confirmPassword } = formData;
    if (!password || password.length < 8) return alert('Password must be at least 8 characters.');
    if (password !== confirmPassword) return alert('Passwords do not match.');

    try {
      await axios.put('/user/update', { email: admin.email, password });
      alert('Password updated successfully');
      setEditMode(null);
      setFormData({ ...formData, password: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to update password');
    }
  };

  return (
    <>
      <PageWrapper>
        <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main', mx: 'auto', mb: 1  }}>
              <AdminPanelSettingsIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {admin.name}
              </Typography>
              <Typography color="text.secondary" fontSize="14px">Admin ID: {admin.id}</Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* 基本信息 */}
          <Typography sx={{ mb: 1 }}><strong>Email:</strong> {admin.email}</Typography>
          <Typography sx={{ mb: 1 }}><strong>Role:</strong> {admin.type}</Typography>
          <Typography sx={{ mb: 1 }}><strong>Joined:</strong> {admin.joinDate || '4/14/2025'}</Typography>
          <Typography sx={{ mb: 4 }}><strong>Last Login:</strong> {loginTime}</Typography>

          <Divider sx={{ my: 3 }} />

          {/* 更新信息 */}
          <Box sx={{ textAlign: 'center', mt: 4, mb: 5 }}>
            <Typography variant="h5" gutterBottom>🛠️ Update Your Info</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Button variant="outlined" onClick={() => setEditMode('name')}>Change Name</Button>
              <Button variant="outlined" onClick={() => setEditMode('password')}>Change Password</Button>
              <Button variant="text" color="error" onClick={() => setEditMode(null)}>Cancel</Button>
            </Box>

            {editMode === 'name' && (
              <Box sx={{ maxWidth: 400, mx:'auto', textAlign: 'center' }}>
                <TextField
                  label="New Name"
                  fullWidth
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleUpdateName}>Save Name</Button>
              </Box>
            )}

            {editMode === 'password' && (
              <Box sx={{ maxWidth: 400 , mx:'auto', textAlign: 'center' }}>
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleUpdatePassword}>Save Password</Button>
              </Box>
            )}
          </Box>
        </Container>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default AdminProfile;
