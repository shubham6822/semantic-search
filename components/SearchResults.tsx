import type React from "react";

interface SearchResultsProps {
  isSearching: boolean;
  results: string[];
  query: string;
}

export default function SearchResults({
  isSearching,
  results,
  query,
}: SearchResultsProps) {
  if (!isSearching && results.length === 0) {
    return null;
  }

  return (
    <div className="relative animate-fade-in-up animation-delay-400 h-[calc(100vh-20rem)] overflow-y-auto rounded-2xl glassmorphism shadow-2xl animate-glow-subtle custom-scrollbar">
      <div className="relative p-6 z-10">
        {isSearching ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-3 text-gray-300">Searching...</span>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-sm text-gray-400 mb-4 animate-fade-in">
              Search results for "{query}"
            </h3>
            {results.map((result, index) => (
              <div
                key={index}
                className="group cursor-pointer p-4 rounded-xl 
                  bg-[rgba(255,255,255,0.03)]
                  hover:bg-[rgba(255,255,255,0.07)]
                  backdrop-blur-md
                  transition-all duration-300 
                  border border-[rgba(255,255,255,0.1)]
                  hover:border-[rgba(255,255,255,0.2)]
                  hover:scale-[1.02] 
                  animate-fade-in-up
                  shadow-[0_4px_16px_0_rgba(0,0,0,0.2)]
                  hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.3)]
                  before:content-[''] before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-white/5 before:to-transparent
                  relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-gray-200 group-hover:text-blue-300 transition-colors duration-300">
                  {result}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  https://example.com/search?q=
                  {encodeURIComponent(query)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
