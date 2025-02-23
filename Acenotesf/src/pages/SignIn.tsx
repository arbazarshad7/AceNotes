import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Added useNavigate for redirection
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      toast({
        title: "User not found",
        description: "No account found. Please sign up first.",
        variant: "destructive",
      });
      return;
    }

    // ✅ Parse user data
    const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);

    // ✅ Check email & password match
    if (email === storedEmail && password === storedPassword) {
      toast({
        title: "Login Successful",
        description: "Redirecting to Dashboard...",
      });

      setTimeout(() => {
        navigate("/dashboard"); // ✅ Redirect to Dashboard.tsx
      }, 1500);
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Incorrect email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-8 animate-fade-up">
          <div className="text-center space-y-2">
            <h1 className="font-display text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary-hover">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-primary hover:text-primary-hover">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
