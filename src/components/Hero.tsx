import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import ScrollingCallTypes from './ScrollingCallTypes';
import { exampleCalls } from './CallExamples';
import UserQuickSignup from './UserQuickSignup';

// Audio wave lines component
const AudioLines: React.FC<{ isPlaying: boolean; initialAnimation: boolean }> = ({ isPlaying, initialAnimation }) => {
  // Create arrays of lines for left and right sides of the play button
  const leftLines = Array.from({ length: 20 }).map((_, i) => i);
  const rightLines = Array.from({ length: 20 }).map((_, i) => i);
  
  // Array of colors to cycle through
  const colors = [
    '#5D2586', // Purple
    '#50B848', // Green
    '#F98128', // Orange
  ];

  // Generate random heights for initial animation to simulate a real phone call
  const generateRandomHeights = () => {
    const heights = [];
    for (let i = 0; i < 60; i++) {
      // Create more varied, random heights that change rapidly
      heights.push(Math.random() * 70 + 10);
    }
    return heights;
  };

  // Store random heights in a ref so they don't regenerate on each render
  const randomHeightsRef = useRef(generateRandomHeights());

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Left side audio lines */}
      <div className="flex items-center justify-end h-16 w-1/2 pr-12">
        {leftLines.map((i) => {
          // Taller lines (75% increase)
          const baseHeight = 17.5 + Math.sin(i * 0.3) * 35; // Increased by 75%
          const height = baseHeight > 42 ? 42 : baseHeight; // Cap at reasonable height
          const colorIndex = i % colors.length;
          const delay = (leftLines.length - i) * 0.03;
          
          return (
            <motion.div
              key={`left-${i}`}
              className="mx-0.5 rounded-full"
              style={{ 
                height: `${height}px`,
                width: '2px',
                backgroundColor: colors[colorIndex],
                marginRight: '1px'
              }}
              initial={{ height: '5px', opacity: 0.3 }}
              animate={
                initialAnimation
                  ? { 
                      height: [
                        `${randomHeightsRef.current[i]}px`, 
                        `${randomHeightsRef.current[(i+1) % 60]}px`, 
                        `${randomHeightsRef.current[(i+2) % 60]}px`
                      ], 
                      opacity: [0.7, 0.9, 0.7] 
                    }
                  : isPlaying
                  ? { 
                      height: [
                        `${height}px`, 
                        `${height * 0.5}px`, 
                        `${height * 1.2}px`,
                        `${height}px`
                      ],
                      opacity: [0.7, 0.5, 0.9, 0.7]
                    }
                  : { height: `${height}px`, opacity: 0.5 }
              }
              transition={{
                duration: initialAnimation ? 0.3 : isPlaying ? 1.2 : 2.5,
                delay: initialAnimation ? 0 : delay,
                repeat: isPlaying || initialAnimation ? Infinity : 0,
                repeatType: "reverse",
                ease: initialAnimation ? "linear" : "easeInOut"
              }}
            />
          );
        })}
      </div>
      
      {/* Right side audio lines */}
      <div className="flex items-center justify-start h-16 w-1/2 pl-12">
        {rightLines.map((i) => {
          // Taller lines (75% increase)
          const baseHeight = 17.5 + Math.sin(i * 0.3) * 35; // Increased by 75%
          const height = baseHeight > 42 ? 42 : baseHeight; // Cap at reasonable height
          const colorIndex = i % colors.length;
          const delay = i * 0.03;
          
          return (
            <motion.div
              key={`right-${i}`}
              className="mx-0.5 rounded-full"
              style={{ 
                height: `${height}px`,
                width: '2px',
                backgroundColor: colors[colorIndex],
                marginLeft: '1px'
              }}
              initial={{ height: '5px', opacity: 0.3 }}
              animate={
                initialAnimation
                  ? { 
                      height: [
                        `${randomHeightsRef.current[i+30]}px`, 
                        `${randomHeightsRef.current[(i+31) % 60]}px`, 
                        `${randomHeightsRef.current[(i+32) % 60]}px`
                      ], 
                      opacity: [0.7, 0.9, 0.7] 
                    }
                  : isPlaying
                  ? { 
                      height: [
                        `${height}px`, 
                        `${height * 0.5}px`, 
                        `${height * 1.2}px`,
                        `${height}px`
                      ],
                      opacity: [0.7, 0.5, 0.9, 0.7]
                    }
                  : { height: `${height}px`, opacity: 0.5 }
              }
              transition={{
                duration: initialAnimation ? 0.3 : isPlaying ? 1.2 : 2.5,
                delay: initialAnimation ? 0 : delay,
                repeat: isPlaying || initialAnimation ? Infinity : 0,
                repeatType: "reverse",
                ease: initialAnimation ? "linear" : "easeInOut"
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  const initialAnimationTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start initial animation
    initialAnimationTimer.current = setTimeout(() => {
      setInitialAnimationComplete(true);
    }, 5000); // 5 seconds

    return () => {
      if (initialAnimationTimer.current) {
        clearTimeout(initialAnimationTimer.current);
      }
    };
  }, []);

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleSignupComplete = (userData: any) => {
    // This would be handled by the parent component (HomePage)
    console.log('User signed up:', userData);
  };

  return (
    <section className="pt-28 pb-10 md:pt-28 md:pb-16 relative overflow-hidden bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-repeat" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23000000" fill-opacity="0.8" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")' }}>
      </div>
      
      {/* Hero content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-black leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Let <span className="text-primary-700">AI Make</span> Those <span className="text-tertiary-400">Dreaded Calls</span> For <span className="text-secondary-400">You</span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl text-gray-800 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-tertiary-400 font-medium">Answer just three questions</span> and our AI agent <span className="text-primary-700 font-medium">handles the rest</span>. 
              From canceling subscriptions to scheduling appointments—we make the calls you've <span className="text-secondary-400 font-medium">finally crossed off your list</span>.
            </motion.p>
            
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <UserQuickSignup onSignupComplete={handleSignupComplete} />
            </motion.div>
            
            {/* Audio visualization container - reduced height by 25% */}
            <div className="relative mt-12 mb-8 h-30">
              {/* Audio visualization lines */}
              <AudioLines isPlaying={isAudioPlaying} initialAnimation={!initialAnimationComplete} />
              
              {/* Centered play button with GREEN background when not hovered/playing */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button
                  className="bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full h-16 w-16 flex items-center justify-center shadow-xl border-2 border-white"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 25px -5px rgba(80, 184, 72, 0.3)",
                    background: "linear-gradient(to right, #F98128, #f76506)" // Change to orange on hover
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 15px -3px rgba(80, 184, 72, 0.2)", 
                      "0 20px 30px -3px rgba(80, 184, 72, 0.3)", 
                      "0 10px 15px -3px rgba(80, 184, 72, 0.2)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  onClick={toggleAudio}
                >
                  {isAudioPlaying ? (
                    <Pause size={28} className="text-white" />
                  ) : (
                    <Play size={28} className="text-white ml-1" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Add the scrolling call types below the play button - moved down an additional 30px */}
        <div className="mt-16">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
           
          </motion.div>
          <ScrollingCallTypes calls={exampleCalls} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
