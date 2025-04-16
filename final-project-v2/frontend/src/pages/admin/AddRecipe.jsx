import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Chip,
  Alert,
  Snackbar,
  MenuItem
} from '@mui/material';
import axios from '../../utils/axios';
import PageWrapper from '../../components/PageWrapper';
import Footer from '../../components/Footer';

const AddRecipe = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    ingredients: [],
    cookTime: '',
    calories: '',
    dietType: '',
    difficulty: '',
    nutrients: {
      protein: '',
      carbs: '',
      fat: '',
      fiber: ''
    }
  });

  const [ingredientInput, setIngredientInput] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.nutrients) {
      setForm({ ...form, nutrients: { ...form.nutrients, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setForm((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientInput.trim()],
      }));
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...form.ingredients];
    newIngredients.splice(index, 1);
    setForm({ ...form, ingredients: newIngredients });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/admin/recipe', form);
      setSuccess(true);
      setForm({
        title: '',
        description: '',
        imageUrl: '',
        ingredients: [],
        cookTime: '',
        calories: '',
        dietType: '',
        difficulty: '',
        nutrients: {
          protein: '',
          carbs: '',
          fat: '',
          fiber: ''
        }
      });
    } catch (err) {
      console.error(err);
      setError('Failed to submit recipe. Please check the fields and try again.');
    }
  };

  return (
    <>
      <PageWrapper>
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            📢 Post a Recommended Recipe
          </Typography>

          <Box display="flex" flexDirection="column" gap={2} mt={3}>
            <TextField
              label="Recipe Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Short Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
            />
            <TextField
              label="Image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              fullWidth
            />
            <TextField
              label="Cooking Time"
              name="cookTime"
              value={form.cookTime}
              onChange={handleChange}
              placeholder="e.g. 30 mins"
              fullWidth
            />

            <TextField label="Calories" name="calories" value={form.calories} onChange={handleChange} fullWidth />

            <TextField select label="Diet Type" name="dietType" value={form.dietType} onChange={handleChange} fullWidth>
              {['vegan', 'vegetarian', 'keto', 'paleo', 'low-carb', 'normal'].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>

            <TextField select label="Difficulty" name="difficulty" value={form.difficulty} onChange={handleChange} fullWidth>
              {['easy', 'medium', 'hard'].map((level) => (
                <MenuItem key={level} value={level}>{level}</MenuItem>
              ))}
            </TextField>

            <Typography variant="subtitle1">Nutrition Info (Optional):</Typography>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <TextField label="Protein (g)" name="protein" value={form.nutrients.protein} onChange={handleChange} />
              <TextField label="Carbs (g)" name="carbs" value={form.nutrients.carbs} onChange={handleChange} />
              <TextField label="Fat (g)" name="fat" value={form.nutrients.fat} onChange={handleChange} />
              <TextField label="Fiber (g)" name="fiber" value={form.nutrients.fiber} onChange={handleChange} />
            </Box>

            <Box display="flex" gap={2} alignItems="center">
              <TextField
                label="Add Ingredient"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                fullWidth
              />
              <Button variant="outlined" onClick={handleAddIngredient}>
                Add
              </Button>
            </Box>

            <Box display="flex" flexWrap="wrap" gap={1}>
              {form.ingredients.map((item, idx) => (
                <Chip
                  key={idx}
                  label={item}
                  onDelete={() => handleRemoveIngredient(idx)}
                  color="primary"
                />
              ))}
            </Box>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Submit Recipe
            </Button>
          </Box>

          {/* 成功提示 */}
          <Snackbar
            open={success}
            autoHideDuration={4000}
            onClose={() => setSuccess(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
              ✅ Recipe submitted successfully!
            </Alert>
          </Snackbar>

          {/* 错误提示 */}
          {error && (
            <Alert severity="error" onClose={() => setError('')} sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Container>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default AddRecipe;
