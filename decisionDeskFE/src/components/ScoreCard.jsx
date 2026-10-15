import React from 'react';
import { Card, CardContent, Box, Typography, LinearProgress, Chip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const getRankDetails = (rank) => {
  switch (rank) {
    case 1:
      return {
        label: '1st',
        className: 'rank-badge rank-gold',
        chipColor: '#d97706',
        chipBg: '#fef3c7',
        title: 'Winner',
      };
    case 2:
      return {
        label: '2nd',
        className: 'rank-badge rank-silver',
        chipColor: '#475569',
        chipBg: '#f1f5f9',
        title: 'Runner Up',
      };
    case 3:
      return {
        label: '3rd',
        className: 'rank-badge rank-bronze',
        chipColor: '#c2410c',
        chipBg: '#ffedd5',
        title: '3rd Place',
      };
    default:
      return {
        label: `${rank}th`,
        className: 'rank-badge rank-other',
        chipColor: '#64748b',
        chipBg: '#f8fafc',
        title: `Rank #${rank}`,
      };
  }
};

const ScoreCard = ({ option, rank, topScore }) => {
  const rankInfo = getRankDetails(rank);
  const isWinner = rank === 1;
  const score = option.score || 0;
  const percentOfTop = topScore ? Math.round((score / topScore) * 100) : 100;

  return (
    <Card
      sx={{
        borderRadius: 3.5,
        border: '1px solid',
        borderColor: isWinner ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.1)',
        bgcolor: isWinner ? '#faf8ff' : '#ffffff',
        boxShadow: isWinner
          ? '0 6px 20px rgba(99, 102, 241, 0.1)'
          : '0 2px 10px rgba(99, 102, 241, 0.04)',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(99, 102, 241, 0.12)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <div className={rankInfo.className}>
              {isWinner ? <EmojiEventsIcon sx={{ fontSize: 18 }} /> : rankInfo.label}
            </div>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b', fontSize: '1.1rem' }}>
                {option.name}
              </Typography>
              {option.description && (
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                  {option.description}
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: isWinner ? '#4f46e5' : '#1e1b4b' }}>
              {score}
              <Typography component="span" variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, ml: 0.5 }}>
                /100
              </Typography>
            </Typography>
            <Chip
              label={rankInfo.title}
              size="small"
              sx={{
                bgcolor: rankInfo.chipBg,
                color: rankInfo.chipColor,
                fontWeight: 700,
                fontSize: '0.72rem',
                borderRadius: '6px',
                height: 22,
              }}
            />
          </Box>
        </Box>

        {/* Score Progress Bar */}
        <Box sx={{ mt: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Overall performance
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
              {percentOfTop}% of top score
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={score}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: '#e2e8f0',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: isWinner
                  ? 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)'
                  : 'linear-gradient(90deg, #94a3b8 0%, #64748b 100%)',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
