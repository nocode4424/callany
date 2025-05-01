import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, isLoading, login, logout } = useAuth();
  if (isLoading) return null;
  const isLoggedIn = Boolean(user);
  const userPhone = user?.phone_number || '';

  const handleLogin = (userData: any) => {
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  isLoggedIn={isLoggedIn} 
                  userPhone={userPhone} 
                  onLogin={handleLogin} 
                  onLogout={handleLogout} 
                />
              } 
            />
            <Route 
              path="/privacy" 
              element={
                <PrivacyPage 
                  isLoggedIn={isLoggedIn} 
                  userPhone={userPhone} 
                  onLogin={handleLogin} 
                  onLogout={handleLogout} 
                />
              } 
            />
            <Route 
              path="/terms" 
              element={
                <TermsPage 
                  isLoggedIn={isLoggedIn} 
                  userPhone={userPhone} 
                  onLogin={handleLogin} 
                  onLogout={handleLogout} 
                />
              } 
            />
            <Route 
              path="/about" 
              element={
                <AboutPage 
                  isLoggedIn={isLoggedIn} 
                  userPhone={userPhone} 
                  onLogin={handleLogin} 
                  onLogout={handleLogout} 
                />
              } 
            />
            <Route 
              path="/contact" 
              element={
                <ContactPage 
                  isLoggedIn={isLoggedIn} 
                  userPhone={userPhone} 
                  onLogin={handleLogin} 
                  onLogout={handleLogout} 
                />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isLoggedIn ? 
                <DashboardPage phone={userPhone} onLogout={handleLogout} /> : 
                <Navigate to="/" replace />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;