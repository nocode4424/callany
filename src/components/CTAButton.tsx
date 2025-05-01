import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import LoginModal from './LoginModal';
import SignupPopup from './SignupPopup';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface CTAButtonProps {
  text?: string;
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  text = 'Start Your Free Call',
  className = '',
}) => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [pendingPhone, setPendingPhone] = useState('');

  const handleButtonClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = (userData: any) => {
    login(userData);
    setShowLoginModal(false);
    navigate('/dashboard');
  };

  const handleSignupRequired = (phoneNumber: string) => {
    setPendingPhone(phoneNumber);
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSignupComplete = (userData: any) => {
    login(userData);
    setShowSignupModal(false);
    navigate('/dashboard');
  };

  return (
    <>
      <motion.button
        onClick={handleButtonClick}
        className={`px-6 py-3 bg-gradient-to-r from-tertiary-400 to-tertiary-500 text-white font-medium rounded-lg shadow-md hover:from-tertiary-500 hover:to-tertiary-600 transition-colors flex items-center justify-center ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Phone size={18} className="mr-2" />
        <span>{text}</span>
      </motion.button>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
          onSignupRequired={handleSignupRequired}
        />
      )}

      {showSignupModal && (
        <SignupPopup
          initialPhone={pendingPhone}
          onClose={() => setShowSignupModal(false)}
          onComplete={handleSignupComplete}
        />
      )}
    </>
  );
};

export default CTAButton;
