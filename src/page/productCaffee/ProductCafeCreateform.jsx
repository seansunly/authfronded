import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function ProductCafeCreateForm() {
  // Initial values for the form fields
  const initialValues = {
    tile: '',
    metaTile: '',
    slug: '',
    price: '',
    quantity: '',
    discount: '',
    shop: '',
    endDate: '',
    image: '', // Change from null to empty string for URL input
    content: '',
    nameCategory: '', // Required field
  };

  // Validation schema
  const validationSchema = Yup.object({
    tile: Yup.string().required('Tile is required'),
    metaTile: Yup.string().required('metaTile is required'),
    slug: Yup.string().required('Slug is required'), 
    price: Yup.number()
      .typeError('Price must be a valid number')
      .positive('Price must be positive')
      .nullable(),
    quantity: Yup.number()
      .typeError('Quantity must be a valid number')
      .integer('Quantity must be an integer')
      .positive('Quantity must be positive')
      .nullable(),
    discount: Yup.number()
      .typeError('Discount must be a valid number')
      .min(0, 'Discount cannot be less than 0')
      .max(100, 'Discount cannot exceed 100')
      .nullable(),
    shop: Yup.string(),
    endDate: Yup.date().required('End date is required'),
    image: Yup.string().url('Please enter a valid image URL').required('Image URL is required'), // Validate URL
    content: Yup.string(),
    nameCategory: Yup.string().required('Category name is required'),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      // Initialize the data to be sent to the backend
      const formData = { ...values };

      // Log the form data for debugging
      console.log('FormData being sent:', formData);

      // Post the payload to the backend
      const response = await axios.post('http://localhost:8080/api/v1/product', formData);

      // Handle success response
      console.log('Product created successfully:', response.data);
    } catch (error) {
      // Handle error response
      console.error(
        'Error creating product:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="w-[1200px] mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create New Product</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            
              <div className="mb-4 col-span-full ">
                <label htmlFor="metaTile" className="block text-sm font-medium text-gray-700">
                  metaTile
                </label>
                <Field
                  as="textarea"
                  id="metaTile"
                  name="metaTile"
                  rows="4"
                  className="mt-1 p-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="metaTile" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Form fields */}
              {[ 
                { id: 'tile', label: 'Tile', type: 'text' },
                { id: 'slug', label: 'Slug', type: 'text' },
                { id: 'price', label: 'Price', type: 'number' },
                { id: 'quantity', label: 'Quantity', type: 'number' },
                { id: 'discount', label: 'Discount ($)', type: 'number' },
                { id: 'shop', label: 'Shop Name', type: 'text' },
                { id: 'endDate', label: 'End Date', type: 'date' },
                { id: 'nameCategory', label: 'Category Name', type: 'text' },
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

              {/* Input for image URL */}
              <div className="mb-4 col-span-full">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <Field
                  type="text"
                  id="image"
                  name="image"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Textarea for content */}
              <div className="mb-4 col-span-full">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <Field
                  as="textarea"
                  id="content"
                  name="content"
                  rows="4"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-8 rounded-lg hover:bg-blue-800 transition duration-300"
              >
                Create Product
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
