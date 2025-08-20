import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Supabase config */
const privateKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
if (!privateKey)
  throw new Error(`Expected env var NEXT_PUBLIC_SUPABASE_API_KEY`);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error(`Expected env var NEXT_PUBLIC_SUPABASE_URL`);
export const supabase = createClient(url, privateKey);

/** Google GenAI config */
const googleGenAIKey = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
if (!googleGenAIKey)
  throw new Error(`Expected env var NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY`);
export const ai = new GoogleGenAI({
  apiKey: googleGenAIKey,
});
