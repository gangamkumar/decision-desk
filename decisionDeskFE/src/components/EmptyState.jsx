import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

const EmptyState = ({
  icon: IconComponent = InboxOutlinedIcon,
  title = 'No items found',
  description = 'Get started by creating your first entry.',
  actionText,
  onAction,
  actionIcon,
}) => {
  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#ffffff',
        borderRadius: 4,
        border: '1px dashed rgba(99, 102, 241, 0.25)',
        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.04)',
        maxWidth: 600,
        mx: 'auto',
        my: 4,
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '24px',
          bgcolor: '#ede9fe',
          color: '#6366f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2.5,
          boxShadow: '0 8px 20px rgba(99, 102, 241, 0.15)',
        }}
      >
        <IconComponent sx={{ fontSize: 36 }} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 1 }}>
        {title}
      </Typography>

      <Typography variant="body2" sx={{ color: '#64748b', maxWidth: 420, mb: 3, lineHeight: 1.6 }}>
        {description}
      </Typography>

      {actionText && (
        <Button
          variant="contained"
          color="primary"
          onClick={onAction}
          startIcon={actionIcon}
          sx={{
            fontWeight: 600,
            borderRadius: 2.5,
            px: 3,
            py: 1,
          }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
