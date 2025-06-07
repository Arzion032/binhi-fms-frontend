import React, { useState } from "react";
import { Input } from "../SignUp/Input";
import { Button } from "../SignUp/Button";
import { Card } from "../SignUp/Card";
import { Link, useNavigate } from "react-router-dom";
import Background from '../../assets/Background.jpg';
import SignUpLogo from '../../assets/SignUpLogo.png';
import Header from '../../assets/Header.png';
import Google from '../../assets/Google.png';

function LogInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const userFirstName = localStorage.getItem("userFirstName") || "User";
    const userLastName = localStorage.getItem("userLastName") || "";
    const userAddress = localStorage.getItem("userAddress") || "";
    const userEmail = localStorage.getItem("userEmail") || "";

    navigate("/marketplace", {
      state: {
        firstName: userFirstName,
        lastName: userLastName,
        address: userAddress,
        email: userEmail,
      },
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-center bg-cover"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Header */}
      <header className="flex justify-between items-center px-9 py-1 bg-white bg-opacity-80 z-10 relative">
        <div className="flex items-center space-x-3">
          <div className="rounded-md flex justify-center items-center">
            <img
              src={Header}
              alt="Header"
              className="h-[45px] w-[165px] object-contain"
            />
            <span className="text-xl p-5 font-semibold select-none text-gray">Sign Up</span>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <button className="flex items-center space-x-1 text-sm font-semibold text-gray-700 hover:text-gray-900">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg"
              alt="Philippine flag"
              className="w-6 h-4 object-cover rounded-sm"
            />
            <span>Tagalog</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button className="text-gray-700 text-sm font-normal hover:text-gray-900">
            Need Help?
          </button>
        </div>
      </header>

      {/* Login Content */}
      <div className="flex items-center justify-center px-5 py-10">
        <div className="flex flex-col md:flex-row justify-between rounded-2xl overflow-hidden w-full max-w-7xl">
          {/* Left Side */}
          <div className="md:w-[40%] text-white flex flex-col items-center justify-center pb-10">
          <img src={SignUpLogo} alt="Sign Up Logo" className="w-[500px] h-[400px]" />
            <p className="text-3xl mt-2">Ang Ugat sa Masaganang Bukas!</p>
          </div>

          {/* Right Side */}
          <div className="md:w-[60%] flex items-center justify-center p-4 gap-4">
            <Card className="w-full max-w-xl p-12 pt-2 pb-6 rounded-3xl shadow-2xl bg-white">
              <h2 className="pt-10 text-4xl font-bold text-center mb-4">Welcome Back to BINHI!</h2>
              <p className="text-xl text-center mb-8">
                Log In and don’t miss the opportunity to <br />easily connect with BINHI!
              </p>

              <form onSubmit={handleLogin} className="mb-6">
                <div>
                  <label className="label font-semibold text-lg">Phone Number/Email</label>
                  <Input
                    type="text"
                    placeholder="Enter your Phone Number or Email"
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
  <button
    type="button"
    onClick={togglePasswordVisibility}
    className="absolute bottom-[3.1rem] right-4 top-1/2 -translate-y-1/2 cursor-pointer p-1"
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? (
      // Eye Open Icon (show password)
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ) : (
      // Eye Closed Icon (hide password)
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.99 9.99 0 012.224-3.612M6.5 6.5l11 11M9.75 9.75a3 3 0 014.5 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
      </svg>
    )}
  </button>


                  <Link to="/Reset" className="text-lg text-left block mt-1 text-gray-600">
                    Forgot Password?
                  </Link>
                </div>
                <br />
                <Button type="submit">Log In</Button>
              </form>
          

              <div className="divider text-gray-500 my-6 text-sm">OR</div>

              <div className="flex justify-between gap-4 mb-6">
              <button className="flex items-center justify-center gap-2 border border-gray-400 rounded-full py-2 px-4 font-semibold hover:bg-gray-100 w-full text-xs">
                <img src={Google} alt="Google" className="w-5 h-5" />
                Sign Up with Google
              </button>

              <button className="flex items-center justify-center gap-2 border border-gray-400 rounded-full py-2 px-4 font-semibold hover:bg-gray-100 w-full text-xs">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                Sign Up with Facebook
              </button>
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
    </div>
  );
}

export default LogInPage;
