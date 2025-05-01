import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Phone, ArrowRight } from 'lucide-react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import OTPModal from './OTPModal';
import { startVerification } from '../twilio';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
  onSignupRequired: (phoneNumber: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ 
  onClose, 
  onLoginSuccess, 
  onSignupRequired 
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format the phone number as (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneNumber = parsePhoneNumberFromString(phone, 'US');
    return phoneNumber ? phoneNumber.isValid() : false;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhone);
    
    if (phoneError) {
      setPhoneError('');
    }
  };

  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone
    if (!phoneNumber.trim()) {
      setPhoneError('Please enter your phone number');
      return;
    }
    
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    if (digitsOnly.length !== 10 || !validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit US phone number');
      return;
    }
    
    setIsLoading(true);
    try {
      // Send verification code via Twilio
      await startVerification(phoneNumber);
      setShowOTP(true);
    } catch (err) {
      console.error('Verification start error:', err);
      toast.error('Failed to send verification code. Please try again later.');
      setIsLoading(false);
    }
  };
  
  /**
   * After OTP verification, attempt to login or redirect to signup
   */
  const handleVerifySuccess = async () => {
    setShowOTP(false);
    try {
      const user = await auth.loginByPhone(phoneNumber);
      toast.success('Welcome back!');
      onLoginSuccess(user);
    } catch (error: any) {
      if (error.message === 'User not found') {
        onSignupRequired(phoneNumber);
      } else {
        console.error('Login error:', error);
        toast.error('Failed to log in. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center mb-2">
            <Phone className="mr-2" size={24} />
            <h2 className="text-xl font-bold">Log In</h2>
          </div>
          <p className="text-blue-100">
            Enter your phone number to access your account
          </p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(123) 456-7890"
                className={`w-full px-4 py-3 rounded-lg border ${
                  phoneError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors`}
              />
              {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
            </div>
            
            <div className="flex justify-center">
              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-tertiary-400 to-tertiary-500 text-white font-semibold rounded-lg hover:from-tertiary-500 hover:to-tertiary-600 transition-colors flex items-center justify-center disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Continue <ArrowRight className="ml-2" size={18} />
                  </span>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
      {showOTP && (
        <OTPModal
          phone={phoneNumber}
          onClose={() => { setShowOTP(false); setIsLoading(false); }}
          onVerifySuccess={handleVerifySuccess}
        />
      )}
      </motion.div>
    </>
  );
};

export default LoginModal;