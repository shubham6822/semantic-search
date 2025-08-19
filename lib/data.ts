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
