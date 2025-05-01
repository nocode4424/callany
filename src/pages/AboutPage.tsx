import React from 'react';
import Header from '../components/Header';
import { PhoneCall, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AboutPageProps {
  isLoggedIn: boolean;
  userPhone: string;
  onLogin: (userData: any) => void;
  onLogout: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ 
  isLoggedIn, 
  userPhone, 
  onLogin, 
  onLogout 
}) => {
  React.useEffect(() => {
    document.title = 'About Us | FinishTheList';
    window.scrollTo(0, 0);
  }, []);

  // Extract user initial for avatar
  const userInitial = userPhone ? userPhone.charAt(0).toUpperCase() : '';

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
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-8 md:p-10">
                <h1 className="text-3xl font-bold mb-6">About FinishTheList</h1>
                
                <p className="text-lg text-gray-700 mb-8">
                  FinishTheList was created with a simple mission: to help people complete the tasks they've been avoiding. 
                  We all have those phone calls we keep putting off—canceling subscriptions, disputing charges, scheduling appointments—that 
                  pile up on our to-do lists and cause unnecessary stress.
                </p>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Our Solution</h2>
                  <p className="text-gray-700 mb-4">
                    We built an AI-powered service that makes these calls for you. Our advanced AI agents sound natural,
                    understand complex situations, and can effectively represent you to get results.
                  </p>
                  <p className="text-gray-700">
                    Simply tell us what call you need made, provide a few details, and our AI takes care of the rest.
                    You can follow along with a live transcript and get notified when the task is complete.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Key Benefits</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle size={20} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Save Time</h3>
                        <p className="text-gray-700">No more waiting on hold or navigating confusing phone menus.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <PhoneCall size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Reduce Stress</h3>
                        <p className="text-gray-700">Let us handle those awkward or frustrating conversations.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <Clock size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Get Results</h3>
                        <p className="text-gray-700">Our AI is trained to be persistent and effective at resolving issues.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Our Team</h2>
                  <p className="text-gray-700">
                    FinishTheList was founded by a team of AI engineers and productivity enthusiasts who recognized that 
                    technology could solve one of modern life's most common pain points—unwanted phone calls. Our diverse 
                    team is committed to building technology that gives people back their time and peace of mind.
                  </p>
                </div>
                
                <div className="text-center mt-10">
                  <Link 
                    to="/" 
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Start Your Free Call
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;