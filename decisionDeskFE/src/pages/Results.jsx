import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Alert,
  Chip,
  Snackbar,
} from '@mui/material';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useDecision } from '../context/DecisionContext';
import PageHeader from '../components/PageHeader';
import WinnerCard from '../components/WinnerCard';
import ScoreCard from '../components/ScoreCard';
import ComparisonChart from '../components/ComparisonChart';
import CriteriaWeightChart from '../components/CriteriaWeightChart';
import ComparisonTable from '../components/ComparisonTable';

const Results = () => {
  const navigate = useNavigate();
  const {
    currentDecision,
    getCurrentResults,
    saveCurrentDecision,
    resetCurrentDecision,
    notification,
    closeNotification,
  } = useDecision();

  const [hasSaved, setHasSaved] = useState(false);

  const options = currentDecision.options || [];
  const criteria = currentDecision.criteria || [];

  if (!options.length || !criteria.length) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          No active decision results to display. Please set up options and criteria first.
        </Alert>
        <Button variant="contained" onClick={() => navigate('/create-decision')}>
          Start a Decision
        </Button>
      </Container>
    );
  }

  const { rankedOptions, winner, breakdown } = getCurrentResults();
  const runnerUp = rankedOptions.length > 1 ? rankedOptions[1] : null;

  const handleSave = () => {
    saveCurrentDecision();
    setHasSaved(true);
  };

  const handleStartNew = () => {
    resetCurrentDecision();
    navigate('/create-decision');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="Decision Analysis & Results"
        subtitle={`Evaluated matrix for "${currentDecision.title || 'Untitled Decision'}" with weighted MCDA index.`}
        step={4}
        totalSteps={4}
        backUrl="/rate-compare"
        badge={currentDecision.category}
        actions={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/rate-compare')}
              startIcon={<RateReviewOutlinedIcon />}
              sx={{ borderRadius: 2 }}
            >
              Edit Ratings
            </Button>

            <Button
              variant="contained"
              color={hasSaved ? 'success' : 'primary'}
              onClick={handleSave}
              startIcon={hasSaved ? <CheckCircleOutlineRoundedIcon /> : <BookmarkBorderOutlinedIcon />}
              sx={{ borderRadius: 2, px: 2.5 }}
            >
              {hasSaved ? 'Saved to LocalStorage' : 'Save Decision'}
            </Button>
          </Box>
        }
      />

      {/* WINNER CARD */}
      {winner && (
        <WinnerCard
          winner={winner}
          runnerUp={runnerUp}
          totalOptions={options.length}
        />
      )}

      {/* RANKED LIST OF OPTIONS */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e1b4b' }}>
              Final Option Rankings
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Calculated using: Contribution = (Rating / 10) × Weight%
            </Typography>
          </Box>
          <Chip
            label={`${rankedOptions.length} Options Evaluated`}
            size="small"
            sx={{ bgcolor: '#ede9fe', color: '#6d28d9', fontWeight: 600 }}
          />
        </Box>

        <Grid container spacing={2.5}>
          {rankedOptions.map((opt, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={opt.id}>
              <ScoreCard
                option={opt}
                rank={index + 1}
                topScore={winner?.score || 100}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CHARTS ROW: Bar Chart and Doughnut Chart */}
      <Grid container spacing={3.5} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <ComparisonChart rankedOptions={rankedOptions} />
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <CriteriaWeightChart criteria={criteria} />
        </Grid>
      </Grid>

      {/* DETAILED SCORE COMPARISON TABLE */}
      <Box sx={{ mb: 6 }}>
        <ComparisonTable
          options={rankedOptions}
          criteria={criteria}
          ratings={currentDecision.ratings}
          breakdown={breakdown}
          winnerId={winner?.id}
        />
      </Box>

      {/* ACTION BUTTONS FOOTER */}
      <Box
        sx={{
          p: 3,
          bgcolor: '#ffffff',
          borderRadius: 3.5,
          border: '1px solid rgba(99, 102, 241, 0.12)',
          boxShadow: '0 4px 16px rgba(99, 102, 241, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/rate-compare')}
            startIcon={<RateReviewOutlinedIcon />}
            sx={{ borderRadius: 2 }}
          >
            Edit Ratings
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            startIcon={<BookmarkBorderOutlinedIcon />}
            sx={{ borderRadius: 2 }}
          >
            {hasSaved ? 'Update Saved Decision' : 'Save Decision'}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/saved-decisions')}
            startIcon={<BookmarkBorderOutlinedIcon />}
            sx={{ borderRadius: 2 }}
          >
            View Saved Decisions
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleStartNew}
            startIcon={<AddCircleOutlineRoundedIcon />}
            sx={{ borderRadius: 2 }}
          >
            Start New Decision
          </Button>
        </Box>
      </Box>

      {/* Global Toast Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={closeNotification}
        message={notification.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default Results;