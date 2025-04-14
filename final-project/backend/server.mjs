import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import OpenAI from 'openai';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: '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',
});

app.post('/get-recipes', async (req, res) => {
  const ingredients = req.body.ingredients;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: `Give me 3 healthy recipes using these ingredients: ${ingredients}` },
      ],
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(' OpenAI API error:', error);  
    res.status(500).json({ error: 'OpenAI API error' }); 
  }
});

app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
