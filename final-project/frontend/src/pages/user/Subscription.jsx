import React from 'react';
import PageWrapper from "../../components/PageWrapper";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Subscription() {
    const user = useSelector((state) => state.user.user);
    return (
        <PageWrapper>
            <Box className="my-5">
                <Typography variant="h4" align="center" gutterBottom>
                    🥗 Personalized Meal Plans
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Choose a plan that fits your health goals!
                </Typography>
                <TableContainer component={Paper} sx={{ maxWidth: 800, mx: 'auto' }}>
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
                                <TableCell align="center">Pro</TableCell>
                                <TableCell align="center">Personalized Meal Plans + AI Nutrition Analysis</TableCell>
                                <TableCell align="center">$9.99/month</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">Premium</TableCell>
                                <TableCell align="center">1-on-1 Nutritionist Consultation + Pro Features</TableCell>
                                <TableCell align="center">$19.99/month</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </PageWrapper>
    );
}
