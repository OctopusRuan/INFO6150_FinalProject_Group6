const express = require('express');
const { registerUser, loginUser, updateUser, getAllUsers, deleteUser, getFavorites, toggleFavorite } = require('../controllers/userController');
const { validateCreateUser, validateUpdateUser } = require('../validators/userValidator');
const { validationResult } = require('express-validator');
const router = express.Router();

// router.post('/register', validateCreateUser, registerUser);

router.post('/register', validateCreateUser, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    registerUser(req, res);
  });


router.post('/login', loginUser);

router.put('/update', validateUpdateUser, updateUser);

router.get('/getAll', getAllUsers); 

router.delete('/delete', deleteUser);

// 获取收藏列表
router.get('/:userId/favorites', getFavorites);

// 收藏 / 取消收藏
router.post('/:userId/favorite', toggleFavorite);

module.exports = router;


