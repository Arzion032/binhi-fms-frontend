import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../../assets/Header.png';
import Background from '../../assets/Background.jpg';
import Back from "../../assets/Back.png";
import Lock from "../../assets/Lock.png";
import StepFlow from "../../assets/StepFlow.png";

const SetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 8;

  const isPasswordValid =
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSymbol &&
    hasMinLength;

  const handleNext = () => {
    if (!isPasswordValid) {
      setError("* Password does not meet all the requirements.");
    } else if (password !== confirmPassword) {
      setError("* The password confirmation does not match.");
    } else {
      setError("");
      navigate("/setup");
    }
  };

  const CheckIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col bg-center bg-cover" style={{ backgroundImage: `url(${Background})` }}>
      <header className="flex justify-between items-center px-9 py-1 bg-white bg-opacity-80 z-10 relative">
        <div className="flex items-center space-x-3">
          <div className="rounded-md flex justify-center items-center">
            <img src={Header} alt="Header" className="h-[45px] w-[165px] object-contain" />
            <span className="text-xl p-5 font-semibold select-none text-gray">Sign Up</span>
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <button className="flex items-center space-x-1 text-sm font-semibold text-gray-700 hover:text-gray-900">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg" alt="Philippine flag" className="w-6 h-4 object-cover rounded-sm" />
            <span>Tagalog</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="text-gray-700 text-sm font-normal hover:text-gray-900">Need Help?</button>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-lg w-[1400px] h-[750px] relative">
          <button className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-black" onClick={() => navigate("/verification")}>
            <img src={Back} alt="Back" className="w-20 h-10" />
          </button>

          <div className="flex justify-center p-5">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="font-bold text-3xl bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl">1</div>
                <span className="text-green-600 mt-2">Verification</span>
              </div>
              <img src={StepFlow} alt="StepFlow" className="relative -top-3" />
              <div className="flex flex-col items-center">
                <div className="font-bold text-3xl bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl shadow-lg shadow-green-700/60">2</div>
                <span className="font-bold text-green-600 mt-2">Password</span>
              </div>
              <img src={StepFlow} alt="StepFlow" className="relative -top-3 filter grayscale" />

              <div className="flex flex-col items-center">
                <div className="font-bold text-3xl text-[#D9D9D9] border-[2px] border-[#D9D9D9] w-[66px] h-[66px] flex items-center justify-center rounded-2xl">3</div>
                <span className="text-[#D9D9D9] mt-2">Set Up</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-5 flex-grow flex flex-col">
            <div className="text-green-600 text-4xl mb-2">
              <img src={Lock} alt="Lock" className="mt-2 inline w-[55px] h-[65px]" />
            </div>

            <h2 className="text-3xl font-bold mb-1">Set Your Password</h2>
            <p className="text-base text-gray-600 mb-3">Set your password to complete the sign up!</p>

            <div className="flex flex-col items-center gap-5 relative">
              <div className="relative w-[378px]">
                <label className="block text-left text-black text-base font-bold">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-[378px] h-[55px] border border-gray rounded-full px-4 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer mt-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </div>
              </div>

              <div className="relative w-[378px]">
                <label className="block text-left text-black text-base font-bold">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="w-[378px] h-[55px] border border-gray rounded-full px-4 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer mt-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>

            <div className="h-6 mt-2 mb-2 mr-12">
              {error && <p className="text-red text-sm italic">{error}</p>}
            </div>

            <div className="text-left w-[378px] mx-auto mb-4 select-none">
              <p className="mb-2 font-medium text-gray-800">Your password must contain...</p>
              {[
                { label: "Minimum of 8 characters", isValid: hasMinLength },
                { label: "At least 1 lower and upper case letters (AaBb)", isValid: hasUpperCase && hasLowerCase },
                { label: "At least 1 symbol (@#$)", isValid: hasSymbol },
                { label: "At least 1 number (123)", isValid: hasNumber },
              ].map(({ label, isValid }, idx) => (
                <div key={idx} className={`flex items-center gap-2 text-sm font-medium mb-1 ${isValid ? "text-green-600 opacity-100" : "text-gray-400 opacity-50"}`}>
                  <span className={`flex items-center justify-center rounded-full w-5 h-5 border-2 ${isValid ? "border-green-600" : "border-gray-400"}`}>
                    <CheckIcon />
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="flex-grow"></div>

            <button
              onClick={handleNext}
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

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.973 9.973 0 012.245-3.411M3 3l18 18" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.477 10.477a3 3 0 104.243 4.243" />
  </svg>
);

export default SetPassword;
