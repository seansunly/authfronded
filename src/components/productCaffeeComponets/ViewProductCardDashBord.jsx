import React from 'react';
import PropTypes from 'prop-types';

export default function ViewProductCardDashBord({
  tile,
  codeProduct,
  isDeleted,
  nameCategory,
  price,
  image,
  shop,
  discount,
  quantity,
  content,
  metaTile,
  slug,
  endDate,
  createAt,
  updateAt,
  startDate,
  haveNotInStock,
  isDeletedCategory,
  priceDiscount
}) {
  // Format date utility function
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };
  console.log("tes price deiscount",priceDiscount)

  // Conditional rendering of 'Deleted' or 'Out of Stock' tags
  const renderDeletedTag = () => {
    if (isDeleted) {
      return <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">Deleted</span>;
    }
    return null;
  };

  const renderOutOfStock = () => {
    if (haveNotInStock) {
      return <p className="text-red-500 font-bold">Out of Stock</p>;
    }
    return null;
  };

  const renderDiscount = () => {
    if (discount > 0) {
      return <p className="text-red-500"><strong className="font-medium">Discount:</strong> {discount}% off</p>;
    }
    return null;
  };

  // Handle null or missing values for optional props
  if (!tile || !image || !price) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[1000px] rounded-lg border border-gray-300 bg-white shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{tile}</h2>
          {renderDeletedTag()}
        </div>
        <img className=" h-64 object-cover rounded-md mt-4" src={image} alt={tile} />
        <p className=' mb-5 mt-5'><strong className="font-medium">Meta Title:</strong> {metaTile}</p>
        <p className='mr-3'><strong className="font-medium ">Product Code:</strong> {codeProduct}</p>

        <div className="mt-4 space-y-3">
          <div className=' flex'>
            
            <p className='mr-3'><strong className="font-medium">Category:</strong> {nameCategory}</p>
            <p className='mr-3'><strong className="font-medium">Shop:</strong> {shop}</p>
          </div>

          <div className="flex justify-between items-center">
            <p><strong className="font-medium ">Price:</strong> ${price}</p>
            
            {renderDiscount()}
          </div>
          <p><strong className="font-medium ">PriceDiscount:</strong> ${priceDiscount}</p>
          <div>
            <p><strong className="font-medium">Quantity:</strong> {quantity}</p>
            {renderOutOfStock()}
          </div>

          <div className=' flex'>
            <p className=' mr-6'><strong className="font-medium">Start Date:</strong> {formatDate(startDate)}</p>
            <p className=' mr-6'><strong className="font-medium">End Date:</strong> {formatDate(endDate)}</p>
          </div>

          <div className='flex'>
            
            
            <p className=' mr-6'><strong className="font-medium">Created At:</strong> {formatDate(createAt)}</p>
            <p className=' mr-6'><strong className="font-medium">Updated At:</strong> {formatDate(updateAt)}</p>
          </div>
          <p className=' mr-6'><strong className="font-medium">Slug:</strong> {slug}</p>
          {isDeletedCategory && (
            <p className="text-red-500 font-bold">Category Deleted</p>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
}

// Prop validation for better maintainability
ViewProductCardDashBord.propTypes = {
  tile: PropTypes.string.isRequired,
  codeProduct: PropTypes.string.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  nameCategory: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  shop: PropTypes.string.isRequired,
  discount: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  priceDiscount : PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  metaTile: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  createAt: PropTypes.string.isRequired,
  updateAt: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  haveNotInStock: PropTypes.bool.isRequired,
  isDeletedCategory: PropTypes.bool.isRequired,
};
