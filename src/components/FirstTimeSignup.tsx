import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, PhoneCall } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

interface FirstTimeSignupProps {
  phone: string;
  onComplete: (userData: any) => void;
  onClose: () => void;
}

const referralSources = [
  "Google Search",
  "Social Media",
  "Friend Referral",
  "Advertisement",
  "Blog/Article",
  "Other"
];

const FirstTimeSignup: React.FC<FirstTimeSignupProps> = ({ phone, onComplete, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: phone,
    zip_code: '',
    referral_source: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const [formStep, setFormStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'first_name':
      case 'last_name':
        return value.trim() === '' ? 'This field is required' : '';
      case 'email':
        return !/^\S+@\S+\.\S+$/.test(value) ? 'Please enter a valid email address' : '';
      case 'zip_code':
        return !/^\d{5}(-\d{4})?$/.test(value) ? 'Please enter a valid ZIP code' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (step === 1) {
      ['first_name', 'last_name', 'email'].forEach(field => {
        const error = validateField(field, formData[field as keyof typeof formData] as string);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });
    } else if (step === 2) {
      ['zip_code'].forEach(field => {
        const error = validateField(field, formData[field as keyof typeof formData] as string);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  const goToNextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => prev + 1);
    }
  };

  const goToPrevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(formStep)) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Sign up new user
      const created = await auth.signup({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        zip_code: formData.zip_code,
      });
      toast.success("Your account has been created successfully!");
      onComplete(created);
    } catch (error) {
      console.error('Error creating account:', error);
      toast.error("There was an error creating your account. Please try again.");
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
        <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-600 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center mb-2">
            <PhoneCall className="mr-2" size={24} />
            <h2 className="text-xl font-bold">Complete Your Profile</h2>
          </div>
          <p className="text-blue-100">
            You're moments away from your first free AI call!
          </p>
        </div>
        
        <div className="p-6">
          <div className="mb-6 flex justify-between">
            {[1, 2, 3].map((step) => (
              <div 
                key={step} 
                className={`w-1/3 h-2 rounded-full ${formStep >= step ? 'bg-primary-700' : 'bg-gray-200'} transition-colors duration-300 ${step !== 3 ? 'mr-2' : ''}`}
              ></div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit}>
            {formStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
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
                
                <div className="mb-4">
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
                
                <div className="mb-4">
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
                
                <div className="flex justify-end mt-6">
                  <motion.button
                    type="button"
                    onClick={goToNextStep}
                    className="px-6 py-3 bg-gradient-to-r from-primary-700 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {formStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    readOnly
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="zip_code"
                    name="zip_code"
                    type="text"
                    required
                    value={formData.zip_code}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.zip_code ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors`}
                    placeholder="12345"
                  />
                  {errors.zip_code && <p className="text-red-500 text-sm mt-1">{errors.zip_code}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="referral_source" className="block text-sm font-medium text-gray-700 mb-1">
                    How did you hear about us?
                  </label>
                  <select
                    id="referral_source"
                    name="referral_source"
                    value={formData.referral_source}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors"
                  >
                    <option value="">Select an option</option>
                    {referralSources.map((source) => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-between mt-6">
                  <motion.button
                    type="button"
                    onClick={goToPrevStep}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={goToNextStep}
                    className="px-6 py-3 bg-gradient-to-r from-primary-700 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {formStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-secondary-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Make Your First Call!</h3>
                
                <p className="text-gray-600 mb-6">
                  You now get a <span className="text-secondary-400 font-semibold">completely free call</span> to anyone you want! 
                  Click the button below to get started.
                </p>
                
                <div className="flex flex-col space-y-3 mt-8">
                  <motion.button
                    type="button"
                    onClick={goToPrevStep}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-tertiary-400 to-tertiary-500 text-white font-medium rounded-lg hover:from-tertiary-500 hover:to-tertiary-600 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
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
                        <PhoneCall size={18} className="mr-2" />
                        Get My Free Call
                      </span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FirstTimeSignup;