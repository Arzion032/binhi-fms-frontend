import React, { useState } from 'react';
import Background from '../../assets/Background.jpg';
import SignUpLogo from '../../assets/SignUpLogo.png';
import Google from '../../assets/Google.png';
import Header from '../../assets/Header.png';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [contact, setContact] = useState('');
  const navigate = useNavigate();
  

  return (
    <div
      className="min-h-screen flex flex-col bg-center bg-cover"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Header */}
      <header className="flex justify-between items-center px-9 py-1 bg-white bg-opacity-80 z-10 relative">
        <div className="flex items-center space-x-3">
         
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

      {/* Main content */}
      <div className="flex flex-1"> 
  {/* Left side WITHOUT background image (background is on parent) */}
  <div className="flex flex-col justify-center items-center flex-1">
    <div className="rounded-3xl flex flex-col items-center max-w shadow-lg">
      <div className="rounded-3xl mb-4 flex flex-col justify-center items-center shadow-md">
        <img src={SignUpLogo} alt="Sign Up Logo" className="w-[500px] h-[400px]" />
        <p className="mt-2 text-xl text-center text-white">Ang Ugat sa Masaganang Bukas!</p>
      </div>
    </div>
  </div>


        {/* Right side form card only */}
        <div className="flex flex-col justify-center items-center flex-1 p-12 space-y-6">
          {/* Sign Up Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-2 text-center">Welcome to BINHI!</h1>
            <p className="text-center text-gray-600 mb-6">
              Sign Up and don’t miss the opportunity to easily connect with BINHI!
            </p>

            <label
              htmlFor="contactInput"
              className="block text-gray-900 font-semibold mb-1"
            >
              Phone Number/Email
            </label>
            <input
              id="contactInput"
              type="text"
              placeholder="Enter your Phone Number or Email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full border border-gray-400 rounded-full px-4 py-3 text-gray-400 placeholder-gray-400 focus:outline-none focus:border-green-600 mb-6"
            />

            <button
              onClick={() => navigate("/verification")}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3 font-semibold mb-6"
            >
              Next
            </button>

            <div className="flex items-center text-gray-400 mb-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-sm">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="flex justify-between gap-4 mb-6">
            <button className="flex items-center justify-center gap-2 border border-gray-400 rounded-full py-2 px-4 font-semibold hover:bg-gray-100 w-full text-xs">
                <img
                  src={Google}
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign Up with Google
              </button>

              <button className="w[px] flex items-center justify-center gap-2 border border-gray-400 rounded-full py-2 px-4 font-semibold hover:bg-gray-100 w-full text-xs">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                Sign Up with Facebook
              </button>
            </div>

            <p className="text-center text-gray-800 mb-6">
              Already have an account?{' '}
              <a href="/login" className="text-green-600 font-semibold hover:underline">
                Log In
              </a>
            </p>

            <p className="text-center text-gray-700 text-sm">
              By continuing, you agree to BINHI{' '}
              <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
            </p>
          </div>

          {/* Federation footer separate */}
          <div className="w-full max-w-md bg-white rounded-full shadow-md px-6 py-3 flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/30.jpg"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-gray-700">
                Marketplace Buyer?{' '}
                <Link to="/verification" className="text-green-600 font-semibold hover:underline">
                    Click Here!
                </Link>
                </span>
            <button
              aria-label="Info"
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-4m0-4h.01"
                  stroke="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
