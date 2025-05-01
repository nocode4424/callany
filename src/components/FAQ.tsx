import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, PhoneCall, CreditCard, Lock } from 'lucide-react';

const faqs = [
  {
    question: "How does the AI phone call service work?",
    answer: "Our AI service makes calls on your behalf after you answer three simple questions about who to call, what you need, and any important information. The AI sounds completely natural and handles the entire conversation while you follow along via a live transcript. If the AI needs any information from you during the call, it will pause and ask before continuing.",
    icon: PhoneCall
  },
  {
    question: "How much does it cost?",
    answer: "Your first call is completely free! After that, we offer flexible subscription plans starting at $9.99/month for 3 calls, or you can purchase individual calls as needed. There are no contracts, and you can cancel anytime.",
    icon: CreditCard
  },
  {
    question: "Can the AI really sound like a real person?",
    answer: "Yes! Our AI uses cutting-edge voice technology that sounds completely natural. Most people on the other end of the call won't be able to tell they're speaking with an AI. The AI also adapts to the conversation in real-time, handling unexpected questions and scenarios just like a human would.",
    icon: MessageSquare
  },
  {
    question: "What types of calls can the AI handle?",
    answer: "Our AI can handle most routine calls like cancelling subscriptions, disputing charges, scheduling appointments, requesting refunds, and more. It works particularly well with customer service departments, healthcare providers, financial institutions, and subscription services.",
    icon: PhoneCall
  },
  {
    question: "Is my information secure?",
    answer: "Absolutely. We use bank-level encryption to protect all your data. We never share your personal information with third parties, and call recordings are only stored for as long as necessary to complete your request. You can also delete your data at any time from your account settings.",
    icon: Lock
  },
  {
    question: "What if the AI can't handle my specific call?",
    answer: "While our AI successfully handles over 95% of calls, there are some complex situations that may require human assistance. If your call isn't successfully completed, we'll refund that call or give you a credit for another call at no charge.",
    icon: MessageSquare
  }
];

const FAQItem: React.FC<{ faq: typeof faqs[0]; index: number }> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className="border-b border-gray-200 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 text-left flex items-start justify-between focus:outline-none"
      >
        <div className="flex items-start">
          <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center mr-4 ${isOpen ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-500'}`}>
            <faq.icon size={18} />
          </div>
          <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
        </div>
        <ChevronDown 
          className={`transform transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: 'auto', opacity: 1, marginBottom: 16 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-14 pr-4 pb-5 text-gray-600">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked <span className="text-primary-700">Questions</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about our <span className="text-tertiary-400">AI call service</span>
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <motion.a 
              href="#start-now" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-700 to-primary-600 text-white font-medium rounded-md text-lg shadow-lg hover:from-primary-600 hover:to-primary-700 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(93, 37, 134, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              TRY FOR <span className="text-secondary-400 ml-1">FREE</span> NOW
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;