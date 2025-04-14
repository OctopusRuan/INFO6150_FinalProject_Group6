const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      ingredients,
      cookTime,
      calories,
      dietType,
      difficulty,
      nutrients
    } = req.body;

    const newRecipe = new Recipe({
      title,
      description,
      imageUrl,
      ingredients,
      cookTime,
      calories,
      dietType,
      difficulty,
      nutrients
    });

    await newRecipe.save();
    res.status(201).json({ msg: 'Recipe created successfully!' });
  } catch (err) {
    res.status(500).json({ msg: 'Error creating recipe', error: err.message });
  }
};


exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching recipes' });
  }
};
