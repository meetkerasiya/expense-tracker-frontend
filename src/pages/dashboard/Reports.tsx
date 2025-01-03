import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatCurrency } from '@/lib/utils';

const mockData = {
  monthly: [
    { month: 'Jan', food: 450, transportation: 300, utilities: 750, entertainment: 200, shopping: 600 },
    { month: 'Feb', food: 380, transportation: 280, utilities: 800, entertainment: 150, shopping: 550 },
    { month: 'Mar', food: 420, transportation: 350, utilities: 700, entertainment: 250, shopping: 700 },
    { month: 'Apr', food: 390, transportation: 320, utilities: 780, entertainment: 180, shopping: 620 },
    { month: 'May', food: 460, transportation: 290, utilities: 820, entertainment: 220, shopping: 580 },
    { month: 'Jun', food: 430, transportation: 310, utilities: 750, entertainment: 190, shopping: 650 }
  ]
};

const COLORS = {
  food: '#0088FE',
  transportation: '#00C49F',
  utilities: '#FFBB28',
  entertainment: '#FF8042',
  shopping: '#8884D8'
};

export const Reports = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [chartType, setChartType] = useState<'stacked' | 'line'>('stacked');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Expense Analysis</h2>
        <div className="flex gap-4">
          <select
            className="form-select rounded-lg border-gray-300"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
          <select
            className="form-select rounded-lg border-gray-300"
            value={chartType}
            onChange={(e) => setChartType(e.target.value as 'stacked' | 'line')}
          >
            <option value="stacked">Stacked Bar</option>
            <option value="line">Line Chart</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'stacked' ? (
              <BarChart data={mockData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar dataKey="food" stackId="a" fill={COLORS.food} name="Food" />
                <Bar dataKey="transportation" stackId="a" fill={COLORS.transportation} name="Transportation" />
                <Bar dataKey="utilities" stackId="a" fill={COLORS.utilities} name="Utilities" />
                <Bar dataKey="entertainment" stackId="a" fill={COLORS.entertainment} name="Entertainment" />
                <Bar dataKey="shopping" stackId="a" fill={COLORS.shopping} name="Shopping" />
              </BarChart>
            ) : (
              <LineChart data={mockData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line type="monotone" dataKey="food" stroke={COLORS.food} name="Food" />
                <Line type="monotone" dataKey="transportation" stroke={COLORS.transportation} name="Transportation" />
                <Line type="monotone" dataKey="utilities" stroke={COLORS.utilities} name="Utilities" />
                <Line type="monotone" dataKey="entertainment" stroke={COLORS.entertainment} name="Entertainment" />
                <Line type="monotone" dataKey="shopping" stroke={COLORS.shopping} name="Shopping" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(COLORS).map(([category, color]) => {
          const total = mockData.monthly.reduce((sum, month) => sum + month[category], 0);
          const average = total / mockData.monthly.length;
          
          return (
            <div key={category} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 capitalize mb-4">{category}</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-2xl font-bold" style={{ color }}>{formatCurrency(total)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Average</p>
                  <p className="text-lg font-semibold" style={{ color }}>{formatCurrency(average)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};