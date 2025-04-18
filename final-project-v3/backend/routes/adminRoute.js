const express = require('express');
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
} = require('../controllers/adminController');

// 所有路径都将基于 /api/admin/...

// POST /api/admin/recipes
router.post('/recipe', createRecipe);

// GET /api/admin/recipes
router.get('/recipes', getAllRecipes);

module.exports = router;
