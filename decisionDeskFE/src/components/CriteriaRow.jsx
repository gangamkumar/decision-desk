import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Slider,
  IconButton,
  Typography,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { CRITERIA_TYPES } from '../utils/scoring';

const CriteriaRow = ({
  criterion,
  index,
  totalCriteria,
  onChange,
  onRemove,
  error,
}) => {
  const handleSliderChange = (event, newValue) => {
    onChange(criterion.id, { weight: newValue });
  };

  const handleInputChange = (e) => {
    const val = e.target.value === '' ? 0 : Number(e.target.value);
    onChange(criterion.id, { weight: Math.max(0, Math.min(100, val)) });
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        bgcolor: '#ffffff',
        borderRadius: 3,
        border: '1px solid',
        borderColor: error ? '#fca5a5' : 'rgba(99, 102, 241, 0.12)',
        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.04)',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'rgba(99, 102, 241, 0.25)',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.08)',
        },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '2fr 1.5fr 2fr 70px 40px',
          },
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Criteria Name */}
        <Box>
          <TextField
            label={`Criterion #${index + 1} Name`}
            placeholder="e.g. Price, Durability, Speed"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={criterion.name}
            onChange={(e) => onChange(criterion.id, { name: e.target.value })}
            error={Boolean(error)}
            helperText={error}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />
        </Box>

        {/* Criteria Type Dropdown */}
        <Box>
          <TextField
            select
            label="Type / Dimension"
            variant="outlined"
            size="small"
            fullWidth
            value={criterion.type || 'General'}
            onChange={(e) => onChange(criterion.id, { type: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          >
            {CRITERIA_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Importance Slider */}
        <Box sx={{ px: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
              Importance Weight
            </Typography>
            <Typography variant="caption" sx={{ color: '#4f46e5', fontWeight: 700 }}>
              {criterion.weight}%
            </Typography>
          </Box>
          <Slider
            value={Number(criterion.weight) || 0}
            min={0}
            max={100}
            step={5}
            onChange={handleSliderChange}
            sx={{
              color: '#6366f1',
              height: 6,
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                boxShadow: '0 2px 6px rgba(99, 102, 241, 0.4)',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 6px rgba(99, 102, 241, 0.16)',
                },
              },
            }}
          />
        </Box>

        {/* Number Box with % */}
        <Box>
          <TextField
            type="number"
            size="small"
            value={criterion.weight}
            onChange={handleInputChange}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: { min: 0, max: 100, step: 1 },
              },
            }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />
        </Box>

        {/* Delete button */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title={totalCriteria <= 1 ? 'At least one criterion is required' : 'Remove criterion'}>
            <span>
              <IconButton
                size="small"
                disabled={totalCriteria <= 1}
                onClick={() => onRemove(criterion.id)}
                sx={{
                  color: '#94a3b8',
                  '&:hover': { color: '#ef4444', bgcolor: '#fee2e2' },
                  '&.Mui-disabled': { opacity: 0.3 },
                }}
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default CriteriaRow;