import './App.css';
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import useTrendingMovies from "./hooks/useTrendingMovies";  // Custom hook for trending
import useSearchMovies from "./hooks/useSearchMovies";      // Custom hook for search
import Tabs from "./components/Tabs";                        // Tabs component
import MovieList from "./components/MovieList";              // Movie list rendering
import LoadingAndError from "./components/LoadingAndError";  // Loading and Error handling

function App() {
  // States for query, active tab, and search trigger
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("trending"); // "trending" or "search"
  const [trendingTimeWindow, setTrendingTimeWindow] = useState("day"); // "day" or "week"
  const [shouldSearch, setShouldSearch] = useState(false); // Controls when to search

  // Custom hooks for fetching movies
  const { trendingMovies, trendingError, trendingLoading } = useTrendingMovies(trendingTimeWindow);
  const { searchMoviesResults, searchError, searchLoading } = useSearchMovies(query, shouldSearch);

  // Handle search trigger
  const handleSearch = () => {
    if (query.trim()) {
      setActiveTab("search");
      setShouldSearch(true);
  
      // Reset after a short delay so it can be triggered again if needed
      setTimeout(() => setShouldSearch(false), 100); 
    }
  };
  

  // Handle tab switch
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "trending") {
      setQuery(""); // Clear query when switching to trending
      setShouldSearch(false); // Reset search trigger
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🎬 StreamRadar</h1>

      {/* Tabs for switching between Trending and Search */}
      <Tabs tabNames={['trending', 'search']} activeTab={activeTab} handleTabChange={handleTabChange} />

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
      {/* Render trending time tabs */}
      {activeTab === "trending" && (
        <div className="flex justify-center mb-4">
          <button
            onClick={() => {
              setTrendingTimeWindow("day")
            }}
            className={`px-4 py-2 rounded ${trendingTimeWindow === "day" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Day
          </button>
          <button
            onClick={() => {
              setTrendingTimeWindow("week")
            }}
            className={`px-4 py-2 rounded ${trendingTimeWindow === "week" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Week
          </button>
        </div>
      )}

      {/* Render movies */}
      <MovieList movies={activeTab === "search" ? searchMoviesResults : trendingMovies}/>
    </div>
  );
}

export default App;
