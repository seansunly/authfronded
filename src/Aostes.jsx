import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

export default function Aostes() {
  useEffect(() => {
    Aos.init({
      duration: 1500,
      offset: 200,
      easing: 'ease-in-out',
      once: true, // Whether animation should happen only once
    }); // Initialize AOS with a duration for animations
  }, []);

  return (
    <div className="Aos grid grid-cols-4 gap-4 p-4 min-h-screen">
      <div data-aos="zoom-out-up" className="bg-blue-500 text-white p-4 rounded">
        Animation 1
      </div>
      <div data-aos="fade-right" className="bg-green-500 text-white p-4 rounded">
        Animation 2
      </div>
      <div data-aos="fade-left" className="bg-red-500 text-white p-4 rounded">
        Animation 3
      </div>
      <div data-aos="flip-up" className="bg-yellow-500 text-black p-4 rounded">
        Animation 4
      </div>
    </div>
  );
}
