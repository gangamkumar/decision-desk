import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
      <Box
        sx={{
          width: 90,
          height: 90,
          borderRadius: 4,
          bgcolor: '#ede9fe',
          color: '#6366f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 3,
          boxShadow: '0 8px 24px rgba(99, 102, 241, 0.2)',
        }}
      >
        <HelpOutlineOutlinedIcon sx={{ fontSize: 48 }} />
      </Box>

      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          fontSize: { xs: '3.5rem', sm: '4.5rem' },
          color: '#4f46e5',
          lineHeight: 1,
          mb: 1,
        }}
      >
        404
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e1b4b', mb: 1.5 }}>
        Page Not Found
      </Typography>

      <Typography variant="body1" sx={{ color: '#64748b', mb: 4, lineHeight: 1.6 }}>
        The decision path you are looking for does not exist or has been moved. Let's head back to the main dashboard.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate('/')}
        startIcon={<HomeOutlinedIcon />}
        sx={{
          borderRadius: 3,
          px: 3.5,
          py: 1.2,
          fontWeight: 700,
          boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
        }}
      >
        Return to Home
      </Button>
    </Container>
  );
};

export default NotFound;
