import React from 'react';

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-lg">
      {/* Logo on the left */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-semibold">Demo Logo</span>
      </div>

      {/* Search bar in the center */}
      <div className="flex-grow max-w-md mx-4">
        <input
          type="text"
          placeholder="Search doctors, conditions etc."
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Login button on the right */}
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer">
        Login
      </button>
    </div>
  );
};

export default Header;
