import React from 'react';
import { motion } from 'framer-motion';

type Call = {
  icon: React.ComponentType<{ size?: number | string }>;
  title: string;
  description: string;
  color: string;
};

interface ScrollingCallTypesProps {
  calls: Call[];
}

const ScrollingCallTypes: React.FC<ScrollingCallTypesProps> = ({ calls }) => {
  // We duplicate the calls array to create a seamless loop effect
  const duplicatedCalls = [...calls, ...calls];
  
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden h-60 relative pt-12">
      {/* Add the text with Merriweather font above the scrolling list */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 z-20 w-full text-center">
        <h3 className="font-['Merriweather'] text-xl text-gray-800 italic">
          We make calls that you avoid... do you need help with any of these?
        </h3>
      </div>

      <div className="bg-gradient-to-b from-white to-transparent absolute top-0 left-0 right-0 h-10 z-10"></div>
      <div className="bg-gradient-to-t from-white to-transparent absolute bottom-0 left-0 right-0 h-10 z-10"></div>
      
      <motion.div 
        className="animate-scroll-up"
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
        animate={{
          y: [0, -50 * calls.length],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear"
          }
        }}
      >
        {duplicatedCalls.map((call, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-3 py-2 px-4 bg-gray-100 mb-3 rounded-md"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${call.color.replace('shadow-', '')}`}>
              <call.icon size={18} />
            </div>
            <div className="font-medium text-gray-800 truncate">{call.title}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollingCallTypes;