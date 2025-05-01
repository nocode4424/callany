import React from 'react';
import Header from '../components/Header';

interface TermsPageProps {
  isLoggedIn: boolean;
  userPhone: string;
  onLogin: (userData: any) => void;
  onLogout: () => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ 
  isLoggedIn, 
  userPhone, 
  onLogin, 
  onLogout 
}) => {
  React.useEffect(() => {
    document.title = 'Terms of Service | FinishTheList';
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
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            
            <p className="mb-4">Last Updated: January 1, 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using the FinishTheList service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              FinishTheList provides an AI-powered service that makes phone calls on behalf of users to help them complete tasks on their to-do lists. Our AI representatives act on your behalf based on the information and instructions you provide.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p className="mb-4">
              To use our service, you may need to create an account and provide accurate information. You are responsible for maintaining the security of your account and for all activities that occur under your account.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. User Responsibilities</h2>
            <p className="mb-4">
              When using our service, you agree to:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Provide accurate information for the AI to use during calls</li>
              <li>Not use the service for any illegal purposes</li>
              <li>Not use the service to harass, threaten, or impersonate others</li>
              <li>Not attempt to manipulate or disrupt the service</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Payment and Billing</h2>
            <p className="mb-4">
              We offer a free first call, after which fees apply for our services. Pricing is available on our website and may change with notice. By providing payment information, you authorize us to charge your chosen payment method.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitations of Liability</h2>
            <p className="mb-4">
              We strive to provide a reliable service, but we cannot guarantee the outcome of calls made on your behalf. We are not liable for any damages or losses resulting from:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Service interruptions or errors</li>
              <li>Inaccurate information provided by users</li>
              <li>Actions or decisions of third parties contacted through our service</li>
              <li>Failure to achieve your desired outcome from a call</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
            <p className="mb-4">
              All content, features, and functionality of our service are owned by FinishTheList and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Termination</h2>
            <p className="mb-4">
              We reserve the right to terminate or suspend your account and access to our service at our discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
            <p className="mb-4">
              We may modify these Terms of Service at any time. Changes will be effective upon posting to the website. Your continued use of the service after any changes indicates your acceptance of the modified terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Governing Law</h2>
            <p className="mb-4">
              These Terms of Service are governed by the laws of the State of California, without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have questions about these Terms of Service, please contact us at:
              <br />
              <a href="mailto:terms@finishthelist.com" className="text-blue-600 hover:underline">
                terms@finishthelist.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;