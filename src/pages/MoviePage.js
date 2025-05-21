// pages/MoviePage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails } from '../services/movies';
import { addToWatchlist } from '../services/watchlist';
import { useAuth } from '../auth/authContext';

import { BookmarkPlus, BookmarkCheck } from 'lucide-react';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

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

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  

  if (!movie) return <p className="text-center mt-8 text-lg">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">{movie.title}</h1>
          {movie.tagline && <p className="italic text-gray-500 mb-4">"{movie.tagline}"</p>}
        </div>
        <button
        className={`p-2 rounded-full transition-colors focus:outline-none ${
          success ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'
        }`}
        onClick={handleAddToWatchlist}
        disabled={loading || success}
        aria-label="Add to Watchlist"
      >
        {loading ? (
          <span className="text-sm text-gray-500">Adding...</span>
        ) : success ? (
          <BookmarkCheck className="h-5 w-5 text-green-600" />
        ) : (
          <BookmarkPlus className="h-5 w-5 text-gray-600" />
        )}
      </button>
      </div>


      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-[300px] rounded shadow-md"
        />

        <div className="flex-1 space-y-4">
          <p className="text-gray-700">{movie.overview}</p>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime} mins
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
            </p>
            <p>
              <strong>Language:</strong> {movie.spoken_languages.map((lang) => lang.english_name).join(', ')}
            </p>
            <p>
              <strong>Country:</strong> {movie.production_countries.map((c) => c.name).join(', ')}
            </p>
            <p>
              <strong>Budget:</strong> ${movie.budget.toLocaleString()}
            </p>
            <p>
              <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
            </p>
          </div>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-blue-600 hover:underline"
            >
              Visit Official Site
            </a>
          )}

          {movie.imdb_id && (
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-yellow-700 hover:underline"
            >
              View on IMDb
            </a>
          )}
        </div>
      </div>

      {movie.production_companies.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Production Companies</h2>
          <div className="flex flex-wrap gap-6">
            {movie.production_companies.map((company) => (
              <div key={company.id} className="w-32 text-center">
                {company.logo_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    className="mx-auto mb-1 max-h-16 object-contain"
                  />
                ) : (
                  <div className="h-16 flex items-center justify-center bg-gray-100 text-xs text-gray-500">
                    No Logo
                  </div>
                )}
                <p className="text-xs mt-1">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
