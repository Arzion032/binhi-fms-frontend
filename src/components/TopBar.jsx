import React from "react";

const Topbar = () => {
  return (
    <div className="ml-64 p-6">
      <div className="text-sm breadcrumbs mb-2">
        <ul>
          <li>Dashboard</li>
          <li>Membership Management</li>
          <li>Members</li>
          <li className="text-gray-400">Current Members</li>
        </ul>
      </div>
      <h1 className="text-2xl font-bold">Membership Management</h1>
    </div>
  );
};

export default Topbar;
