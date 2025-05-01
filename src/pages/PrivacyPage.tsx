import React from 'react';
import Header from '../components/Header';

interface PrivacyPageProps {
  isLoggedIn: boolean;
  userPhone: string;
  onLogin: (userData: any) => void;
  onLogout: () => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ 
  isLoggedIn, 
  userPhone, 
  onLogin, 
  onLogout 
}) => {
  React.useEffect(() => {
    document.title = 'Privacy Policy | FinishTheList';
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
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            
            <p className="mb-4">Last Updated: January 1, 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              At FinishTheList, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. Please read this policy carefully.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Contact information (name, email address, phone number, zip code)</li>
              <li>Call details and instructions you provide for our AI to make calls on your behalf</li>
              <li>Transaction and billing information</li>
              <li>Communications between you and FinishTheList</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Develop new products and services</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Sharing of Information</h2>
            <p className="mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Service providers who perform services on our behalf</li>
              <li>Professional advisors, such as lawyers and accountants</li>
              <li>In response to legal process or when we believe disclosure is necessary to protect our rights</li>
              <li>With your consent or at your direction</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing of your personal information</li>
              <li>Data portability</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@finishthelist.com" className="text-blue-600 hover:underline">
                privacy@finishthelist.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;