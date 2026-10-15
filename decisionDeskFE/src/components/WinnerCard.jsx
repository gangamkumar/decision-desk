import React from 'react';
import { Card, CardContent, Box, Typography, Chip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const WinnerCard = ({ winner, runnerUp, totalOptions }) => {
  if (!winner) return null;

  const scoreDifference = runnerUp ? (winner.score - runnerUp.score).toFixed(1) : null;

  return (
    <Card
      sx={{
        borderRadius: 4,
        background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #7c3aed 100%)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 32px rgba(99, 102, 241, 0.28)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        mb: 4,
      }}
    >
      {/* Decorative background glow circles */}
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: '30%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <CardContent sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          {/* Winner Info */}
          <Box sx={{ maxWidth: 640 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5, flexWrap: 'wrap' }}>
              <Chip
                icon={<EmojiEventsIcon sx={{ '&&': { color: '#b45309' } }} />}
                label="HIGHEST SCORING OPTION"
                sx={{
                  bgcolor: '#fef3c7',
                  color: '#92400e',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}
              />
              <Chip
                icon={<StarIcon sx={{ '&&': { color: '#ffffff' } }} />}
                label={`Rank #1 of ${totalOptions || 1}`}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontWeight: 600,
                  borderRadius: '6px',
                }}
              />
            </Box>

            <Typography
              variant="h3"
              component="div"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem' },
                lineHeight: 1.15,
                color: '#ffffff',
                mb: 1.5,
              }}
            >
              {winner.name}
            </Typography>

            {winner.description && (
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  mb: 2,
                }}
              >
                {winner.description}
              </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', pt: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#e0e7ff', fontSize: '0.88rem' }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: '#34d399' }} />
                Dominates weighted preference matrix
              </Box>

              {scoreDifference && Number(scoreDifference) > 0 && (
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.4,
                    borderRadius: 2,
                    bgcolor: 'rgba(0, 0, 0, 0.2)',
                    color: '#fef08a',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  +{scoreDifference} pts lead over {runnerUp.name}
                </Box>
              )}
            </Box>
          </Box>

          {/* Winner Score Display Badge */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(255, 255, 255, 0.35)',
              borderRadius: 4,
              px: { xs: 4, md: 5 },
              py: 3,
              minWidth: { xs: '100%', sm: 180 },
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            }}
          >
            <Typography variant="caption" sx={{ color: '#e0e7ff', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Final Score
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '3rem', sm: '3.6rem' },
                lineHeight: 1,
                color: '#ffffff',
                my: 0.5,
              }}
            >
              {winner.score}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
              out of 100 max
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WinnerCard;