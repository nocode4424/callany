import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { createUser } from '../supabase/client';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    zip_code: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await createUser(formData);
      
      if (error) {
        throw error;
      }
      
      setIsComplete(true);
      toast.success("Your information has been submitted. We'll be in touch shortly!");
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error submitting your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white" id="start-now">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="rounded-2xl shadow-2xl overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 opacity-100"></div>
            <div className="absolute inset-0 opacity-10 bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.9" fill-rule="evenodd"%3E%3Ccircle cx="10" cy="10" r="2"/%3E%3Ccircle cx="30" cy="10" r="2"/%3E%3Ccircle cx="10" cy="30" r="2"/%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/svg%3E")' }}></div>
            
            <div className="relative z-10">
              <div className="py-10 px-6 md:px-10">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-white flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <PhoneCall className="mr-3" size={32} />
                  <span>Start Your <span className="text-secondary-400">Free Call</span></span>
                </motion.h2>
                <motion.p 
                  className="text-purple-100 mt-3 text-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Fill out the form below to get started with your first <span className="text-tertiary-400 font-medium">free call</span>
                </motion.p>
              </div>
              
              <div className="bg-white p-6 md:p-10 rounded-t-3xl">
                {!isComplete ? (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          id="first_name"
                          name="first_name"
                          type="text"
                          required
                          value={formData.first_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors shadow-sm"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          id="last_name"
                          name="last_name"
                          type="text"
                          required
                          value={formData.last_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors shadow-sm"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors shadow-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          id="phone_number"
                          name="phone_number"
                          type="tel"
                          required
                          value={formData.phone_number}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors shadow-sm"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      <div>
                        <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code
                        </label>
                        <input
                          id="zip_code"
                          name="zip_code"
                          type="text"
                          required
                          value={formData.zip_code}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-colors shadow-sm"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <motion.button
                        type="submit"
                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-tertiary-400 to-tertiary-500 text-white font-semibold rounded-lg text-lg shadow-lg hover:from-tertiary-500 hover:to-tertiary-600 transition-all flex items-center justify-center disabled:opacity-70"
                        whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(249, 129, 40, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
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
                            Get Started <PhoneCall className="ml-2" size={20} />
                          </span>
                        )}
                      </motion.button>
                    </div>
                  </form>
                ) : (
                  <motion.div 
                    className="text-center py-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div 
                      className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      <CheckCircle size={48} className="text-secondary-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Thank You!
                    </h3>
                    <p className="text-lg text-gray-700 mb-6">
                      Your information has been submitted successfully. We'll reach out shortly with details about your first free call.
                    </p>
                    <p className="text-sm text-gray-500">
                      Check your email for confirmation and next steps.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;