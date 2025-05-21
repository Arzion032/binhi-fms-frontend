import React, { useState } from 'react';
import { Search, PlusCircle, SlidersHorizontal, X } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';

export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState('equipment');
  const [searchCurrent, setSearchCurrent] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);

  const clearFilters = () => {
    setSelectedRole('');
  };

  return (
    <div className="p-0">
      <div className="w-full bg-binhi-100 shadow-sm">
        {/* Navbar with breadcrumbs and right icon */}
        <div className="flex items-center justify-between px-6 py-3">
          {/* Breadcrumbs */}
          <div className="flex-1">
            <div className="text-sm breadcrumbs font-inter text-base">
              <ul>
                <li><a className="text-binhigreen underline">Dashboard</a></li>
                <li><a className="text-binhigreen underline">Inventory Management</a></li>
                <li><a className="text-binhigreen underline">Equipment</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="px-6 pb-4 h-5 flex items-center">
          <h1 className="text-[40px] font-bold text-gray-800">
            Inventory Management
          </h1>
        </div>
      </div>

      <div className="p-6 bg-gray-50 min-h-screen text-sm font-sans">
        {/* Tabs */}
        <div className="flex gap-8 border-b pb-2 mb-4">
          <button
            onClick={() => setActiveTab('equipment')}
            className={`pb-2 ${activeTab === 'equipment' ? 'border-b-2 border-green-500 text-green-600 font-semibold' : 'text-gray-500'}`}>
            Equipment
          </button>
          <button
            onClick={() => setActiveTab('rentHistory')}
            className={`pb-2 ${activeTab === 'rentHistory' ? 'border-b-2 border-green-500 text-green-600 font-semibold' : 'text-gray-500'}`}>
            Rent History
          </button>
        </div>

        {/* Right Side */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative w-[280px] h-[35px] flex items-center border rounded-full px-3 py-1 bg-white">
              <Search className="text-gray-500 w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Search Member"
                className="flex-1 outline-none bg-white"
                value={searchCurrent}
                onChange={(e) => setSearchCurrent(e.target.value)}
              />
              <button onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="text-gray-600 w-5 h-5" />
              </button>
            </div>

            {/* Filter Panel */}
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
                  <option value="admin">Farmer</option>
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

            {/* Add Member Button */}
            <button className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2">
              <FaPlus className="w-5 h-5" />
              <span className="font-semibold text-[16px]">Add Equipment</span>
            </button>
          </div>
        </div>

        {/* Top Section */}
        <div className="flex flex-wrap gap-4 mb-4">
          {/* CARD 1 */}
          <div className="relative bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[60px] w-[350px] shadow-sm">
            <div className="absolute left-0 top-0 h-full w-3 rounded-tl-2xl rounded-bl-2xl bg-[#4caf50]" />
            <div className="absolute top-2 right-2 z-20">
              <button
                onClick={() => setIncomeModalOpen(true)}
                className="flex items-center justify-center w-[32px] h-[32px] text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-all"
              >
                <PlusCircle className="w-[20px] h-[20px]" />
              </button>
            </div>
            <div className="flex flex-col justify-center px-6 h-full">
              <span className="text-sm text-gray-500">Available</span>
              <span className="text-xl font-bold text-black leading-tight">15</span>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="relative bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[60px] w-[350px] shadow-sm">
            <div className="absolute left-0 top-0 h-full w-3 rounded-tl-2xl rounded-bl-2xl bg-[#FF3B4E]" />
            <div className="absolute top-2 right-2 z-20">
              <button
                onClick={() => setIncomeModalOpen(true)}
                className="flex items-center justify-center w-[32px] h-[32px] text-[#FF3B4E] rounded-full hover:bg-[#FF3B4E] hover:text-white transition-all"
              >
                <PlusCircle className="w-[20px] h-[20px]" />
              </button>
            </div>
            <div className="flex flex-col justify-center px-6 h-full">
              <span className="text-sm text-gray-500">Available</span>
              <span className="text-xl font-bold text-black leading-tight">15</span>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="relative bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[60px] w-[350px] shadow-sm">
            <div className="absolute left-0 top-0 h-full w-3 rounded-tl-2xl rounded-bl-2xl bg-[#D1A157]" />
            <div className="absolute top-2 right-2 z-20">
              <button
                onClick={() => setIncomeModalOpen(true)}
                className="flex items-center justify-center w-[32px] h-[32px] text-[#D1A157] rounded-full hover:bg-[#D1A157] hover:text-white transition-all"
              >
                <PlusCircle className="w-[20px] h-[20px]" />
              </button>
            </div>
            <div className="flex flex-col justify-center px-6 h-full">
              <span className="text-sm text-gray-500">Available</span>
              <span className="text-xl font-bold text-black leading-tight">15</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto rounded-xl">
          <table className="table w-full">
            <thead>
              <tr className="text-left" style={{ backgroundColor: "#F4F4F4" }}>
                <th><input type="checkbox" className="checkbox checkbox-sm rounded" /></th>
                <th>Equipment</th>
                <th>Quantity</th>
                <th>Available</th>
                <th>Rented</th>
                <th>Repair Needed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 7 }).map((_, index) => (
                <tr key={index} className="bg-gray-100">
                  <td><input type="checkbox" className="checkbox checkbox-sm rounded" /></td>
                  <td>Utility Tractor</td>
                  <td>6</td>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td className="flex gap-2">
                    <button className="text-green-600">⬇️</button>
                    <button className="text-blue-600">✏️</button>
                    <button className="text-red-600">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center p-4 space-x-2 text-gray-500 text-sm">
            <button className="px-2">&lt;</button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`w-8 h-8 rounded ${num === 1 ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>
                {num}
              </button>
            ))}
            <span>...</span>
            <button className="px-2">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
