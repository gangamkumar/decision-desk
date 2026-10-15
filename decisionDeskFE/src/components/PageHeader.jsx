import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({
  title,
  subtitle,
  badge,
  step,
  totalSteps = 4,
  backUrl,
  onBack,
  actions,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <Box sx={{ mb: 4, pt: 1 }}>
      {/* Top row with Back button and Step indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
        {(backUrl || onBack) ? (
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            size="small"
            sx={{
              color: '#64748b',
              fontWeight: 600,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              '&:hover': {
                color: '#4f46e5',
                bgcolor: 'rgba(99, 102, 241, 0.08)',
              },
            }}
          >
            Back
          </Button>
        ) : (
          <Box />
        )}

        {step && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`Step ${step} of ${totalSteps}`}
              size="small"
              sx={{
                bgcolor: 'rgba(99, 102, 241, 0.1)',
                color: '#4f46e5',
                fontWeight: 700,
                fontSize: '0.78rem',
                borderRadius: '8px',
              }}
            />
          </Box>
        )}
      </Box>

      {/* Main title and subtitle */}
      <Box sx={{ display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ maxWidth: 750 }}>
          {badge && (
            <Chip
              label={badge}
              size="small"
              sx={{
                bgcolor: '#ede9fe',
                color: '#6d28d9',
                fontWeight: 600,
                mb: 1,
                borderRadius: '6px',
              }}
            />
          )}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              color: '#1e1b4b',
              fontSize: { xs: '1.75rem', sm: '2.2rem' },
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PageHeader;
