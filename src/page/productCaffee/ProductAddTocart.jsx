import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItemsCafe,
  selectTotalSelectedPrice,
  toggleSelectAll,
  deleteAll,
  orderSelectedProducts,
} from "../../redux/feature/productCaffee/addTocartCafeSlice";
import AddToCartCafe from "../../components/productCaffeeComponets/AddToCartCafe";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function ProductAddToCart() {
  const navigate = useNavigate();
  const addTocarts = useSelector(selectCartItemsCafe);
  const totalSelectedPrice = useSelector(selectTotalSelectedPrice);
  const dispatch = useDispatch();

  const [localTotalPrice, setLocalTotalPrice] = useState(0);

  useEffect(() => {
    const total = addTocarts
      .filter((item) => item.selected)  // Only selected items
      .reduce((sum, item) => sum + item.priceDiscount, 0);
    setLocalTotalPrice(total);
  }, [addTocarts]);

  const handleDeleteAll = () => {
    dispatch(deleteAll());
  };

  const handleCheckout = async () => {
    try {
      const response = await dispatch(orderSelectedProducts()).unwrap();
      console.log("API Response:", response);
  
      if (response && response.codeOrder) {
       // alert(`Order successful! Order Code: ${response.codeOrder}`);
       navigate("/addToCartCafe/productPayment", { state: { codeOrder: response.codeOrder } });
      } else {
        alert("Order successful, but no order code was returned!");
      }
    } catch (error) {
      console.error("API Error:", error); // Log error for debugging
      const errorMessage =
        (error && error.message) ||
        (typeof error === "object" ? JSON.stringify(error) : error.toString()) ||
        "Unknown error occurred";
      alert(`Order failed: ${errorMessage}`);
    }
  };
  
  
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8 mt-4 mx-auto max-w-screen-xl">
      <div className="flex-1 bg-white rounded-lg shadow-md p-4">
        <div className="flex bg-orange-300 justify-between items-center px-4 py-2 rounded shadow">
          <h2 className="text-xl font-bold text-gray-800">Add to Cart</h2>
          <div
            className="flex items-center space-x-2 hover:bg-red-200 p-2 rounded cursor-pointer"
            onClick={handleDeleteAll}
          >
            <div className="text-red-600 text-lg">
              <RiDeleteBin6Line />
            </div>
            <div className="text-sm font-medium text-red-600">Delete All</div>
          </div>
        </div>

        <div className="mt-4 max-h-[50vh] overflow-y-auto">
          {addTocarts.length > 0 ? (
            addTocarts.map((addTo, index) => (
              <AddToCartCafe
                key={index}
                metaTile={addTo.metaTile}
                codeProduct={addTo.codeProduct}
                isDeleted={addTo.isDeleted}
                nameCategory={addTo.nameCategory}
                price={addTo.price}
                image={addTo.image}
                shop={addTo.shop}
                discount={addTo.discount}
                quantity={addTo.quantity}
                title={addTo.tile}
                priceDiscount={addTo.priceDiscount}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
          )}
        </div>
      </div>

      <div className="w-full lg:w-80 bg-orange-300 p-6 rounded-lg shadow-lg flex flex-col justify-between">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>
        </div>

        <div className="flex justify-between mb-4">
          <p className="text-gray-700">Total</p>
          <p className="text-gray-800 font-bold text-xl">${localTotalPrice}</p>
        </div>
        <Link to={"productPayment"}>
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Checkout
        </button>
        </Link>
        
        {/* productPayment */}
      </div>
    </div>
  );
}
