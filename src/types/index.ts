export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseCategory {
  id: number;        // Unique identifier for the category
  name: string;  // Name of the category (e.g., "food", "transportation", etc.)
}

export interface ExpenseSummary {
  category: ExpenseCategory;
  total: number;
  count: number;
}