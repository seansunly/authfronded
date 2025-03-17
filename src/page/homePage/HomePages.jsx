import React from 'react';
import ProductCaffeepage from '../productCaffee/ProductCaffeepage';
import FooterCom from '../../components/footerComponent/FooterCom';

export default function HomePages() {
  return (
    <div className='bg-coffee-dark'>
        <div className="bg-coffee-dark shadow-md text-coffee-dark">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center text-white bg-coffee-dark">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-[url('https://w0.peakpx.com/wallpaper/162/1011/HD-wallpaper-coffee-by-window-street-coffee-window-cup-ai-art.jpg')]"
    aria-hidden="true"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
  </div>

  {/* Overlay Content */}
  <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-10 px-6 lg:px-20 text-center lg:text-left">
    {/* Text Content */}
    <div className="max-w-lg lg:ml-16">
      <h1 className="text-4xl lg:text-6xl font-bold mb-4">
        Welcome to Aroma Café
      </h1>
      <p className="text-lg lg:text-xl font-light mb-6">
        Your perfect coffee experience starts here
      </p>
      
      <button className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-full shadow-lg text-lg font-medium">
        Explore Now
      </button>
    </div>

    {/* Image Content */}
    <div className="w-72 h-72 lg:w-[450px] lg:h-[450px] relative lg:mr-16">
    <img
      className=" rounded-2xl shadow-2xl object-cover bg-transparent"
      src="https://i.pinimg.com/736x/bb/6a/b8/bb6ab8cdc968164aeddb976238220011.jpg"
      alt="Coffee Cup"
/>

    </div>
  </div>
  
</header>
      {/* Menu Preview Section */}
      <section className=" bg-yellow-950">
  <div className="container mx-auto">
    <h2 className="text-3xl font-bold text-center mb-10 text-yellow-50">
      Our Favorites
    </h2>
    <div className="">
      <ProductCaffeepage />
    </div>
  </div>
</section>

      <FooterCom/>
      
    </div>
    </div>
    
  );
}
