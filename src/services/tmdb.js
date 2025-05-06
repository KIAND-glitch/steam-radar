const TOKEN = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const defaultHeaders = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

export const getTrendingMovies = async () => {
    const res = await fetch(`${BASE_URL}/trending/movie/week?language=en-US`, {
        headers: defaultHeaders,
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch trending movies");
    return data;
};

export const searchMovies = async (query) => {
    const res = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=true&language=en-US&page=1`, {
        headers: defaultHeaders,
    });

    const data = await res.json();
    if (!res.ok) throw new Error("Failed to search movies");
    return data;
};
