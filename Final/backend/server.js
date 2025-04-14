const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./userRoutes');
const path = require('path');
const { swaggerUi, swaggerSpec } = require('./swagger'); // 引入 swagger 配置
const cors = require('cors');
const jobRoutes = require('./jobRoutes');
const app = express();

// ✅ 全局启用 CORS，允许前端访问后端 API
app.use(cors({
    origin: 'http://localhost:3000',  // 允许来自 3000 端口的请求
    credentials: true,  // 允许跨域发送 Cookie
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // 允许的请求方法
    allowedHeaders: 'Content-Type, Authorization' // 允许的请求头
}));

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/meanshell', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// 配置 Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ 直接在 `userRoutes.js` 里处理 `/user/login`
app.use('/user', userRoutes);
app.use('/job', jobRoutes);

// 使用 Swagger UI 展示 API 文档
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 静态文件处理
app.use('/images', express.static(path.join(__dirname, 'images')));

// 启动服务器
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
