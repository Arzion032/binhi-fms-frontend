import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white shadow-lg fixed">
      <div className="p-4 text-green-700 font-bold text-2xl">Binhi</div>
      <p className="text-sm text-gray-500 px-4">
        Federation & Marketplace Management System
      </p>

      <ul className="menu p-4">
        <li className="menu-title">Federation Management</li>
        <li><a>Dashboard</a></li>
        <li><a>Membership</a></li>
        <li><a>Financial</a></li>
        <li><a>Inventory</a></li>
        <li><a>Document</a></li>

        <li className="menu-title">Marketplace</li>
        <li><a>Products</a></li>
        <li><a>Customers</a></li>
        <li><a>Orders</a></li>
        <li><a>Farmer Payout</a></li>
      </ul>

      <div className="absolute bottom-0 w-full p-4">
        <div className="text-sm text-gray-500 mb-2">Settings</div>
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
          <img
            src="https://i.pravatar.cc/40"
            className="rounded-full w-8 h-8"
            alt="user"
          />
          <div>
            <p className="text-sm font-medium">Layla Imnida</p>
            <p className="text-xs text-gray-500">laylaimnida@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
