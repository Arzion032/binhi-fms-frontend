import React from "react";

export const Input = ({ type = "text", placeholder, className = "", ...props }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered rounded-full border-gray-800 w-full h-14 focus:outline-none focus:ring-2 focus:ring-green-600 text-lg ${className}`}
        {...props}
      />
    );
  };