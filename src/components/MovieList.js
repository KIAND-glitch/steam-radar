// components/MovieList.js
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, activeTab, searchMoviesResults, trendingMovies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {
        movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))
      }
    </div>
  );
};

export default MovieList;
