import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, CheckCircle } from 'lucide-react';

const CallExampleWithPhone: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);

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


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhone);
    
    // Validate if we have at least 10 digits
    const digitsOnly = formattedPhone.replace(/\D/g, '');
    setIsPhoneValid(digitsOnly.length === 10 || digitsOnly.length === 0);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Validate phone number before proceeding
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      setIsPhoneValid(false);
      return;
    }
    
    // Navigate to the start-now section
    document.getElementById('start-now')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-primary-700 to-primary-600 rounded-xl overflow-hidden shadow-xl mt-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="p-8 md:p-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">Don't see what you need?</h3>
          <p className="text-purple-100 text-lg mb-6 text-center">
            Our AI can handle most routine phone calls. Try it with your specific request!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="w-full sm:w-2/3 relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(123) 456-7890"
                className={`w-full px-4 py-3.5 rounded-lg bg-white text-gray-800 shadow-lg border ${!isPhoneValid ? 'border-red-500 ring-1 ring-red-500' : 'border-transparent'} focus:outline-none`}
              />
              {!isPhoneValid && (
                <p className="text-yellow-300 text-sm mt-1 absolute">Please enter a valid 10-digit phone number</p>
              )}
            </div>
            
            <motion.button 
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-tertiary-400 to-tertiary-500 text-white font-bold rounded-lg text-lg shadow-lg hover:from-tertiary-500 hover:to-tertiary-600 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(249, 129, 40, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <PhoneCall className="mr-2" size={20} />
              <span>Start Your <span className="font-bold">Free Call</span></span>
            </motion.button>
          </div>

          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center text-sm text-secondary-400 bg-white/10 px-4 py-2 rounded-full">
              <CheckCircle size={16} className="mr-2" />
              <span>100% Risk Free - Cancel Anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CallExampleWithPhone;