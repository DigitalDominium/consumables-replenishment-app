import React from 'react';

function MainPage({ userId, setPage }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userId}</h1>
      <button
        onClick={() => setPage('submitFull')}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        Submit Full Stock
      </button>
      <button
        onClick={() => setPage('discrepancy')}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Submit with Discrepancy
      </button>
    </div>
  );
}

export default MainPage;
