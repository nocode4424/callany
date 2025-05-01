import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, CreditCard, PhoneCall, Plane, Guitar as Hospital, Phone, Subscript as Subscription, Hotel, Car, Package, Unlock, Receipt } from 'lucide-react';

export const exampleCalls = [
  {
    icon: X,
    title: "Cancel my Planet Fitness gym membership",
    description: "We can cancel any gym, including LA Fitness, Anytime Fitness, etc.",
    color: "bg-tertiary-50 text-tertiary-400 shadow-tertiary-100/50"
  },
  {
    icon: CreditCard,
    title: "Dispute an overdraft or incorrect charge",
    description: "Works with Bank of America, Chase, Wells Fargo, credit unions, and more.",
    color: "bg-primary-50 text-primary-700 shadow-primary-100/50"
  },
  {
    icon: Plane,
    title: "Request a refund for a delayed flight",
    description: "We help with Delta, United, Southwest, American Airlines, etc.",
    color: "bg-secondary-50 text-secondary-400 shadow-secondary-100/50"
  },
  {
    icon: Subscription,
    title: "Cancel my Xfinity internet or cable service",
    description: "Also works with Spectrum, AT&T, Cox, and others.",
    color: "bg-primary-50 text-primary-700 shadow-primary-100/50"
  },
  {
    icon: Hospital,
    title: "Get my medical records transferred",
    description: "We handle all hospitals, clinics, and urgent care centers.",
    color: "bg-secondary-50 text-secondary-400 shadow-secondary-100/50"
  },
  {
    icon: Phone,
    title: "Negotiate a lower phone bill",
    description: "Supports Verizon, T-Mobile, AT&T, and other carriers.",
    color: "bg-tertiary-50 text-tertiary-400 shadow-tertiary-100/50"
  },
  {
    icon: Subscription,
    title: "Cancel my recurring Adobe subscription",
    description: "We can cancel Netflix, Hulu, Spotify, and other digital services too.",
    color: "bg-primary-50 text-primary-700 shadow-primary-100/50"
  },
  {
    icon: Hotel,
    title: "Cancel a hotel reservation and request a refund",
    description: "Works for Hilton, Marriott, Hyatt, Airbnb, and more.",
    color: "bg-primary-50 text-primary-700 shadow-primary-100/50"
  },
  {
    icon: Car,
    title: "Dispute an unfair charge from a rental car company",
    description: "We handle Enterprise, Hertz, Budget, Alamo, etc.",
    color: "bg-tertiary-50 text-tertiary-400 shadow-tertiary-100/50"
  },
  {
    icon: Package,
    title: "Return a modem or cable box",
    description: "Works with Spectrum, Xfinity, Cox, etc.",
    color: "bg-secondary-50 text-secondary-400 shadow-secondary-100/50"
  },
  {
    icon: Unlock,
    title: "Unlock my phone and transfer my number",
    description: "Works with AT&T, Verizon, T-Mobile, Mint, etc.",
    color: "bg-primary-50 text-primary-700 shadow-primary-100/50"
  },
  {
    icon: Receipt,
    title: "Request an itemized or adjusted bill",
    description: "Works with any hospital or healthcare provider.",
    color: "bg-secondary-50 text-secondary-400 shadow-secondary-100/50"
  }
];

const CallExamples: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Calls We Can <span className="text-primary-700">Make For You</span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our <span className="text-tertiary-400">AI assistant</span> can handle these common call types and more
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {exampleCalls.map((example, index) => (
            <motion.div 
              key={index}
              className={`bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-all cursor-pointer ${
                selectedExample === index ? 'ring-2 ring-primary-700' : ''
              }`}
              onClick={() => setSelectedExample(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className={`w-14 h-14 rounded-full ${example.color} flex items-center justify-center mb-4 shadow-sm`}>
                <example.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{example.title}</h3>
              <p className="text-gray-600">{example.description}</p>
              
              {selectedExample === index && (
                <motion.div 
                  className="mt-4 pt-4 border-t border-gray-100"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center text-sm text-secondary-400 font-medium">
                    <CheckCircle size={16} className="mr-2" />
                    <span>AI handles this perfectly</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-gradient-to-r from-primary-700 to-primary-600 rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="p-8 md:p-10 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Don't see what you need?</h3>
              <p className="text-purple-100 text-lg mb-6">
                Our AI can handle most routine phone calls. Try it with your specific request!
              </p>
              <motion.a 
                href="#start-now" 
                className="inline-flex items-center px-6 py-3 bg-white text-primary-700 font-medium rounded-md shadow-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneCall className="mr-2" size={20} />
                <span>Start Your <span className="text-secondary-400 font-bold">Free Call</span></span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallExamples;