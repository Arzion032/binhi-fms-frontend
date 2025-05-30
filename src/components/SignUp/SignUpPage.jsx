import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Card } from "../Card";
import { Input } from "../Input"; 

const SignUpPage = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState(""); // State to hold error message

  const handleNext = () => {
    // Regular expression for validating email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Regular expression for validating phone number (basic format)
    const phoneRegex = /^[0-9]{10}$/;

    // Check if input is either a valid email or phone number
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setError("Please enter correct Phone Number or Email format.");
    } else {
      setError(""); 
      navigate("/next-step", { state: { email: emailOrPhone } });
    }
  };
  return (
    <div className="flex items-center justify-center px-5 py-10">
      <div className="flex flex-col md:flex-row justify-between rounded-2xl overflow-hidden w-full max-w-7xl">
        {/* Left Side */}
        <div className="md:w-[40%] text-white flex flex-col items-center justify-center pb-9">
          <img src="/Binhi Logo.png" alt="Binhi Logo" className="w-[220px] h-[220px] mb-4" />
          <img src="/Binhi.png" alt="Binhi" className="w-[480px] h-[200px] mb-2" />
          <p className="text-3xl mt-2">Ang Ugat sa Masaganang Bukas!</p>
        </div>

        {/* Right Side */}
        <div className="md:w-[60%] flex flex-col items-center justify-center p-4 ml-[100px] gap-4">
       <Card className="w-full max-w-xl p-12 pt-2 rounded-3xl shadow-2xl bg-white">
       <h2 className="pt-6 text-4xl font-bold text-center mb-3">Welcome to BINHI!</h2>
      <p className="text-xl text-center mb-8">
      Sign Up and don’t miss the opportunity to <br/>easily connect with BINHI!
    </p>

    <form className="mb-6" onSubmit={handleNext}>
      <div>
        <label className="label font-semibold text-md mb-1">Phone Number/Email</label>
                 <Input
                            type="text"
                            placeholder="Enter your Phone Number or Email"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            className={`input input-bordered w-full ${error ? "border-2 border-red-500" : ""}`}
                          />
                        </div>

      <br />
        {error && (
          <p className="text-red-500 text-sm -mt-3 ml-3">{error}</p>
        )}
      <Button className="w-full rounded-full bg-green-500 text-white text-lg h-12
          hover:bg-green-600 focus:outline-none focus:ring-0 transition duration-300 ease-in-out">
        Next
      </Button>
    </form>

    <div className="divider text-gray-500 my-6 text-sm">OR</div>

        <div className="flex justify-center gap-2">
           <Button variant="outline" className="flex items-center justify-center gap-3">
           <img src="/google.png" alt="Google Icon" className="w-6 h-6" />
          Sign Up with Google
         </Button>
 
         {/* Facebook Button */}
         <Button variant="outline" className="flex items-center justify-center gap-1">
           <img src="/Facebook.png" alt="Facebook Icon" className="w-6 h-6" />
           Sign Up with Facebook
         </Button>
             </div>

    <p className="text-center text-base mt-8">
      Already have an account?{" "}
      <Link to="/login" className="text-green-600 font-semibold">
        Log In
      </Link>
    </p>

    <p className="text-center text-md mt-9 text-black">
      By continuing, you agree to BINHI{" "}
      <a href="#" className="underline font-bold">Terms of <br />Service</a> and{" "}
      <a href="#" className="underline font-bold">Privacy Policy</a>.
    </p>
  </Card>

  {/* Federation Card BELOW the main card */}
  <Card className="w-full max-w-xl p-4 rounded-3xl shadow-md bg-white flex items-center justify-center gap-4">
  <img
    src="/farmer.png"
    alt="Farmer Icon"
    className="w-12 h-12 rounded-full"
  />
  <p className="text-xl">Federation Member?</p>
  <a href="#" className="text-green-600 font-bold text-xl">
    Click Here!
  </a>
{/* Help Icon with Hover Image */}
<div className="relative group inline-block">
  {/* Circle Help Icon */}
  <img
    src="/circle-help.png"
    alt="Help Icon"
    className="w-5 h-5 cursor-pointer"
  />

  {/* Custom Tooltip */}
  <div className="absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
    {/* Arrow */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-white border-t border-l border-black rotate-45"></div>

    {/* Tooltip Box */}
    <div className="bg-white border border-black text-black text-sm px-4 py-0 rounded-full shadow-lg w-max text-center">
      Sign up here if you’re <br/>part of the federation!
    </div>
  </div>
</div>

</Card>
</div>
      </div>
    </div>
  );
};

export default SignUpPage;