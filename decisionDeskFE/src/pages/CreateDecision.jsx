import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { useDecision } from '../context/DecisionContext';
import { CATEGORIES } from '../utils/scoring';
import PageHeader from '../components/PageHeader';
import OptionCard from '../components/OptionCard';

const CreateDecision = () => {
  const navigate = useNavigate();
  const {
    currentDecision,
    updateCurrentDecision,
    addOption,
    removeOption,
    updateOption,
  } = useDecision();

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!currentDecision.title.trim()) {
      newErrors.title = 'Please provide a decision title';
    }

    if (!currentDecision.options || currentDecision.options.length < 2) {
      newErrors.general = 'You must add at least two options to compare';
    } else {
      const optionErrors = {};
      currentDecision.options.forEach((opt, index) => {
        if (!opt.name.trim()) {
          optionErrors[opt.id] = `Option #${index + 1} requires a name`;
        }
      });
      if (Object.keys(optionErrors).length > 0) {
        newErrors.options = optionErrors;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigate('/criteria-builder');
    }
  };

  const handleAddOption = () => {
    addOption('', '');
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: null }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader
        title="Create a New Decision"
        subtitle="Start by naming your decision problem and listing the candidate options you wish to evaluate."
        step={1}
        totalSteps={4}
        backUrl="/"
        actions={
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinue}
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 3, py: 1 }}
          >
            Continue to Criteria
          </Button>
        }
      />

      {errors.general && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
          {errors.general}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Left Column: Decision Meta Form */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            sx={{
              borderRadius: 3.5,
              border: '1px solid rgba(99, 102, 241, 0.12)',
              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.05)',
              mb: 3,
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b', mb: 2.5 }}>
                Decision Overview
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  label="Decision Title"
                  placeholder="e.g. Choosing a New CRM Platform"
                  variant="outlined"
                  required
                  fullWidth
                  value={currentDecision.title}
                  onChange={(e) => {
                    updateCurrentDecision({ title: e.target.value });
                    if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                  }}
                  error={Boolean(errors.title)}
                  helperText={errors.title}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  select
                  label="Category"
                  variant="outlined"
                  fullWidth
                  value={currentDecision.category || CATEGORIES[0]}
                  onChange={(e) => updateCurrentDecision({ category: e.target.value })}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                >
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Description / Context (Optional)"
                  placeholder="Explain why this decision matters, who is involved, or key constraints..."
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={currentDecision.description || ''}
                  onChange={(e) => updateCurrentDecision({ description: e.target.value })}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3.5,
              bgcolor: '#ede9fe',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              display: 'flex',
              gap: 1.5,
            }}
          >
            <LightbulbOutlinedIcon sx={{ color: '#7c3aed', mt: 0.3 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#5b21b6' }}>
                Pro-Tip for Options
              </Typography>
              <Typography variant="caption" sx={{ color: '#6d28d9', lineHeight: 1.6, display: 'block', mt: 0.5 }}>
                Compare mutually exclusive choices (e.g. 2 to 6 options work best). You can add descriptions to keep specific advantages in mind when rating.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Column: Options List */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b' }}>
                Options to Compare ({currentDecision.options?.length || 0})
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Minimum 2 options required to perform comparative analysis
              </Typography>
            </Box>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddOption}
              startIcon={<AddCircleOutlineRoundedIcon />}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                borderColor: 'rgba(99, 102, 241, 0.3)',
                bgcolor: '#ffffff',
              }}
            >
              Add Option
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {currentDecision.options?.map((opt, index) => (
              <OptionCard
                key={opt.id}
                option={opt}
                index={index}
                totalOptions={currentDecision.options.length}
                onChange={updateOption}
                onRemove={removeOption}
                error={errors.options?.[opt.id]}
              />
            ))}
          </Box>

          {/* Action Footer Navigation */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 4,
              pt: 3,
              borderTop: '1px solid rgba(99, 102, 241, 0.12)',
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{ color: '#64748b', fontWeight: 600 }}
            >
              Return Home
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleContinue}
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 3, py: 1 }}
            >
              Continue to Criteria Builder
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateDecision;