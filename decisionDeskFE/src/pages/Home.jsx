import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDecision } from '../context/DecisionContext';
import DecisionCard from '../components/DecisionCard';
import ConfirmDialog from '../components/ConfirmDialog';

const Home = () => {
  const navigate = useNavigate();
  const {
    savedDecisions,
    resetCurrentDecision,
    loadDecisionForEdit,
    duplicateDecision,
    deleteDecision,
  } = useDecision();

  const [deleteTargetId, setDeleteTargetId] = React.useState(null);

  const handleCreateDecision = () => {
    resetCurrentDecision();
    navigate('/create-decision');
  };

  const handleViewDecision = (id) => {
    const loaded = loadDecisionForEdit(id);
    if (loaded) {
      navigate('/results');
    }
  };

  const handleEditDecision = (id) => {
    const loaded = loadDecisionForEdit(id);
    if (loaded) {
      navigate('/create-decision');
    }
  };

  const recentDecisions = savedDecisions.slice(0, 3);

  return (
    <Box sx={{ pt: { xs: 4, md: 7 }, pb: 8 }}>
      <Container maxWidth="lg">
        {/* HERO SECTION */}
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: 820,
            mx: 'auto',
            mb: { xs: 8, md: 10 },
          }}
        >
          <Box className="hero-badge animate-fade-in">
            <span style={{ fontSize: '1.1rem' }}>✨</span>
            Smart Multi-Criteria Decision Framework
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              lineHeight: 1.15,
              mb: 2.5,
              color: '#1e1b4b',
            }}
          >
            Compare Options.{' '}
            <span className="gradient-text">Make Confident Decisions.</span>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.05rem', sm: '1.25rem' },
              color: '#64748b',
              lineHeight: 1.7,
              mb: 4.5,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Stop second-guessing complex choices. Define your options, assign weighted criteria based on what matters most, and let analytical scoring highlight the clear winner.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleCreateDecision}
              startIcon={<AddCircleOutlineRoundedIcon />}
              sx={{
                px: 3.5,
                py: 1.4,
                fontSize: '1rem',
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)',
              }}
            >
              Create a Decision
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/saved-decisions')}
              startIcon={<BookmarkBorderOutlinedIcon />}
              sx={{
                px: 3,
                py: 1.4,
                fontSize: '1rem',
                borderRadius: 3,
                color: '#4f46e5',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                bgcolor: '#ffffff',
                '&:hover': {
                  borderColor: '#4f46e5',
                  bgcolor: 'rgba(99, 102, 241, 0.05)',
                },
              }}
            >
              View Saved Decisions ({savedDecisions.length})
            </Button>
          </Box>

          {/* Value highlights */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 2, sm: 4 },
              mt: 5,
              pt: 3,
              borderTop: '1px solid rgba(99, 102, 241, 0.1)',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#4f46e5' }}>
                100%
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                Private & Client-Side
              </Typography>
            </Box>
            <Box sx={{ width: 1, height: 24, bgcolor: '#e2e8f0', display: { xs: 'none', sm: 'block' } }} />
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#7c3aed' }}>
                MCDA
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                Weighted Scoring Matrix
              </Typography>
            </Box>
            <Box sx={{ width: 1, height: 24, bgcolor: '#e2e8f0', display: { xs: 'none', sm: 'block' } }} />
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#10b981' }}>
                Zero Lag
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                Instant Visual Results
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* HOW IT WORKS SECTION */}
        <Box sx={{ mb: { xs: 9, md: 12 } }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Chip
              label="STREAMLINED 3-STEP PROCESS"
              size="small"
              sx={{
                bgcolor: '#ede9fe',
                color: '#6d28d9',
                fontWeight: 700,
                fontSize: '0.75rem',
                borderRadius: '6px',
                mb: 1.5,
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e1b4b' }}>
              How DecisionDesk Works
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 540, mx: 'auto', mt: 1 }}>
              Turn emotional deliberation into structured, transparent mathematics in minutes.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Step 1 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: 3,
                  height: '100%',
                  bgcolor: '#ffffff',
                  border: '1px solid rgba(99, 102, 241, 0.12)',
                  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                    boxShadow: '0 10px 28px rgba(99, 102, 241, 0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 3,
                    bgcolor: '#ede9fe',
                    color: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                    fontWeight: 800,
                    fontSize: '1.25rem',
                  }}
                >
                  1
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 1 }}>
                  Define Your Options
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                  Give your decision a title, choose a category, and list candidate options (e.g. products, job offers, tech stacks, or locations).
                </Typography>
              </Card>
            </Grid>

            {/* Step 2 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: 3,
                  height: '100%',
                  bgcolor: '#ffffff',
                  border: '1px solid rgba(99, 102, 241, 0.12)',
                  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                    boxShadow: '0 10px 28px rgba(99, 102, 241, 0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 3,
                    bgcolor: '#ede9fe',
                    color: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                    fontWeight: 800,
                    fontSize: '1.25rem',
                  }}
                >
                  2
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 1 }}>
                  Set Weighted Criteria
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                  Add dimensions like Price, Speed, Durability, or Quality. Use sliders to balance importance weights until they total exactly 100%.
                </Typography>
              </Card>
            </Grid>

            {/* Step 3 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: 3,
                  height: '100%',
                  bgcolor: '#ffffff',
                  border: '1px solid rgba(99, 102, 241, 0.12)',
                  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                    boxShadow: '0 10px 28px rgba(99, 102, 241, 0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 3,
                    bgcolor: '#ede9fe',
                    color: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                    fontWeight: 800,
                    fontSize: '1.25rem',
                  }}
                >
                  3
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 1 }}>
                  Rate & Compare
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                  Score each option from 1 to 10 on each criterion. Instant algorithms compute final 100-point scores and crown the winning option.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* FEATURE CARDS SECTION */}
        <Box sx={{ mb: { xs: 9, md: 12 } }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Chip
              label="CORE CAPABILITIES"
              size="small"
              sx={{
                bgcolor: 'rgba(99, 102, 241, 0.08)',
                color: '#4f46e5',
                fontWeight: 700,
                fontSize: '0.75rem',
                borderRadius: '6px',
                mb: 1.5,
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e1b4b' }}>
              Engineered for Intelligent Choices
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 540, mx: 'auto', mt: 1 }}>
              Everything you need to eliminate bias and document rational trade-offs.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Feature 1: Weighted Scoring */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: 3.5,
                  height: '100%',
                  bgcolor: '#ffffff',
                  border: '1px solid rgba(99, 102, 241, 0.12)',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.04)',
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    bgcolor: '#ede9fe',
                    color: '#6366f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <TuneOutlinedIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 1 }}>
                  Weighted Scoring
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                  Not all factors are equal. Assign percentage weights to prioritize critical priorities—like cost savings versus high performance—with mathematical accuracy.
                </Typography>
              </Card>
            </Grid>

            {/* Feature 2: Visual Comparisons */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: 3.5,
                  height: '100%',
                  bgcolor: '#ffffff',
                  border: '1px solid rgba(99, 102, 241, 0.12)',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.04)',
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    bgcolor: '#ede9fe',
                    color: '#8b5cf6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <AutoGraphOutlinedIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 1 }}>
                  Visual Data & Charts
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                  Explore dynamic Recharts visualizations including ranked bar comparisons, criteria weight doughnuts, and full cross-matrix calculation breakdowns.
                </Typography>
              </Card>
            </Grid>

            {/* Feature 3: Saved Decisions */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: 3.5,
                  height: '100%',
                  bgcolor: '#ffffff',
                  border: '1px solid rgba(99, 102, 241, 0.12)',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.04)',
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    bgcolor: '#ede9fe',
                    color: '#06b6d4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <StorageOutlinedIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 1 }}>
                  Persistent Saved Decisions
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.7 }}>
                  Your decisions are automatically persisted in browser LocalStorage. Review past results, duplicate scenarios for what-if testing, or update ratings anytime.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* RECENT DECISIONS SECTION */}
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
              flexWrap: 'wrap',
              gap: 1.5,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e1b4b' }}>
                Recent Decisions
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Pick up where you left off or review past evaluations
              </Typography>
            </Box>

            {savedDecisions.length > 0 && (
              <Button
                onClick={() => navigate('/saved-decisions')}
                endIcon={<ArrowForwardIcon />}
                sx={{ color: '#4f46e5', fontWeight: 600 }}
              >
                View All ({savedDecisions.length})
              </Button>
            )}
          </Box>

          {recentDecisions.length > 0 ? (
            <Grid container spacing={3}>
              {recentDecisions.map((decision) => (
                <Grid size={{ xs: 12, md: 4 }} key={decision.id}>
                  <DecisionCard
                    decision={decision}
                    onView={handleViewDecision}
                    onEdit={handleEditDecision}
                    onDuplicate={(id) => duplicateDecision(id)}
                    onDelete={(id) => setDeleteTargetId(id)}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card
              sx={{
                p: 5,
                textAlign: 'center',
                borderRadius: 4,
                border: '1px dashed rgba(99, 102, 241, 0.25)',
                bgcolor: '#ffffff',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 1 }}>
                No saved decisions yet
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                Start your first decision comparison to see it featured here.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateDecision}
                startIcon={<AddCircleOutlineRoundedIcon />}
              >
                Create Your First Decision
              </Button>
            </Card>
          )}
        </Box>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={Boolean(deleteTargetId)}
          title="Delete Saved Decision"
          message="Are you sure you want to permanently delete this decision? This will remove all associated options, criteria, and ratings from LocalStorage."
          confirmText="Yes, Delete"
          onConfirm={() => {
            if (deleteTargetId) {
              deleteDecision(deleteTargetId);
              setDeleteTargetId(null);
            }
          }}
          onClose={() => setDeleteTargetId(null)}
        />
      </Container>
    </Box>
  );
};

export default Home;