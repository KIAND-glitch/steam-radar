// components/SearchBar.js

const SearchBar = ({ query, setQuery, handleSearch }) => {
    return (
      <div className="flex items-center justify-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          className="border p-2 rounded w-full max-w-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    );
  };
  
  export default SearchBar;
  