import { useState } from "react";
import { Upload } from "lucide-react";

interface FileData {
  name: string;
  tag: string;
  date: string;
  url: string;
  privacy: "private" | "public";
}

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("pdf");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [privacy, setPrivacy] = useState<"private" | "public">("private");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file || !title || !tags) {
      alert("Please fill in all fields before uploading.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileUrl = reader.result as string;
      const uploadDate = new Date().toLocaleString();

      const newFile: FileData = {
        name: title,
        tag: tags,
        date: uploadDate,
        url: fileUrl,
        privacy: privacy,
      };

      const storedFiles = localStorage.getItem("uploadedFiles");
      const parsedFiles: FileData[] = storedFiles ? JSON.parse(storedFiles) : [];

      parsedFiles.push(newFile);
      localStorage.setItem("uploadedFiles", JSON.stringify(parsedFiles));

      alert("File uploaded successfully!");
      setFile(null);
      setTitle("");
      setTags("");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">📤 Upload Your File</h1>

      <input type="file" onChange={handleFileChange} className="mb-3 block w-full" required />
      
      <select
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
        className="block w-full p-2 border rounded-md mb-3"
        required
      >
        <option value="pdf">PDF</option>
        <option value="image">Image</option>
        <option value="jpg">JPG</option>
        <option value="docx">DOCX</option>
      </select>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full p-2 border rounded-md mb-3"
        required
      />

      <input
        type="text"
        placeholder="Enter tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="block w-full p-2 border rounded-md mb-3"
        required
      />

      <select
        value={privacy}
        onChange={(e) => setPrivacy(e.target.value as "private" | "public")}
        className="block w-full p-2 border rounded-md mb-3"
        required
      >
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>

      {file && <p className="text-gray-600">📁 File Selected: {file.name}</p>}

      <button
        onClick={handleUpload}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700"
      >
        <Upload size={16} /> Upload
      </button>
    </div>
  );
};

export default UploadPage;
