import { useEffect, useState } from "react";

const Library = () => {
  const [libraries, setLibraries] = useState<{ [tag: string]: { name: string; files: { name: string; url: string }[] } }>({});

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");

    const organizedLibraries: { [tag: string]: { name: string; files: { name: string; url: string }[] } } = {};

    storedFiles.forEach((file: { name: string; url: string; tags: string[]; privacy: string }) => {
      if (file.privacy === "public") {
        file.tags.forEach((tag) => {
          if (!organizedLibraries[tag]) {
            organizedLibraries[tag] = { name: tag, files: [] };
          }
          organizedLibraries[tag].files.push({ name: file.name, url: file.url });
        });
      }
    });

    setLibraries(organizedLibraries);
  }, []);

  return (
    <div className="w-3/4 container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Public Library</h1>

      {Object.keys(libraries).length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No files available. Upload a file to see it here.</p>
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
