// src/components/Layout/MainLayout.jsx
import React, { useEffect } from "react";
import InitialHeader from "../UI/InitialHeader";

const InitialLayout = ({ children }) => {

  useEffect(() => {
  document.body.style.overflow = "hidden"; // Prevent scrolling
  return () => {
    document.body.style.overflow = "auto"; // Reset on unmount
  };
}, []);
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <div className="relative z-30">
        <InitialHeader />
      </div>

      {/* Background */}
<div
  className="fixed inset-0 bg-cover bg-center z-0"
  style={{
    backgroundImage: "url('background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
></div>

      {/* Main Content */}
      <div className="relative z-20 flex-grow min-h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default InitialLayout;
