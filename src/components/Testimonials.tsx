import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Busy Parent",
    content: "I'd been putting off canceling my gym membership for months. FinishTheList did it in 5 minutes while I was making dinner. Incredible time-saver!",
    stars: 5
  },
  {
    name: "Michael Chen",
    title: "Freelance Designer",
    content: "Used it to reschedule three doctor appointments I'd been avoiding. The AI was professional and got it done faster than I could have. Will definitely use again.",
    stars: 5
  },
  {
    name: "Alisha Patel",
    title: "Graduate Student",
    content: "Got a billing error fixed with my cable company without spending an hour on hold. This service is worth every penny for the time and frustration it saves.",
    stars: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What Our <span className="text-primary-700">Users Say</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            FinishTheList has helped thousands <span className="text-secondary-400">cross off</span> those dreaded phone calls
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 * index }}
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="absolute top-6 right-6 text-gray-200">
                <Quote size={40} />
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} size={20} className="text-tertiary-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic relative z-10">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-700 to-tertiary-400 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-md">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;