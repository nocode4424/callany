import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../supabase/client';

interface ContactPageProps {
  isLoggedIn: boolean;
  userPhone: string;
  onLogin: (userData: any) => void;
  onLogout: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ 
  isLoggedIn, 
  userPhone, 
  onLogin, 
  onLogout 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  React.useEffect(() => {
    document.title = 'Contact Us | FinishTheList';
    window.scrollTo(0, 0);
  }, []);

  // Extract user initial for avatar
  const userInitial = userPhone ? userPhone.charAt(0).toUpperCase() : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);
      
      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }
      
      setIsComplete(true);
      toast.success("Your message has been sent. We'll respond shortly!");
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header 
        isLoggedIn={isLoggedIn} 
        userInitial={userInitial} 
        onLogin={onLogin} 
        onLogout={onLogout} 
      />
      <div className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="lg:w-2/5 bg-gradient-to-br from-primary-600 to-primary-700 p-8 text-white relative">
                <div className="absolute inset-0 opacity-10 bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.8" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")' }}></div>
                <div className="relative z-10">
                  <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
                  <p className="mb-8 text-blue-100">
                    Have questions about our service? Want to learn more about how we can help you finish your to-do list? 
                    Get in touch with us using the contact form or through any of the methods below.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="w-6 h-6 mr-4 mt-1 text-secondary-300" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a href="mailto:hello@finishthelist.com" className="text-blue-100 hover:text-white transition-colors">
                          hello@finishthelist.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="w-6 h-6 mr-4 mt-1 text-secondary-300" />
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-blue-100">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start">
                        <MapPin className="w-6 h-6 mr-4 mt-1 text-secondary-300" />
                        <div>
                          <h3 className="font-semibold mb-2">Offices</h3>
                        </div>
                      </div>
                      <div className="ml-10 space-y-2">
                        <p className="text-blue-100">Los Angeles, CA</p>
                        <p className="text-blue-100">Dallas, TX</p>
                        <p className="text-blue-100">Tampa, FL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-3/5 p-8">
                {!isComplete ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                        placeholder="John Smith"
                      />
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
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-md hover:from-primary-700 hover:to-primary-800 transition-colors flex items-center justify-center disabled:opacity-70"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Send Message <Send className="ml-2" size={18} />
                        </span>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-lg text-gray-700 mb-6">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;