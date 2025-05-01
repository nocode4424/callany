import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { toast } from 'react-toastify';
import LoginModal from './LoginModal';
import SignupPopup from './SignupPopup';

interface LoginButtonProps {
  className?: string;
  onLoginSuccess: (userData: any) => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ 
  className = "", 
  onLoginSuccess 
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [pendingPhoneNumber, setPendingPhoneNumber] = useState('');

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = (userData: any) => {
    setShowLoginModal(false);
    onLoginSuccess(userData);
  };

  const handleSignupRequired = (phoneNumber: string) => {
    setShowLoginModal(false);
    setPendingPhoneNumber(phoneNumber);
    setShowSignupModal(true);
  };

  const handleSignupSuccess = (userData: any) => {
    setShowSignupModal(false);
    onLoginSuccess(userData);
    toast.success("Account created successfully! Welcome to FinishTheList.");
  };

  return (
    <>
      <motion.button
        onClick={handleLoginClick}
        className={`bg-white text-primary-700 border border-primary-700 px-4 py-2 rounded-md flex items-center hover:bg-primary-50 transition-colors ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogIn size={18} className="mr-2" />
        Log In
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
          initialPhone={pendingPhoneNumber}
          onClose={() => setShowSignupModal(false)}
          onComplete={handleSignupSuccess}
        />
      )}
    </>
  );
};

export default LoginButton;