import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const mockData = {
  categories: [
    { name: "Food", value: 450 },
    { name: "Transportation", value: 300 },
    { name: "Utilities", value: 750 },
    { name: "Entertainment", value: 200 },
    { name: "Shopping", value: 600 },
  ],
  monthly: [
    { month: "Jan", amount: 2100 },
    { month: "Feb", amount: 1800 },
    { month: "Mar", amount: 2300 },
    { month: "Apr", amount: 1900 },
    { month: "May", amount: 2500 },
    { month: "Jun", amount: 2000 },
  ],
};

export const Overview = () => {
  const totalExpenses = mockData.categories.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Expenses
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {formatCurrency(totalExpenses)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Current Month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Average Daily Spend
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {formatCurrency(totalExpenses / 30)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Expense Distribution
          </h3>
          <div className="h-[350px] -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockData.categories.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Trend
          </h3>
          <div className="h-[300px] -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.monthly}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar
                  dataKey="amount"
                  fill="#8884d8"
                  name="Expenses"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
