// Card.jsx

import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`p-6 rounded-2xl bg-white shadow-md ${className}`}>
      {children}
    </div>
  );
};
