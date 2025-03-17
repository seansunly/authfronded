import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchCategoryCafeById, updateCategory } from "../../redux/feature/categoryCafe/categoryCafeSlice";
import { useNavigate, useParams } from "react-router-dom";
import { selectCategoryById } from "../../redux/feature/categoryCafe/categoryCafeSlice";

export default function UpdateCategoryCard() {
  const existingTitles = ["Existing Title 1", "Existing Title 2"];
  const { codeCategory } = useParams(); // Get codeCategory from route
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryData = useSelector(selectCategoryById);

  const defaultValues = {
    title: "",
    metaTile: "",
    slug: "",
    text: "",
    isDeleted: false,
  };

  const [initialValues, setInitialValues] = useState(defaultValues);

  useEffect(() => {
    if (codeCategory) {
      dispatch(fetchCategoryCafeById(codeCategory));
    }
  }, [dispatch, codeCategory]);

  useEffect(() => {
    if (categoryData) {
      setInitialValues({
        title: categoryData.title || "",
        metaTile: categoryData.metaTile || "",
        slug: categoryData.slug || "",
        text: categoryData.text || "",
        isDeleted: categoryData.isDeleted || false,
      });
    }
  }, [categoryData]);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .test("unique-title", "Title must be unique", (value) => {
        // Check if the value is already in the existingTitles array
        return value && !existingTitles.includes(value); // Ensure `value` is not undefined or empty
      }),
    metaTile: Yup.string().required("Meta Title is required"),
    slug: Yup.string().required("Slug is required"),
    text: Yup.string().required("Text is required"),
    isDeleted: Yup.boolean(),
  });

  const handleSubmit = async (values) => {
    try {
      await dispatch(updateCategory({ codeCategory, updatedCategoryData: values })).unwrap();
      alert("Category updated successfully!");
      navigate("/dashboard/categoryDashBord"); // Navigate back to the dashboard
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category.");
    }
  };

  return (
    <div className="w-[1200px] mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Category</h2>

      {initialValues && (
        <Formik
          initialValues={initialValues}
          enableReinitialize // Allow Formik to update when `initialValues` changes
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "title", label: "Title", type: "text" },
                  { id: "metaTile", label: "MetaTile", type: "text" },
                  { id: "slug", label: "Slug", type: "text" },
                  { id: "text", label: "Text", type: "text" },
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
                  Update Category
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
