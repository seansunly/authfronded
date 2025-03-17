import React from 'react';
import { FaFacebook, FaTelegram, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime, MdWeb } from 'react-icons/md';

export default function FooterCom() {
  return (
    <footer className="bg-yellow-600 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-8">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">Cafe Shop</h2>
          <p className="text-sm text-gray-400">Serving the best coffee in town</p>
          <p className="flex items-center justify-center md:justify-start space-x-2 mt-2 text-gray-300">
            <MdLocationOn className="text-lg" /> <span>Street Name, City, Country</span>
          </p>
          <p className="flex items-center justify-center md:justify-start space-x-2 text-gray-300">
            <MdAccessTime className="text-lg" /> <span>Mon - Fri: 7 AM - 9 PM | Sat - Sun: 8 AM - 10 PM</span>
          </p>
          <p className="flex items-center justify-center md:justify-start space-x-2 text-gray-300">
            <MdWeb className="text-lg" /> <a href="https://www.yourcafename.com" className="hover:text-blue-500">www.yourcafename.com</a>
          </p>
        </div>
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-6 text-center md:text-left">
          <p className="flex items-center space-x-2 text-gray-300">
            <MdEmail className="text-lg" /> <span>sunlyslysun@gmail.com</span>
          </p>
          <p className="flex items-center space-x-2 text-gray-300">
            <MdPhone className="text-lg" /> <span>0967621922</span>
          </p>
        </div>
        <div className="flex space-x-4 mt-6 md:mt-0">
          <a href="https://www.facebook.com/sean.sunly.3" className="text-blue-500 hover:text-white">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="https://t.me/SeanSunly" className="text-blue-400 hover:text-white">
            <FaTelegram className="text-2xl" />
          </a>
          <a href="https://www.instagram.com/yourcafe" className="text-pink-500 hover:text-white">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://twitter.com/yourcafe" className="text-blue-400 hover:text-white">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="https://www.tiktok.com/@yourcafe" className="text-black hover:text-white">
            <FaTiktok className="text-2xl" />
          </a>
        </div>
      </div>
      <div className="text-center mt-6 border-t border-gray-700 pt-4 text-gray-400">
        <p className="text-sm">🎉 Happy Hour: Buy 1 Get 1 Free (Every Friday, 5-7 PM)</p>
        <p className="text-sm">📩 Join our Newsletter: Stay updated on new menu items & special discounts!</p>
        <p className="text-sm">💬 <a href="#" className="hover:text-blue-500">Submit Feedback Here</a></p>
      </div>
    </footer>
  );
}
