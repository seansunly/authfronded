import React from "react";
import { Card, Button, Badge } from "flowbite-react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/feature/productCaffee/addTocartCafeSlice';
import ProductCaffeepage from "../../page/productCaffee/ProductCaffeepage";
export default function ProductCafeDetailCard({
  nameCategory,
  price,
  image,
  shop,
  discount,
  quantity,
  tile,
  description,
  priceDiscount,codeProduct
}) {
  //const discountedPrice = price - (price * discount) / 100;
  const discountedPrice = price - discount;

  const dispatch=useDispatch();
  //console.log("qty in product card",qty);

  //handle add to cart button

    const handleAddToCart = ()=>{
      dispatch(
        addToCart({nameCategory,
          price,
          image,
          shop,
          discount,
          quantity,
          tile,
          description,
          priceDiscount,codeProduct})
      );
    }

  return (
    <div className="">
      <div className="flex justify-center items-center  bg-gray-100 p-4">
      <div className="max-w-7xl w-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
    
    {/* Product Image */}
    <div className="w-full md:w-1/2 relative">
      <img
        src={image}
        alt={tile}
        className="w-full h-80 md:h-full object-cover p-4 md:p-8 rounded-lg"
      />
    </div>

    {/* Product Details */}
    <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
      {/* Product Title and Info */}
      <div>
        <h5 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">{tile}</h5>
        <p className="text-sm sm:text-base text-gray-500 mb-2">
          <strong>Category:</strong> {nameCategory}
        </p>
        <p className="text-sm sm:text-base text-gray-600 mb-4">{description}</p>

        {/* Price Section */}
        <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
          {discount > 0 ? (
            <>
              <span className="text-lg sm:text-2xl font-semibold text-green-600">
                ${priceDiscount}
              </span>
              <span className="text-sm sm:text-base line-through text-gray-500">
                ${price}
              </span>
            </>
          ) : (
            <span className="text-lg sm:text-2xl font-semibold text-gray-800">
              ${price}
            </span>
          )}
        </div>

        {/* Quantity Section */}
        <p className="text-sm sm:text-base text-gray-500 mb-4">
          {quantity > 0 ? (
            <span>In Stock: {quantity}</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>

        {/* Shop Information */}
        <p className="text-sm sm:text-base text-gray-500">
          <strong>Shop:</strong> {shop}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-start gap-3 sm:gap-4 mt-6">
        <Button
          onClick={() => handleAddToCart()}
          gradientDuoTone="greenToBlue"
          disabled={quantity === 0}
          className="w-full sm:w-auto"
        >
          Add to Cart
        </Button>
        <Button
          color="gray"
          disabled={quantity === 0}
          className="w-full sm:w-auto"
        >
          Buy Now
        </Button>
      </div>
    </div>
    </div>
      </div>
      <div>
        <ProductCaffeepage />  {/* passing props to product cafe page */}
      </div>
    </div>
    
);
}
