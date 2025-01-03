import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Overview } from "./dashboard/Overview";
import { ExpenseList } from "./dashboard/ExpenseList";
import { AddExpense } from "./dashboard/AddExpense";
import { Reports } from "./dashboard/Reports";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Expenses", href: "/dashboard/expenses", icon: Search },
  { name: "Add Expense", href: "/dashboard/add", icon: PlusCircle },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { setIsAuthenticated } = useAuth();
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100 z-40" : "opacity-0 -z-10"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">ExpenseTracker</h1>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50" onClick={
              () => {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
              }
            }>
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-h-screen">
        {/* Mobile header */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <h1 className="text-xl font-bold text-gray-900">ExpenseTracker</h1>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/expenses" element={<ExpenseList />} />
            <Route path="/add" element={<AddExpense />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
