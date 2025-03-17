import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { fetchUsers } from "../../redux/feature/user/UserSlice";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom"; // Using Link for navigation
import { GoMoveToEnd } from "react-icons/go";

// Initial form values
const initialValues = {
  email: "",
  lastName: "",
  firstName: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  //gender: "",
};

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  
  lastName: Yup.string().required("Last name is required"),
  firstName: Yup.string().required("First name is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  //gender: Yup.string().required("Gender is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterComponents() {
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state for success

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (values) => {
    setServerError(null); // Clear previous errors
    try {
      const resultAction = await dispatch(fetchUsers(values));
      if (fetchUsers.rejected.match(resultAction)) {
        setServerError(resultAction.payload || "Registration failed");
        setRegistrationSuccess(false); // Ensure success state is reset on failure
      } else {
        setRegistrationSuccess(true); // Set success state
      }
    } catch (error) {
      setServerError("An unexpected error occurred");
    }
  };

  return (
    <section className="h-screen w-full flex justify-center items-center bg-[url('/path-to-your-cafe-background.jpg')] bg-cover bg-center mt-20 px-4 sm:px-0">
      <div className="bg-white/90 shadow-2xl rounded-3xl p-10 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-[#6F4E37] text-center">
          Register at Aroma Café
        </h1>

        {registrationSuccess ? (
          <div className="mt-6">
            <Link
              to="/sendverify"
              className="inline-flex items-center text-[#6F4E37] text-sm font-medium hover:text-[#8B4513] transition-all duration-200"
            >
              <GoMoveToEnd className="mr-2 text-xl" />
              <span>Click this to go to the verification page</span>
            </Link>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#6F4E37]">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full bg-[#f4e7dc] border border-[#d6baa6] text-sm rounded-lg focus:ring-[#8B4513] focus:border-[#8B4513] placeholder-gray-400 p-2"
                  placeholder="name@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Dynamic Fields (Last Name, First Name, Phone Number) */}
              {["lastName", "firstName", "phoneNumber"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-[#6F4E37]"
                  >
                    {field.replace(/^\w/, (c) => c.toUpperCase())}
                  </label>
                  <Field
                    id={field}
                    name={field}
                    type="text"
                    placeholder={`Enter your ${field}`}
                    className="mt-1 block w-full bg-[#f4e7dc] border border-[#d6baa6] text-sm rounded-lg focus:ring-[#8B4513] focus:border-[#8B4513] placeholder-gray-400 p-2"
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              ))}

              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-[#6F4E37]">
                  Password
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="mt-1 block w-full bg-[#f4e7dc] border border-[#d6baa6] text-sm rounded-lg focus:ring-[#8B4513] focus:border-[#8B4513] p-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-[#6F4E37]"
                >
                  {showPassword ? <AiTwotoneEyeInvisible /> : <AiTwotoneEye />}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#6F4E37]">
                  Confirm Password
                </label>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="mt-1 block w-full bg-[#f4e7dc] border border-[#d6baa6] text-sm rounded-lg focus:ring-[#8B4513] focus:border-[#8B4513] p-2"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-10 text-[#6F4E37]"
                >
                  {showConfirmPassword ? <AiTwotoneEyeInvisible /> : <AiTwotoneEye />}
                </button>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Gender Field */}
              {/* <div>
                <label htmlFor="gender" className="block text-sm font-medium text-[#6F4E37]">
                  Gender
                </label>
                <Field
                  as="select"
                  id="gender"
                  name="gender"
                  className="mt-1 block w-full bg-[#f4e7dc] border border-[#d6baa6] text-sm rounded-lg focus:ring-[#8B4513] focus:border-[#8B4513] p-2"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div> */}

              {/* Submit Button */}
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="w-full bg-[#8B4513] hover:bg-[#6F4E37] text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300"
                >
                  Register
                </button>

                {/* Error message */}
                {serverError && (
                  <div className="mt-4 text-red-500 text-sm font-medium">{serverError}</div>
                )}
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </section>
  );
}
