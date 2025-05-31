import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from '../../assets/Header.png';
import Background from '../../assets/Background.jpg';
import Back from "../../assets/Back.png";
import LockPassword from "../../assets/LockPassword.png";
import StepFlow from "../../assets/StepFlow.png";

const NextStep = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const email = location.state?.email || "your email"; 

    const [codes, setCodes] = useState(new Array(6).fill(""));
    const [error, setError] = useState(""); // Error state to display message
    const inputsRef = useRef([]);
  
    const handleChange = (value, index) => {
      if (!/^[0-9]?$/.test(value)) {
        setError("Invalid verification code. Please try again");
        return;
      }
      setError(""); // Reset error if valid input
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && !codes[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    };
  
    const handleSubmit = () => {
      const code = codes.join("");
      console.log("Submitted code:", code);
      navigate("/create-new-password", {
        state: { email },
      });
    };
  return (
    <div
      className="min-h-screen flex flex-col bg-center bg-cover "
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
      
     {/* Main */}
     <div className="flex-grow flex items-center justify-center">
  <div
    className="bg-white rounded-3xl shadow-lg w-[1400px] h-[750px] relative"
      >
        {/* Back Button */}
        <button
          className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-black"
          onClick={() => navigate("/signup")}
        >
          <img src={Back} alt="Back" className="w-20 h-10" />
        </button>

              {/* Step Indicator */}
        <div className="flex justify-center p-10">
          <div className="flex items-center gap-4">
            {/* Step 1 - Active */}
            <div className="flex flex-col items-center">
            <div className="font-bold text-3xl bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl shadow-lg shadow-green-700/60">
            1
              </div>
              <span className="font-bold text-green-600 mt-2">Verification</span>
            </div>

            {/* Dot moved up */}
            <img
              src={StepFlow}
              alt="StepFlow"
              className="relative -top-3" />

            {/* Step 2 - Inactive */}
            <div className="flex flex-col items-center">
            <div className="font-bold text-3xl text-[#D9D9D9] border-[2px] border-[#D9D9D9] w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
            2
              </div>
              <span className="text-[#D9D9D9] mt-2">Password</span>
            </div>

            {/* Dot moved up */}
            <img
              src={StepFlow}
              alt="StepFlow"
              className="relative -top-3" />

            {/* Step 3 - Inactive */}
            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl text-[#D9D9D9] border-[2px] border-[#D9D9D9] w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
                3
              </div>
              <span className="text-[#D9D9D9] mt-2">Set Up</span>
            </div>
          </div>
        </div>


        {/* Main Content */}
        <div className="text-center flex-grow flex flex-col">
          <div className="text-green-600 text-4xl mb-2">
            <img
              src={LockPassword}
              alt="LockPassword"
              className="mt-2 inline w-[75px] h-[75px]"
            />
          </div>

          <h2 className="text-3xl font-bold">Enter Verification Code</h2>
          <p className="text-base text-gray-600 mb-5">
            We have sent the code to  <br />
          <span className="text-black font-medium">{email}</span>.
          </p>
           <p className="text-sm font-bold text-black mt-1 mb-2">
          Enter the code <br />
        </p>

        {/* Code Inputs */}
        <div className="flex justify-center gap-5 mb-4">
          {codes.map((code, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              className={`w-[55px] h-[56px] text-center border-2 ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-xl text-xl focus:outline-none focus:ring-0`}
              value={code}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        {/* Fixed height container for error message */}
        <div className="h-6 mb-4">
          {error && <p className="text-center italic text-red-500 text-sm">{error}</p>}
        </div>

        {/* Resend Text */}
        <p className="text-center text-md text-gray-400">
          Didn't receive a code?{" "}
          <button className="text-green-600 font-medium hover:underline">
            Resend code
          </button>
        </p>

          {/* Spacer to push button to bottom */}
        <div className="flex-grow p-16"></div>

         <button
          onClick={() => navigate("/password")}
          className="w-[488px] h-[54px] bg-[#4CAE4F] text-white py-3 rounded-full hover:bg-green-700 transition mx-auto"
        >
          Next
        </button>

        </div>
    </div>
    </div>
    </div>
  );
};

export default NextStep;
