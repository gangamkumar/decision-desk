import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import BalanceIcon from '@mui/icons-material/Balance';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useDecision } from '../context/DecisionContext';

const navItems = [
  { label: 'Home', path: '/', icon: <HomeOutlinedIcon fontSize="small" /> },
  { label: 'Create', path: '/create-decision', icon: <AddCircleOutlineRoundedIcon fontSize="small" /> },
  { label: 'Criteria', path: '/criteria-builder', icon: <TuneOutlinedIcon fontSize="small" /> },
  { label: 'Compare', path: '/rate-compare', icon: <RateReviewOutlinedIcon fontSize="small" /> },
  { label: 'Results', path: '/results', icon: <EmojiEventsOutlinedIcon fontSize="small" /> },
  { label: 'Saved', path: '/saved-decisions', icon: <BookmarkBorderOutlinedIcon fontSize="small" /> },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { resetCurrentDecision } = useDecision();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleStartNew = () => {
    resetCurrentDecision();
    navigate('/create-decision');
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <AppBar position="sticky" elevation={0} className="navbar-root">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 70, justifyContent: 'space-between' }}>
          {/* Logo & Brand */}
          <Box
            component={NavLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
              }}
            >
              <BalanceIcon sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  lineHeight: 1.1,
                  background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                DecisionDesk
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748b',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Smart Decision Engine
              </Typography>
            </Box>
          </Box>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                end={item.path === '/'}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </Box>

          {/* Desktop CTA Action */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartNew}
              startIcon={<AddCircleOutlineRoundedIcon />}
              sx={{
                fontWeight: 600,
                borderRadius: '10px',
                px: 2.2,
                py: 0.9,
              }}
            >
              New Decision
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open navigation menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: '#4f46e5' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: { width: 280, p: 2, background: '#ffffff' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BalanceIcon sx={{ color: '#6366f1' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e1b4b' }}>
              DecisionDesk
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ pt: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end={item.path === '/'}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  '&.active': {
                    bgcolor: 'rgba(99, 102, 241, 0.12)',
                    color: '#4f46e5',
                    fontWeight: 600,
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.95rem' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #e2e8f0' }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleStartNew}
            startIcon={<AddCircleOutlineRoundedIcon />}
          >
            Create New Decision
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;