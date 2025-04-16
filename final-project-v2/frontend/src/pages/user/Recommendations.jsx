import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/PageWrapper';
import { Typography, Box, Button, Collapse, Card, CardMedia, CardContent, CardActions, Grid, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFavorites } from '../../redux/userSlice';
import axios from '../../utils/axios';
import Footer from '../../components/Footer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Recommendations() {
  const user = useSelector((state) => state.user.user);
  const favorites = useSelector((state) => state.user.favorites);
  const dispatch = useDispatch();

  const [recipes, setRecipes] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // const [favorites, setFavorites] = useState([]);

  console.log("Current user ID:", user?.id);

  useEffect(() => {
    axios.get('/admin/recipes')
      .then(res => {
        console.log('Fetched Recipes:', res.data);
        setRecipes(res.data);
        setFilteredRecipes(res.data);
      })
      .catch(err => {
        console.error('Error fetching recipes:', err);
      });

    // ✅ 修复收藏列表请求路径（确保 user 存在）
    if (user?.id) {
      axios.get(`/user/${user.id}/favorites`)
        // .then(res => setFavorites(res.data))
        .then(res => dispatch(setFavorites(res.data)))
        .catch(err => console.error("Error loading favorites:", err));
    }
  }, [user]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    if (!term.trim()) {
      setFilteredRecipes(recipes); // 搜索框为空时显示所有
      return;
    }

    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term) ||
      recipe.description?.toLowerCase().includes(term) ||
      recipe.ingredients?.some(ing => ing.toLowerCase().includes(term))
    );

    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);


  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };


  const handleToggleFavorite = async (recipeId) => {
    try {
      // const res = await axios.post(`/user/${user.id}/favorite`, { recipeId });
      // ✅ 立即重新获取收藏内容（完整对象数组）
      await axios.post(`/user/${user.id}/favorite`, { recipeId });
      const res = await axios.get(`/user/${user.id}/favorites`);
      // setFavorites(res.data); // 返回更新后的收藏 ID 数组
      dispatch(setFavorites(res.data));
    } catch (err) {
      console.error('Favorite toggle failed:', err);
    }
  };


  return (
    <>
      <PageWrapper>
        <Box
          sx={{
            backgroundColor: 'transparent',
            color: 'black',
            textAlign: 'center',
            py: 8,
            margin: 10
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 'bold',
              textAlign: 'center',
              background: 'linear-gradient(to right,rgb(43, 100, 17),rgba(14, 137, 23, 0.73))', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Smart Healthy Eating Recommendations
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Enter your ingredients and let me recommend healthy recipes!
          </Typography>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setSearchTerm(value);

              const filtered = recipes.filter(recipe =>
                recipe.title.toLowerCase().includes(value) ||
                recipe.description?.toLowerCase().includes(value) ||
                recipe.ingredients?.some(ing => ing.toLowerCase().includes(value))
              );

              setFilteredRecipes(filtered);
            }}
            className="form-control w-50 mx-auto"
            placeholder="Enter ingredients, e.g., Chicken, Broccoli"
            style={{ maxWidth: '800px', marginBottom: '1rem' }}
          />

          {/* <Button variant="contained" color="primary">
            Get Recipe Suggestions
          </Button> */}
        </Box>
        <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ px: 4 }}>
          {filteredRecipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: 650,
                  width: 500,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s ease', // optional 平滑扩展效果


                }}
              >
                {recipe.imageUrl && (
                  <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    image={recipe.imageUrl}
                    alt={recipe.title}
                  />
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom align="center">
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {recipe.description}
                  </Typography>

                  {/* ❤️ 收藏按钮放在右上角 */}
                  <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={() => handleToggleFavorite(recipe._id)}
                  >
                    {favorites.some(fav => fav._id === recipe._id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>

                </CardContent>

                <CardActions sx={{ justifyContent: 'center', mb: 1 }}>
                  <Button size="small" onClick={() => toggleDetails(index)}>
                    {expandedIndex === index ? 'Hide Details' : 'View Details'}
                  </Button>
                </CardActions>

                <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit sx={{ transition: 'max-height 0.5s ease' }}>
                  <CardContent sx={{ px: 2, py: 1 }}>
                    <Box sx={{ maxHeight: 150, overflowY: 'auto', pr: 1, pb: 3 }}>
                      <Typography variant="subtitle1" fontWeight="bold">🧄 Ingredients:</Typography>
                      {recipe.ingredients?.map((item, idx) => (
                        <Typography variant="body2" key={idx} sx={{ pl: 2 }}>
                          • {item}
                        </Typography>
                      ))}

                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>⏱️ Cooking Time:</Typography>
                      <Typography variant="body2">{recipe.cookTime}</Typography>

                      {recipe.calories && (
                        <>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>🔥 Calories:</Typography>
                          <Typography variant="body2">{recipe.calories}</Typography>
                        </>
                      )}

                      {recipe.dietType && (
                        <>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>🥗 Diet Type:</Typography>
                          <Typography variant="body2">{recipe.dietType}</Typography>
                        </>
                      )}

                      {recipe.difficulty && (
                        <>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>📊 Difficulty:</Typography>
                          <Typography variant="body2">{recipe.difficulty}</Typography>
                        </>
                      )}

                      {recipe.nutrients && (
                        <>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>🧬 Nutritional Info (per serving):</Typography>
                          <Typography variant="body2" sx={{ pl: 2 }}>
                            Protein: {recipe.nutrients.protein || 'N/A'}
                          </Typography>
                          <Typography variant="body2" sx={{ pl: 2 }}>
                            Carbs: {recipe.nutrients.carbs || 'N/A'}
                          </Typography>
                          <Typography variant="body2" sx={{ pl: 2 }}>
                            Fat: {recipe.nutrients.fat || 'N/A'}
                          </Typography>
                          <Typography variant="body2" sx={{ pl: 2 }}>
                            Fiber: {recipe.nutrients.fiber || 'N/A'}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </PageWrapper>
      <Footer />
    </>
  );
}
