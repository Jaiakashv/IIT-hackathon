
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const ProductCarousel = () => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Auto-rotate products
  useEffect(() => {
    if (!autoRotate) return;
    
    const timer = setInterval(() => {
      setCurrentProduct(prev => (prev + 1) % products.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [autoRotate]);

  const products = [
    {
      id: 1,
      name: "Aura Crystal Collection",
      price: "$299",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
      description: "Handcrafted crystals infused with positive energy to enhance your daily meditation practice."
    },
    {
      id: 2,
      name: "Energy Wellness Set",
      price: "$199",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      description: "Complete wellness package including aromatherapy oils, meditation guides, and energy stones."
    },
    {
      id: 3,
      name: "Aura Protection Jewelry",
      price: "$149",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
      description: "Elegant jewelry designed to protect and amplify your natural energy field."
    }
  ];

  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section id="products" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover our premium collection designed to elevate your lifestyle
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentProduct * 100}%)`,
                transitionProperty: 'transform',
                transitionDuration: '0.5s',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="w-full flex-shrink-0 relative group"
                >
                  <div 
                    className="absolute inset-0 bg-transparent hover:bg-white/90 transition-all duration-300 cursor-pointer z-10 rounded-2xl"
                    onMouseEnter={() => setCurrentProduct(index)}
                  >
                    <div className="absolute inset-0 bg-white/0 hover:bg-white/90 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button 
                        className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-purple-600 dark:hover:bg-purple-400 text-purple-600 dark:text-purple-400 hover:text-white transition-all duration-300 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                          {product.price}
                        </span>
                      </div>
                    </div>
                    <div className="order-1 lg:order-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-xl shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevProduct}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
          </button>

          <button
            onClick={nextProduct}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronRight size={24} className="text-gray-700 dark:text-gray-300" />
          </button>

          <div className="flex justify-center mt-8 space-x-4">
            {products.map((product, index) => (
              <button
                key={index}
                onClick={() => setCurrentProduct(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProduct 
                    ? 'bg-purple-600 dark:bg-purple-400 scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600'
                } hover:scale-110 hover:bg-purple-500`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
