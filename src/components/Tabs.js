// components/Tabs.js
import React from 'react';

const Tabs = ({ tabNames, activeTab, handleTabChange }) => {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      {tabNames.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => handleTabChange(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
