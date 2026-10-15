import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  generateId,
  calculateDecisionScores,
  DEFAULT_SAMPLE_DECISIONS,
  CATEGORIES,
} from '../utils/scoring';

const DecisionContext = createContext();

const LOCAL_STORAGE_KEY = 'decisiondesk_saved_decisions_v1';

const createEmptyDecision = () => ({
  id: generateId(),
  title: '',
  description: '',
  category: CATEGORIES[0],
  options: [
    { id: generateId(), name: '', description: '' },
    { id: generateId(), name: '', description: '' },
  ],
  criteria: [
    { id: generateId(), name: 'Price & Value', type: 'Cost / Price', weight: 40 },
    { id: generateId(), name: 'Quality & Build', type: 'Quality', weight: 35 },
    { id: generateId(), name: 'Ease of Use', type: 'Convenience', weight: 25 },
  ],
  ratings: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const DecisionProvider = ({ children }) => {
  // Load saved decisions from LocalStorage or seed with sample decisions
  const [savedDecisions, setSavedDecisions] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved decisions from LocalStorage:', e);
    }
    // Seed with high quality samples
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_DECISIONS));
    return DEFAULT_SAMPLE_DECISIONS;
  });

  // Current decision workflow state
  const [currentDecision, setCurrentDecision] = useState(() => createEmptyDecision());

  // Toast / notification state
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Sync saved decisions to LocalStorage whenever modified
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedDecisions));
    } catch (e) {
      console.error('Failed to write to LocalStorage:', e);
    }
  }, [savedDecisions]);

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // Update current decision fields
  const updateCurrentDecision = (updates) => {
    setCurrentDecision((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Option actions
  const addOption = (name = '', description = '') => {
    const newOption = {
      id: generateId(),
      name,
      description,
    };
    setCurrentDecision((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }));
    return newOption.id;
  };

  const removeOption = (optionId) => {
    setCurrentDecision((prev) => {
      const newOptions = prev.options.filter((o) => o.id !== optionId);
      const newRatings = { ...prev.ratings };
      delete newRatings[optionId];
      return {
        ...prev,
        options: newOptions,
        ratings: newRatings,
      };
    });
  };

  const updateOption = (optionId, fields) => {
    setCurrentDecision((prev) => ({
      ...prev,
      options: prev.options.map((opt) => (opt.id === optionId ? { ...opt, ...fields } : opt)),
    }));
  };

  // Criteria actions
  const addCriterion = (criterion) => {
    const newCriterion = {
      id: generateId(),
      name: criterion.name || '',
      type: criterion.type || 'General',
      weight: Number(criterion.weight) || 0,
    };
    setCurrentDecision((prev) => ({
      ...prev,
      criteria: [...prev.criteria, newCriterion],
    }));
    return newCriterion.id;
  };

  const removeCriterion = (criterionId) => {
    setCurrentDecision((prev) => {
      const newCriteria = prev.criteria.filter((c) => c.id !== criterionId);
      // Clean ratings for this criterion across all options
      const newRatings = {};
      Object.keys(prev.ratings).forEach((optId) => {
        newRatings[optId] = { ...prev.ratings[optId] };
        delete newRatings[optId][criterionId];
      });
      return {
        ...prev,
        criteria: newCriteria,
        ratings: newRatings,
      };
    });
  };

  const updateCriterion = (criterionId, fields) => {
    setCurrentDecision((prev) => ({
      ...prev,
      criteria: prev.criteria.map((c) =>
        c.id === criterionId
          ? {
              ...c,
              ...fields,
              weight: fields.weight !== undefined ? Number(fields.weight) : c.weight,
            }
          : c
      ),
    }));
  };

  // Helper to re-distribute weights equally
  const distributeWeightsEqually = () => {
    if (!currentDecision.criteria.length) return;
    const count = currentDecision.criteria.length;
    const baseWeight = Math.floor(100 / count);
    const remainder = 100 - baseWeight * count;

    setCurrentDecision((prev) => ({
      ...prev,
      criteria: prev.criteria.map((c, index) => ({
        ...c,
        weight: index === 0 ? baseWeight + remainder : baseWeight,
      })),
    }));
  };

  // Ratings actions
  const setRating = (optionId, criterionId, ratingValue) => {
    const val = Math.max(1, Math.min(10, Number(ratingValue)));
    setCurrentDecision((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [optionId]: {
          ...(prev.ratings[optionId] || {}),
          [criterionId]: val,
        },
      },
    }));
  };

  // Set all default ratings to 5 if unrated
  const initializeMissingRatings = () => {
    setCurrentDecision((prev) => {
      const updatedRatings = { ...prev.ratings };
      prev.options.forEach((opt) => {
        if (!updatedRatings[opt.id]) updatedRatings[opt.id] = {};
        prev.criteria.forEach((crit) => {
          if (updatedRatings[opt.id][crit.id] === undefined) {
            updatedRatings[opt.id][crit.id] = 5;
          }
        });
      });
      return { ...prev, ratings: updatedRatings };
    });
  };

  // Reset to brand new decision
  const resetCurrentDecision = () => {
    setCurrentDecision(createEmptyDecision());
  };

  // Load an existing decision into current workspace (for editing)
  const loadDecisionForEdit = (decisionId) => {
    const target = savedDecisions.find((d) => d.id === decisionId);
    if (target) {
      // Clone so edits don't mutate saved list until saved
      setCurrentDecision(JSON.parse(JSON.stringify(target)));
      return true;
    }
    return false;
  };

  // Calculate scores for current decision
  const getCurrentResults = () => {
    return calculateDecisionScores(
      currentDecision.options,
      currentDecision.criteria,
      currentDecision.ratings
    );
  };

  // Save decision to savedDecisions
  const saveCurrentDecision = () => {
    const results = getCurrentResults();
    const now = new Date().toISOString();

    const decisionToSave = {
      ...currentDecision,
      scores: results.scores,
      winner: results.winner ? { id: results.winner.id, name: results.winner.name, score: results.winner.score } : null,
      updatedAt: now,
      createdAt: currentDecision.createdAt || now,
    };

    setSavedDecisions((prev) => {
      const existsIndex = prev.findIndex((d) => d.id === decisionToSave.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = decisionToSave;
        return updated;
      } else {
        return [decisionToSave, ...prev];
      }
    });

    // Also update current decision with saved timestamp and metadata
    setCurrentDecision(decisionToSave);
    showNotification(`"${decisionToSave.title || 'Decision'}" saved successfully!`);
    return decisionToSave;
  };

  // Duplicate an existing decision
  const duplicateDecision = (decisionId) => {
    const original = savedDecisions.find((d) => d.id === decisionId);
    if (!original) return null;

    const duplicated = {
      ...JSON.parse(JSON.stringify(original)),
      id: generateId(),
      title: `${original.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSavedDecisions((prev) => [duplicated, ...prev]);
    showNotification(`Duplicated "${original.title}"`);
    return duplicated;
  };

  // Delete decision
  const deleteDecision = (decisionId) => {
    const target = savedDecisions.find((d) => d.id === decisionId);
    setSavedDecisions((prev) => prev.filter((d) => d.id !== decisionId));
    showNotification(`Deleted "${target?.title || 'Decision'}"`, 'info');
  };

  return (
    <DecisionContext.Provider
      value={{
        currentDecision,
        savedDecisions,
        notification,
        showNotification,
        closeNotification,
        updateCurrentDecision,
        addOption,
        removeOption,
        updateOption,
        addCriterion,
        removeCriterion,
        updateCriterion,
        distributeWeightsEqually,
        setRating,
        initializeMissingRatings,
        resetCurrentDecision,
        loadDecisionForEdit,
        saveCurrentDecision,
        duplicateDecision,
        deleteDecision,
        getCurrentResults,
      }}
    >
      {children}
    </DecisionContext.Provider>
  );
};

export const useDecision = () => {
  const context = useContext(DecisionContext);
  if (!context) {
    throw new Error('useDecision must be used within a DecisionProvider');
  }
  return context;
};
