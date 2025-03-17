import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGrandTotalSelectedPrice,
  selectTotalSelectedQuantity,
  selectCodeOrder,
} from "../../redux/feature/productCaffee/addTocartCafeSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postTransaction } from "../../redux/feature/productCaffee/paymentCafeSlice";
import { useLocation } from "react-router-dom";

import { selectUserBytoken ,fetchgetUsers} from '../../redux/feature/user/UserSlice'

export default function ProductPaymentComponents() {
  const dispatchUser = useDispatch();
    const getUserProfile = useSelector(selectUserBytoken);
    //const userStatus = useSelector((state) => state.user.status);  // Correct access of status
    
    useEffect(() => {
      dispatchUser(fetchgetUsers());
    }, [dispatchUser]);
    //console.log("User profile data:", getUserProfile);  // Log after data is updated
  
    useEffect(() => {
      console.log("User profile data:", getUserProfile);  // Log after data is updated
    }, [getUserProfile]); // This ensures you log the updated profile data once it's fetched








  const dispatch = useDispatch();
  const location = useLocation();
  const orderCode = location.state?.codeOrder || ""; // Get order code from navigation state
  //console.log("code order: " + orderCode);

  const priceTotal = useSelector(selectGrandTotalSelectedPrice);
  const totalQuantity = useSelector(selectTotalSelectedQuantity);

  const [stablePriceTotal, setStablePriceTotal] = useState(priceTotal || 0);
  const [stableTotalQuantity, setStableTotalQuantity] = useState(totalQuantity || 0);
  
  useEffect(() => {
    if (totalQuantity !== null && priceTotal !== null) {
      setStableTotalQuantity(totalQuantity);
      setStablePriceTotal(priceTotal);
    }
  }, [totalQuantity, priceTotal]); // Make sure `orderCode` is a dependency here

  useEffect(() => {
    if (orderCode) {
      formik.setFieldValue("codeOrder", orderCode);
    }
  }, [orderCode]); // Ensure Formik updates the field dynamically
  

  const formik = useFormik({
    initialValues: {
      imageQRCode: "",
      totalPay$: stablePriceTotal || 0,
      totalPayRile: (stablePriceTotal * 4000) || 0,
      codeOrder: orderCode ,
      codeUser:getUserProfile.codeUser,
    },
    validationSchema: Yup.object({
      imageQRCode: Yup.string().required("QR Code is required."),
      codeUser: Yup.string().required("User Code is required."),
      codeOrder: Yup.string().required("Order Code is required."),
      totalPay$: Yup.number()
        .required("Total Pay (USD) is required.")
        .typeError("Total Pay (USD) must be a number.")
        .positive("Total Pay (USD) must be positive."),
      totalPayRile: Yup.number()
        .required("Total Pay (Riel) is required.")
        .typeError("Total Pay (Riel) must be a number.")
        .positive("Total Pay (Riel) must be positive."),
    }),
    onSubmit: (values) => {
      const transactionData = {
        imageQRCode: values.imageQRCode,
        codeUser: values.codeUser,
        codeOrder: values.codeOrder,
        totalPay$: parseFloat(values.totalPay$) || 0,
        totalPayRile: values.totalPay$ * 4000,
      };

      // Dispatch the transaction to the backend
      dispatch(postTransaction(transactionData))
        .then((response) => {
          if (response.type === "paymentCaffee/postTransaction/fulfilled") {
            console.log("Payment Response Data:", response.payload);
            alert("Payment submitted successfully!");
            formik.resetForm();
          } else {
            throw new Error("Transaction failed.");
          }
        })
        .catch((error) => {
          console.error("Error in transaction:", error);
          alert(`Payment submission failed: ${error.message}`);
        });
    },
  });

  const [selectedImage, setSelectedImage] = useState("");  // Add this state

const handleImageChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      formik.setFieldValue("imageQRCode", data.uri);
      setSelectedImage(data.uri);  // This will update the selectedImage state
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
};


  // Render conditionally when no items are selected
  if (!stableTotalQuantity || !stablePriceTotal) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <p>No items selected. Please add some items to your cart.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Payment</h2>

      <div className="flex items-center gap-4 mb-5">
        <img
          src="../image/payUSA.jpg"
          alt="Product"
          className="w-60 h-60 object-cover rounded-lg"
        />
        <img
          src="../image/PayREale.jpg"
          alt="Product"
          className="w-60 h-60 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-700">Product Name</h3>
          <p className="text-sm text-gray-600 mt-2">Short product description here.</p>
          <h4 className="text-lg font-bold text-gray-800 mt-4">${stablePriceTotal.toFixed(2)}</h4>
        </div>
      </div>

      <h4 className="text-lg font-bold text-gray-800 mt-4">
        Total Quantity: {stableTotalQuantity}
      </h4>
      <h4 className="text-lg font-bold text-gray-800 mt-4">
        Total Price: ${stablePriceTotal.toFixed(2)}
      </h4>

      <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="imageQRCode" className="block text-sm font-medium text-gray-700">
            QR Code (Choose Image)
          </label>
          <input
            id="imageQRCode"
            name="imageQRCode"
            type="file"
            accept="image/*"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            onChange={handleImageChange}
          />
          {formik.touched.imageQRCode && formik.errors.imageQRCode && (
            <div className="text-red-500 text-sm">{formik.errors.imageQRCode}</div>
          )}
        </div>

        <div>
          <label htmlFor="totalPayRile" className="block text-sm font-medium text-gray-700">
            Total Pay (Riel)
          </label>
          <input
            id="totalPayRile"
            name="totalPayRile"
            type="number"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => formik.setFieldValue("totalPayRile", parseFloat(e.target.value) || 0)}
            onBlur={formik.handleBlur}
            value={formik.values.totalPayRile}
          />
          {formik.touched.totalPayRile && formik.errors.totalPayRile && (
            <div className="text-red-500 text-sm">{formik.errors.totalPayRile}</div>
          )}
        </div>

        <div>
          <label htmlFor="totalPay$" className="block text-sm font-medium text-gray-700">
            Total Pay (USD)
          </label>
          <input
            id="totalPay$"
            name="totalPay$"
            type="number"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            onChange={(e) => formik.setFieldValue("totalPay$", parseFloat(e.target.value) || 0)}
            onBlur={formik.handleBlur}
            value={formik.values.totalPay$}
          />
          {formik.touched.totalPay$ && formik.errors.totalPay$ && (
            <div className="text-red-500 text-sm">{formik.errors.totalPay$}</div>
          )}
        </div>

        <div>
          <label htmlFor="codeOrder" className="block text-sm font-medium text-gray-700">
            Order Code
          </label>
          <input
            id="codeOrder"
            name="codeOrder"
            type="text"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            onChange={formik.handleChange}
            value={formik.values.codeOrder}
          />
          {formik.touched.codeOrder && formik.errors.codeOrder && (
            <div className="text-red-500 text-sm">{formik.errors.codeOrder}</div>
          )}
        </div>

        <div>
          <label htmlFor="codeUser" className="block text-sm font-medium text-gray-700">
            User Code
          </label>
          <input
            id="codeUser"
            name="codeUser"
            type="text"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            onChange={formik.handleChange}
            value={formik.values.codeUser}
          />
          {formik.touched.codeUser && formik.errors.codeUser && (
            <div className="text-red-500 text-sm">{formik.errors.codeUser}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-6 w-full"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}
