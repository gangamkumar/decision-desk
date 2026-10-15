import React from 'react';
import { Box, Container, Typography, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import BalanceIcon from '@mui/icons-material/Balance';
import SecurityIcon from '@mui/icons-material/Security';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(99, 102, 241, 0.12)',
        pt: 6,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand & Description */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <BalanceIcon sx={{ fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e1b4b' }}>
                DecisionDesk
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#64748b', maxWidth: 380, lineHeight: 1.7, mb: 2 }}>
              The intuitive multi-criteria decision analysis (MCDA) engine designed to help individuals and teams make confident, rational, and data-backed choices without cognitive overload.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#475569', fontSize: '0.8rem' }}>
                <SecurityIcon sx={{ fontSize: 16, color: '#10b981' }} />
                100% Client-Side Privacy
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#475569', fontSize: '0.8rem' }}>
                <OfflinePinIcon sx={{ fontSize: 16, color: '#6366f1' }} />
                LocalStorage Persistence
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#475569', fontSize: '0.8rem' }}>
                <AutoGraphIcon sx={{ fontSize: 16, color: '#8b5cf6' }} />
                Weighted MCDA Engine
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 2 }}>
              Workflow
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={Link} to="/create-decision" sx={{ color: '#64748b', fontSize: '0.9rem', '&:hover': { color: '#6366f1' } }}>
                1. Define Options
              </MuiLink>
              <MuiLink component={Link} to="/criteria-builder" sx={{ color: '#64748b', fontSize: '0.9rem', '&:hover': { color: '#6366f1' } }}>
                2. Weight Criteria
              </MuiLink>
              <MuiLink component={Link} to="/rate-compare" sx={{ color: '#64748b', fontSize: '0.9rem', '&:hover': { color: '#6366f1' } }}>
                3. Rate & Matrix
              </MuiLink>
              <MuiLink component={Link} to="/results" sx={{ color: '#64748b', fontSize: '0.9rem', '&:hover': { color: '#6366f1' } }}>
                4. View Results
              </MuiLink>
            </Box>
          </Grid>

          {/* Resources */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 2 }}>
              Workspace
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink component={Link} to="/saved-decisions" sx={{ color: '#64748b', fontSize: '0.9rem', '&:hover': { color: '#6366f1' } }}>
                Saved Decisions
              </MuiLink>
              <MuiLink component={Link} to="/" sx={{ color: '#64748b', fontSize: '0.9rem', '&:hover': { color: '#6366f1' } }}>
                How It Works
              </MuiLink>
              <MuiLink component={Link} to="/create-decision" sx={{ color: '#64748b', fontSize: '0.9rem', '&:hover': { color: '#6366f1' } }}>
                New Decision
              </MuiLink>
            </Box>
          </Grid>

          {/* Formula summary */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box
              sx={{
                p: 2.2,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.12)',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase' }}>
                Mathematical Model
              </Typography>
              <Typography variant="body2" sx={{ color: '#334155', mt: 0.5, fontSize: '0.85rem', fontWeight: 600 }}>
                Score = Σ [ (Rating / 10) × Weight% ]
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 1 }}>
                Normalizes subjective multi-parameter evaluations into clear, ranked 100-point benchmarks.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            pt: 3,
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            © {new Date().getFullYear()} DecisionDesk. Built with React & Vite. Strictly client-side execution.
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Empowering clarity in complex decisions
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;