// RentHistoryTab.jsx
import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import loop from '../assets/loop.png';

const RentHistoryTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const rows = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    equipment: 'Utility Tractor',
    quantity: 2,
    status: 'Rented',
    rentRate: '₱1,500',
    rentedDate: 'March 21, 2025',
    returnedDate: 'March 24, 2025',
    renter: 'Kaye Arroyo'
  }));

  return (
    <div className="bg-[#F9FCF7] min-h-screen px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img src={loop} alt="loop" className="ml-5 mr-5 w-[20px]" />
          <span className="text-lg font-semibold mr-2">Rented Equipments</span>
          <span className="text-gray-400 text-xs">24</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-[280px] h-[35px] flex items-center border rounded-full px-3 bg-white">
            <Search className="text-gray-500 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search Equipment"
              className="flex-1 outline-none bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="text-gray-600 w-5 h-5" />
            </button>
          </div>

          {showFilters && (
            <div className="flex items-center space-x-1 p-2 rounded-lg">
              <div className="flex items-center border rounded-l-3xl px-3 py-1 bg-white border-[#858585] h-[35px]">
                <SlidersHorizontal className="text-blue w-4 h-4" />
                <span className="text-sm text-blue font-medium">Active Filters</span>
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border h-[35px] w-[60px] text-center text-sm bg-white text-[#858585]"
              >
                <option value="">Role</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
              <button
                onClick={() => setSelectedRole('')}
                className="flex items-center border rounded-r-3xl px-3 py-1 text-sm border-[#858585] bg-white text-[#858585]"
              >
                <X className="w-4 h-4 text-[#858585]" />
                <span>Clear</span>
              </button>
            </div>
          )}

          <button className="flex items-center gap-2 bg-app-primary text-white rounded-full px-6 py-2">
            <FaPlus className="w-5 h-5" />
            <span className="font-semibold text-[16px]">Add Equipment</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-xl">
        <table className="table w-full table-fixed">
          <thead>
            <tr className="text-center bg-[#F4F4F4] text-sm text-black">
              <th className="w-[4%]">
                <input type="checkbox" className="checkbox checkbox-sm rounded" />
              </th>
              <th className="w-[14%]">Equipment</th>
              <th className="w-[10%]">Quantity</th>
              <th className="w-[12%]">Status Now</th>
              <th className="w-[12%]">Rent Rate</th>
              <th className="w-[14%]">Date Rented</th>
              <th className="w-[14%]">Date Returned</th>
              <th className="w-[10%]">Renter</th>
              <th className="w-[20%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="bg-[#F8FCF8] text-center">
                <td><input type="checkbox" className="checkbox checkbox-sm rounded" /></td>
                <td>{row.equipment}</td>
                <td>{row.quantity}</td>
                <td>{row.status}</td>
                <td>{row.rentRate}</td>
                <td>{row.rentedDate}</td>
                <td>{row.returnedDate}</td>
                <td>{row.renter}</td>
                <td className="text-blue-500 font-medium">Details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentHistoryTab;
