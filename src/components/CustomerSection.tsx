import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.2, 
      duration: 0.6, 
      ease: 'easeOut' 
    }
  })
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const CustomerSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Wellness Coach",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Aura products have completely transformed my meditation practice. The energy enhancement is real and tangible."
    },
    {
      name: "Marcus Johnson",
      role: "Life Coach",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "I recommend Aura to all my clients. The quality and effectiveness of their products is unmatched."
    },
    {
      name: "Elena Rodriguez",
      role: "Yoga Instructor",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "The crystal collection has become an essential part of my daily routine. Amazing energy and beautiful craftsmanship."
    }
  ];

  return (
    <section id="customers" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Real experiences from our Aura community
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform transition duration-300"
              variants={fadeInUpVariants}
              custom={index}
              whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}, ${testimonial.role}`}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 text-purple-300 dark:text-purple-600" size={24} />
                <p className="text-gray-700 dark:text-gray-300 italic pl-6">
                  {testimonial.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {[
            { label: "Average Rating", value: "4.9/5" },
            { label: "Reviews", value: "10K+" },
            { label: "Would Recommend", value: "99%" },
            { label: "Support", value: "24/7" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              variants={fadeInUpVariants}
              custom={idx}
            >
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerSection;