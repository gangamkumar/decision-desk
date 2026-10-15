import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

const BAR_COLORS = [
  '#6366f1', // Indigo (Winner)
  '#8b5cf6', // Violet
  '#3b82f6', // Blue
  '#06b6d4', // Cyan
  '#ec4899', // Pink
  '#10b981', // Emerald
  '#f59e0b', // Amber
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box
        sx={{
          bgcolor: '#ffffff',
          p: 1.5,
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          border: '1px solid #e2e8f0',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e1b4b' }}>
          {data.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#4f46e5', fontWeight: 700, mt: 0.5 }}>
          Final Score: {data.score} / 100
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
          Rank #{data.rank}
        </Typography>
      </Box>
    );
  }
  return null;
};

const ComparisonChart = ({ rankedOptions = [] }) => {
  if (!rankedOptions.length) return null;

  const chartData = rankedOptions.map((opt, idx) => ({
    name: opt.name || `Option ${idx + 1}`,
    score: opt.score,
    rank: idx + 1,
  }));

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        bgcolor: '#ffffff',
        borderRadius: 3.5,
        border: '1px solid rgba(99, 102, 241, 0.12)',
        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.04)',
      }}
    >
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b' }}>
          Option Score Comparison
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b' }}>
          Final weighted index out of 100 points
        </Typography>
      </Box>

      <Box sx={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: -10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              domain={[0, 100]}
              tickCount={6}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default ComparisonChart;
