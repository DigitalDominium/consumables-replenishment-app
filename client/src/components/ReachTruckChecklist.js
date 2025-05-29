import React, { useState } from 'react';

function ReachTruckChecklist({ userId, setPage }) {
  const [checklist, setChecklist] = useState({
    generalCondition: false,
    forkCamera: false,
    hydraulicSystem: false,
    transitionalLiftControl: false,
    liftHeightSensors: false,
    forkAlignment: false,
    batteryStatus: false,
    steering: false,
    emergencyStop: false,
    tyres: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (item) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handleSubmit = async () => {
    const allChecked = Object.values(checklist).every(value => value === true);
    if (!allChecked) {
      alert('Please complete all checklist items before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://consumables-replenishment-app.onrender.com/api/submit-checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, checklist, timestamp: new Date().toISOString() })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert('Checklist submitted successfully');
      setPage('main');
    } catch (error) {
      console.error('Error submitting checklist:', error);
      alert('Failed to submit checklist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const checklistItems = [
    { key: 'generalCondition', label: 'General Condition (No visible damage on truck body, forks, mast)' },
    { key: 'forkCamera', label: 'Fork Camera (Camera operational, clear view on screen)' },
    { key: 'hydraulicSystem', label: 'Hydraulic System (No leaks in hydraulic system)' },
    { key: 'transitionalLiftControl', label: 'Transitional Lift Control (Smooth lifting/lowering)' },
    { key: 'liftHeightSensors', label: 'Lift Height and Load Weight Sensors (Accurate display on touchscreen)' },
    { key: 'forkAlignment', label: 'Fork Alignment and Centering (Automatic leveling and centering working)' },
    { key: 'batteryStatus', label: 'Battery Status (Adequate charge level)' },
    { key: 'steering', label: 'Steering (360° steering smooth)' },
    { key: 'emergencyStop', label: 'Emergency Stop and Alarms (Emergency stop and overload warnings functional)' },
    { key: 'tyres', label: 'Tyres and Wheels (No excessive wear or damage)' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full transform transition-all hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">BT Reflex Reach Truck Checklist</h1>
        <div className="max-h-96 overflow-y-auto mb-6">
          <div className="grid grid-cols-1 gap-4">
            {checklistItems.map(item => (
              <label key={item.key} className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition">
                <input
                  type="checkbox"
                  checked={checklist[item.key]}
                  onChange={() => handleCheckboxChange(item.key)}
                  className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                  disabled={isSubmitting}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className={`flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300 transform hover:-translate-y-1 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Checklist'}
          </button>
          <button
            onClick={() => setPage('main')}
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-gray-700 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
            disabled={isSubmitting}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReachTruckChecklist;
