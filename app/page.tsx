"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import LetterGlitch from "@/components/LetterGlitch";
import DataButton from "@/components/DataButton";
import DataDrawer from "@/components/DataDrawer";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { movieData, searchMovies, type MovieData } from "@/lib/data";
import { GoogleGenAI } from "@google/genai";
import { supabase } from "@/lib/utils";

interface MovieDataVector {
  title: string;
  titleVector: number[];
  description: string;
  descriptionVector: number[];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDBCalled, setIsDBCalled] = useState(false);
  const [data, setData] = useState<MovieDataVector[]>([]);

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

  // async function main() {
  //   const ai = new GoogleGenAI({
  //     apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
  //   });

  //   try {
  //     // Generate embeddings for all movies
  //     const embeddingsPromises = movieData.map(async (movie) => {
  //       const titleVector = await ai.models.embedContent({
  //         model: "gemini-embedding-001",
  //         contents: movie.title,
  //       });
  //       const descriptionVector = await ai.models.embedContent({
  //         model: "gemini-embedding-001",
  //         contents: movie.description,
  //       });

  //       // Safely extract the embedding values
  //       const titleVectorValues = titleVector.embeddings?.[0]?.values || [];
  //       const descriptionVectorValues =
  //         descriptionVector.embeddings?.[0]?.values || [];

  //       return {
  //         title: movie.title,
  //         titleVector: titleVectorValues,
  //         description: movie.description,
  //         descriptionVector: descriptionVectorValues,
  //       };
  //     });

  //     // Wait for all embeddings to complete
  //     const movieDataWithVectors = await Promise.all(embeddingsPromises);

  //     console.log(
  //       "Inserting embeddings into Supabase...",
  //       movieDataWithVectors
  //     );

  //     // Insert into Supabase
  //     const { data: insertedData, error } = await supabase
  //       .from("movies")
  //       .insert(movieDataWithVectors);

  //     if (error) {
  //       console.error("Error inserting data:", error);
  //     } else {
  //       console.log("SUCCESS! Data inserted:", insertedData);
  //       setData(movieDataWithVectors);
  //     }

  //     setIsDBCalled(true);
  //   } catch (error) {
  //     console.error("Error in main function:", error);
  //   }
  // }

  // Run main function only once when component mounts
  // useEffect(() => {
  //   if (!isDBCalled) {
  //     main();
  //   }
  // }, [isDBCalled]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start pt-20 px-4">
      <DataButton onClick={() => setIsDrawerOpen(true)} />

      <DataDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <LetterGlitch
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in-up">
            Semantic Search Movies
          </h1>
        </div>

        <SearchBar query={query} onQueryChange={handleInputChange} />

        <SearchResults
          isSearching={isSearching}
          results={results}
          query={query}
        />
      </div>
    </div>
  );
}
