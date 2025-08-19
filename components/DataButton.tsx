import type React from "react";
import { Database } from "lucide-react";

interface DataButtonProps {
  onClick: () => void;
}

export default function DataButton({ onClick }: DataButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-6 right-6 z-50 glassmorphism hover:bg-[rgba(255,255,255,0.2)] transition-all duration-300 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 group flex items-center"
    >
      <Database className="h-5 w-5 text-white group-hover:text-blue-300 transition-colors duration-300" />
      <span className="ml-2 text-white text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
        Data
      </span>
    </button>
  );
}
