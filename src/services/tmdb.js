const BASE_URL = 'https://8nrjccs6kh.execute-api.ap-southeast-2.amazonaws.com/dev/movies';

export const getTrendingMovies = async (timeWindow) => {
    const url = `${BASE_URL}?path=trending/movie/${timeWindow}`;
    
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error("Failed to fetch trending movies");
    return data;
};

export const searchMovies = async (query) => {
    const url = `${BASE_URL}?path=search/movie&query=${encodeURIComponent(query)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error("Failed to search movies");
    return data;
};
