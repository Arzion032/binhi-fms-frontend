import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../assets/Background.jpg";
import Lock from "../../assets/Lock.png";
import StepFlow from "../../assets/StepFlow.png";
import Back from "../../assets/Back.png";

const SetUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [barangay, setBarangay] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [role, setRole] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState("user@example.com"); // Replace with actual email if available
  const [association, setAssociation] = useState("");

  const barangaysBinangonan = [
    "Batingan",
    "Calumpang",
    "Darangan",
    "Mahabang Parang",
    "Pantok",
  ];

  const associations = ["Association 1", "Association 2", "Association 3"];

  useEffect(() => {
    // Update completeAddress when barangay changes
    if (barangay) {
      setCompleteAddress(barangay);
      setAddressError("");
    }
  }, [barangay]);

  // Function to show success modal and redirect after 3 seconds
  const handleShowSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/login"); // Redirect to login page after success
    }, 3000);
  };

  return (
    
    <div
      className="min-h-screen flex flex-col bg-center bg-cover "
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white bg-opacity-80 z-10 relative">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-md bg-green-600 flex justify-center items-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20v-6m0 0V4m0 10h6m-6 0H6"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-serif text-green-700 select-none">Binhi</h1>
          <span className="text-gray-400 font-semibold select-none">Sign Up</span>
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
    className="bg-white rounded-3xl shadow-lg w-[1400px] p-10 relative"
      >
        {/* Back Button */}
        <button
          className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-black"
          onClick={() => navigate("/next-step")}
        >
          <img src={Back} alt="Back" className="w-20 h-10" />
        </button>

        {/* Step Indicator */}
        <div className="flex justify-center mb-3">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
                1
              </div>
              <span className="text-green-600 mt-2">Verification</span>
            </div>

            <img
              src={StepFlow}
              alt="StepFlow"
              className="relative -top-3" />

            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl shadow-lg">
                2
              </div>
              <span className="text-green-600 mt-2">Password</span>
            </div>

            <img
              src={StepFlow}
              alt="StepFlow"
              className="relative -top-3" />

            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl shadow-lg shadow-green-700/60">
                3
              </div>
              <span className="font-bold text-green-600 mt-2">Set Up</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-md mx-auto w-full">
            <img
              src={Lock}
              alt="Lock"
              className="mt-2 inline w-[55px] h-[65px]"
            />

          <div className="max-w-md mx-auto p-6">
            <h2 className="text-3xl font-bold mb-2 mt-2 text-center">
              Finish your Set Up!
            </h2>
            <p className="text-gray-600 mb-6 text-center text-sm">
              Complete the set up to start exploring Binhi!
            </p>

            {/* First & Last Name */}
            <div className="flex justify-center">
  <div className="flex gap-2 mb-1" style={{ width: "550px" }}>
    <div className="w-[264px]">
      <label className="block mb-1 font-semibold text-gray-700 text-left text-sm">First Name</label>
      <input
        type="text"
        className="input input-bordered rounded-full border border-gray-300 w-[264px] h-10 text-gray-500 placeholder-gray-400 text-sm px-4"
        placeholder="Ex. Juan"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>

    <div className="w-[264px]">
      <label className="block mb-1 font-semibold text-gray-700 text-left text-sm">Last Name</label>
      <input
        type="text"
        className="input input-bordered rounded-full border border-gray-300 w-[264px] h-10 text-gray-500 placeholder-gray-400 text-sm px-4"
        placeholder="Ex. Dela Cruz"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
  </div>
</div>

{/* Address & Association side by side */}
<div className="flex justify-center mb-4">
  <div className="flex gap-4" style={{ width: "550px" }}>
    {/* Address */}
    <div className="w-[264px]">
      <label className="block mb-1 font-semibold text-gray-700 text-left text-sm">
        Address
      </label>
      <div className="relative">
        <select
          className="input input-bordered rounded-full border border-gray-300 w-full h-10 text-gray-500 text-sm px-4 pr-10 cursor-pointer"
          value={barangay}
          onChange={(e) => setBarangay(e.target.value)}
        >
          <option value="" disabled>
            Barangay
          </option>
          {barangaysBinangonan.map((bgy) => (
            <option key={bgy} value={bgy}>
              {bgy}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    {/* Association */}
    <div className="w-[264px]">
      <label className="block mb-1 font-semibold text-gray-700 text-left text-sm">
        Association
      </label>
      <div className="relative">
        <select
          className="input input-bordered rounded-full border border-gray-300 w-full h-10 text-gray-500 text-sm px-4 pr-10 cursor-pointer"
          value={association}
          onChange={(e) => setAssociation(e.target.value)}
        >
          <option value="" disabled>
            Select your Association
          </option>
          {associations.map((assoc) => (
            <option key={assoc} value={assoc}>
              {assoc}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Upload Document */}
<div className="flex justify-center mb-6">
  <div className="w-[550px]">
    <label className="block mb-1 font-semibold text-gray-700 text-left text-sm">
      Upload a Document
    </label>
    <input
      type="file"
      className="w-full rounded-full border border-gray text-gray-600 text-sm cursor-pointer py-2 px-4"
      onChange={(e) => setUploadedFile(e.target.files[0])}
    />
  </div>
</div>

{/* Role Selection Pills - centered and same width */}
<div className="flex justify-center mb-6">
  <div className="flex gap-4" style={{ width: "650px" }}>
    <label
      className={`flex items-center gap-2 cursor-pointer rounded-full border border-gray py-0 px-4 w-1/2 text-gray-700 text-sm hover:border-green-600 hover:bg-green-50 ${
        role === "Federation Farmer" ? "border-green-600 bg-green-50" : ""
      }`}
      style={{ height: "45px" }}
      onClick={() => setRole("Federation Farmer")}
    >
      <input
        type="radio"
        name="role"
        value="Federation Farmer"
        checked={role === "Federation Farmer"}
        readOnly
        className="hidden"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M12 20l9-5-9-5-9 5 9 5z" />
        <path d="M12 12V4" />
        <path d="M9 12h6" />
      </svg>
      Federation Farmer
    </label>

    <label
      className={`flex items-center gap-2 cursor-pointer rounded-full border border-gray py-0 px-4 w-1/2 text-gray-700 text-sm hover:border-green-600 hover:bg-green-50 ${
        role === "Federation Member" ? "border-green-600 bg-green-50" : ""
      }`}
      style={{ height: "45px" }}
      onClick={() => setRole("Federation Member")}
    >
      <input
        type="radio"
        name="role"
        value="Federation Member"
        checked={role === "Federation Member"}
        readOnly
        className="hidden"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect width="26" height="10" x="4" y="7" rx="2" ry="2" />
        <path d="M12 7v6" />
        <path d="M8 7v6" />
        <path d="M16 7v6" />
      </svg>
      Federation Member
    </label>
  </div>
</div>
</div>

          <div className="flex-grow"></div>
          <button
            className="mt-[15px] w-full bg-[#4CAE4F] text-white py-3 rounded-full hover:bg-green-700 transition mx-auto"
            onClick={handleShowSuccess}
          >
            Finish
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-11 w-[620px] h-[460px] shadow-xl">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-3xl font-bold mb-4">
                Account Created Successfully
              </h3>
              <img src="/Checkpass.png" alt="Success" className="w-18 h-18 mb-4" />
              <p className="text-base text-gray-600 mb-3">
                You have successfully created your account with <br /> the email{" "}
                <span className="font-medium">{email}</span>.
              </p>{" "}
              <br /> <br />
              <p className="text-sm text-gray-500 mb-4">
                You will be redirected to Login Page in <br /> 3 seconds.
              </p>
              <button
                className="w-full mt-1 bg-[#4CAE4F] text-white py-3 rounded-full hover:bg-green-700 transition mx-auto"
                onClick={() => navigate("/signup")}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      
      )}
    </div>
    </div>
  );
};

export default SetUp;
