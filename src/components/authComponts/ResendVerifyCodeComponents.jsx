import React from 'react'
import { useState } from 'react';

export default function ResendVerifyCodeComponents() {
  const [email, setEmail] = useState(""); // State for storing email
    const [message, setMessage] = useState(""); // State for success/failure message
    const [messageType, setMessageType] = useState(""); // State for message type (success or failure)
    const [loading, setLoading] = useState(false); // State for loading
  
    const handleEmailChange = (e) => setEmail(e.target.value); // Handle email input change
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      setMessage(""); // Clear previous messages
      setLoading(true); // Set loading to true
  
      try {
        const response = await fetch("http://localhost:8080/api/v1/auth/resend-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // Sending email as payload
        });
  
        // Handle unexpected HTTP responses (non-2xx)
        if (!response.ok) {
          const errorData = await response.json();
          setMessage(errorData.message || "Failed to send verification code");
          setMessageType("failure");
        } else {
          const data = await response.json();
          setMessage("Verification code sent successfully! Please check your email.");
          setMessageType("success");
        }
      } catch (err) {
        // Catch block triggered on network errors or other issues
        //setMessage("An error occurred. Please try again later.");
        setMessageType("failure");
      } finally {
        setLoading(false); // Set loading to false after handling success or failure
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
           Re Send Verification Code
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Enter your email address, and we'll send you a verification code.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            {/* Success/Failure Message */}
            {message && (
              <p className={`text-sm text-center mt-2 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}
  
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
              disabled={loading} // Disable button if loading
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-4">
            Already have a code?{" "}
            <a href="/verify" className="text-blue-500 hover:underline">
              Verify now
            </a>
          </p>
        </div>
      </div>
    );
  }
  
