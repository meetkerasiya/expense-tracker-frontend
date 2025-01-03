import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const jsonData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await fetch(
        "http://192.168.3.119:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <div className="flex justify-center">
            <LogIn className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </button>
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              name="email"
              required
              autoComplete="email"
              onChange={handleChange}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              onChange={handleChange}
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
