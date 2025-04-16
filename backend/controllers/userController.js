const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });
    res.status(201).json({ msg: 'Registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Error registering user' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging in' });
  }
};

exports.updateUser = async (req, res) => {
  try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const {email, name, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }

      // update info
      if (name) {
          user.name = name;
      }
      if (password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
      }

      await user.save();
      res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email type'); 
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favorites'); // 👈 populate 获取食谱详情
    res.json(user.favorites);
    console.log("⭐ Fetching favorites for user:", req.params.userId);
  } catch (err) {
    console.error("getFavorites error:", err);
    res.status(500).json({ error: 'Failed to get favorites' });
  }
};

exports.toggleFavorite = async (req, res) => {
  const { userId } = req.params;
  const { recipeId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const index = user.favorites.indexOf(recipeId);

    if (index > -1) {
      // 如果已经收藏，则移除
      user.favorites.splice(index, 1);
    } else {
      // 否则添加
      user.favorites.push(recipeId);
    }

    await user.save();
    res.json(user.favorites); // 返回更新后的收藏列表（recipeId组成的数组）
  } catch (err) {
    res.status(500).json({ msg: 'Error toggling favorite', error: err.message });
  }
};
