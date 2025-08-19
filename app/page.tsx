"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import LetterGlitch from "@/components/LetterGlitch";
import DataButton from "@/components/DataButton";
import DataDrawer from "@/components/DataDrawer";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { searchMovies, type MovieData } from "@/lib/data";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery: string) => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timeoutId);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Simulate search delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Search through movie data
    const movieResults = searchMovies(searchQuery);

    setResults(movieResults);
    setIsSearching(false);
  };

  // Effect to handle debounced search
  useEffect(() => {
    if (query.trim()) {
      const cleanup = debouncedSearch(query);
      return cleanup;
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [query, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    // Debounced search will be triggered by useEffect
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
