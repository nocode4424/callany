import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { checkVerification } from '../twilio';
import { toast } from 'react-toastify';

interface OTPModalProps {
  phone: string;
  onClose: () => void;
  onVerifySuccess: () => void;
}

/**
 * Modal for entering the 6-digit verification code.
 */
const OTPModal: React.FC<OTPModalProps> = ({ phone, onClose, onVerifySuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (code.trim().length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }
    setIsLoading(true);
    try {
      const verified = await checkVerification(phone, code.trim());
      if (verified) {
        toast.success('Phone verified successfully');
        onVerifySuccess();
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      toast.error('Verification failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.4 }}
      >
        <div className="p-4 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white"
          >
            <X size={20} />
          </button>
          <h3 className="text-lg font-bold">Enter Verification Code</h3>
          <p className="text-sm text-blue-100 mt-1">
            We sent a 6-digit code to {phone}.
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                maxLength={6}
                value={code}
                onChange={e => setCode(e.target.value)}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="123456"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-tertiary-400 to-tertiary-500 text-white rounded-lg disabled:opacity-70 transition-colors"
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OTPModal;