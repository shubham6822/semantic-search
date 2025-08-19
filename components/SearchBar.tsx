import type React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative mb-8 animate-fade-in-up animation-delay-200 glassmorphism shadow-2xl animate-glow rounded-2xl">
      <div className="relative flex items-center h-16">
        <Search className="absolute left-6 h-6 w-6 text-gray-300 animate-pulse z-10" />
        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          placeholder="Search anything..."
          className="w-full h-16 pl-16 pr-6 bg-transparent border-0 outline-none text-lg placeholder:text-gray-400 text-white transition-all duration-300 focus:scale-[1.02] rounded-2xl"
        />
      </div>
    </div>
  );
}
