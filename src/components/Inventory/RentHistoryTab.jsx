import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import loop from '../assets/loop.png';

export default function RentHistoryTab({
  searchCurrent,
  setSearchCurrent,
  showFilters,
  setShowFilters,
  selectedRole,
  setSelectedRole,
  clearFilters,
}) {
  return (
    <div className="bg-[#F9FCF7] min-h-screen flex justify-center px-4">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center">
            <img
              src={loop}
              alt="loop"
              className="ml-5 mr-5 w-[20px] max-w-full object-contain"
            />
            <span className="text-[15.5px] text-lg font-semibold mr-2">Rented Equipments</span>
            <span className="text-gray-400 font-normal text-xs">24</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-[280px] h-[35px] flex items-center border rounded-full px-3 py-1 bg-white">
              <Search className="text-gray-500 w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Search Equipment"
                className="flex-1 outline-none bg-white"
                value={searchCurrent}
                onChange={(e) => setSearchCurrent(e.target.value)}
              />
              <button onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="text-gray-600 w-5 h-5" />
              </button>
            </div>

            {showFilters && (
              <div className="flex items-center space-x-1 p-2 rounded-lg w-fit">
                <div className="flex items-center space-x-1 border rounded-l-3xl px-3 py-1 cursor-pointer bg-white border border-[#858585] h-[35px]">
                  <SlidersHorizontal className="text-blue w-4 h-4" />
                  <span className="mr-2 p-2 text-sm text-blue font-medium">Active Filters</span>
                </div>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="border border-[#858585] h-[35px] w-[60px] text-center text-sm bg-white text-[#858585]"
                >
                  <option value="">Role</option>
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 border rounded-r-3xl px-3 py-1 text-sm border border-[#858585] h-[35px] bg-white text-[#858585]"
                >
                  <X className="w-4 h-4 text-[#858585]" />
                  <span>Clear</span>
                </button>
              </div>
            )}

            <button
              onClick={() => {}}
              className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2"
            >
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
                <th className="w-[14%] px-3 py-3">Equipment</th>
                <th className="w-[10%] px-3 py-3">Quantity</th>
                <th className="w-[12%] px-3 py-3">Status Now</th>
                <th className="w-[12%] px-3 py-3">Rent Rate</th>
                <th className="w-[14%] px-3 py-3">Date Rented <span className="inline-block">↓</span></th>
                <th className="w-[14%] px-3 py-3">Due/Date Returned</th>
                <th className="w-[10%] px-3 py-3">Status</th>
                <th className="w-[20%] px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => (
                <tr key={idx} className="bg-[#F8FCF8] border-gray-200 text-center">
                  <td><input type="checkbox" className="checkbox checkbox-sm rounded" /></td>
                  <td className="px-3 py-4">Utility Tractor</td>
                  <td className="px-3 py-4">2</td>
                  <td className="px-3 py-4">Rented</td>
                  <td className="px-3 py-4">₱1,500</td>
                  <td className="px-3 py-4">March 21, 2025</td>
                  <td className="px-3 py-4">March 25, 2025</td>
                  <td className="px-3 py-4">Kaye Arroyo</td>
                  <td className="px-3 py-4">
                    <button className="text-green-600 hover:underline">Return</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
