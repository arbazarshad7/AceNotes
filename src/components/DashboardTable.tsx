import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Copy } from "lucide-react";
import { useState } from "react";

export const DashboardTable = () => {
  const [copied, setCopied] = useState(null);

  const handleCopy = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Recently Opened Files</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="search" placeholder="Search" className="pl-10" />
          </div>
          <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 text-gray-500 font-medium">Title</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Type</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Subject</th>
              <th className="px-4 py-3 text-gray-500 font-medium">Tags</th>
              <th className="px-4 py-3 text-gray-500 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              {
                title: "Structure of C program",
                type: "PDF",
                subject: "C programming",
                tags: "codes,note,office",
                url: "https://example.com/structure-of-c-program.pdf",
              },
              {
                title: "Quantum mech.",
                type: "DOCX",
                subject: "Mechanics",
                tags: "completed,2024",
                url: "https://example.com/quantum-mech.docx",
              },
              {
                title: "Car sale chart",
                type: "XLSX",
                subject: "Economics",
                tags: "",
                url: "https://example.com/car-sale-chart.xlsx",
              },
            ].map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3">{item.title}</td>
                <td className="px-4 py-3 text-gray-500">{item.type}</td>
                <td className="px-4 py-3">{item.subject}</td>
                <td className="px-4 py-3">
                  {item.tags && (
                    <div className="flex gap-1">
                      {item.tags.split(",").map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-right flex gap-2 justify-end">
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                  <button onClick={() => handleCopy(item.url, index)}>
                    <Copy className="h-4 w-4 text-gray-500 hover:text-black" />
                  </button>
                  {copied === index && <span className="text-green-500 text-xs">Copied!</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
