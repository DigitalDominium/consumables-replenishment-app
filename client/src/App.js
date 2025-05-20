import React, { useState } from 'react';
import Login from './components/Login';
import MainPage from './components/MainPage';
import SubmitFullStock from './components/SubmitFullStock';
import DiscrepancyPage from './components/DiscrepancyPage';
import SupervisorDashboard from './components/SupervisorDashboard';

const validUserIds = [
  'Consumables_Replenish_Cheok',
  'Consumables_Replenish_Sky',
  'Consumables_Replenish_Jason',
  'Consumables_Replenish_Timothy',
  'Consumables_Replenish_Wei_Hao'
];

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

function App() {
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState('main');

  if (!userId) {
    return <Login setUserId={setUserId} />;
  }

  if (userId === 'supervisor') {
    return <SupervisorDashboard />;
  }

  switch (page) {
    case 'main':
      return <MainPage userId={userId} setPage={setPage} />;
    case 'submitFull':
      return <SubmitFullStock userId={userId} setPage={setPage} />;
    case 'discrepancy':
      return <DiscrepancyPage userId={userId} setPage={setPage} />;
    default:
      return <MainPage userId={userId} setPage={setPage} />;
  }
}

export default App;
