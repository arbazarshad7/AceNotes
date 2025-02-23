import { Home, FileText, UploadCloud, Users, User } from "lucide-react";

interface DashboardSidebarProps {
  setActivePage: (page: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ setActivePage }) => {
  const menuItems = [
    { label: "Profile", icon: <User size={16} />, page: "profile" },
    { label: "Dashboard", icon: <Home size={16} />, page: "dashboard" },
    { label: "Library", icon: <FileText size={16} />, page: "library" },
    { label: "Shared", icon: <Users size={16} />, page: "shared" },
    { label: "Upload", icon: <UploadCloud size={16} />, page: "upload" },
  ];

  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">📚 AceNotes</h2>
      <nav className="space-y-4">
        {menuItems.map(({ label, icon, page }) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className="flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            {icon} {label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
