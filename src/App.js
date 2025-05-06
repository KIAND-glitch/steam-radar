// App.js
import './App.css';
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import useTrendingMovies from "./hooks/useTrendingMovies";  // Custom hook for trending
import useSearchMovies from "./hooks/useSearchMovies";      // Custom hook for search
import Tabs from "./components/Tabs";                        // Tabs component
import MovieList from "./components/MovieList";              // Movie list rendering
import LoadingAndError from "./components/LoadingAndError";  // Loading and Error handling

function App() {
  // States for query and active tab
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("trending"); // "trending" or "search"

  // Custom hooks for fetching movies
  const { trendingMovies, trendingError, trendingLoading } = useTrendingMovies();
  const { searchMoviesResults, searchError, searchLoading } = useSearchMovies(query);

  // Handle search trigger
  const handleSearch = () => {
    if (query) {
      setActiveTab("search"); // Switch to search tab when the user initiates a search
    }
  };

  // Handle tab switch
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "trending") {
      setQuery(""); // Clear query when switching to trending
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🎬 StreamRadar</h1>

      {/* Tabs for switching between Trending and Search */}
      <Tabs activeTab={activeTab} handleTabChange={handleTabChange} />

      {/* Search Bar for the search tab */}
      {activeTab === "search" && (
        <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} />
      )}

      {/* Loading and error handling */}
      <LoadingAndError
        activeTab={activeTab}
        searchLoading={searchLoading}
        trendingLoading={trendingLoading}
        searchError={searchError}
        trendingError={trendingError}
      />

      {/* Render movies */}
      <MovieList
        activeTab={activeTab}
        searchMoviesResults={searchMoviesResults}
        trendingMovies={trendingMovies}
      />
    </div>
  );
}

export default App;
