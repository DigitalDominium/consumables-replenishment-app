import React, { useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';

function Login({ setUserId }) {
  const [error, setError] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  useEffect(() => {
    console.log('Initializing QR scanner...');
    const videoElement = document.getElementById('qr-video');
    if (!videoElement) {
      console.error('Video element not found');
      setError('Video element not found. Please ensure the page loaded correctly.');
      return;
    }

    const scanner = new QrScanner(
      videoElement,
      result => {
        console.log('QR code scanned successfully:', result);
        scanner.stop();
        setUserId(result);
        console.log('setUserId called with:', result);
      }
    );

    scanner.start()
      .then(() => console.log('QR scanner started'))
      .catch(err => {
        console.error('Failed to start QR scanner:', err);
        setError(`Failed to start QR scanner: ${err.message || err}`);
      });

    return () => {
      console.log('Cleaning up QR scanner');
      scanner.stop();
    };
  }, [setUserId]);

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      console.log('Manual input submitted:', manualInput);
      setUserId(manualInput.trim());
    } else {
      setError('Please enter a valid user ID');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full transform transition-all hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Scan QR Code to Login</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p>{error}</p>
          </div>
        )}
        <video id="qr-video" className="w-full rounded-lg mb-4"></video>
        <button
          onClick={() => setShowManualInput(!showManualInput)}
          className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition duration-300 mb-4"
        >
          {showManualInput ? 'Hide Manual Input' : 'Enter User ID Manually'}
        </button>
        {showManualInput && (
          <div className="space-y-4">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Enter User ID"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleManualSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
