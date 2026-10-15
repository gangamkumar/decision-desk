// Utility functions for DecisionDesk scoring, validation, and sample data

export const CATEGORIES = [
  'General',
  'Technology & Software',
  'Career & Education',
  'Business & Finance',
  'Purchases & Gadgets',
  'Real Estate & Housing',
  'Travel & Lifestyle',
  'Health & Wellness',
];

export const CRITERIA_TYPES = [
  'Quality',
  'Cost / Price',
  'Performance',
  'Convenience',
  'Durability',
  'Risk / Reliability',
  'Usability / UX',
  'Speed / Efficiency',
  'Flexibility',
  'General',
];

export const generateId = () => {
  return 'dec_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
};

/**
 * Calculates weighted scores for all options.
 * Weighted contribution = (Rating / 10) * (Criterion weight / 100) * 100
 * Final score = Sum of all weighted contributions (out of 100)
 */
export const calculateDecisionScores = (options = [], criteria = [], ratings = {}) => {
  if (!options.length || !criteria.length) {
    return {
      scores: {},
      rankedOptions: [],
      winner: null,
      breakdown: {},
    };
  }

  const scores = {};
  const breakdown = {};

  options.forEach((option) => {
    let totalScore = 0;
    breakdown[option.id] = {};

    criteria.forEach((criterion) => {
      const rawRating = Number(ratings[option.id]?.[criterion.id] ?? 5);
      const weight = Number(criterion.weight ?? 0);
      
      // Contribution formula: (Rating / 10) * (Criterion weight / 100) * 100
      const contribution = (rawRating / 10) * weight;
      
      breakdown[option.id][criterion.id] = {
        rating: rawRating,
        weight: weight,
        contribution: Number(contribution.toFixed(2)),
      };

      totalScore += contribution;
    });

    scores[option.id] = Number(totalScore.toFixed(1));
  });

  // Rank options from highest to lowest score
  const rankedOptions = [...options]
    .map((opt) => ({
      ...opt,
      score: scores[opt.id] ?? 0,
      breakdown: breakdown[opt.id],
    }))
    .sort((a, b) => b.score - a.score);

  const winner = rankedOptions.length > 0 ? rankedOptions[0] : null;

  return {
    scores,
    rankedOptions,
    winner,
    breakdown,
  };
};

/**
 * Validates criteria weight totals
 */
export const validateCriteriaWeight = (criteria = []) => {
  const total = criteria.reduce((sum, item) => sum + (Number(item.weight) || 0), 0);
  return {
    totalWeight: total,
    isValid: total === 100,
    remaining: 100 - total,
  };
};

/**
 * Default sample decisions to populate LocalStorage if empty
 */
export const DEFAULT_SAMPLE_DECISIONS = [
  {
    id: 'sample_laptop_choice',
    title: 'New Work Laptop Selection',
    description: 'Evaluating flagship laptops for software engineering, design tasks, and daily multitasking portability.',
    category: 'Purchases & Gadgets',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    options: [
      { id: 'opt_1', name: 'MacBook Pro 16" M3 Max', description: 'Exceptional battery life, stunning Liquid Retina XDR screen, ultra-fast ARM performance.' },
      { id: 'opt_2', name: 'Dell XPS 16 (OLED)', description: 'Sleek design, 4K OLED display, discrete NVIDIA graphics for heavy compute.' },
      { id: 'opt_3', name: 'ThinkPad P1 Gen 7', description: 'Legendary keyboard, durable chassis, modular upgradability and Linux support.' },
    ],
    criteria: [
      { id: 'crit_1', name: 'Performance & Speed', type: 'Performance', weight: 35 },
      { id: 'crit_2', name: 'Battery Life & Thermals', type: 'Convenience', weight: 25 },
      { id: 'crit_3', name: 'Display & Build Quality', type: 'Quality', weight: 20 },
      { id: 'crit_4', name: 'Value for Money', type: 'Cost / Price', weight: 20 },
    ],
    ratings: {
      opt_1: { crit_1: 10, crit_2: 10, crit_3: 10, crit_4: 6 },
      opt_2: { crit_1: 8, crit_2: 6, crit_3: 9, crit_4: 7 },
      opt_3: { crit_1: 8, crit_2: 7, crit_3: 8, crit_4: 8 },
    },
  },
  {
    id: 'sample_cloud_choice',
    title: 'Cloud Infrastructure Provider',
    description: 'Choosing the primary public cloud provider for scalable SaaS deployment and microservices architecture.',
    category: 'Technology & Software',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    options: [
      { id: 'opt_cloud_aws', name: 'Amazon Web Services (AWS)', description: 'Most mature ecosystem, deepest service breadth, global edge networks.' },
      { id: 'opt_cloud_gcp', name: 'Google Cloud Platform (GCP)', description: 'Top-tier Kubernetes (GKE), BigQuery analytics, and Vertex AI integrations.' },
      { id: 'opt_cloud_azure', name: 'Microsoft Azure', description: 'Seamless enterprise active directory, OpenAI service partnership, hybrid cloud.' },
    ],
    criteria: [
      { id: 'crit_cloud_1', name: 'Kubernetes & Container Tools', type: 'Performance', weight: 30 },
      { id: 'crit_cloud_2', name: 'Pricing & Cost Efficiency', type: 'Cost / Price', weight: 25 },
      { id: 'crit_cloud_3', name: 'Developer Experience & Documentation', type: 'Usability / UX', weight: 25 },
      { id: 'crit_cloud_4', name: 'Global Network & SLA', type: 'Risk / Reliability', weight: 20 },
    ],
    ratings: {
      opt_cloud_aws: { crit_cloud_1: 9, crit_cloud_2: 7, crit_cloud_3: 8, crit_cloud_4: 10 },
      opt_cloud_gcp: { crit_cloud_1: 10, crit_cloud_2: 8, crit_cloud_3: 9, crit_cloud_4: 9 },
      opt_cloud_azure: { crit_cloud_1: 8, crit_cloud_2: 7, crit_cloud_3: 7, crit_cloud_4: 9 },
    },
  },
];
