import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { DecisionProvider } from './context/DecisionContext';
import './App.css';

// Pages
import Home from './pages/Home';
import CreateDecision from './pages/CreateDecision';
import CriteriaBuilder from './pages/CriteriaBuilder';
import RateCompare from './pages/RateCompare';
import Results from './pages/Results';
import SavedDecisions from './pages/SavedDecisions';
import NotFound from './pages/NotFound';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DecisionProvider>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-decision" element={<CreateDecision />} />
              <Route path="/criteria-builder" element={<CriteriaBuilder />} />
              <Route path="/rate-compare" element={<RateCompare />} />
              <Route path="/results" element={<Results />} />
              <Route path="/saved-decisions" element={<SavedDecisions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </DecisionProvider>
    </ThemeProvider>
  );
}

export default App;