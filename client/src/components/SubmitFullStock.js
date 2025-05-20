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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Submit Full Stock</h1>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        Confirm Full Stock
      </button>
      <button
        onClick={() => setPage('main')}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>
    </div>
  );
}

export default SubmitFullStock;
