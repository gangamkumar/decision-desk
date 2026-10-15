import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  LinearProgress,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BalanceIcon from '@mui/icons-material/Balance';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { useDecision } from '../context/DecisionContext';
import { validateCriteriaWeight } from '../utils/scoring';
import PageHeader from '../components/PageHeader';
import CriteriaRow from '../components/CriteriaRow';

const CriteriaBuilder = () => {
  const navigate = useNavigate();
  const {
    currentDecision,
    addCriterion,
    removeCriterion,
    updateCriterion,
    distributeWeightsEqually,
  } = useDecision();

  const [formError, setFormError] = useState('');
  const [rowErrors, setRowErrors] = useState({});

  const criteria = currentDecision.criteria || [];
  const { totalWeight, isValid, remaining } = validateCriteriaWeight(criteria);

  const handleAddCriterion = () => {
    // Default weight is remaining if positive, else 10
    const defaultWeight = remaining > 0 ? remaining : 10;
    addCriterion({ name: '', type: 'General', weight: defaultWeight });
    setFormError('');
  };

  const handleContinue = () => {
    const errors = {};
    criteria.forEach((crit, idx) => {
      if (!crit.name.trim()) {
        errors[crit.id] = `Criterion #${idx + 1} requires a name`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setRowErrors(errors);
      setFormError('Please name all criteria before proceeding.');
      return;
    }

    if (!isValid) {
      setFormError(
        totalWeight < 100
          ? `Total weight is ${totalWeight}%. You still have ${remaining}% to allocate before continuing.`
          : `Total weight is ${totalWeight}%. It exceeds 100% by ${Math.abs(remaining)}%. Please adjust slider weights.`
      );
      return;
    }

    setFormError('');
    setRowErrors({});
    navigate('/rate-compare');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="Criteria & Weights Builder"
        subtitle="Specify what factors determine success. Allocate importance percentages totaling exactly 100%."
        step={2}
        totalSteps={4}
        backUrl="/create-decision"
        actions={
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinue}
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 3, py: 1 }}
          >
            Continue to Ratings
          </Button>
        }
      />

      {/* Dynamic Weight Indicator Banner */}
      <Card
        sx={{
          borderRadius: 3.5,
          border: '1px solid',
          borderColor: isValid
            ? '#a7f3d0'
            : totalWeight > 100
            ? '#fca5a5'
            : '#fde68a',
          bgcolor: isValid
            ? '#f0fdf4'
            : totalWeight > 100
            ? '#fef2f2'
            : '#fffbeb',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
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
              mb: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {isValid ? (
                <CheckCircleOutlineRoundedIcon sx={{ color: '#059669', fontSize: 28 }} />
              ) : (
                <ErrorOutlineRoundedIcon
                  sx={{
                    color: totalWeight > 100 ? '#dc2626' : '#d97706',
                    fontSize: 28,
                  }}
                />
              )}

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    color: isValid
                      ? '#065f46'
                      : totalWeight > 100
                      ? '#991b1b'
                      : '#92400e',
                  }}
                >
                  {isValid
                    ? 'Total Weight is Balanced: 100%'
                    : totalWeight < 100
                    ? `Remaining Weight to Allocate: ${remaining}%`
                    : `Weight Exceeds 100% by ${Math.abs(remaining)}%`}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  A valid decision matrix requires criteria weights to sum up to exactly 100%.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Chip
                label={`${totalWeight}% / 100%`}
                sx={{
                  bgcolor: isValid
                    ? '#d1fae5'
                    : totalWeight > 100
                    ? '#fee2e2'
                    : '#fef3c7',
                  color: isValid
                    ? '#065f46'
                    : totalWeight > 100
                    ? '#991b1b'
                    : '#b45309',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  borderRadius: '8px',
                }}
              />

              <Button
                size="small"
                variant="outlined"
                startIcon={<BalanceIcon />}
                onClick={distributeWeightsEqually}
                sx={{
                  borderRadius: 2,
                  bgcolor: '#ffffff',
                  color: '#4f46e5',
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#f5f3ff' },
                }}
              >
                Distribute Equally
              </Button>
            </Box>
          </Box>

          {/* Progress bar */}
          <LinearProgress
            variant="determinate"
            value={Math.min(100, totalWeight)}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: '#e2e8f0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                background: isValid
                  ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                  : totalWeight > 100
                  ? 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
                  : 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
              },
            }}
          />
        </CardContent>
      </Card>

      {formError && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
          {formError}
        </Alert>
      )}

      {/* Criteria Rows Header and Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b' }}>
            Decision Criteria ({criteria.length})
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            Customize criteria such as price, quality, performance, convenience, and durability
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCriterion}
          startIcon={<AddCircleOutlineRoundedIcon />}
          sx={{ borderRadius: 2 }}
        >
          Add Criterion
        </Button>
      </Box>

      {/* Criteria List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {criteria.map((crit, index) => (
          <CriteriaRow
            key={crit.id}
            criterion={crit}
            index={index}
            totalCriteria={criteria.length}
            onChange={updateCriterion}
            onRemove={removeCriterion}
            error={rowErrors[crit.id]}
          />
        ))}
      </Box>

      {/* Action Footer Navigation */}
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
          onClick={() => navigate('/create-decision')}
          sx={{ color: '#64748b', fontWeight: 600 }}
        >
          Back to Options
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
          endIcon={<ArrowForwardIcon />}
          sx={{ px: 3, py: 1 }}
        >
          Continue to Rate & Compare
        </Button>
      </Box>
    </Container>
  );
};

export default CriteriaBuilder;