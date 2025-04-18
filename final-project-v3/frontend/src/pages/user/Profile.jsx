import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  TextField
} from '@mui/material';
import PageWrapper from '../../components/PageWrapper';
import Footer from '../../components/Footer';
import axios from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice'; // ← 你自己定义的用户更新方法


const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // update user info
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch();

  const handleUpdateName = async () => {
    if (!formData.name.trim()) return alert('Name cannot be empty.');

    try {
      const res = await axios.put('/user/update', { email: user.email, name: formData.name });
      
      alert('Name updated successfully');

      dispatch(setUser({
        ...user,
        name: formData.name
      }));

      setEditMode(null);
      setFormData({ ...formData, name: '' });

      // window.location.reload(); // 或更新局部 state
    } catch (err) {
      console.error(err);
      alert('Failed to update name');
    }
  };

  const handleUpdatePassword = async () => {
    const { password, confirmPassword } = formData;
    if (!password || password.length < 8) return alert('Password must be at least 8 characters.');
    if (password !== confirmPassword) return alert('Passwords do not match.');

    try {
      const res = await axios.put('/user/update', { email: user.email, password });
      alert('Password updated successfully');
      setEditMode(null);
      setFormData({ ...formData, password: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to update password');
    }
  };


  // ✅ 获取当前用户收藏的菜谱
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`/user/${user.id}/favorites`);
        setFavoriteRecipes(res.data); // 返回的是 recipe 对象数组
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
      }
    };

    if (user) fetchFavorites();
  }, [user]);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <PageWrapper>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mt: 4, mb: 5 }}>
            <Typography variant="h4" gutterBottom>👤 Personal Profile</Typography>
            <Typography variant="body1"><strong>Name:</strong> {user?.name}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
          </Box>

          {/* ✅ update user information */}
          <Box sx={{ textAlign: 'center', mt: 4, mb: 5 }}>
            <Typography variant="h5" gutterBottom>🛠️ Update Your Profile</Typography>
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

          {/* ✅ 收藏的菜谱展示 */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>❤️ Your Favorite Recipes</Typography>

            {favoriteRecipes.length === 0 ? (
              <Typography variant="body2" sx={{ mt: 2 }}>
                You haven't added any favorite recipes yet.
              </Typography>
            ) : (
              <Grid container spacing={3} justifyContent="center">
                {favoriteRecipes.map((recipe) => (
                  <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                    <Card sx={{
                      height: '100%',
                      width: '300',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      boxShadow: 3,
                      overflow: 'hidden'
                    }}>
                      {recipe.imageUrl && (
                        <CardMedia
                          component="img"
                          height="300"
                          width="300"
                          image={recipe.imageUrl}
                          alt={recipe.title}
                          sx={{ objectFit: 'cover' }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {recipe.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {recipe.description}
                        </Typography>

                        <Typography variant="subtitle1" fontWeight="bold">🧄 Ingredients:</Typography>
                        {recipe.ingredients?.map((ing, idx) => (
                          <Typography key={idx} variant="body2" sx={{ pl: 2 }}>• {ing}</Typography>
                        ))}

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>⏱️ Cooking Time:</Typography>
                        <Typography variant="body2">{recipe.cookTime || 'N/A'}</Typography>

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>🔥 Calories:</Typography>
                        <Typography variant="body2">{recipe.calories || 'N/A'}</Typography>

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>🥗 Diet Type:</Typography>
                        <Typography variant="body2">{recipe.dietType || 'N/A'}</Typography>

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>📊 Difficulty:</Typography>
                        <Typography variant="body2">{recipe.difficulty || 'N/A'}</Typography>

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>🧬 Nutritional Info:</Typography>
                        <Typography variant="body2" sx={{ pl: 2 }}>
                          Protein: {recipe.nutrients?.protein || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ pl: 2 }}>
                          Carbs: {recipe.nutrients?.carbs || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ pl: 2 }}>
                          Fat: {recipe.nutrients?.fat || 'N/A'}
                        </Typography>
                        <Typography variant="body2" sx={{ pl: 2 }}>
                          Fiber: {recipe.nutrients?.fiber || 'N/A'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

            )}
          </Box>
        </Container>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default Profile;
