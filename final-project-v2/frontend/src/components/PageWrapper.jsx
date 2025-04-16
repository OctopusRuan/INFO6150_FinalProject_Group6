import React from 'react';
import { Box } from '@mui/material';

const PageWrapper = ({ children }) => (
  <Box
    sx={{
      width: '100vw',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      py: 0,
      pb: 8, // ✅ 增加底部空间
      backgroundColor: '#f8f9fa',
    }}
  >
    {children}
  </Box>
);

export default PageWrapper;
