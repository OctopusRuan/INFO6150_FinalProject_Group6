import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, CircularProgress, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import Footer from '../../components/Footer';
import bgImg from '../../assets/analysis-bg3.jpg';


export default function Analysis() {
  const user = useSelector((state) => state.user.user);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("⏳ Generating recipe suggestions...");

    try {
      const res = await fetch('http://localhost:5000/get-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: input })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Unknown Error");

      setResponse(data.reply);
    } catch (err) {
      setResponse(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          py: 6,
        }}
      >
        <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            🧠 Smart Healthy Eating Analysis
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Enter ingredients (e.g. <i>chicken, broccoli</i>) and get healthy recipes suggested by AI.
          </Typography>

          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              label="Ingredients"
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="chicken, broccoli..."
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              sx={{ mb: 3 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Recipe Suggestions'}
            </Button>

            {response && (
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  whiteSpace: 'pre-wrap',
                  textAlign: 'left',
                  backgroundColor: '#f8f8f8',
                  fontFamily: 'monospace'
                }}
              >
                {response}
              </Paper>
            )}
          </Box>
        </Container>

      </Box>
      <Footer />
    </>
  );
}
