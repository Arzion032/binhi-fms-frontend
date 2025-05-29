// InventoryHeader.jsx

import React from 'react';

const InventoryHeader = ({ activeTab }) => {
  return (
    <div className="w-full bg-binhi-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex-1">
          <div className="text-sm breadcrumbs font-inter text-base">
            <ul>
              <li><a className="text-binhigreen underline">Dashboard</a></li>
              <li><a className="text-binhigreen underline">Inventory Management</a></li>
              <li className="text-gray-400">
                {activeTab === 'equipment' ? 'Equipment' : 'Rent History'}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-6 pb-4 h-5 flex items-center">
        <h1 className="text-[40px] font-bold text-gray-800">Inventory Management</h1>
      </div>
    </div>
  );
};

export default InventoryHeader;
