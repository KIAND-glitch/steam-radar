import { getTrendingMoviesAU } from '../services/trendingAU';
import { useState, useEffect } from 'react';
import { useAuth } from "../auth/authContext";


const useTrendingAUMovies = () => {
    const auth = useAuth();

    const [trending, setTrending] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchTrending = async () => {
        try {
            const data = await getTrendingMoviesAU(auth);
            setTrending(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        };
    
        fetchTrending();
    }, [auth]);
    
    return { trending, error, loading };
}

export default useTrendingAUMovies;
