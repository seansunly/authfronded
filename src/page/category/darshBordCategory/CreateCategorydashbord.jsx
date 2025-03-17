import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function CreateCategorydashbord() {
  // Example list of existing titles (this could come from a database or API)
  const existingTitles = ['Existing Title 1', 'Existing Title 2'];

  // Initial values for the form fields
  const initialValues = {
    title: '',
    metaTile: '',
    slug: '',
    text: '',
  };

  // Validation schema with uniqueness check for title
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .test('unique-title', 'Title must be unique', (value) => {
        // Check if the value is already in the existingTitles array
        return value && !existingTitles.includes(value); // Ensure `value` is not undefined or empty
      }),
    metaTile: Yup.string().required('Meta Title is required'),
    slug: Yup.string().required('Slug is required'),
    text: Yup.string().required('Text is required'),
  });

  const handleSubmit = async (values) => {
    try {
      // Initialize the data to be sent to the backend
      const formData = { ...values };
  
      // Log the form data for debugging
      console.log('FormData being sent:', formData);
  
      // Post the payload to the backend
      const response = await axios.post('http://localhost:8080/api/v1/category', formData);
  
      // Handle success response
      console.log('Product created successfully:', response.data);
  
      // Optionally, redirect or show success message
    } catch (error) {
      // Handle error response
      if (error.response) {
        // Handle specific HTTP status codes
        if (error.response.status === 409) {
          // If a 409 conflict happens, it's likely due to a duplicate title or slug
          console.error('Conflict error:', error.response.data);
          alert('Error: The Tile  already exists. Please choose another.');
        } else {
          console.error('Error creating product:', error.response.data);
          alert('An error occurred while creating the product. Please try again.');
        }
      } else {
        console.error('Error creating product:', error.message);
        alert('An error occurred while creating the product. Please check your network connection.');
      }
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
        {({ errors, touched }) => (
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Form fields */}
              {[
                { id: 'title', label: 'Title', type: 'text' },
                { id: 'metaTile', label: 'Meta Title', type: 'text' },
                { id: 'slug', label: 'Slug', type: 'text' },
                { id: 'text', label: 'Text', type: 'text' },
              ].map(({ id, label, type }) => (
                <div className="mb-4" key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <Field
                    type={type}
                    id={id}
                    name={id}
                    className={`mt-1 p-3 w-full border ${errors[id] && touched[id] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <ErrorMessage name={id} component="div" className="text-red-500 text-sm mt-1" />
                </div>
              ))}
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
