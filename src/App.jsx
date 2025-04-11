import React from "react";
import { Input } from "./components/input";
import { Button } from "./components/button";
import { Card } from "./components/card";
import { FaGoogle, FaFacebook } from "react-icons/fa";

function App() {
  return (
    <div
  className="min-h-screen flex items-center justify-center bg-green-700"
  style={{
    backgroundImage: 'background.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  }}
>
  <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full max-w-5xl">
    
        {/* Left imnida */}
        <div className="md:w-1/2 text-white flex flex-col justify-center items-center p-10">
          <img src="/Binhi Logo.png" alt="Binhi Logo" className="w-24 mb-4" />
          <img src="/Binhi.png" alt="Binhi" className="w-24 mb-4" />
          <p className="mt-4 text-center">Ang Ugat sa Masaganang Bukas!</p>
        </div>

        {/* Right imnida */}
        <div className="md:w-1/2 p-10">
          <Card>
            <h2 className="text-2xl font-bold text-center mb-2">Welcome to BINHI!!</h2>
            <p className="text-sm text-center mb-6">
              Sign Up and don’t miss the opportunity to easily connect with BINHI!!
            </p>

            <form className="space-y-4">
              <div>
                <label className="label font-semibold">Phone Number/Email</label>
                <Input type="text" placeholder="Enter your Phone Number or Email" />
              </div>

              <div>
                <label className="label font-semibold">Password</label>
                <Input type="password" placeholder="Enter your Password" />
                <a href="#" className="text-xs text-right block mt-1 hover:underline text-gray-500">Forgot Password?</a>
              </div>

              <Button className="w-full bg-green-600 text-white">Next</Button>
            </form>

            <div className="divider">OR</div>

            <div className="flex justify-center gap-3">
              <Button className="btn-outline flex items-center gap-2">
                <FaGoogle /> Log In with Google
              </Button>
              <Button className="btn-outline flex items-center gap-2">
                <FaFacebook /> Log In with Facebook
              </Button>
            </div>

            <p className="text-center text-sm mt-6">
              New to BINHI? <a href="#" className="text-green-600 font-semibold hover:underline">Create Account</a>
            </p>
            <p className="text-center text-xs mt-2 text-gray-500">
              By continuing, you agree to BINHI <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
