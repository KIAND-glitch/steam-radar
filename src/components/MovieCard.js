// components/MovieCard.js

const MovieCard = ({ movie }) => {
    return (
      <div key={movie.id} className="bg-white shadow-md rounded p-2">
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
      </div>
    );
  };
  
  export default MovieCard;
  