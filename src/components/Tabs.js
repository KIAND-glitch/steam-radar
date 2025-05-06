// components/Tabs.js
import React from 'react';

const Tabs = ({ activeTab, handleTabChange }) => {
  return (
    <div className="flex justify-center gap-4 mb-4">
      <button
        className={`px-4 py-2 rounded ${activeTab === "trending" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => handleTabChange("trending")}
      >
        Trending
      </button>
      <button
        className={`px-4 py-2 rounded ${activeTab === "search" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => handleTabChange("search")}
      >
        Search
      </button>
    </div>
  );
};

export default Tabs;
