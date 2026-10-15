import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const PIE_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#06b6d4',
  '#84cc16',
  '#a855f7',
  '#14b8a6',
];

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
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
        <Typography variant="body2" sx={{ color: '#6366f1', fontWeight: 700, mt: 0.5 }}>
          Weight: {data.value}%
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b' }}>
          Type: {data.payload.type || 'General'}
        </Typography>
      </Box>
    );
  }
  return null;
};

const CriteriaWeightChart = ({ criteria = [] }) => {
  if (!criteria.length) return null;

  const chartData = criteria.map((crit) => ({
    name: crit.name || 'Criterion',
    value: Number(crit.weight) || 0,
    type: crit.type,
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
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b' }}>
          Criteria Weight Distribution
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b' }}>
          Relative priority breakdown (Total 100%)
        </Typography>
      </Box>

      <Box sx={{ width: '100%', height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '0.85rem', paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default CriteriaWeightChart;
