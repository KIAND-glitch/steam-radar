import { useState, useEffect } from 'react';
import { getWatchlist, removeFromWatchlist } from '../services/watchlist';

const useWatchlistMovies = (auth) => {
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatchlistMovies = async () => {
            try {
                setLoading(true);
                const movies = await getWatchlist(auth);
                setWatchlistMovies(movies);
            } catch (err) {
                setError(err.message || 'Failed to fetch watchlist movies');
            } finally {
                setLoading(false);
            }
        };

        if (auth?.user) {
            fetchWatchlistMovies();
        }
    }, [auth]);

    const removeMovieFromWatchlist = async (movieId) => {
        try {
            await removeFromWatchlist(auth, movieId);
            setWatchlistMovies((prevMovies) => prevMovies.filter((movie) => movie.movieId !== movieId));
        } catch (err) {
            setError(err.message || 'Failed to remove movie from watchlist');
        }
    };

    return { watchlistMovies, loading, error, removeMovieFromWatchlist };
};

export default useWatchlistMovies;
