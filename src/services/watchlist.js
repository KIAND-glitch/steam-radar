// services/watchlist.js
const BASE_URL = 'https://8nrjccs6kh.execute-api.ap-southeast-2.amazonaws.com/dev/watchlist';

export const addToWatchlist = async (auth, movie) => {
    const token = auth.user?.id_token;

    if (!auth) throw new Error("Auth object is required");
    if (!token) throw new Error("User is not authenticated");
    if (!movie || !movie.id || !movie.title) throw new Error("Movie data is incomplete");

    const body = {
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
    };

    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.log(`Error adding movie to watchlist: ${res.status} ${errorText}`);
        throw new Error(`Failed to add movie to watchlist: ${res.status} ${errorText}`);
    }

    return res.json();
};

export const getWatchlist = async (auth) => {
    const token = auth.user?.id_token;

    if (!auth) throw new Error("Auth object is required");
    if (!token) throw new Error("User is not authenticated");

    const res = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.log(`Error fetching watchlist: ${res.status} ${errorText}`);
        throw new Error(`Failed to fetch watchlist: ${res.status} ${errorText}`);
    }

    return res.json();
};

export const removeFromWatchlist = async (auth, movieId) => {
    const token = auth.user?.id_token;
  
    if (!auth) throw new Error("Auth object is required");
    if (!token) throw new Error("User is not authenticated");
    if (!movieId) throw new Error("Movie ID is required");
  
    const res = await fetch(`${BASE_URL}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
        body: JSON.stringify({ movieId }),
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      console.log(`Error removing movie from watchlist: ${res.status} ${errorText}`);
      throw new Error(`Failed to remove movie from watchlist: ${res.status} ${errorText}`);
    }
  
    return res.json();
};
  
