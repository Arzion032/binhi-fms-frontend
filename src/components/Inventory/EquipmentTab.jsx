// EquipmentTab.jsx
import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, PlusCircle } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import loop from '../../assets/loop.png';
import Rent from '../../assets/Rent.png';
import Pencil from '../../assets/Pencil.png';
import Trash from '../../assets/Trash.png';
import InventoryModals from './InventoryModals';

const EquipmentTab = () => {
  const [searchCurrent, setSearchCurrent] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    success: false,
    discard: false,
    fix: false,
    fixSuccess: false,
  });

  const openModal = (type) => setModalState(prev => ({ ...prev, [type]: true }));
  const closeModal = (type) => setModalState(prev => ({ ...prev, [type]: false }));
  const clearFilters = () => setSelectedRole('');

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full flex-wrap gap-4">
        <div className="flex items-center">
          <img src={loop} alt="loop" className="ml-5 mr-5 w-[20px]" />
          <span className="text-[15.5px] font-semibold mr-2">All Equipments</span>
          <span className="text-gray-400 text-xs">24</span>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-end">
          <div className="relative w-[280px] h-[35px] flex items-center border rounded-full px-3 bg-white">
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
            <div className="flex items-center space-x-1 p-2 rounded-lg">
              <div className="flex items-center space-x-1 border rounded-l-3xl px-3 py-1 bg-white border-[#858585] h-[35px]">
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
                onClick={clearFilters}
                className="flex items-center border rounded-r-3xl px-3 py-1 text-sm border-[#858585] bg-white text-[#858585]"
              >
                <X className="w-4 h-4 text-[#858585]" />
                <span>Clear</span>
              </button>
            </div>
          )}

          <button
            onClick={() => openModal('add')}
            className="flex items-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2"
          >
            <FaPlus className="w-5 h-5" />
            <span className="font-semibold text-[16px]">Add Equipment</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-xl mt-4">
        <table className="table w-full table-fixed">
          <thead>
            <tr className="bg-[#F4F4F4] text-center text-sm text-black">
              <th className="w-[5%]">
                <input type="checkbox" className="checkbox checkbox-sm rounded" />
              </th>
              <th className="w-[15%]">Equipment</th>
              <th className="w-[12%]">Quantity</th>
              <th className="w-[12%]">Available</th>
              <th className="w-[12%]">Rented</th>
              <th className="w-[14%]">Repair Needed</th>
              <th className="w-[30%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(7)].map((_, index) => (
              <tr key={index} className="bg-gray-100 text-center">
                <td><input type="checkbox" className="checkbox checkbox-sm rounded" /></td>
                <td>Utility Tractor</td>
                <td>6</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <img src={Rent} onClick={() => openModal('edit')} className="w-4 h-4 cursor-pointer" alt="Rent" />
                    <img src={Pencil} onClick={() => openModal('edit')} className="w-4 h-4 cursor-pointer" alt="Edit" />
                    <img src={Trash} onClick={() => openModal('delete')} className="w-4 h-4 cursor-pointer" alt="Delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <InventoryModals modalState={modalState} openModal={openModal} closeModal={closeModal} />
    </div>
  );
};

export default EquipmentTab;
