import { ai, supabase } from "./utils";

export interface MovieData {
  title: string;
  description: string;
}

export const movieData: MovieData[] = [
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
  },
  {
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
  },
  {
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
  },
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    title: "The Matrix",
    description:
      "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
  },
  {
    title: "Goodfellas",
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
  },
  {
    title: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into an anarchist organization.",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
  },
  {
    title: "Star Wars: Episode IV - A New Hope",
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
  },
  {
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival on a dying Earth.",
  },
];

export const generateMockSearchResults = (query: string): string[] => {
  return [
    `"${query}" - Wikipedia`,
    `Best ${query} tutorials and guides`,
    `${query} - Official documentation`,
    `How to use ${query} effectively`,
    `${query} examples and demos`,
    `Advanced ${query} techniques`,
    `${query} community discussions`,
    `Latest news about ${query}`,
  ];
};

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
    match_count: 3,
  });
  console.log("Found movies:", data);

  return data;
};
