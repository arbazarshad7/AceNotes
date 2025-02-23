import { useEffect, useState } from "react";

interface FileData {
  name: string;
  tag: string;
  date: string;
  url: string;
  privacy: "private" | "public";
}

const Library = () => {
  const [libraries, setLibraries] = useState<{ [tag: string]: { name: string; files: FileData[] } }>({});

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("uploadedFiles");
      console.log("Stored Data:", storedData); // Debugging Log

      const storedFiles: FileData[] = storedData ? JSON.parse(storedData) : [];

      if (!Array.isArray(storedFiles)) {
        console.error("Invalid data in localStorage: Expected an array.");
        return;
      }

      const organizedLibraries: { [tag: string]: { name: string; files: FileData[] } } = {};

      storedFiles.forEach((file) => {
        console.log("Processing file:", file); // Debugging Log
        if (!file || !file.tag || !file.name || !file.url || file.privacy !== "public") {
          console.warn("Skipping invalid file:", file);
          return;
        }

        // Convert comma-separated tags into an array
        const tagsArray = file.tag.split(",").map((t) => t.trim());

        tagsArray.forEach((tag) => {
          if (!organizedLibraries[tag]) {
            organizedLibraries[tag] = { name: tag, files: [] };
          }
          organizedLibraries[tag].files.push(file);
        });
      });

      console.log("Organized Libraries:", organizedLibraries); // Debugging Log
      setLibraries(organizedLibraries);
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  return (
    <div className="w-3/4 container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Public Library</h1>

      {Object.keys(libraries).length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No public files available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(libraries).map((tag) => (
            <div key={tag} className="bg-blue-300 dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{libraries[tag].name}</h2>
              <ul className="space-y-2">
                {libraries[tag].files.map((file, index) => (
                  <li key={index} className="bg-white dark:bg-gray-600 p-2 rounded-md text-gray-900 dark:text-white flex justify-between items-center">
                    {file.name}
                    <a
                      href={file.url}
                      download={file.name}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
