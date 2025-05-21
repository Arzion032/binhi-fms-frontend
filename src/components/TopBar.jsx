import React from "react";

const Topbar = () => {
  return (
    <div className="w-full bg-binhi-100 shadow-sm">
      {/* Navbar with breadcrumbs and right icon */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Breadcrumbs */}
        <div className="flex-1">
          <div className="text-sm breadcrumbs font-inter text-base">
            <ul>
              <li><a className="text-binhigreen underline">Dashboard</a></li>
              <li><a className="text-binhigreen underline">Membership Management</a></li>
              <li><a className="text-binhigreen underline">Members</a></li>
              <li className="text-gray-400">Current Members</li>
            </ul>
          </div>
        </div>

        {/* Dots Button */}
        <button className="btn btn-square btn-binhi ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01"
            />
          </svg>
        </button>
      </div>

      {/* Page Title */}
      <div className="px-6 pb-4 h-5 flex items-center">
        <h1 className="text-[40px] font-bold text-gray-800">
          Membership Management
        </h1>
      </div>
    </div>
  );
};

export default Topbar;
