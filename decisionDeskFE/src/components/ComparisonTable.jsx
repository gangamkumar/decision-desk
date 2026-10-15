import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const ComparisonTable = ({
  options = [],
  criteria = [],
  ratings = {},
  breakdown = {},
  winnerId,
}) => {
  if (!options.length || !criteria.length) return null;

  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        borderRadius: 3.5,
        border: '1px solid rgba(99, 102, 241, 0.12)',
        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.04)',
        p: { xs: 2, sm: 3 },
        overflow: 'hidden',
      }}
    >
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b' }}>
          Detailed Score Breakdown
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b' }}>
          Breakdown showing Raw Rating (1-10) and Weighted Points contribution for each dimension
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="decision comparison table">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8fafc' }}>
              <TableCell sx={{ fontWeight: 700, color: '#1e1b4b', minWidth: 200 }}>
                Criterion / Weight
              </TableCell>
              {options.map((opt) => {
                const isWinner = opt.id === winnerId;
                return (
                  <TableCell
                    key={opt.id}
                    align="center"
                    sx={{
                      fontWeight: 700,
                      color: isWinner ? '#4f46e5' : '#1e1b4b',
                      bgcolor: isWinner ? 'rgba(99, 102, 241, 0.06)' : undefined,
                      borderLeft: '1px solid #f1f5f9',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                      {isWinner && (
                        <Chip
                          icon={<EmojiEventsIcon sx={{ fontSize: '14px !important', color: '#b45309' }} />}
                          label="WINNER"
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            bgcolor: '#fef3c7',
                            color: '#b45309',
                          }}
                        />
                      )}
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {opt.name}
                      </Typography>
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {criteria.map((crit) => (
              <TableRow key={crit.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {/* Criterion Details */}
                <TableCell component="th" scope="row">
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e1b4b' }}>
                    {crit.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.3 }}>
                    <Chip
                      label={crit.type || 'General'}
                      size="small"
                      sx={{ height: 18, fontSize: '0.68rem', bgcolor: '#f1f5f9', color: '#475569' }}
                    />
                    <Typography variant="caption" sx={{ color: '#4f46e5', fontWeight: 700 }}>
                      {crit.weight}% weight
                    </Typography>
                  </Box>
                </TableCell>

                {/* Option Columns */}
                {options.map((opt) => {
                  const isWinner = opt.id === winnerId;
                  const item = breakdown[opt.id]?.[crit.id];
                  const rawRating = item?.rating ?? ratings[opt.id]?.[crit.id] ?? '-';
                  const contribution = item?.contribution ?? ((Number(rawRating) / 10) * Number(crit.weight)).toFixed(1);

                  return (
                    <TableCell
                      key={opt.id}
                      align="center"
                      sx={{
                        bgcolor: isWinner ? 'rgba(99, 102, 241, 0.03)' : undefined,
                        borderLeft: '1px solid #f1f5f9',
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e1b4b' }}>
                          Rating: {rawRating}/10
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6366f1', fontWeight: 600 }}>
                          +{contribution} pts
                        </Typography>
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}

            {/* Total Row */}
            <TableRow sx={{ bgcolor: '#f5f3ff', borderTop: '2px solid rgba(99, 102, 241, 0.2)' }}>
              <TableCell sx={{ fontWeight: 800, color: '#1e1b4b', fontSize: '0.95rem' }}>
                Total Weighted Score
              </TableCell>
              {options.map((opt) => {
                const isWinner = opt.id === winnerId;
                return (
                  <TableCell
                    key={opt.id}
                    align="center"
                    sx={{
                      fontWeight: 900,
                      fontSize: '1.15rem',
                      color: isWinner ? '#4f46e5' : '#1e1b4b',
                      bgcolor: isWinner ? 'rgba(99, 102, 241, 0.1)' : undefined,
                      borderLeft: '1px solid #e2e8f0',
                    }}
                  >
                    {opt.score ?? '-'}
                    <Typography component="span" variant="caption" sx={{ ml: 0.5, color: '#64748b' }}>
                      /100
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ComparisonTable;
