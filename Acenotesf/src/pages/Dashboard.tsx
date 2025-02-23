import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardStats from "@/components/DashboardStats";
import Library from "@/components/Library";
import { DashboardTable } from "@/components/DashboardTable";
import SharedPage from "@/components/SharedPage";
import UploadPage from "@/components/UploadPage";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard"); // Default to dashboard
  const [userName, setUserName] = useState<string | null>(null);

  // Fetch the username from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.fullName || "User");
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar (Always Visible) */}
      <DashboardSidebar setActivePage={setActivePage} />

      {/* Main Content (Changes Based on Active Page) */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {activePage === "dashboard" && (
            <>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h1 className="text-2xl font-semibold flex items-center gap-2">
                    👋 Welcome back, {userName}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Here's what's happening with your notes today.
                  </p>
                </div>
              </div>
              {/* Dashboard Stats Section */}
              <DashboardStats setActivePage={setActivePage} />
              {/* Dashboard Table Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <DashboardTable />
              </div>
            </>
          )}

          {activePage === "library" && <Library />}
          {activePage === "upload" && <UploadPage />}
          {activePage === "shared" && <SharedPage />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
