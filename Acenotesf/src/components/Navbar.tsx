
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/lovable-uploads/9989fc7d-0088-4677-a9be-c7ebff2f6415.png" alt="AceNotes Logo" className="h-8 w-auto" />
          <span className="font-display font-bold text-xl text-primary">AceNotes</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/signup" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};
