const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  ingredients: [String], // ✅ 新增配料
  cookTime: String,      // ✅ 新增时间描述
  calories: String, 
  dietType: { type: String, enum: ['vegan', 'vegetarian', 'keto', 'paleo', 'low-carb', 'normal'] },
  nutrients: {
    protein: String,   // eg: "15g"
    carbs: String,     // eg: "30g"
    fat: String,       // eg: "10g"
    fiber: String      // eg: "5g"
  },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', recipeSchema);
