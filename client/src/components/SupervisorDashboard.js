import React, { useState, useEffect } from 'react';

function SupervisorDashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('https://consumables-backend-xyz.onrender.com/api/logs')
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error('Error fetching logs:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl w-full transform transition-all hover:scale-105">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Supervisor Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-3 text-left font-semibold rounded-tl-lg">User ID</th>
                <th className="p-3 text-left font-semibold">Type</th>
                <th className="p-3 text-left font-semibold">Details</th>
                <th className="p-3 text-left font-semibold rounded-tr-lg">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-100 transition`}
                >
                  <td className="p-3 text-gray-700">{log.user_id}</td>
                  <td className="p-3 text-gray-700">{log.type}</td>
                  <td className="p-3 text-gray-700">{log.details || 'Full Stock'}</td>
                  <td className="p-3 text-gray-700">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SupervisorDashboard;
