import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyOtpComponent() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(null); // Error message
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numeric input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if the current input has a value
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const verifiedCode = otp.join("");

    if (email.trim() === "" || verifiedCode.length !== 6) {
      setErrorMessage("Please enter a valid email and 6-digit OTP.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verifiedCode }),
      });

      if (response.ok) {
        alert("Verification successful!");
        navigate("/login"); // Navigate to login page on success
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Verification failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Verify OTP</h2>
        <p className="text-gray-500 mb-6">Enter your email and the OTP sent to it.</p>

        <form onSubmit={handleVerify}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* OTP Input Fields */}
          <div className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white font-medium px-4 py-2 rounded-md w-full ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 transition"
            }`}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          Didn't receive the code? <Link to="/resendverify" className="text-blue-500 hover:underline">Resend</Link>
        </p>
      </div>
    </div>
  );
}
