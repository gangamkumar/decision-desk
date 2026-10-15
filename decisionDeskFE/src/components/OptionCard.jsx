import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

const OPTION_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#06b6d4',
  '#84cc16',
];

const OptionCard = ({
  option,
  index,
  totalOptions,
  onChange,
  onRemove,
  error,
}) => {
  const accentColor = OPTION_COLORS[index % OPTION_COLORS.length];
  const optionLetter = String.fromCharCode(65 + index); // A, B, C...

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: 3.5,
        border: '1px solid',
        borderColor: error ? '#fca5a5' : 'rgba(99, 102, 241, 0.12)',
        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.05)',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
        '&:hover': {
          borderColor: 'rgba(99, 102, 241, 0.3)',
          boxShadow: '0 6px 20px rgba(99, 102, 241, 0.08)',
        },
      }}
    >
      {/* Top accent line */}
      <Box sx={{ height: 4, bgcolor: accentColor }} />

      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                bgcolor: `${accentColor}18`,
                color: accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
              }}
            >
              {optionLetter}
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e1b4b' }}>
              Option #{index + 1}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {totalOptions <= 2 && (
              <Chip
                label="Min. 2 Required"
                size="small"
                sx={{ fontSize: '0.72rem', bgcolor: '#f1f5f9', color: '#64748b' }}
              />
            )}
            <Tooltip title={totalOptions <= 2 ? 'At least two options are required' : 'Remove this option'}>
              <span>
                <IconButton
                  size="small"
                  disabled={totalOptions <= 2}
                  onClick={() => onRemove(option.id)}
                  sx={{
                    color: '#94a3b8',
                    '&:hover': { color: '#ef4444', bgcolor: '#fee2e2' },
                    '&.Mui-disabled': { opacity: 0.35 },
                  }}
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Option Name"
            placeholder="e.g., MacBook Pro 16 or AWS Cloud"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={option.name}
            onChange={(e) => onChange(option.id, { name: e.target.value })}
            error={Boolean(error)}
            helperText={error}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Description / Key Attributes (Optional)"
            placeholder="Brief notes, specs, or distinguishing aspects of this candidate..."
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={2}
            value={option.description || ''}
            onChange={(e) => onChange(option.id, { description: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default OptionCard;