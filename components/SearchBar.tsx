import type React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export default function SearchBar({
  query,
  onQueryChange,
  onSearch,
}: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative mb-8 animate-fade-in-up animation-delay-200 glassmorphism shadow-2xl animate-glow rounded-2xl">
      <div className="relative flex items-center h-16">
        <Search className="absolute left-6 h-6 w-6 text-gray-300 animate-pulse z-10" />
        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          onKeyPress={handleKeyPress}
          placeholder="Search anything..."
          className="w-full h-16 pl-16 pr-16 bg-transparent border-0 outline-none text-lg placeholder:text-gray-400 text-white transition-all duration-300 focus:scale-[1.02] rounded-2xl"
        />
        <button
          onClick={onSearch}
          className="absolute right-4 h-8 w-8 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-200 z-10"
          type="button"
        >
          <Search className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  );
}
