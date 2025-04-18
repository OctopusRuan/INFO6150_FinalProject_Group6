import React from 'react';
import PageWrapper from "../../components/PageWrapper";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import bgImg from '../../assets/analysis-bg2.jpg';

export default function Subscription() {
    const user = useSelector((state) => state.user.user);
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
                <Box className="my-5">
                    <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                        🥗 Personalized Meal Plans
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" align="center" gutterBottom>
                        Choose a plan that fits your health goals!
                    </Typography>
                    <TableContainer component={Paper} sx={{ maxWidth: 1000, mx: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><strong>Plan</strong></TableCell>
                                    <TableCell align="center"><strong>Features</strong></TableCell>
                                    <TableCell align="center"><strong>Price</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">Basic</TableCell>
                                    <TableCell align="center">AI Recipe Suggestions</TableCell>
                                    <TableCell align="center">Free</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Free Trial</TableCell>
                                    <TableCell align="center">AI-based Meal Plan Recommendation + AI Nutrition Analysis</TableCell>
                                    <TableCell align="center">Free Trial for 7 days</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Pro</TableCell>
                                    <TableCell align="center">Personalized Meal Plans + AI Nutrition Analysis</TableCell>
                                    <TableCell align="center">$9.99/month</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Premium</TableCell>
                                    <TableCell align="center">Personalized Nutritionist Consultation + Pro Features</TableCell>
                                    <TableCell align="center">$19.99/month</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Annual Premium</TableCell>
                                    <TableCell align="center">1-on-1 Nutritionist Consultation + Pro Features + Exclusive Annual Perks + Annual health report</TableCell>
                                    <TableCell align="center">
                                        <p>$199.99/first year</p>
                                        <p>$169.99/renewal</p>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <Footer />
        </>
    );
}
