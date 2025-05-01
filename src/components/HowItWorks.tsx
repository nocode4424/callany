import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Notebook as Robot, FileText } from 'lucide-react';

const stepsData = [
  {
    icon: MessageSquare,
    title: "You Answer Only 3 Questions",
    description: "Tell us about the call you want us to make - what's the goal, who to call, and any important details to mention.",
    color: "bg-tertiary-100 text-tertiary-400"
  },
  {
    icon: Robot,
    title: "Our Cutting-Edge AI Makes The Call",
    description: "Using our advanced AI, we call whoever you asked - it sounds 100% real and handles your issue professionally.",
    color: "bg-primary-100 text-primary-700"
  },
  {
    icon: FileText,
    title: "Get Live Call Transcriptions",
    description: "Follow along in real-time as our AI handles your call. Relax - if we need anything, we'll pause the call and check with you.",
    color: "bg-secondary-100 text-secondary-400"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-4 md:py-12 bg-white" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It <span className="text-primary-700">Works</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Three simple steps to <span className="text-tertiary-400">offload those calls</span> you've been putting off
          </motion.p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {stepsData.map((step, index) => (
            <motion.div 
              key={index}
              className="relative md:w-1/3 flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              <div className="bg-white rounded-xl p-8 h-full border border-gray-100 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-6 shadow-md`}>
                  <step.icon size={30} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  <span className="flex items-center">
                    <span className="bg-gradient-to-r from-primary-700 to-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-semibold shadow-md">
                      {index + 1}
                    </span>
                    {step.title}
                  </span>
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < stepsData.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20">
                  <motion.svg 
                    width="80" 
                    height="16" 
                    viewBox="0 0 80 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + 0.2 * index }}
                  >
                    <path d="M0 8H76L65 1M76 8L65 15" stroke="#5D2586" strokeWidth="2" strokeLinecap="round" />
                  </motion.svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <motion.a 
            href="#start-now" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-tertiary-400 to-tertiary-500 text-white font-medium rounded-md text-lg shadow-lg hover:from-tertiary-500 hover:to-tertiary-600 transition-colors"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(249, 129, 40, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Start Your <span className="text-white font-bold ml-1">Free Call</span> Now
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;