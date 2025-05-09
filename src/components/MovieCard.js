// components/MovieCard.js
import { useAuth } from "react-oidc-context";
import { addToWatchlist } from "../services/watchlist"; // adjust path if needed
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToWatchlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await addToWatchlist(auth, movie);
      console.log("Watchlist added:", response);
      setSuccess(true);
    } catch (err) {
      console.error("Error adding to watchlist:", err);
      setError("Failed to add to watchlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-2" data-movie-id={movie.id}>
      <div className="relative top-2 right-2 flex justify-end">
        <button
          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
          aria-label="Add to Watchlist"
          onClick={handleAddToWatchlist}
          disabled={loading}
        >
          {loading ? (
            <span className="text-xs text-gray-500">...</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          )}
        </button>
      </div>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={movie.title}
        className="w-full h-auto rounded"
      />
      <h2 className="mt-2 font-semibold text-sm text-center">{movie.title}</h2>
      {success && <p className="text-green-500 text-xs text-center mt-1">Added to Watchlist!</p>}
      {error && <p className="text-red-500 text-xs text-center mt-1">{error}</p>}
    </div>
  );
};

export default MovieCard;
