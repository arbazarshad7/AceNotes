import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const navigate = useNavigate();

  // ✅ Fetch user details from localStorage
  const [name, setName] = useState(localStorage.getItem("userName") || "User");
  const [email, setEmail] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser).email : "No email found";
  });
  const [uploads, setUploads] = useState(0);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  // ✅ Fetch the number of uploaded files (from backend)
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch("https://your-backend-api.com/user-uploads"); // Replace with actual API
        const data = await response.json();
        setUploads(data.uploads);
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
      }
    };

    fetchUploads();
  }, []);

  // ✅ Update user name
  const handleNameUpdate = () => {
    setName(newName);
    localStorage.setItem("userName", newName);
    setEditing(false);
  };

  // ✅ Sign Out Function (Clears localStorage & redirects)
  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    navigate("/signin"); // Redirect to Sign In Page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Profile</h1>

          {/* Profile Details */}
          <div className="space-y-4">
            {/* Profile Image */}
            <div className="text-center">
              <img
                src="/path-to-profile-image.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto border border-gray-300"
              />
            </div>

            {/* Name Field (Editable) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              {editing ? (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full"
                  />
                  <Button onClick={handleNameUpdate} className="bg-primary">Save</Button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">{name}</p>
                  <Button onClick={() => setEditing(true)} size="sm">Edit</Button>
                </div>
              )}
            </div>

            {/* Email (Fetched from localStorage) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="text-lg font-medium">{email}</p>
            </div>

            {/* Uploaded Files Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Uploaded Files</label>
              <p className="text-lg font-medium">{uploads}</p>
            </div>

            {/* Sign Out Button */}
            <div className="pt-4">
              <Button onClick={handleSignOut} className="w-full bg-red-500 hover:bg-red-600 text-white">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
