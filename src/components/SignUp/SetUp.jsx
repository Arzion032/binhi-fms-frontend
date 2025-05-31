import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../assets/Background.jpg";
import Lock from "../../assets/Lock.png";
import StepFlow from "../../assets/StepFlow.png";
import Back from "../../assets/Back.png";
import Header from '../../assets/Header.png';
import Upload from '../../assets/Upload.png';
import Success from '../../assets/Success.png';
import Federation from '../../assets/Federation.png';
import Farmer from '../../assets/Farmer.png';
import Uploadfiles from '../../assets/Uploadfiles.png';
import UploadDocument from '../../assets/UploadDocument.png';
import { X } from "lucide-react";

  const SetUp = () => {
  const navigate = useNavigate();
  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [association, setAssociation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState("");
  const [barangay, setBarangay] = useState("");
  const [countdown, setCountdown] = useState(3);
  const email = "juandelacruz@gmail.com";
  useEffect(() => {
    if (showSuccess) {
      // Countdown interval
      const intervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Redirect timeout
      const timeoutId = setTimeout(() => {
        navigate("/signup"); // redirect after 3 seconds
      }, 3000);

      // Cleanup on unmount or when modal closes
      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        setCountdown(3); // reset countdown for next time
      };
    }
  }, [showSuccess, navigate]);

useEffect(() => {
  setAssociation("");
}, [barangay]);

  const barangayToAssociations = {
    Calumpang: [
      "Calumpang Vegetable Farmers Association",
      "Calumpang Farmers Association",
    ],
    Darangan: [
      "Darangan Vegetable Farmers Association",
      "Pugad St. Monique Vegetable Farmers Association",
      "Halang Integrated Farmers Association",
      "Hulo, Darangan Farmers Association",
      "Pugad St. Monique Farmers Association",
      "Samahang Magsasaka ng Darangan",
      "Tabing-Dagat Farmers Association",
    ],
    Pantok: [
      "Pantok-Palangoy Vegetable F.A.",
      "Pantok Farmers Association",
      "Kaysapon Farmers Association",
      "Kaykansa Farmers Association",
      "Kaymaputi Farmers Association",
    ],
    Bilibiran: [
      "Bilibiran Vegetable Farmers Association",
      "Bilibiran Farmers Association",
    ],
    Macamot: [
      "Macamot Organic Vegetable Farmers Association",
      "Pulong Parang Organic Vegetable Farmers Association",
      "Sitio Halang Vegetable Farmers Association",
      "Macamot Farmers Association",
      "Halang, Macamot Farmers Association",
    ],
    Mambog: ["Layunan Organic Vegetable Farmers Association"],
    "Pila-Pila": ["Pila-Pila Farmers Association"],
    Tagpos: [
      "Tagpos Vegetable Farmers Association",
      "Tagpos Farmers Association",
    ],
    Tatala: ["Tatala Farmers Association"],
  };

  const barangaysBinangonan = [
    "Calumpang",
    "Darangan",
    "Pantok",
    "Bilibiran",
    "Macamot",
    "Mambog",
    "Pila-Pila",
    "Tagpos",
    "Tatala",
  ];

  const filteredAssociations = barangay
  ? barangayToAssociations[barangay] || []
  : [];

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
          onClick={() => navigate("/password")}
        >
          <img src={Back} alt="Back" className="w-20 h-10" />
        </button>

        {/* Step Indicator */}
        <div className="flex justify-center p-10">
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

          <div className="max-w-md mx-auto p-2">
            <h2 className="text-3xl font-bold mb-2 mt-2 text-center">
              Finish your Set Up!
            </h2>
            <p className="text-gray-600 mb-6 text-center text-sm">
              Complete the set up to start exploring Binhi!
            </p>

            {/* First & Last Name */}
            <div className="flex justify-center">
  <div
    className="flex gap-2 flex-wrap"
    style={{ width: "430px" }}
  >
    <div className="w-[210px]">
      <label className="block mb-1 font-semibold text-gray-700 text-left text-sm">
        First Name
      </label>
      <input
        type="text"
        className="input input-bordered rounded-full border border-gray-300 w-full h-10 text-[#858585] placeholder-gray-400 text-sm px-4"
        placeholder="Ex. Juan"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>

    <div className="w-[210px]">
      <label className="block mb-1 font-semibold text-gray-700 text-left text-sm">
        Last Name
      </label>
      <input
        type="text"
        className="input input-bordered rounded-full border border-gray-300 w-full h-10 text-gray-500 placeholder-gray-400 text-sm px-4"
        placeholder="Ex. Dela Cruz"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
  </div>
</div>


{/* Address & Association side by side */}
<div className="flex justify-center mb-4">
  <div className="flex gap-2" style={{ width: "430px" }}>
    {/* Address */}
    <div className="w-[264px]">
      <label className="block mb-1 font-semibold text-gray-700 text-left text-sm">
        Address
      </label>
      <div className="relative">
        <select
          className="input input-bordered rounded-full border border-gray-300 w-full h-10 text-[#858585] text-sm px-4 pr-10 cursor-pointer"
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
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
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

    {/* Association with truncated selected display */}
    <div className="w-[264px] relative">
      <label className="block mb-1 font-semibold text-gray-700 text-left text-sm">
        Association
      </label>

      {/* Visible truncated text (fake select display) */}
      <div
        className="input input-bordered rounded-full border border-gray-300 w-full h-10 text-[#858585] text-sm px-4 pr-10 cursor-pointer flex items-center"
        tabIndex={0}
        onClick={() => document.getElementById("assoc-select").focus()}
        role="button"
        aria-haspopup="listbox"
      >
        {association
          ? truncateText(association, 15)
          : barangay
          ? "Select your Association"
          : "Select Barangay first"}
      </div>

      {/* Actual select (invisible, but functional) */}
      <select
        id="assoc-select"
        className="absolute inset-0 opacity-0 cursor-pointer"
        value={association}
        onChange={(e) => setAssociation(e.target.value)}
        disabled={!barangay}
        size={1}
      >
        <option value="" disabled>
          {barangay ? "Select your Association" : "Select Barangay first"}
        </option>
        {filteredAssociations.map((assoc) => (
          <option key={assoc} value={assoc}>
            {assoc}
          </option>
        ))}
      </select>

      {/* Dropdown arrow */}
      <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y- text-gray-400">
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

{/* Upload Document */}
<div>
  {/* Trigger Button */}
  <div className="flex justify-center mb-6">
  <div className="w-[450px]">
    <label className="block mb-1 font-semibold text-gray-800 text-sm text-left">
      Document
    </label>
    <button
      onClick={() => setShowModal(true)}
      className="bg-white text-[#858585] border border-gray px-6 py-2 rounded-full hover:border-green-600 hover:bg-green-50 transition w-full flex items-center justify-center gap-2"
    >
      <img src={UploadDocument} alt="Upload Icon" className="w-5 h-5" />
      Upload a Document
    </button>
  </div>
</div>

  {/* Modal */}
  {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] relative shadow-lg transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={() => {
            setShowModal(false);
            setSelectedDoc("");
            setUploadedFile(null);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 border rounded-full flex items-center justify-center">
          <img src={Uploadfiles} alt="Uploadfiles" className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Upload Files</h2>
            <p className="text-gray-500 text-sm">
              Select and upload the file do you need
            </p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Dropdown */}
        <div className="mb-6">
          <label className="block font-semibold mb-1 text-sm text-gray-800">
            Select your Document
          </label>
          <select
            className="w-full rounded-full border border-gray-300 text-sm px-4 py-2 text-gray-500"
            value={selectedDoc}
            onChange={(e) => setSelectedDoc(e.target.value)}
          >
            <option value="">-- Select Document --</option>
            <option value="barangay-clearance">Barangay Clearance</option>
            <option value="valid-id">Valid ID</option>
          </select>
        </div>

        {/* Conditional Upload Box with Animation */}
        <div
          className={`transition-all duration-500 ${
            selectedDoc ? "opacity-100 max-h-[300px] mb-4" : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center w-[350px] mx-auto">
          <div className="flex justify-center mb-3">
              <img src={Upload} alt="Upload Icon" className="w-6 h-6" />
            </div>
            <p className="font-semibold text-sm mb-1">
              Choose a file or{" "}
              <span className="text-green-600">drag & drop it here</span>
            </p>
            <p className="text-gray-500 text-xs mb-4">
              JPEG, PNG, PDF, and XLXS formats, up to 5 MB
            </p>

            <label className="inline-block bg-green-600 text-white text-sm font-medium px-6 py-2 rounded-full cursor-pointer hover:bg-green-700">
              Browse File
              <input
                type="file"
                className="hidden"
                onChange={(e) => setUploadedFile(e.target.files[0])}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )}
</div>


{/* Role Selection Pills - centered and same width */}
<div className="flex justify-center mb-0">
  <div style={{ width: "650px" }}>
    {/* Label on top, left-aligned */}
    <label className="block mb-1 font-semibold text-gray-800 text-sm text-left">
      Select your Role
    </label>

    {/* Button pills in flex */}
    <div className="flex gap-2">

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
  <img src={Farmer} alt="Farmer Icon" className="w-4 h-4" />
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
  <img src={Federation} alt="Federation Icon" className="w-4 h-4" />
  Federation Member
</label>
    </div>
  </div>
</div>
</div>

          <div className="flex-grow"></div>
          <button
            className="mt-[1px] w-full bg-[#4CAE4F] text-white py-3 rounded-full hover:bg-green-700 transition mx-auto w-[488px] h-[54px]"
            onClick={() => setShowSuccess(true)} 
          >
            Finish
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-11 w-[620px] h-[430px] shadow-xl">
            <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold mb-4">Account Created Successfully</h3>
            <img
                src={Success}
                alt="Success.png"
                className="w-[80px] max-w-full object-contain"
              />
              <p className="text-base text-gray-600 mb-3">
                You have successfully created your account with <br />
                the email <span className="font-medium">{email}</span>.
              </p>
              <br />
              <br />
              <p className="text-sm text-gray-500 mb-4">
                You will be redirected to Login Page in <br /> {countdown} second{countdown !== 1 ? "s" : ""}.
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
