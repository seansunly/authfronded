import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { increQuantity, deleteOne, decrementQuantity, toggleItemSelection } from "../../redux/feature/productCaffee/addTocartCafeSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function AddToCartCafe({
  codeProduct,
  category,
  price,
  image,
  shop,
  discount,
  quantity,
  title,
  priceDiscount,
}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Set the checkbox state based on whether the item is selected or not
    setChecked(quantity > 0);  // Item is selected if quantity > 0
  }, [quantity]);

  const handleIncrement = () => {
    dispatch(increQuantity({ codeProduct }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(decrementQuantity({ codeProduct }));
    } else {
      alert("Quantity cannot go below 1.");
    }
  };

  const handleDeleteOne = () => {
    dispatch(deleteOne({ codeProduct }));
  };

  // Toggle selection when checkbox is clicked
  const handleCheckboxChange = () => {
    setChecked(!checked);
    dispatch(toggleItemSelection({ codeProduct }));  // This will toggle the selection in the cart
  };

  return (
     <div className="flex flex-col items-center space-y-4 bg-gray-50 p-4 rounded-lg shadow-sm w-full sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
      {/* Product Image */}
      <div className="w-20 h-20 shrink-0">
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={title || "Product"}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className=" text-center sm:text-left">
        <h4 className="text-lg font-semibold text-gray-800">
          {title || "Unnamed Product"}
        </h4>
        <p className="text-sm text-gray-500">{shop || "Unknown Shop"}</p>
        <div className="mt-2 text-base font-semibold">
          {discount > 0 ? (
            <>
              <span className="line-through text-red-500">${price}</span>{" "}
              <span className="text-green-500">${priceDiscount}</span>
            </>
          ) : (
            `$${price}`
          )}
          <span className="text-gray-800 font-semibold block sm:inline sm:ml-6">
            QTY: {quantity}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleIncrement}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
        <button
          onClick={handleDecrement}
          disabled={quantity === 0}
          className={`px-3 py-1 ${
            quantity === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } text-white rounded`}
        >
          -
        </button>
      </div>

      {/* Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`checkbox-${codeProduct}`}
          checked={checked}
          onChange={handleCheckboxChange}
          className="form-checkbox"
        />
        <label htmlFor={`checkbox-${codeProduct}`} className="text-sm">
          Select
        </label>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDeleteOne}
        className="text-red-500 hover:text-red-700"
      >
        <RiDeleteBin6Line size={20} />
      </button>
    </div>
  );
}
