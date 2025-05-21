const BASE_URL = 'https://api.themoviedb.org/3/movie/';

export const getMovieDetails = async (id) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`,
    };
    const res = await fetch(`${BASE_URL}${id}?language=en-US`, {
        method: 'GET',
        headers,
    });
    
    if (!res.ok) {
        const errorText = await res.text();
        console.log(`Error fetching movie details: ${res.status} ${errorText}`);
        throw new Error(`Failed to fetch movie details: ${res.status} ${errorText}`);
    }
    
    return res.json();
}