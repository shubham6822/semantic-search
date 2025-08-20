import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@supabase/supabase-js";

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
