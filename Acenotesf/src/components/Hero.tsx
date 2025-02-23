import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Upload, Moon, Sun } from "lucide-react";

export const Hero = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-up [animation-delay:200ms]">
          <div className="inline-flex items-center space-x-2 bg-primary-light dark:bg-gray-700 px-4 py-2 rounded-full">
            <Upload size={16} className="text-primary dark:text-gray-200" />
            <span className="text-sm font-medium text-primary dark:text-gray-300">
              Cloud-Powered Learning
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
            Ace your exams, <span className="text-primary dark:text-blue-400 italic">effortlessly</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
            Upload your notes, share knowledge, and excel in your studies with
            our intelligent learning platform.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              to="/signup"
              className="px-8 py-3 font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-all duration-200 transform hover:scale-105 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Sign Up Now
            </Link>
            <Link
              to="/learn-more"
              className="px-8 py-3 font-medium text-primary bg-primary-light rounded-lg hover:bg-opacity-80 transition-colors dark:bg-gray-700 dark:text-gray-200"
            >
              Learn More
            </Link>
          </div>
          {/* 🌗 Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="dark-mode-toggle px-4 py-2 flex items-center gap-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="relative animate-fade-up [animation-delay:400ms]">
          <img
            src="/lovable-uploads/fcff317d-28cc-4918-b22d-9da4ed696978.png"
            alt="AceNotes Features"
            className="w-full h-auto animate-float"
          />
        </div>
      </div>
    </div>
  );
};
