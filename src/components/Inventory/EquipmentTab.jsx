import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import loop from '../assets/loop.png';
import EquipmentCards from './EquipmentCards';
import EquipmentTable from './EquipmentTable';
import EquipmentModals from './EquipmentModals';

export default function EquipmentTab({
  searchCurrent,
  setSearchCurrent,
  showFilters,
  setShowFilters,
  selectedRole,
  setSelectedRole,
  clearFilters,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full flex-wrap gap-4">
        <div className="flex items-center">
          <img src={loop} alt="loop" className="ml-5 mr-5 w-[20px] max-w-full object-contain" />
          <span className="text-[15.5px] text-lg font-semibold mr-2">All Equipments</span>
          <span className="text-gray-400 font-normal text-xs">24</span>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-end">
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
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2"
          >
            <FaPlus className="w-5 h-5" />
            <span className="font-semibold text-[16px]">Add Equipment</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <EquipmentCards setIsModalOpen={setIsModalOpen} />

      {/* Table */}
      <EquipmentTable />

      {/* Modals */}
      <EquipmentModals isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
