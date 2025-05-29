import React, { useState } from 'react';

function DiscrepancyPage({ userId, setPage }) {
  const [discrepancies, setDiscrepancies] = useState({});

  const handleCheckboxChange = (item) => {
    setDiscrepancies(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handleSubmit = async () => {
    const selectedDiscrepancies = Object.keys(discrepancies).filter(item => discrepancies[item]);
    if (selectedDiscrepancies.length === 0) {
      alert('Please select at least one discrepancy');
      return;
    }
    await fetch('https://consumables-replenishment-app.onrender.com/api/submit-discrepancy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, discrepancies: selectedDiscrepancies, timestamp: new Date().toISOString() })
    });
    alert('Discrepancies submitted successfully');
    setPage('main');
  };

  const consumablesList = [
    'Handle with Care Sticker', 'Different Quantity and Kit Sticker', 'Clear Tape', 'Brown Tape',
    'Latex Gloves', 'Cotton Gloves', 'Cardboard 4" X 7"', 'Cardboard 6" X 6"', 'Cardboard 6" X 9"',
    'Cardboard 9" X 12"', 'Cardboard 10" X 10.5"', 'Shrink Wrap', 'Coating Oil', 'Thermal Ribbon',
    'Picking Label', 'Material Label', 'CTN142', 'CTN132', 'CTN182', 'Rubbish Bag', 'CT100', 'CT45',
    'CT95', 'CT130', 'VCI Plastic 4" X 7"', 'VCI Plastic 6" X 9"', 'VCI Plastic 8" X 12"',
    'VCI Plastic 9" X 18"', 'VCI Plastic 12" X 16"', 'VCI Plastic 14" X 28"', 'VCI Plastic 25" X 22"',
    'Clear Plastic 4" X 7"', 'Clear Plastic 6" X 6"', 'Clear Plastic 6" X 9"', 'Clear Plastic 9" X 14"',
    'Clear Plastic 10" X 12"', 'Clear Plastic 13.5" X 16"', 'Clear Plastic 16" X 24"', 'Long Clear Plastic',
    'Long VCI Plastic', 'CT360', 'CT390', 'CT240', 'CT250'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full transform transition-all hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Submit Discrepancies</h1>
        <div className="max-h-96 overflow-y-auto mb-6">
          <div className="grid grid-cols-2 gap-4">
            {consumablesList.map(item => (
              <label key={item} className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition">
                <input
                  type="checkbox"
                  checked={discrepancies[item] || false}
                  onChange={() => handleCheckboxChange(item)}
                  className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            Submit Discrepancies
          </button>
          <button
            onClick={() => setPage('main')}
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-gray-700 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiscrepancyPage;
