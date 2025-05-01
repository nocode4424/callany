import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, User, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../supabase/client';

interface CallConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  callData: {
    target_name: string;
    target_phone: string;
    goal: string;
    important_info?: string;
  };
  userData: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    zip_code: string;
  } | null;
}

const CallConfirmationModal: React.FC<CallConfirmationModalProps> = ({
  onClose,
  onConfirm,
  callData,
  userData
}) => {
  const [actingAs, setActingAs] = useState<'self' | 'assistant'>('self');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setError('You must agree to the Terms and Conditions');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      if (!userData) {
        throw new Error('No user data available');
      }
      
      const now = new Date().toISOString();
      
      // Create the bundled JSON object for record-keeping
      const callBundle = {
        user: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          zip_code: userData.zip_code,
          phone_number: userData.phone_number
        },
        call: {
          target_name: callData.target_name,
          target_phone: callData.target_phone,
          goal: callData.goal,
          important_info: callData.important_info || '',
          acting_as: actingAs,
          agreed_to_terms: agreedToTerms,
          agreed_at: now,
          call_requested_at: now,
          call_status: 'pending'
        }
      };
      
      console.log('Creating call with user_id:', userData.id);
      
      // Insert the call data
      const { error: insertError } = await supabase
        .from('calls')
        .insert([{
          user_id: userData.id, // Using userData.id which should be the phone number
          target_name: callData.target_name,
          target_phone: callData.target_phone,
          goal: callData.goal,
          important_info: callData.important_info,
          acting_as: actingAs,
          call_status: 'pending',
          agreed_to_terms: agreedToTerms,
          agreed_at: now,
          call_requested_at: now,
          final_bundle: callBundle
        }]);
      
      if (insertError) {
        console.error('Database insertion error:', insertError);
        throw new Error(`Failed to create call: ${insertError.message}`);
      }
      
      toast.success('Your call has been scheduled! We\'ll handle it right away.');
      onConfirm();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error scheduling call:', err);
      toast.error(`Failed to schedule call: ${errorMessage}`);
      setError('An error occurred while scheduling your call. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          <h2 className="text-xl font-bold mb-2">Call Confirmation</h2>
          <p className="text-blue-100">
            We're ready to make this call for you. Just one more step!
          </p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Would you like us to call as you or as your assistant?
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setActingAs('self')}
                  className={`p-4 border rounded-lg flex flex-col items-center hover:border-primary-600 transition-colors ${
                    actingAs === 'self' ? 'border-2 border-primary-600 bg-primary-50' : 'border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                    <User size={24} className="text-primary-700" />
                  </div>
                  <span className="font-medium text-gray-900">Call as Me</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setActingAs('assistant')}
                  className={`p-4 border rounded-lg flex flex-col items-center hover:border-primary-600 transition-colors ${
                    actingAs === 'assistant' ? 'border-2 border-primary-600 bg-primary-50' : 'border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
                    <HeadphonesIcon size={24} className="text-primary-700" />
                  </div>
                  <span className="font-medium text-gray-900">Call as My Assistant</span>
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                    className="focus:ring-primary-500 h-5 w-5 text-primary-600 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I agree to the <Link to="/terms" target="_blank" className="text-primary-700 hover:underline">Terms and Conditions</Link>
                  </label>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-tertiary-400 to-tertiary-500 text-white font-medium rounded-md hover:from-tertiary-500 hover:to-tertiary-600 transition-colors flex items-center disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Check size={18} className="mr-2" />
                    CONFIRM – CALL NOW
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CallConfirmationModal;