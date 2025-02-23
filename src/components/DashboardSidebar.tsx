import { useState } from "react";
import { Home, Upload, BookOpen, Users, User } from "lucide-react";
import { Link } from "react-router-dom";
interface SidebarProps {
  setActivePage: (page: string) => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleNavigation = (page: string) => {
    setActiveTab(page);
    setActivePage(page);
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 min-h-screen p-6 border-r border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
  <Link to="/">AceNotes</Link>
</h2>
      <nav className="space-y-2">
        <button
          onClick={() => handleNavigation("dashboard")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition ${
            activeTab === "dashboard" ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <Home size={18} />
          Dashboard
        </button>

        <button
          onClick={() => handleNavigation("Library")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition ${
            activeTab === "Library" ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <BookOpen size={18} />
          Library
        </button>

        <button
          onClick={() => handleNavigation("upload")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition ${
            activeTab === "upload" ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <Upload size={18} />
          Upload
        </button>

        <button
          onClick={() => handleNavigation("shared")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition ${
            activeTab === "shared" ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <Users size={18} />
          Shared
        </button>

        <button
          onClick={() => handleNavigation("profile")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition ${
            activeTab === "profile" ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <User size={18} />
          Profile
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
