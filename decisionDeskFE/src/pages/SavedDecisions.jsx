import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  InputAdornment,
  Chip,
  Snackbar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useDecision } from '../context/DecisionContext';
import { CATEGORIES } from '../utils/scoring';
import PageHeader from '../components/PageHeader';
import DecisionCard from '../components/DecisionCard';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';

const SavedDecisions = () => {
  const navigate = useNavigate();
  const {
    savedDecisions,
    loadDecisionForEdit,
    duplicateDecision,
    deleteDecision,
    resetCurrentDecision,
    notification,
    closeNotification,
  } = useDecision();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'highest_score'
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Filter & Sort logic
  const filteredDecisions = useMemo(() => {
    return savedDecisions
      .filter((dec) => {
        // Category filter
        if (selectedCategory !== 'All' && dec.category !== selectedCategory) {
          return false;
        }

        // Search term filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchTitle = (dec.title || '').toLowerCase().includes(query);
          const matchDesc = (dec.description || '').toLowerCase().includes(query);
          const matchOptions = (dec.options || []).some((o) =>
            (o.name || '').toLowerCase().includes(query)
          );
          return matchTitle || matchDesc || matchOptions;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'oldest') {
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        }
        if (sortBy === 'highest_score') {
          const scoreA = a.winner?.score || 0;
          const scoreB = b.winner?.score || 0;
          return scoreB - scoreA;
        }
        // default: newest
        return new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0);
      });
  }, [savedDecisions, searchTerm, selectedCategory, sortBy]);

  const handleStartNew = () => {
    resetCurrentDecision();
    navigate('/create-decision');
  };

  const handleView = (id) => {
    const success = loadDecisionForEdit(id);
    if (success) {
      navigate('/results');
    }
  };

  const handleEdit = (id) => {
    const success = loadDecisionForEdit(id);
    if (success) {
      navigate('/create-decision');
    }
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteDecision(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="Saved Decisions"
        subtitle="Manage, duplicate, inspect, and refine your saved multi-criteria decisions stored in LocalStorage."
        actions={
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartNew}
            startIcon={<AddCircleOutlineRoundedIcon />}
            sx={{ px: 2.5, py: 1 }}
          >
            Create Decision
          </Button>
        }
      />

      {/* Filter and Search Bar Card */}
      <Box
        sx={{
          p: 2.5,
          bgcolor: '#ffffff',
          borderRadius: 3.5,
          border: '1px solid rgba(99, 102, 241, 0.12)',
          boxShadow: '0 4px 16px rgba(99, 102, 241, 0.04)',
          mb: 4,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Search Input */}
          <Grid size={{ xs: 12, md: 5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by title, description, or option names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>

          {/* Category Dropdown */}
          <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Category Filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterListIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <MenuItem value="All">All Categories</MenuItem>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Sort By Dropdown */}
          <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SortIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="highest_score">Highest Winning Score</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Category Quick Chips */}
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap', pt: 1, borderTop: '1px solid #f1f0fa' }}>
          <Chip
            label="All"
            size="small"
            clickable
            onClick={() => setSelectedCategory('All')}
            color={selectedCategory === 'All' ? 'primary' : 'default'}
            sx={{ fontWeight: 600 }}
          />
          {CATEGORIES.slice(0, 5).map((cat) => (
            <Chip
              key={cat}
              label={cat}
              size="small"
              clickable
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? 'primary' : 'default'}
              sx={{ fontWeight: 500 }}
            />
          ))}
        </Box>
      </Box>

      {/* Decisions Grid or Empty State */}
      {filteredDecisions.length > 0 ? (
        <Grid container spacing={3}>
          {filteredDecisions.map((dec) => (
            <Grid size={{ xs: 12, md: 4 }} key={dec.id}>
              <DecisionCard
                decision={dec}
                onView={handleView}
                onEdit={handleEdit}
                onDuplicate={(id) => duplicateDecision(id)}
                onDelete={(id) => setDeleteTargetId(id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState
          title={
            searchTerm || selectedCategory !== 'All'
              ? 'No matching decisions found'
              : 'No saved decisions yet'
          }
          description={
            searchTerm || selectedCategory !== 'All'
              ? 'Try modifying your search term or clearing the category filter.'
              : 'Create your first decision model to evaluate choices and save results for future reference.'
          }
          actionText="Create a Decision"
          onAction={handleStartNew}
          actionIcon={<AddCircleOutlineRoundedIcon />}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={Boolean(deleteTargetId)}
        title="Delete Saved Decision"
        message="Are you sure you want to permanently delete this decision? This will remove all options, weights, and ratings from your browser storage."
        confirmText="Yes, Delete"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTargetId(null)}
      />

      {/* Notification Toast */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={closeNotification}
        message={notification.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default SavedDecisions;