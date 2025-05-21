import React from 'react';
import { useState } from 'react';
import useTrendingAUMovies from '../hooks/useTrendingAUMovies';

const AU_PROVIDERS = [
    "Disney Plus",
    "Netflix",
    "Amazon Prime Video",
    "Paramount Plus",
    "Foxtel Now",
    "BritBox",
    "Stan",
    "Apple TV",
    "Apple TV+",
    "Amazon Video",
    "Google Play Movies",
    "YouTube Premium",
    "9Now",
    "DocPlay",
    "Microsoft Store",
    "7plus",
    "ABC iview",
    "SBS On Demand",
    "YouTube",
    "tenplay",
    "MUBI",
    "Netflix Kids",
    "Tubi TV",
    "GuideDoc",
    "Acorn TV",
    "Sun Nxt",
    "OzFlix",
    "Fetch TV",
    "Beamafilm",
    "Shudder",
    "DOCSVILLE",
    "Curiosity Stream",
    "WOW Presents Plus",
    "Magellan TV",
    "BroadwayHD",
    "Filmzie",
    "Dekkoo",
    "True Story",
    "Hoichoi",
    "Plex",
    "Eventive",
    "Cultpix",
    "FilmBox+",
    "Takflix",
    "AMC+",
    "Crunchyroll",
    "Shahid VIP",
    "Zee5",
    "Hoopla",
    "JustWatchTV",
    "Paramount Plus Premium",
    "Paramount Plus Basic with Ads",
    "BINGE",
    "Gaia",
    "Jolt Film",
    "FOUND TV",
    "Stupid Co",
    "Kocowa"
  ];
  
  const TrendingAUMoviesPage = ({ auth }) => {
    const { trending, error, loading } = useTrendingAUMovies(auth);
    const [selectedProviders, setSelectedProviders] = useState([]);
  
    const toggleProvider = (provider) => {
      setSelectedProviders((prev) =>
        prev.includes(provider)
          ? prev.filter((p) => p !== provider)
          : [...prev, provider]
      );
    };
  
    const filteredMovies = selectedProviders.length
    ? trending.filter((movie) => {
        const all = Object.values(movie.providers || {}).flat();
        return selectedProviders.some((p) => all.includes(p));
      })
    : trending;
  
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">🇦🇺 Trending in Australia</h1>
  
        <div className="mb-6">
          <p className="mb-2 text-sm font-medium text-gray-700">Filter by Provider(s):</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto border rounded p-3 bg-gray-50">
            {AU_PROVIDERS.map((provider) => (
              <label key={provider} className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  value={provider}
                  checked={selectedProviders.includes(provider)}
                  onChange={() => toggleProvider(provider)}
                  className="accent-blue-600"
                />
                <span>{provider}</span>
              </label>
            ))}
          </div>
        </div>
  
        {loading && <p>Loading movies...</p>}
        {error && <p className="text-red-600">Error loading movies: {error.message}</p>}
  
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-3">
                  <h2 className="text-sm font-semibold">{movie.title}</h2>
                  <p className="text-xs text-gray-500">{movie.release_date}</p>
                  {movie.providers?.flatrate?.length > 0 && (
                    <p className="text-xs mt-1 text-gray-700">
                      Available on: {movie.providers.flatrate.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default TrendingAUMoviesPage;
