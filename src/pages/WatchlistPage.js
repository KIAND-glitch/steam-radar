import React from "react";
import { useAuth } from "react-oidc-context";
import useWatchlistMovies from "../hooks/useWatchlistMovies";
import MovieCard from "../components/MovieCardWatchlist";
import LoadingAndError from "../components/LoadingAndError";

const Watchlist = () => {
  const auth = useAuth();

  const {
    watchlistMovies,
    loading,
    error,
    removeMovieFromWatchlist,
  } = useWatchlistMovies(auth);

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Watchlist</h1>

      <LoadingAndError
        activeTab="watchlist"
        searchLoading={false}
        trendingLoading={loading}
        searchError={null}
        trendingError={error}
      />

      {!loading && watchlistMovies.length === 0 && (
        <p className="text-gray-600 text-center">
          Your watchlist is empty. Start adding some movies!
        </p>
      )}

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {watchlistMovies.map((movie) => (
            <MovieCard
            key={movie.movieId}
            movie={movie}
            removeMovieFromWatchlist={removeMovieFromWatchlist}
            />
        ))}
    </div>
    </div>
  );
};

export default Watchlist;
