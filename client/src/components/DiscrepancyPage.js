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
    await fetch('/api/submit-discrepancy', {
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Submit Discrepancies</h1>
      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        {consumablesList.map(item => (
          <label key={item} className="flex items-center">
            <input
              type="checkbox"
              checked={discrepancies[item] || false}
              onChange={() => handleCheckboxChange(item)}
              className="mr-2"
            />
            {item}
          </label>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
        >
          Submit Discrepancies
        </button>
        <button
          onClick={() => setPage('main')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default DiscrepancyPage;
