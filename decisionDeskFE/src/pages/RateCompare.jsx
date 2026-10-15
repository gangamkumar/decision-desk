import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Grid,
  Alert,
  Divider,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDecision } from '../context/DecisionContext';
import PageHeader from '../components/PageHeader';
import RatingInput from '../components/RatingInput';

const RateCompare = () => {
  const navigate = useNavigate();
  const {
    currentDecision,
    setRating,
    initializeMissingRatings,
  } = useDecision();

  const options = currentDecision.options || [];
  const criteria = currentDecision.criteria || [];
  const ratings = currentDecision.ratings || {};

  // Initialize missing ratings on load
  useEffect(() => {
    initializeMissingRatings();
  }, []);

  // Compute progress
  const totalRequired = options.length * criteria.length;
  let filledCount = 0;
  options.forEach((opt) => {
    criteria.forEach((crit) => {
      if (ratings[opt.id]?.[crit.id] !== undefined) {
        filledCount += 1;
      }
    });
  });

  const progressPercent = totalRequired > 0 ? Math.round((filledCount / totalRequired) * 100) : 100;
  const isComplete = progressPercent >= 100;

  const handleCalculate = () => {
    navigate('/results');
  };

  if (!options.length || !criteria.length) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Please define at least two options and at least one criterion before rating.
        </Alert>
        <Button variant="contained" onClick={() => navigate('/create-decision')}>
          Back to Setup
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="Rate & Compare Matrix"
        subtitle="Evaluate how each candidate option performs across each criterion on a scale from 1 (Poor) to 10 (Exceptional)."
        step={3}
        totalSteps={4}
        backUrl="/criteria-builder"
        actions={
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculate}
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 3, py: 1 }}
          >
            Calculate Results
          </Button>
        }
      />

      {/* Decision Summary Card */}
      <Card
        sx={{
          borderRadius: 3.5,
          border: '1px solid rgba(99, 102, 241, 0.12)',
          bgcolor: '#ffffff',
          boxShadow: '0 4px 16px rgba(99, 102, 241, 0.05)',
          mb: 4,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: 2,
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Chip
                  label={currentDecision.category || 'General'}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(99, 102, 241, 0.08)',
                    color: '#4f46e5',
                    fontWeight: 700,
                    borderRadius: '6px',
                  }}
                />
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  {options.length} Options • {criteria.length} Criteria
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e1b4b' }}>
                {currentDecision.title || 'Untitled Decision'}
              </Typography>
            </Box>

            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {isComplete ? (
                  <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
                ) : null}
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e1b4b' }}>
                  Rating Progress: {filledCount} of {totalRequired} ({progressPercent}%)
                </Typography>
              </Box>
              <Button
                size="small"
                startIcon={<AutoFixHighIcon />}
                onClick={initializeMissingRatings}
                sx={{
                  color: '#6366f1',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  p: 0,
                  mt: 0.5,
                }}
              >
                Reset missing to baseline (5/10)
              </Button>
            </Box>
          </Box>

          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: '#e2e8f0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)',
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Options Evaluation Matrix Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, mb: 4 }}>
        {options.map((opt, optIndex) => (
          <Card
            key={opt.id}
            sx={{
              borderRadius: 3.5,
              border: '1px solid rgba(99, 102, 241, 0.15)',
              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Card Header for Option */}
            <Box
              sx={{
                px: { xs: 2.5, sm: 3 },
                py: 2,
                bgcolor: '#faf8ff',
                borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    bgcolor: '#6366f1',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                  }}
                >
                  {String.fromCharCode(65 + optIndex)}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e1b4b', fontSize: '1.15rem' }}>
                    {opt.name}
                  </Typography>
                  {opt.description && (
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      {opt.description}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Chip
                label={`Option #${optIndex + 1}`}
                size="small"
                sx={{ bgcolor: '#ede9fe', color: '#6d28d9', fontWeight: 600, fontSize: '0.75rem' }}
              />
            </Box>

            {/* Criteria rows for this option */}
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Grid container spacing={2}>
                {criteria.map((crit, critIndex) => {
                  const currentScore = ratings[opt.id]?.[crit.id] ?? 5;
                  const weightedPts = ((currentScore / 10) * Number(crit.weight)).toFixed(1);

                  return (
                    <Grid size={{ xs: 12, md: 6 }} key={crit.id}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2.5,
                          border: '1px solid #f1f0fa',
                          bgcolor: '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          height: '100%',
                          transition: 'all 0.15s ease',
                          '&:hover': {
                            borderColor: 'rgba(99, 102, 241, 0.25)',
                            bgcolor: '#fcfbfe',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e1b4b' }}>
                              {crit.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                              {crit.type} • {crit.weight}% weight
                            </Typography>
                          </Box>

                          <Chip
                            label={`+${weightedPts} pts`}
                            size="small"
                            sx={{
                              bgcolor: '#f0fdf4',
                              color: '#15803d',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              border: '1px solid #bbf7d0',
                            }}
                          />
                        </Box>

                        <RatingInput
                          value={currentScore}
                          onChange={(val) => setRating(opt.id, crit.id, val)}
                        />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 4,
          pt: 3,
          borderTop: '1px solid rgba(99, 102, 241, 0.12)',
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/criteria-builder')}
          sx={{ color: '#64748b', fontWeight: 600 }}
        >
          Back to Criteria
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCalculate}
          endIcon={<ArrowForwardIcon />}
          sx={{ px: 3.5, py: 1.2, fontWeight: 700, fontSize: '0.98rem' }}
        >
          Calculate Results
        </Button>
      </Box>
    </Container>
  );
};

export default RateCompare;