"use server";

import { createClient } from "@supabase/supabase-js";
import { MovieData } from "./data";
import { GoogleGenAI } from "@google/genai";

/** Supabase config */
const privateKey = process.env.SUPABASE_API_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);
const supabase = createClient(url, privateKey);

/** Google GenAI config */
const googleGenAIKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!googleGenAIKey)
  throw new Error(`Expected env var GOOGLE_GENERATIVE_AI_API_KEY`);
const ai = new GoogleGenAI({
  apiKey: googleGenAIKey,
});

export const searchMovies = async (query: string): Promise<MovieData[]> => {
  if (!query.trim()) {
    return [];
  }

  console.log("Searching for:", query);

  const response: any = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: query,
  });

  const queryVector = response?.embeddings[0]?.values ?? [];

  // Find matching movies
  const { data } = await supabase.rpc("match_movies", {
    query_embedding: queryVector,
    match_threshold: 0.5,
    match_count: 1,
  });

  return data;
};
