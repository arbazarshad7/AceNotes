import { useEffect, useState } from "react";
import { Search, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardStatsProps {
  setActivePage: (page: string) => void;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ setActivePage }) => {
  const [uploadedFiles, setUploadedFiles] = useState<number>(0);
  const [downloadedFiles, setDownloadedFiles] = useState<number>(0);
  const [totalFiles, setTotalFiles] = useState<number>(0);

  // Fetch file stats from local storage
  const fetchStats = () => {
    try {
      const userFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");
      setUploadedFiles(Array.isArray(userFiles) ? userFiles.length : 0);

      const downloads = JSON.parse(localStorage.getItem("downloadedFiles") || "[]");
      setDownloadedFiles(Array.isArray(downloads) ? downloads.length : 0);

      const allFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");
      setTotalFiles(Array.isArray(allFiles) ? allFiles.length : 0);
    } catch (error) {
      console.error("Error fetching stats from localStorage:", error);
    }
  };

  useEffect(() => {
    fetchStats();

    const handleStorageChange = () => {
      fetchStats();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      {/* Search & Upload Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          📊 Dashboard Stats
        </h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search notes..."
              className="pl-10 w-[300px]"
            />
          </div>
          <button
            onClick={() => setActivePage("upload")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Upload size={16} /> Upload
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Uploaded Files by User */}
        <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg text-center">
          <h2 className="text-lg font-semibold">📁 Uploaded Files</h2>
          <p className="text-2xl font-bold">{uploadedFiles}</p>
        </div>

        {/* Downloaded Files by User */}
        <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-center">
          <h2 className="text-lg font-semibold">⬇️ Downloaded Files</h2>
          <p className="text-2xl font-bold">{downloadedFiles}</p>
        </div>

        {/* Total Files in Storage */}
        <div className="p-4 bg-purple-100 border border-purple-300 rounded-lg text-center">
          <h2 className="text-lg font-semibold">🗂️ Total Files</h2>
          <p className="text-2xl font-bold">{totalFiles}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
