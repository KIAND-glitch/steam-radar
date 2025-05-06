// components/LoadingAndError.js
import React from 'react';

const LoadingAndError = ({ activeTab, searchLoading, trendingLoading, searchError, trendingError }) => {
  return (
    <>
      {activeTab === "search" && searchLoading && <div className="text-center text-gray-500">Loading...</div>}
      {activeTab === "trending" && trendingLoading && <div className="text-center text-gray-500">Loading trending...</div>}
      {(activeTab === "search" && searchError) || (activeTab === "trending" && trendingError) ? (
        <div className="text-center text-red-500">{activeTab === "search" ? searchError : trendingError}</div>
      ) : null}
    </>
  );
};

export default LoadingAndError;
