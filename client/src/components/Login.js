import React, { useState, useEffect, useRef } from 'react';

function QRScanner({ onScan }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        scanQR();
      })
      .catch(err => console.error('Camera access denied:', err));

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
          onScan(code.data);
          video.srcObject.getTracks().forEach(track => track.stop());
        }
      }
      requestAnimationFrame(scanQR);
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return <video ref={videoRef} className="w-full max-w-md mx-auto"></video>;
}

function Login({ setUserId }) {
  const [scanning, setScanning] = useState(false);

  const handleScan = (userId) => {
    setScanning(false);
    setUserId(userId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Consumables Replenishment</h1>
      {!scanning ? (
        <button
          onClick={() => setScanning(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Scan QR Code
        </button>
      ) : (
        <QRScanner onScan={handleScan} />
      )}
    </div>
  );
}

export default Login;
