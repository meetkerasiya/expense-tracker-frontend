import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { ExpenseCategory } from "@/types";

const categories: ExpenseCategory[] = [
  "food",
  "transportation",
  "utilities",
  "entertainment",
  "shopping",
  "health",
  "education",
  "travel",
  "other",
];

export const AddExpense = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement expense creation logic
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Add New Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Description"
            type="text"
            required
            placeholder="Enter expense description"
          />

          <Input
            label="Amount"
            type="number"
            required
            min="0"
            step="0.01"
            placeholder="Enter amount"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <Input label="Date" type="date" required />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Add Expense
          </Button>
        </form>
      </div>
    </div>
  );
};
