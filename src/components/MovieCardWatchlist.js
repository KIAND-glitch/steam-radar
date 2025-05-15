// components/MovieCard.js
import { useAuth } from "react-oidc-context";
import { addToWatchlist, removeFromWatchlist } from "../services/watchlist";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleRemoveFromWatchlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await removeFromWatchlist(auth, movie.movieId);
      console.log("Watchlist removed:", response);
      setSuccess(true);
    } catch (err) {
      console.error("Error removing from watchlist:", err);
      setError("Failed to remove from watchlist");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white shadow-md rounded p-2" data-movie-id={movie.movieId}>
      <div className="relative top-2 right-2 flex justify-end">
        <button
          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
          aria-label="Add to Watchlist"
          onClick={handleRemoveFromWatchlist}
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
          movie.posterPath
            ? `https://image.tmdb.org/t/p/w200${movie.posterPath}`
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={movie.title}
        className="w-full h-auto rounded"
      />
      <h2 className="mt-2 font-semibold text-sm text-center">{movie.title}</h2>
      {success && <p className="text-green-500 text-xs text-center mt-1">Removed to Watchlist!</p>}
      {error && <p className="text-red-500 text-xs text-center mt-1">{error}</p>}
    </div>
  );
};

export default MovieCard;
