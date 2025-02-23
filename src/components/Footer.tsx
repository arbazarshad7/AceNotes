
import { Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <img src="/lovable-uploads/9989fc7d-0088-4677-a9be-c7ebff2f6415.png" alt="AceNotes Logo" className="h-8 w-auto" />
            <p className="text-sm text-gray-600">© 2024 AceNotes. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://twitter.com" className="text-gray-600 hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://github.com" className="text-gray-600 hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" className="text-gray-600 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
