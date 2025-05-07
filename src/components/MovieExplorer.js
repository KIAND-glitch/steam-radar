// components/MovieExplorer.js
import { useState } from "react";
import SearchBar from "./SearchBar";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useSearchMovies from "../hooks/useSearchMovies";
import Tabs from "./Tabs";
import MovieList from "./MovieList";
import LoadingAndError from "./LoadingAndError";

const MovieExplorer = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("trending");
  const [trendingTimeWindow, setTrendingTimeWindow] = useState("day");
  const [shouldSearch, setShouldSearch] = useState(false);

  const { trendingMovies, trendingError, trendingLoading } = useTrendingMovies(trendingTimeWindow);
  const { searchMoviesResults, searchError, searchLoading } = useSearchMovies(query, shouldSearch);

  const handleSearch = () => {
    if (query.trim()) {
      setActiveTab("search");
      setShouldSearch(true);
      setTimeout(() => setShouldSearch(false), 100);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "trending") {
      setQuery("");
      setShouldSearch(false);
    }
  };

  return (
    <>
      <Tabs tabNames={['trending', 'search']} activeTab={activeTab} handleTabChange={handleTabChange} />

      {activeTab === "search" && (
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
      )}

      <LoadingAndError
        activeTab={activeTab}
        searchLoading={searchLoading}
        trendingLoading={trendingLoading}
        searchError={searchError}
        trendingError={trendingError}
      />

      {activeTab === "trending" && (
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setTrendingTimeWindow("day")}
            className={`px-4 py-2 rounded ${trendingTimeWindow === "day" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Day
          </button>
          <button
            onClick={() => setTrendingTimeWindow("week")}
            className={`px-4 py-2 rounded ${trendingTimeWindow === "week" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Week
          </button>
        </div>
      )}

      <MovieList movies={activeTab === "search" ? searchMoviesResults : trendingMovies} />
    </>
  );
};

export default MovieExplorer;
