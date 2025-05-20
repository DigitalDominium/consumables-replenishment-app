import React, { useState, useEffect } from 'react';

function SupervisorDashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('https://consumables-replenishment-app.onrender.com/api/logs')
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error('Error fetching logs:', err));
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Supervisor Dashboard</h1>
      <table className="w-full max-w-4xl bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">User ID</th>
            <th className="p-2">Type</th>
            <th className="p-2">Details</th>
            <th className="p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{log.user_id}</td>
              <td className="p-2">{log.type}</td>
              <td className="p-2">{log.details || 'Full Stock'}</td>
              <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupervisorDashboard;
