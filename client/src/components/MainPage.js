import React from 'react';

function MainPage({ userId, setPage }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full transform transition-all hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome, {userId}!</h1>
        <div className="space-y-4">
          <button
            onClick={() => setPage('submitFull')}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            Submit Full Stock
          </button>
          <button
            onClick={() => setPage('discrepancy')}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            Submit with Discrepancy
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
