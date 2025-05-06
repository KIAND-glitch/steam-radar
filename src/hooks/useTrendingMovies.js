// hooks/useTrendingMovies.js
import { useState, useEffect } from "react";
import { getTrendingMovies } from "../services/tmdb";

const useTrendingMovies = (timeWindow) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingError, setTrendingError] = useState("");
  const [trendingLoading, setTrendingLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setTrendingLoading(true);
      try {
        const data = await getTrendingMovies(timeWindow);
        if (data && Array.isArray(data.results)) {
          setTrendingMovies(data.results);
        } else {
          setTrendingError("No trending movies found.");
        }
      } catch (err) {
        setTrendingError("Failed to load trending movies: " + err.message);
        console.error("Error:", err);
      } finally {
        setTrendingLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [timeWindow]);

  return { trendingMovies, trendingError, trendingLoading };
};

export default useTrendingMovies;
