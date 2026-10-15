import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const DecisionCard = ({
  decision,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  const formattedDate = decision.updatedAt
    ? new Date(decision.updatedAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    : 'Recent';

  const optionsCount = decision.options ? decision.options.length : 0;
  const criteriaCount = decision.criteria ? decision.criteria.length : 0;
  const winner = decision.winner;

  return (
    <Card
      sx={{
        borderRadius: 4,
        border: '1px solid rgba(99, 102, 241, 0.12)',
        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        transition: 'all 0.25s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: 'rgba(99, 102, 241, 0.3)',
          boxShadow: '0 10px 28px rgba(99, 102, 241, 0.12)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        {/* Header row: category and date */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, gap: 1 }}>
          <Chip
            label={decision.category || 'General'}
            size="small"
            sx={{
              bgcolor: 'rgba(99, 102, 241, 0.08)',
              color: '#4f46e5',
              fontWeight: 700,
              fontSize: '0.75rem',
              borderRadius: '8px',
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#94a3b8', fontSize: '0.78rem' }}>
            <AccessTimeIcon sx={{ fontSize: 14 }} />
            {formattedDate}
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: '#1e1b4b',
            lineHeight: 1.3,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {decision.title || 'Untitled Decision'}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
            lineHeight: 1.6,
            mb: 2.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.8em',
          }}
        >
          {decision.description || 'No description provided.'}
        </Typography>

        {/* Winner Highlight Box */}
        {winner ? (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              bgcolor: '#faf8ff',
              border: '1px solid rgba(99, 102, 241, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: '#fef3c7',
                  color: '#b45309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <EmojiEventsIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', fontSize: '0.68rem', fontWeight: 600 }}>
                  WINNING CHOICE
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e1b4b', lineHeight: 1.1 }}>
                  {winner.name}
                </Typography>
              </Box>
            </Box>

            <Chip
              label={`${winner.score} pts`}
              size="small"
              sx={{
                bgcolor: '#4f46e5',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.75rem',
                borderRadius: '6px',
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              bgcolor: '#f8fafc',
              border: '1px dashed #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Pending final rating calculation
            </Typography>
          </Box>
        )}

        {/* Options & Criteria Pill summary */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#64748b', fontSize: '0.8rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <LayersOutlinedIcon sx={{ fontSize: 16, color: '#6366f1' }} />
            {optionsCount} {optionsCount === 1 ? 'Option' : 'Options'}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <TuneOutlinedIcon sx={{ fontSize: 16, color: '#8b5cf6' }} />
            {criteriaCount} Criteria
          </Box>
        </Box>
      </CardContent>

      {/* Footer Actions */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 3 },
          py: 1.8,
          bgcolor: '#fcfbfe',
          borderTop: '1px solid #f1f0fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => onView(decision.id)}
          startIcon={<VisibilityOutlinedIcon />}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            py: 0.6,
          }}
        >
          View Results
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Edit Decision">
            <IconButton
              size="small"
              onClick={() => onEdit(decision.id)}
              sx={{ color: '#64748b', '&:hover': { color: '#4f46e5', bgcolor: 'rgba(99, 102, 241, 0.08)' } }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Duplicate Decision">
            <IconButton
              size="small"
              onClick={() => onDuplicate(decision.id)}
              sx={{ color: '#64748b', '&:hover': { color: '#4f46e5', bgcolor: 'rgba(99, 102, 241, 0.08)' } }}
            >
              <ContentCopyOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Decision">
            <IconButton
              size="small"
              onClick={() => onDelete(decision.id)}
              sx={{ color: '#64748b', '&:hover': { color: '#ef4444', bgcolor: '#fee2e2' } }}
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

export default DecisionCard;