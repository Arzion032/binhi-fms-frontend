import React, { useState, useEffect } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateNewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(3);

  const email = location.state?.email || "your email";

  useEffect(() => {
    if (showSuccess) {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showSuccess, navigate]);

  const isPasswordValid =
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password) &&
    password.length >= 8;

  const handleNext = () => {
    if (!isPasswordValid) {
      setError("❌ Password does not meet all the requirements. Please try again.");
    } else if (password !== confirmPassword) {
      setError("❌ The password confirmation does not match. Please try again.");
    } else {
      setError("");
      setShowSuccess(true);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/your-background.jpg')" }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col"
        style={{ width: "576px", height: "731px" }}
      >
        <button
          onClick={() => navigate("/verify-code")}
          className="flex items-center gap-1 text-sm text-black mb-4"
        >
          <img src="/arrow-left-s-line.png" alt="Back" className="w-25 h-10" />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-center">Create New Password</h2>
        <p className="text-md text-center text-gray-600 mt-1 mb-3">
          Create your new password for <br />
          <span className="text-black font-medium">{email}</span>.
        </p>

        {/* New Password Field */}
        <div className="relative mb-3">
          <label className="label font-semibold">New Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            className={`input input-bordered w-full ${error ? "border-red-500" : ""}`}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-3 top-[4.1rem] -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img src="/eye-open.png" alt="Hide password" className="w-[28px] h-[22px]" />
            ) : (
              <img src="/eye-closed.png" alt="Show password" className="w-[28px] h-[22px]" />
            )}
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="relative mb-3">
          <label className="label font-semibold">Confirm Password</label>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`input input-bordered w-full ${error ? "border-red-500" : ""}`}
          />
          <div
            className="absolute right-3 top-[4.1rem] -translate-y-1/2 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <img src="/eye-open.png" alt="Hide password" className="w-[28px] h-[22px]" />
            ) : (
              <img src="/eye-closed.png" alt="Show password" className="w-[28px] h-[22px]" />
            )}
          </div>
        </div>

        {/* Fixed height container for error message */}
        <div className="h-6 mb-2">{error && <p className="text-red-500 text-sm">{error}</p>}</div>

        {/* Password Requirements */}
        <div className="text-md text-gray-600 mb-6">
          <p className="font-medium mb-2">Your Password must contain..</p>

          <div
            className={`flex items-center gap-2 text-sm font-medium mb-1 ${
              password.length >= 8 ? "text-green-600" : "text-red-500"
            }`}
          >
            <img
              src={password.length >= 8 ? "/check.png" : "/wrong.png"}
              alt="check"
              className="h-3 w-3"
            />
            <span>Minimum of 8 characters</span>
          </div>

          <div
            className={`flex items-center gap-2 text-sm font-medium mb-1 ${
              /[A-Z]/.test(password) && /[a-z]/.test(password) ? "text-green-600" : "text-red-500"
            }`}
          >
            <img
              src={
                /[A-Z]/.test(password) && /[a-z]/.test(password) ? "/check.png" : "/wrong.png"
              }
              alt="check"
              className="h-3 w-3"
            />
            <span>At least 1 lower and upper case letters (AaBb)</span>
          </div>

          <div
            className={`flex items-center gap-2 text-sm font-medium mb-1 ${
              /[^A-Za-z0-9]/.test(password) ? "text-green-600" : "text-red-500"
            }`}
          >
            <img
              src={/[^A-Za-z0-9]/.test(password) ? "/check.png" : "/wrong.png"}
              alt="check"
              className="h-3 w-3"
            />
            <span>At least 1 symbol (@#$)</span>
          </div>

          <div
            className={`flex items-center gap-2 text-sm font-medium ${
              /\d/.test(password) ? "text-green-600" : "text-red-500"
            }`}
          >
            <img
              src={/\d/.test(password) ? "/check.png" : "/wrong.png"}
              alt="check"
              className="h-3 w-3"
            />
            <span>At least 1 number (123)</span>
          </div>
        </div>

        <div className="flex-grow"></div>

        {/* Next Button */}
        <Button onClick={handleNext}>Next</Button>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-11 w-[620px] h-[460px] shadow-xl">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-3xl font-bold mb-4">Password Reset Successfully!</h3>
              <img src="/Checkpass.png" alt="Success" className="w-18 h-18 mb-4" />
              <p className="text-base text-gray-600 mb-3">
                You have successfully reset the password for the account with the email{" "}
                <span className="font-medium">{email}</span>.
              </p>
              <br />
              <br />
              <p className="text-sm text-gray-500 mb-4">
                You will be redirected to Login Page in {countdown} second{countdown !== 1 ? "s" : ""}.
              </p>
              <button
                className="w-full mt-1 bg-[#4CAE4F] text-white py-3 rounded-full hover:bg-green-700 transition mx-auto"
                onClick={() => navigate("/login")}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
