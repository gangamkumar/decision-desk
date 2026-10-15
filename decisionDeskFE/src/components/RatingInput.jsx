import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

const RATING_LABELS = {
  1: '1 - Poor',
  2: '2 - Very Low',
  3: '3 - Below Average',
  4: '4 - Mediocre',
  5: '5 - Moderate / Average',
  6: '6 - Fair',
  7: '7 - Good',
  8: '8 - Very Good',
  9: '9 - Excellent',
  10: '10 - Exceptional',
};

const getRatingColor = (value, isSelected) => {
  if (!isSelected) return null;
  if (value >= 9) return { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', text: '#ffffff' };
  if (value >= 7) return { bg: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', text: '#ffffff' };
  if (value >= 5) return { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', text: '#ffffff' };
  return { bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', text: '#ffffff' };
};

const RatingInput = ({
  value = 5,
  onChange,
  disabled = false,
  showLabel = true,
}) => {
  const currentRating = Number(value) || 5;

  return (
    <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap: 0.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
          const isSelected = currentRating === num;
          const colorStyle = getRatingColor(num, isSelected);

          return (
            <Tooltip key={num} title={RATING_LABELS[num]} arrow placement="top">
              <Box
                onClick={() => !disabled && onChange && onChange(num)}
                sx={{
                  width: { xs: 26, sm: 28 },
                  height: { xs: 26, sm: 28 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1.5,
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: disabled ? 'default' : 'pointer',
                  border: isSelected ? 'none' : '1px solid #e2e8f0',
                  background: isSelected ? colorStyle.bg : '#ffffff',
                  color: isSelected ? colorStyle.text : '#475569',
                  boxShadow: isSelected ? '0 2px 6px rgba(0, 0, 0, 0.15)' : 'none',
                  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                  userSelect: 'none',
                  '&:hover': !disabled
                    ? {
                        transform: 'translateY(-1px) scale(1.08)',
                        borderColor: '#6366f1',
                        bgcolor: isSelected ? undefined : '#f5f3ff',
                        color: isSelected ? undefined : '#6366f1',
                      }
                    : undefined,
                }}
              >
                {num}
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      {showLabel && (
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color:
              currentRating >= 9
                ? '#059669'
                : currentRating >= 7
                ? '#4f46e5'
                : currentRating >= 5
                ? '#d97706'
                : '#dc2626',
            mt: 0.2,
          }}
        >
          {RATING_LABELS[currentRating]}
        </Typography>
      )}
    </Box>
  );
};

export default RatingInput;