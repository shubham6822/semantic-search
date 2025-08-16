"use client";

import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";
import LetterGlitch from "@/components/LetterGlitch";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock search results
    const mockResults = [
      `"${searchQuery}" - Wikipedia`,
      `Best ${searchQuery} tutorials and guides`,
      `${searchQuery} - Official documentation`,
      `How to use ${searchQuery} effectively`,
      `${searchQuery} examples and demos`,
      `Advanced ${searchQuery} techniques`,
      `${searchQuery} community discussions`,
      `Latest news about ${searchQuery}`,
    ];

    setResults(mockResults);
    setIsSearching(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start pt-20 px-4">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <LetterGlitch
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl  font-bold text-white mb-4 animate-fade-in-up">
            Semantic Search
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 animate-fade-in-up animation-delay-200">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl animate-glow"></div>
          <div className="relative flex items-center">
            <Search className="absolute left-6 h-6 w-6 text-gray-300 animate-pulse" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search anything..."
              className="w-full h-16 pl-16 pr-6 bg-transparent border-0 outline-none text-lg  placeholder:text-gray-400 text-white transition-all duration-300 focus:scale-[1.02]"
            />
          </div>
        </div>

        {/* Search Results */}
        {(isSearching || results.length > 0) && (
          <div className="relative animate-fade-in-up animation-delay-400 h-96 overflow-y-auto rounded-2xl border border-white/20 bg-white/5 shadow-2xl">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl animate-glow-subtle"></div>
            <div className="relative p-6">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                  <span className="ml-3  text-gray-300">Searching...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className=" text-sm text-gray-400 mb-4 animate-fade-in">
                    Search results for "{query}"
                  </h3>
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="group cursor-pointer p-4 rounded-xl bg-white/5 hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-white/30 hover:scale-[1.02] animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className=" text-gray-200 group-hover:text-blue-300 transition-colors duration-300">
                        {result}
                      </div>
                      <div className=" text-sm text-gray-500 mt-1">
                        https://example.com/search?q=
                        {encodeURIComponent(query)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
