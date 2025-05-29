import React, { useState, useEffect, useRef } from 'react';

function QRScanner({ onScan }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));

  useEffect(() => {
    console.log('Requesting camera access...');
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        console.log('Camera access granted, setting video stream...');
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        scanQR();
      })
      .catch(err => {
        console.error('Camera access denied:', err);
      });

    function scanQR() {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = window.jsQR(imageData.data, imageData.width, imageData.height);
        if (code && code.data) {
          console.log('QR code detected:', code.data);
          onScan(code.data);
          video.srcObject.getTracks().forEach(track => track.stop());
        } else {
          console.log('No QR code detected in this frame');
        }
      } else {
        console.log('Video not ready, state:', video.readyState);
      }
      requestAnimationFrame(scanQR);
    }

    return () => {
      console.log('Cleaning up video stream...');
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [onScan]);

  return <video ref={videoRef} className="w-full max-w-md mx-auto rounded-lg shadow-lg"></video>;
}

function Login({ onLogin }) {
  const [scanning, setScanning] = useState(false);

  const handleScan = (userId) => {
    console.log('handleScan called with userId:', userId);
    setScanning(false);
    console.log('onLogin prop type:', typeof onLogin);
    onLogin(userId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full transform transition-all hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Consumables Replenishment</h1>
        {!scanning ? (
          <button
            onClick={() => setScanning(true)}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            Scan QR Code
          </button>
        ) : (
          <QRScanner onScan={handleScan} />
        )}
      </div>
    </div>
  );
}

export default Login;
