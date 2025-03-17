import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { useEffect } from 'react';

export default function CaffeeCard({
  nameCategory,
  price,
  image,
  shop,
  discount,
  quantity,
  tile,
  description,
  codeProduct,
  priceDiscount
}) {
  const defaultImage = 'https://via.placeholder.com/300x200';


  const fallbackPrice = 0;
  useEffect(() => {
      Aos.init({
        duration: 1500,
        offset: 200,
        easing: 'ease-in-out',
        once: true, // Whether animation should happen only once
      }); // Initialize AOS with a duration for animations
    }, []);
  return (
    <Link to={`/${codeProduct}`} className="hover:shadow-lg transition-shadow">
      <div
  data-aos="flip-left"
  className="flex flex-col bg-white overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all"
>
  {/* Image */}
  <img
    src={image || defaultImage}
    alt={nameCategory || 'Coffee'}
    className="w-full h-48 object-cover"
  />

  {/* Content */}
  <div className="p-4 flex flex-col items-center flex-grow text-center">
    {/* Title */}
    <h3
      className="text-lg font-semibold text-gray-800 hover:text-brown-600 line-clamp-1"
      title={tile || 'No Title'}
    >
      {tile || 'No Title'}
    </h3>

    {/* Description */}
    <p
      className="text-sm text-gray-600 mb-4 line-clamp-2"
      title={description || 'No Description Available.'}
    >
      {description || 'No Description Available.'}
    </p>

    {/* Pricing Info */}
    <div className="flex flex-col items-center justify-center mt-auto">
      <div className='flex mb-2'>
      {discount > 0 && (
        <p className="text-sm text-green-400 mr-5">
          Discount: %{discount}
        </p>
      )}
      <p className="text-sm  line-through text-red-900">
        price ${price || fallbackPrice}
      </p>
      </div>
      
      <p className="text-lg font-bold  text-blue-800 mb-2">
      price  ${priceDiscount || fallbackPrice}
      </p>

      {/* Category
      <span className="text-xs text-white bg-brown-500 rounded-full px-3 py-1">
        {nameCategory || 'General'}
      </span> */}
    </div>
  </div>
</div>

    </Link>
  );
}
//line-through
CaffeeCard.propTypes = {
  nameCategory: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  shop: PropTypes.string,
  discount: PropTypes.number,
  quantity: PropTypes.number,
  tile: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
