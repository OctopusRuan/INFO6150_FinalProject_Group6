const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const jobRoutes = require('./jobRoutes');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// 静态图片路径
app.use('/images', express.static(path.join(__dirname, 'images')));

// 引入统一的 userRoutes（包含 register 和 login）
const userRoute = require('./routes/userRoute');

// ✅ 正确挂载路由
app.use('/api/user', userRoute);  // 所有 /api/user/register 和 /api/user/login 都走这里
app.use('/job', jobRoutes);

const adminRoute = require('./routes/adminRoute');
app.use('/api/admin', adminRoute); // 所有管理员相关接口走这

// 连接数据库
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

module.exports = app;
