import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchProductCafeById, updateProduct } from "../../../redux/feature/productCaffee/productCaffeeSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProductOnDashBord() {
  const { codeProduct } = useParams(); // Get codeProduct from route
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.productCaffees.productCaffeeById);

  // Default Values to Avoid Null
  const defaultValues = {
    tile: "",
    metaTile: "",
    slug: "",
    price: 0,
    quantity: 0,
    discount: 0,
    shop: "",
    endDate: "",
    image: "",
    content: "",
    isDeleted: false,
  };

  const [initialValues, setInitialValues] = useState(defaultValues);

  // Fetch product data when `codeProduct` changes
  useEffect(() => {
    if (codeProduct) {
      dispatch(fetchProductCafeById(codeProduct));
    }
  }, [dispatch, codeProduct]);

  // Update initial values once product data is fetched
  useEffect(() => {
    if (productData) {
      setInitialValues({
        tile: productData.tile || "",
        metaTile: productData.metaTile || "",
        slug: productData.slug || "",
        price: productData.price || 0,
        quantity: productData.quantity || 0,
        discount: productData.discount || 0,
        shop: productData.shop || "",
        endDate: productData.endDate || "",
        image: productData.image || "",
        content: productData.content || "",
        isDeleted: productData.isDeleted || false,
      });
    }
  }, [productData]);

  const validationSchema = Yup.object({
    tile: Yup.string().required("tile is required"),
    metaTile: Yup.string(),
    slug: Yup.string(),
    price: Yup.number().typeError("Price must be a number").positive("Price must be positive"),
    quantity: Yup.number().typeError("Quantity must be a number").integer("Quantity must be an integer"),
    discount: Yup.number().min(0, "Discount cannot be less than 0").max(100, "Discount cannot exceed 100"),
    shop: Yup.string(),
    endDate: Yup.date(),
    image: Yup.string(),
    content: Yup.string(),
    isDeleted: Yup.boolean(),
  });

  const handleSubmit = async (values) => {
    try {
      await dispatch(updateProduct({ codeProduct, updatedProductData: values })).unwrap();
      alert("Product updated successfully!");
      navigate("/dashboard/productDashBordCafe"); // Navigate back to the dashboard
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="w-[1200px] mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Product</h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize // Reinitialize Formik when `initialValues` changes
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: "tile", label: "Tile", type: "text" },
                { id: "metaTile", label: "Meta tile", type: "text" },
                { id: "slug", label: "Slug", type: "text" },
                { id: "price", label: "Price", type: "number" },
                { id: "quantity", label: "Quantity", type: "number" },
                { id: "discount", label: "Discount (%)", type: "number" },
                { id: "shop", label: "Shop Name", type: "text" },
                { id: "endDate", label: "End Date", type: "date" },
                { id: "content", label: "Content", type: "text" },
                { id: "image", label: "Image URL", type: "text" },
              ].map(({ id, label, type }) => (
                <div className="mb-4" key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <Field
                    type={type}
                    id={id}
                    name={id}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name={id} component="div" className="text-red-500 text-sm mt-1" />
                </div>
              ))}

              <div className="mb-4 col-span-full">
                <label htmlFor="isDeleted" className="block text-sm font-medium text-gray-700">
                  Is Deleted?
                </label>
                <Field type="checkbox" id="isDeleted" name="isDeleted" className="mt-1" />
                <ErrorMessage name="isDeleted" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-8 rounded-lg hover:bg-blue-800 transition duration-300"
              >
                Update Product
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
