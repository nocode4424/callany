import React from 'react';
import Dashboard from '../components/Dashboard';

interface DashboardPageProps {
  phone: string;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ phone, onLogout }) => {
  return (
    <Dashboard phone={phone} onLogout={onLogout} />
  );
};

export default DashboardPage;