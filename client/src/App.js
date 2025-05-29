import React, { useState, useEffect } from 'react';
import Login from './components/Login';
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
      console.log('Found stored userId:', storedUserId);
      if (validUserIds.includes(storedUserId) || storedUserId === 'supervisor') {
        setUserId(storedUserId);
        setPage(storedUserId === 'supervisor' ? 'supervisor' : 'main');
        console.log('Navigating to page:', storedUserId === 'supervisor' ? 'supervisor' : 'main');
      } else {
        console.log('Stored userId is invalid:', storedUserId);
      }
    }
  }, []);

  useEffect(() => {
    console.log('userId updated:', userId);
  }, [userId]);

  useEffect(() => {
    console.log('page updated:', page);
  }, [page]);

  const handleLogin = (scannedUserId) => {
    const trimmedUserId = scannedUserId.trim();
    console.log('handleLogin called with scannedUserId:', trimmedUserId);
    if (validUserIds.includes(trimmedUserId) || trimmedUserId === 'supervisor') {
      console.log('User ID is valid:', trimmedUserId);
      setUserId(trimmedUserId);
      localStorage.setItem('userId', trimmedUserId);
      const newPage = trimmedUserId === 'supervisor' ? 'supervisor' : 'main';
      setPage(newPage);
      console.log('Navigating to page:', newPage);
    } else {
      console.log('Invalid user ID:', trimmedUserId);
      alert('Invalid user ID');
    }
  };

  const renderPage = () => {
    console.log('Rendering page:', page);
    switch (page) {
      case 'login':
        return <Login onLogin={handleLogin} />;
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
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
