// components/MovieList.js
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, activeTab, searchMoviesResults, trendingMovies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {activeTab === "search" && searchMoviesResults.length > 0 ? (
        searchMoviesResults.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : activeTab === "trending" && trendingMovies.length > 0 ? (
        trendingMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <div className="text-center text-gray-500">No movies available.</div>
      )}
    </div>
  );
};

export default MovieList;
