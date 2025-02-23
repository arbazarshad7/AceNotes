import { useState, useEffect } from "react";

interface FileData {
  name: string;
  tag: string;
  date: string;
  url: string;
  privacy: "private" | "public";
}

const SharedPage = () => {
  const [sharedFiles, setSharedFiles] = useState<FileData[]>([]);

  useEffect(() => {
    const storedFiles = localStorage.getItem("uploadedFiles");
    if (storedFiles) {
      const parsedFiles: FileData[] = JSON.parse(storedFiles);
      const publicFiles = parsedFiles.filter((file) => file.privacy === "public");
      setSharedFiles(publicFiles);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">📂 Shared Files</h1>

      {sharedFiles.length === 0 ? (
        <p className="text-gray-500 text-center">No shared files available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-3">📄 File Name</th>
                <th className="border p-3">🏷 Tag</th>
                <th className="border p-3">📅 Uploaded Date</th>
                <th className="border p-3 text-center">⬇ Download</th>
              </tr>
            </thead>
            <tbody>
              {sharedFiles.map((file, index) => (
                <tr key={index} className="border hover:bg-gray-50">
                  <td className="border p-3">{file.name}</td>
                  <td className="border p-3">{file.tag}</td>
                  <td className="border p-3">{file.date}</td>
                  <td className="border p-3 text-center">
                    <a
                      href={file.url}
                      download={file.name}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      ⬇ Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SharedPage;
