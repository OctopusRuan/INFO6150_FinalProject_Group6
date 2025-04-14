import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const AddJobPage = () => {
    const [Name, setCompanyName] = useState('');
    const [Contact, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [Rating, setSalary] = useState('');
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
            setCompanyName('');
            setJobTitle('');
            setDescription('');
            setSalary('');
            setError('');
        } catch (error) {
            console.error(error);
            setError('Error creating question. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            {/* User Reviews Section with Border */}
            <Box sx={{ mt: 5, mb: 4, border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    What Our Users Say
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: '600px' }}>
                        <ul className="list-group">
                            {/* Review 1 */}
                            <li className="list-group-item">
                                <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text">
                                                "This platform helped me find the best healthy recipes! Love the AI
                                                recommendations!"
                                            </p >
                                            <small className="text-muted">- Barry</small>
                                        </div>
                                    </div>
                                </Box>
                            </li>

                            {/* Review 2 */}
                            <li className="list-group-item">
                                <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-text">
                                                "The ingredient image analysis is a game-changer. So easy to use!"
                                            </p >
                                            <small className="text-muted">- Allen</small>
                                        </div>
                                    </div>
                                </Box>
                            </li>
                        </ul>
                    </Box>
                </Box>
            </Box>

            {/* Add New Job Form with Border */}
            <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3 }}>
                <Typography variant="h5" gutterBottom>
                Asked Question
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={Name}
                        onChange={(e) => setCompanyName(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Contact"
                        value={Contact}
                        onChange={(e) => setJobTitle(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Rating"
                        type="number"
                        value={Rating}
                        onChange={(e) => setSalary(e.target.value)}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddJobPage;