
import React from 'react';
import { Zap, Heart, Shield, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Energy Enhancement",
      description: "Boost your natural vitality with scientifically-backed wellness solutions."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Wellness Focus",
      description: "Holistic approach to mental, physical, and spiritual well-being."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Protected Aura",
      description: "Shield yourself from negative energy with our protective product line."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Luxury materials and craftsmanship in every product we create."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose Aura?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our products are designed to enhance your natural energy and elevate your lifestyle through innovative wellness solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {features.map((feature, index) => (
            <div key={index} className="why-choose-card w-full h-full">
              <div className="why-choose-card-inner">
                <div className="text-purple-400 mb-6 transition-transform duration-300 hover:scale-110">
                  {React.cloneElement(feature.icon, { className: 'w-12 h-12' })}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
