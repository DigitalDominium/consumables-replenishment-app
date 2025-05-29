import React from 'react';

function SubmitFullStock({ userId, setPage }) {
  const handleSubmit = async () => {
    await fetch('https://consumables-replenishment-app.onrender.com/api/submit-full', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, timestamp: new Date().toISOString() })
    });
    alert('Full stock submitted successfully');
    setPage('main');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full transform transition-all hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Submit Full Stock</h1>
        <div className="space-y-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            Confirm Full Stock
          </button>
          <button
            onClick={() => setPage('main')}
            className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-gray-700 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitFullStock;
