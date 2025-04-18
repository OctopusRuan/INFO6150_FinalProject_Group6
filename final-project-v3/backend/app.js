const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const jobRoutes = require('./jobRoutes');
const OpenAI = require('openai'); // ✅ 新增
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 设置静态资源
app.use('/images', express.static(path.join(__dirname, 'images')));

// ✅ 引入各路由
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/job', jobRoutes);

// ✅ OpenAI 配置
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ 添加 OpenAI 路由
app.post('/get-recipes', async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    return res.status(400).json({ error: 'Missing ingredients' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Give me 3 healthy recipes using these ingredients: ${ingredients}`,
        },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('🔴 OpenAI API Error:', error.message);
    res.status(500).json({ error: 'Failed to generate recipes' });
  }
});

// ✅ 连接 MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

module.exports = app;
