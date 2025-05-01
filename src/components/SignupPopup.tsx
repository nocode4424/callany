import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Phone } from 'lucide-react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

interface SignupPopupProps {
  onClose: () => void;
  onComplete: (userData: any) => void;
  initialPhone?: string;
}

// Call types that will be displayed as checkboxes
const callTypes = [
  { id: 'cancel-subscription', label: 'Cancel subscriptions or memberships' },
  { id: 'schedule-appointments', label: 'Schedule appointments' },
  { id: 'customer-service', label: 'Customer service issues' },
  { id: 'refunds', label: 'Request refunds' },
  { id: 'bill-disputes', label: 'Dispute bills or charges' },
  { id: 'account-changes', label: 'Make account changes' },
  { id: 'tech-support', label: 'Technical support' },
  { id: 'other', label: 'Other' }
];

const SignupPopup: React.FC<SignupPopupProps> = ({ onClose, onComplete, initialPhone = '' }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: initialPhone,
    zip_code: '',
    call_types: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const auth = useAuth();

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'first_name':
      case 'last_name':
        return value.trim() === '' ? 'This field is required' : '';
      case 'email':
        return !/^\S+@\S+\.\S+$/.test(value) ? 'Please enter a valid email address' : '';
      case 'phone_number': {
        const phoneNumber = parsePhoneNumberFromString(value, 'US');
        return phoneNumber && phoneNumber.isValid() ? '' : 'Please enter a valid phone number';
      }
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleCheckboxChange = (callTypeId: string) => {
    setFormData(prev => {
      const isSelected = prev.call_types.includes(callTypeId);
      
      if (isSelected) {
        // Remove from array if already selected
        return {
          ...prev,
          call_types: prev.call_types.filter(id => id !== callTypeId)
        };
      } else {
        // Add to array if not selected
        return {
          ...prev,
          call_types: [...prev.call_types, callTypeId]
        };
      }
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validate required fields
    ['first_name', 'last_name', 'email', 'phone_number'].forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData] as string);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    setIsSubmitting(true);
    try {
      // Attempt login for existing user
      const existing = await auth.loginByPhone(formData.phone_number);
      toast.info("Welcome back! You've been logged in with your existing account.");
      onComplete(existing);
    } catch (err: any) {
      if (err.message === 'User not found') {
        try {
          // Create new user
          const created = await auth.signup({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone_number: formData.phone_number,
            zip_code: formData.zip_code,
          });
          toast.success("Your account has been created successfully!");
          onComplete(created);
        } catch (createErr) {
          console.error('Error creating account:', createErr);
          toast.error("There was an error creating your account. Please try again.");
        }
      } else {
        console.error('Signup error:', err);
        toast.error("There was an error during signup. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative my-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-600 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center mb-2">
            <Phone className="mr-2" size={24} />
            <h2 className="text-xl font-bold">Start Your Free Call</h2>
          </div>
          <p className="text-blue-100">
            Fill out this form to get started with your free AI call
          </p>
        </div>
        
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors`}
                  placeholder="Your first name"
                />
                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
              </div>
              
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors`}
                  placeholder="Your last name"
                />
                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                value={formData.phone_number}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors ${initialPhone ? 'bg-gray-100' : ''}`}
                placeholder="(123) 456-7890"
                readOnly={!!initialPhone}
              />
              {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
            </div>
            
            <div>
              <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                id="zip_code"
                name="zip_code"
                type="text"
                value={formData.zip_code}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors"
                placeholder="12345 (Optional)"
              />
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What types of calls do you need help with?
              </label>
              
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {callTypes.map((callType) => (
                  <div key={callType.id} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={callType.id}
                        type="checkbox"
                        checked={formData.call_types.includes(callType.id)}
                        onChange={() => handleCheckboxChange(callType.id)}
                        className="focus:ring-primary-500 h-5 w-5 text-primary-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={callType.id} className="font-medium text-gray-700 cursor-pointer">
                        {callType.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <motion.button
                type="submit"
                className="w-full px-6 py-3.5 bg-gradient-to-r from-tertiary-400 to-tertiary-500 text-white font-medium rounded-lg shadow-md hover:from-tertiary-500 hover:to-tertiary-600 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Phone size={18} className="mr-2" />
                    Get My Free Call
                  </span>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignupPopup;