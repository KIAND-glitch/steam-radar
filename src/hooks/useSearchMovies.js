// hooks/useSearchMovies.js
import { useState, useEffect } from "react";
import { searchMovies } from "../services/tmdb";

const useSearchMovies = (query) => {
  const [searchMoviesResults, setSearchMoviesResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!query) return; // Don't fetch if the query is empty

    const fetchSearchMovies = async () => {
      setSearchLoading(true);
      try {
        const data = await searchMovies(query);
        if (data && Array.isArray(data.results)) {
          setSearchMoviesResults(data.results);
        } else {
          setSearchError("No results found for the search.");
        }
      } catch (err) {
        setSearchError("Failed to search movies: " + err.message);
        console.error("Error:", err);
      } finally {
        setSearchLoading(false);
      }
    };

    fetchSearchMovies();
  }, [query]);

  return { searchMoviesResults, searchError, searchLoading };
};

export default useSearchMovies;
