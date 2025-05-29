import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import SubmitFullStock from './components/SubmitFullStock';
import DiscrepancyPage from './components/DiscrepancyPage';
import SupervisorDashboard from './components/SupervisorDashboard';
import ReachTruckChecklist from './components/ReachTruckChecklist';

function App() {
  const [page, setPage] = useState('login');
  const [userId, setUserId] = useState(null);

  const validUserIds = [
    'Consumables_Replenish_Cheok',
    'Consumables_Replenish_Sky',
    'Consumables_Replenish_Jason',
    'Consumables_Replenish_Timothy',
    'Consumables_Replenish_Wei_Hao',
    'Phua_Boon_Liat'
  ];

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      if (validUserIds.includes(storedUserId) || storedUserId === 'supervisor') {
        setUserId(storedUserId);
        setPage(storedUserId === 'supervisor' ? 'supervisor' : 'main');
      }
    }
  }, []);

  const handleLogin = (scannedUserId) => {
    if (validUserIds.includes(scannedUserId) || scannedUserId === 'supervisor') {
      setUserId(scannedUserId);
      localStorage.setItem('userId', scannedUserId);
      setPage(scannedUserId === 'supervisor' ? 'supervisor' : 'main');
    } else {
      alert('Invalid user ID');
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'main':
        return <MainPage userId={userId} setPage={setPage} />;
      case 'submitFull':
        return <SubmitFullStock userId={userId} setPage={setPage} />;
      case 'discrepancy':
        return <DiscrepancyPage userId={userId} setPage={setPage} />;
      case 'supervisor':
        return <SupervisorDashboard />;
      case 'checklist':
        return <ReachTruckChecklist userId={userId} setPage={setPage} />;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
