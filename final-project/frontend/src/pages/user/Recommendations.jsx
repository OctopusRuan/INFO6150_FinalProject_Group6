import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/PageWrapper';
import { Typography, Box, Button, Collapse, Card, CardMedia, CardContent, CardActions, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';


export default function Recommendations() {
  const user = useSelector((state) => state.user.user);

  const [recipes, setRecipes] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    axios.get('/admin/recipes')
      .then(res => {
        console.log('Fetched Recipes:', res.data); // 👈 看看是否包含 calories / dietType / nutrients
        setRecipes(res.data);
      })
      .catch(err => {
        console.error('Error fetching recipes:', err);
      });
  }, []);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <PageWrapper>
      <Box
        sx={{
          backgroundColor: 'transparent',
          color: 'black',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Smart Healthy Eating Recommendations
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Enter your ingredients and let me recommend healthy recipes!
        </Typography>

        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Enter ingredients, e.g., Chicken, Broccoli"
          style={{ maxWidth: '800px', marginBottom: '1rem' }}
        />

        <Button variant="contained" color="primary">
          Get Recipe Suggestions
        </Button>
      </Box>
      <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ px: 4 }}>
        {recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '500px',
                width: '600px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start', // 保证内容从上向下排列
                boxShadow: 3,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out', // 动画过渡更平滑
              }}
            >
              {recipe.imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  width="200"
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
              </CardContent>

              <CardActions sx={{ justifyContent: 'center', mb: 1 }}>
                <Button size="small" onClick={() => toggleDetails(index)}>
                  {expandedIndex === index ? 'Hide Details' : 'View Details'}
                </Button>
              </CardActions>

              <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
                <CardContent sx={{ maxHeight: 180, overflowY: 'auto' }}>
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
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>🧬 Nutritional Info:</Typography>
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
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>


    </PageWrapper>
  );
}
