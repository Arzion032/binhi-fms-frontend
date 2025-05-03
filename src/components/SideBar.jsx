import React from "react";
import Logo from '../assets/Logo.png';
import Dashboard from '../assets/Dashboard.png';
import Membership from '../assets/Membership.png';
import Financial from '../assets/Financial.png';
import Inventory from '../assets/Inventory.png';
import Document from '../assets/Document.png';
import Products from '../assets/Products.png';
import Customers from '../assets/Customers.png';
import Orders from '../assets/Orders.png';
import Payout from '../assets/Payout.png';
import Settings from '../assets/Settings.png';
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white shadow-lg fixed flex flex-col items-center p-4 rounded-r-3xl border border-gray-700">
      <img src={Logo} alt="Logo" className="w-150 h-50 mb-4" />
      
        {/* Federation Management Title */}
        <div className="w-full text-left text-sm font-Inter text-gray-700 mb-6">
  Federation Management
      </div>

      <ul className="space-y-2 w-full">
        {/* Dashboard Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/login" className="flex items-center space-x-2">
              <img src={Dashboard} alt="Dashboard" className="w-5 h-5" />
                <span className="text-sm font-Inter font-bold">Dashboard</span>
              </Link>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <ul className="mt-1 space-y-1 px-3">
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Reports
                </a>
              </li>
            </ul>
          </details>
        </li>

        {/* Membership Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/membership" className="flex items-center space-x-2">
              <img src={Membership} alt="Membership" className="w-5 h-5" />
              <span className="text-sm font-Inter font-bold">Membership</span>
              </Link>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <ul className="mt-1 space-y-1 px-3">
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Members List
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Add Member
                </a>
              </li>
            </ul>
          </details>
        </li>

        {/* Financial Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <span className="flex items-center space-x-2">
              <img src={Financial} alt="Financial" className="w-5 h-5" />
                <span className="text-sm font-Inter font-bold">Financial</span>
              </span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <ul className="mt-1 space-y-1 px-3">
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Transactions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Reports
                </a>
              </li>
            </ul>
          </details>
        </li>

        {/* Inventory Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <span className="flex items-center space-x-2">
              <img src={Inventory} alt="Inventory" className="w-5 h-5" />
                <span className="text-sm font-Inter font-bold">Inventory</span>
              </span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <ul className="mt-1 space-y-1 px-3">
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Stock Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Stock Alerts
                </a>
              </li>
            </ul>
          </details>
        </li>

        {/* Document Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <span className="flex items-center space-x-2">
              <img src={Document} alt="Document" className="w-5 h-5" />
                <span className="text-sm font-Inter font-bold">Document</span>
              </span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <ul className="mt-1 space-y-1 px-3">
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Uploads
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Archive
                </a>
              </li>
            </ul>
          </details>
        </li>
      </ul>

      <div className="mb-6"></div>

      {/* Marketplace Title */}
      <div className="w-full text-left text-sm font-Inter text-gray-700 mb-6">Marketplace</div>

      <ul className="space-y-2 w-full">
        {/* Products Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <span className="flex items-center space-x-2">
              <img src={Products} alt="Products" className="w-5 h-5" />
                <span className="text-sm font-Inter font-bold">Products</span>
              </span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <ul className="mt-1 space-y-1 px-3">
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Product List
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Add Product
                </a>
              </li>
            </ul>
          </details>
        </li>

        {/* Customers Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <span className="flex items-center space-x-2">
              <img src={Customers} alt="Customers" className="w-5 h-5" />
                <span className="text-sm font-Inter font-bold">Customers</span>
              </span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <ul className="mt-1 space-y-1 px-3">
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Customer List
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Add Customer
                </a>
              </li>
            </ul>
          </details>
        </li>

        {/* Orders Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <span className="flex items-center space-x-2">
              <img src={Orders
              } alt="Orders" className="w-5 h-5" />
                <span className="text-sm font-Inter font-bold">Orders</span>
              </span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <ul className="mt-1 space-y-1 px-3">
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Order History
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Track Order
                </a>
              </li>
            </ul>
          </details>
        </li>

        {/* Farmer Payout Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <span className="flex items-center space-x-2">
              <img src={Payout} alt="Payout" className="w-5 h-5" />
                <span className="text-sm font-Inter font-bold">Farmer Payout</span>
              </span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <ul className="mt-1 space-y-1 px-3">
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Payout History
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  New Payout
                </a>
              </li>
            </ul>
          </details>
        </li>
      </ul>

      <div className="mt-auto w-full p-4">
      <span className="flex items-center space-x-2">
              <img src={Settings} alt="Settings" className="w-5 h-5" />
                <span className="text-sm font-Inter ">Settings</span>
              </span>
              <div className="mb-3"></div>
              <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
    <img
      src="https://i.pravatar.cc/40"
      className="rounded-full w-5 h-5"
      alt="user"
    />
    <div className="flex flex-col">
      <span className="text-sm font-medium">Layla Imnida</span>
      <span className="text-xs text-gray-500 leading-tight">laylaimnida@gmail.com</span>
    </div>
  </div>
  </div>
</aside>

    
  );
};

export default Sidebar;
