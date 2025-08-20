import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
