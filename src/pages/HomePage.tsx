import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import CallExamples from '../components/CallExamples';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';
import CTAButton from '../components/CTAButton';

interface HomePageProps {
  isLoggedIn: boolean;
  userPhone: string;
  onLogin: (userData: any) => void;
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  isLoggedIn, 
  userPhone, 
  onLogin, 
  onLogout 
}) => {
  // Extract the first letter of the first name or phone number for the user avatar
  const userInitial = userPhone ? userPhone.charAt(0).toUpperCase() : '';

  return (
    <>
      <Header 
        isLoggedIn={isLoggedIn} 
        userInitial={userInitial} 
        onLogin={onLogin} 
        onLogout={onLogout} 
      />
      <Hero />
      <HowItWorks />
      {/* Move testimonials directly below HowItWorks for social proof */}
      <Testimonials />
      <CallExamples />
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <CTAButton 
          text="Get Your Free Call Now"
          className="text-lg py-4 px-8"
        />
      </div>
      <FAQ />
      <ContactForm />
    </>
  );
};

export default HomePage;