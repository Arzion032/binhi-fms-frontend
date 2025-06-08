import React, { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { Card } from "../Card";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

function LogInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
/*
  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve saved user data from localStorage
    const userFirstName = localStorage.getItem("userFirstName") || "User";
    const userLastName = localStorage.getItem("userLastName") || "";
    const userAddress = localStorage.getItem("userAddress") || "";
    const userEmail = localStorage.getItem("userEmail") || "";

    // Navigate to marketplace and pass user info in state
    navigate("/marketplace", {
      state: {
        firstName: userFirstName,
        lastName: userLastName,
        address: userAddress,
        email: userEmail,
      },
    });
  };
  */

const handleLogin = async (e) => {
    e.preventDefault();  // Prevent form submission from reloading the page
    e.stopPropagation(); // Stop event bubbling
    setError(""); // Reset error message

    // Validate inputs before making API call
    if (!email.trim() || !password.trim()) {
        setError("Please enter both email and password.");
        return;
    }

    try {
        const response = await api.post("/users/login/", {
            email: email.trim(),
            password,
        });

        // Handle success
        const { access, refresh, user_id, email: userEmail, role, username } = response.data;

        // Store tokens in localStorage
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("userId", user_id);
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userName", username);

        // Redirect to Marketplace or Dashboard
        navigate("/membership"); // Or replace with specific route as needed
    } catch (err) {
        console.error("Login error:", err); // Log error for debugging
        
        // Handle different types of errors
        if (err.response) {
            // Server responded with error status
            const status = err.response.status;
            if (status === 401 || status === 400) {
                setError("Invalid email or password.");
            } else if (status === 500) {
                setError("Server error. Please try again later.");
            } else {
                setError("Login failed. Please try again.");
            }
        } else if (err.request) {
            // Network error
            setError("Network error. Please check your connection.");
        } else {
            // Other error
            setError("An unexpected error occurred. Please try again.");
        }
    }
};

  return (
    <div className="flex items-center justify-center px-5 py-10">
  <div className="flex flex-col md:flex-row justify-between rounded-2xl overflow-hidden w-full max-w-7xl">
    {/* Left Side */}
    <div className="md:w-[40%] text-white flex flex-col items-center justify-center pb-10">
      <img src="/Binhi Logo.png" alt="Binhi Logo" className="w-[220px] h-[220px] mb-4" />
      <img src="/Binhi.png" alt="Binhi" className="w-[480px] h-[200px] mb-2" />
      <p className="text-3xl mt-2">Ang Ugat sa Masaganang Bukas!</p>
    </div>

    {/* Right Side */}
    <div className="md:w-[60%] flex items-center justify-center p-4 gap-4">
      <Card className="w-full max-w-xl p-12 pt-2 pb-6 rounded-3xl shadow-2xl bg-white">
        <h2 className="pt-10 text-4xl font-bold text-center mb-4">Welcome Back to BINHI!</h2>
        <p className="text-xl text-center mb-8">
          Log In and don't miss the opportunity to <br />easily connect with BINHI!
        </p>

        <form onSubmit={handleLogin} className="mb-6" noValidate>
          <div>
            <label className="label font-semibold text-lg">Email Address:</label>
            <Input
              type="text"
              placeholder="Enter your Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 text-lg"
              value={email}
            />
          </div>

          <div className="relative">
            <label className="label font-semibold text-lg">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-12 h-12 text-lg"
            />
            <div
              className="absolute bottom-[3.1rem] right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <img src="/eye-open.png" alt="Hide password" className="w-[28px] h-[22px]" />
              ) : (
                <img src="/eye-closed.png" alt="Show password" className="w-[28px] h-[22px]" />
              )}
            </div>

            <Link to="/reset-password" className="text-lg text-left block mt-1 text-gray-600">
              Forgot Password?
            </Link>
          </div>
          
          {/* Display error message if there's an error */}
          {error && (
            <div className="mt-4 mb-4">
              <p className="text-red-600 text-center text-sm font-medium">{error}</p>
            </div>
          )}
          
          <br />
          <button 
            type="submit" 
            disabled={!email.trim() || !password.trim()}
            className="w-full rounded-full bg-green-500 text-white text-lg h-12 hover:bg-green-600 focus:outline-none focus:ring-0 transition duration-300 ease-in-out"
          >
            Log In
          </button>
        </form>

        <div className="divider text-gray-500 my-6 text-sm">OR</div>

        <div className="flex justify-center gap-2">
          <Button variant="outline" className="flex items-center justify-center gap-3">
            <img src="/google.png" alt="Google Icon" className="w-6 h-6" />
            Log In with Google
          </Button>

          <Button variant="outline" className="flex items-center justify-center gap-3">
            <img src="/Facebook.png" alt="Facebook Icon" className="w-6 h-6" />
            Log In with Facebook
          </Button>
        </div>

        <p className="text-center text-base mt-6">
          New to BINHI?{" "}
          <Link to="/signup" className="text-green-600 font-semibold">
            Create Account
          </Link>
        </p>

        <p className="text-center text-md mt-8 text-black">
          By continuing, you agree to BINHI{" "}
          <a href="#" className="underline font-bold">
            Terms of <br />
            Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline font-bold">
            Privacy Policy
          </a>
          .
        </p>
      </Card>
    </div>
  </div>
</div>

  );
}

export default LogInPage;