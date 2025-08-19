"use client";

import type React from "react";
import { useState } from "react";
import LetterGlitch from "@/components/LetterGlitch";
import DataButton from "@/components/DataButton";
import DataDrawer from "@/components/DataDrawer";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { generateMockSearchResults } from "@/lib/data";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate mock search results
    const mockResults = generateMockSearchResults(searchQuery);

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
      {/* Data Button */}
      <DataButton onClick={() => setIsDrawerOpen(true)} />

      {/* Data Drawer */}
      <DataDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Background Animation */}
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
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in-up">
            Semantic Search Movies
          </h1>
        </div>

        {/* Search Bar */}
        <SearchBar query={query} onQueryChange={handleInputChange} />

        {/* Search Results */}
        <SearchResults
          isSearching={isSearching}
          results={results}
          query={query}
        />
      </div>
    </div>
  );
}
