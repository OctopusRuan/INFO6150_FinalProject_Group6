import { Box, Button, Container, Grid, Card, Paper, CardContent, Divider, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import PageWrapper from "../../components/PageWrapper";
import Footer from '../../components/Footer';

const Community = () => {
    const [Name, setName] = useState('');
    const [Contact, setContact] = useState('');
    const [description, setDescription] = useState('');
    const [Rating, setRating] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Name || !Contact || !description || !Rating) {
            setError('All fields are required.');
            return;
        }

        if (isNaN(Rating) || Rating <= 0) {
            setError('Rating must be a positive number.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/job/create', {
                Name,
                Contact,
                description,
                Rating,
            });

            alert(response.data.message);  // 显示成功消息
            setName('');
            setContact('');
            setDescription('');
            setRating('');
            setError('');
        } catch (error) {
            console.error(error);
            setError('Error creating question. Please try again.');
        }
    };

    return (
        <>
            <PageWrapper>
                <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
                    {/* ✅ User Reviews Section */}
                    <Box>
                        <Typography variant="h4" align="center" gutterBottom>
                            ❤️ What Our Users Say
                        </Typography>
                        <Grid sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                            {[
                                {
                                    name: 'Barry',
                                    comment: 'This platform helped me find the best healthy recipes! Love the AI recommendations!'
                                },
                                {
                                    name: 'Allen',
                                    comment: 'The ingredient image analysis is a game-changer. So easy to use!'
                                },
                                {
                                    name: 'Emily',
                                    comment: 'Love how the recipe suggestions match my dietary needs perfectly!'
                                },
                                {
                                    name: 'Jason',
                                    comment: 'The AI-based recommendations are surprisingly accurate. Found my new favorite dish!'
                                },


                            ].map((review, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <Card sx={{ boxShadow: 3, height: '100%', transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                                        <CardContent>
                                            <Typography variant="body1" gutterBottom>
                                                "{review.comment}"
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                - {review.name}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>


                    {/* ✅ Q&A Submission Form */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: '100%',
                            maxWidth: '500px',
                            mx: 'auto',
                            mt: 4,
                        }}
                    >
                        <Typography variant="h4" align="center" gutterBottom>
                            ✨ Ask a Question
                        </Typography>
                        {error && <Typography color="error">{error}</Typography>}

                        <TextField
                            label="Name"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined" fullWidth
                            sx={{ m: 2 }}
                        />
                        <TextField
                            label="Contact"
                            value={Contact}
                            onChange={(e) => setContact(e.target.value)}
                            variant="outlined" fullWidth
                            sx={{ m: 2 }}
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant="outlined"
                            multiline rows={4} fullWidth
                            sx={{ m: 2 }}
                        />
                        <TextField
                            label="Rating (1-5)"
                            value={Rating}
                            onChange={(e) => setRating(e.target.value)}
                            variant="outlined" fullWidth
                            sx={{ m: 2 }}
                        />


                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                m: 2,
                                backgroundColor: "#5DBB63", // 🍀绿色
                                '&:hover': {
                                    backgroundColor: "#4da653", // 悬停时颜色
                                }
                            }}
                        >
                            SUBMIT
                        </Button>
                    </Box>

                </Container>
            </PageWrapper>
            <Footer />
        </>
    );
};


export default Community;