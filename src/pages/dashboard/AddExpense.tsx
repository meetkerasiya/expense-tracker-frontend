import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { ExpenseCategory } from "@/types"; // Adjust the import path as needed

export const AddExpense = () => {
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    categoryId: 0,
    Date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsLoading] = useState(false);

  // Get the token from local storage
  const token = localStorage.getItem("token");

  // Fetch categories from the API with token
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://192.168.3.119:5000/api/category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in request header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data); // Assuming the API response is an array of { id, name }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchCategories();
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, categoryId: parseInt(e.target.value) }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Format the date correctly
  const formattedDate = (new Date(formData.Date)).toDateString();

  // Add the missing `dto` field if necessary
  const jsonData = {
      description: formData.description,
      amount: formData.amount,
      categoryId: formData.categoryId,
      Date: formattedDate,
  };
  console.log("form", formData)
  console.log("json",jsonData)
  try {
    const response = await fetch("http://192.168.3.119:5000/api/expense", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to add expense: ${errorData}`);
    }

    const data = await response.json();
    localStorage.setItem("token", data.token); // Save token if necessary
  } catch (error) {
    console.error("Error during expense submission:", error);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Add New Expense</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Description"
            type="text"
            required
            placeholder="Enter expense description"
            onChange={handleChange}
          />

          <Input
            label="Amount"
            type="number"
            required
            min="0"
            step="0.01"
            placeholder="Enter amount"
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              required
              value={formData.categoryId}
              onChange={handleSelectChange}
            >
              <option value={0}>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <Input label="Date" type="date" required onChange={handleChange} />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Add Expense
          </Button>
        </form>
      </div>
    </div>
  );
};
