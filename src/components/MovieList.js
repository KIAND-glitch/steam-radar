import React from 'react';
import MovieCard from './MovieCardExplorer';

const MovieList = ({ movies }) => {
  const scrollLeft = () => {
    const container = document.querySelector('.movie-list-container');
    container.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.querySelector('.movie-list-container');
    container.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-full">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow"
        onClick={scrollLeft}
      >
        &#8249;
      </button>

      <div
        className="movie-list-container flex overflow-x-auto gap-4 px-10 h-[360px]"
        style={{ scrollBehavior: 'smooth' }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-[150px] h-[225px]"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow"
        onClick={scrollRight}
      >
        &#8250;
      </button>
    </div>
  );
};

export default MovieList;
