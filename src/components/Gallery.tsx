import React, { useEffect } from 'react';

const imagePairs = [
  ['https://picsum.photos/200', 'https://picsum.photos/201'],
  ['https://picsum.photos/202', 'https://picsum.photos/203'],
  ['https://picsum.photos/204', 'https://picsum.photos/205'],
  ['https://picsum.photos/206', 'https://picsum.photos/207'],
  ['', ''],
  ['', '']
];

const CustomerGrid: React.FC = () => {
  useEffect(() => {
    const wrappers = document.querySelectorAll('.logo-wrapper');

    wrappers.forEach((wrapper) => {
      const images = wrapper.querySelectorAll('img');
      let current = 0;

      if (images.length === 0) return;

      images[current].classList.add('opacity-100');

      setInterval(() => {
        images[current].classList.remove('opacity-100');
        setTimeout(() => {
          current = (current + 1) % images.length;
          images[current].classList.add('opacity-100');
        }, 1000);
      }, 3000);
    });
  }, []);

  return (
    <div className="bg-black p-12 text-center rounded-3xl border-4 border-white shadow-[0_15px_30px_rgba(0,0,0,0.4)] min-w-[60vw] mx-auto">
      <h2 className="text-white text-4xl mb-6 font-bold">Our Customers</h2>

      {/* Container that will hold both grid and overlay */}
      <div className="relative group grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto rounded-lg overflow-hidden">
        {/* Customer logo wrappers */}
        {imagePairs.map((pair, index) => (
          <div
            key={index}
            className="logo-wrapper relative w-full pb-[75%] flex justify-center items-center rounded-lg shadow-md overflow-hidden"
          >
            {pair.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Customer Logo ${index * 2 + idx + 1}`}
                className="absolute top-0 left-0 w-full h-full object-contain p-4 opacity-0 transition-opacity duration-1000 invert"
              />
            ))}
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto rounded-lg z-10">
          <a
            href="#"
            className="text-white px-6 py-3 border-2 border-white rounded-md text-lg hover:bg-white hover:bg-opacity-10 hover:border-blue-500 transition-all duration-300 z-20"
          >
            Meet Our Customers
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerGrid;
