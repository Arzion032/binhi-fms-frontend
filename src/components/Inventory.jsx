// EquipmentTable.jsx

import React from 'react';
import Rent from '../../assets/Rent.png';
import Pencil from '../../assets/Pencil.png';
import Trash from '../../assets/Trash.png';
import { Search, SlidersHorizontal } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';

const EquipmentTable = ({
  setIsRentOpen,
  setIsEditOpen,
  setIsDeleteModalOpe
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl">
      {/* Header Row: Rented Equipments + Search + Filter + Add */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 px-2">
        <div className="flex items-center">
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
            />
            <button>
              <SlidersHorizontal className="text-gray-600 w-5 h-5" />
            </button>
          </div>

          <button className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2">
            <FaPlus className="w-4 h-4" />
            <span className="font-semibold text-sm">Add Equipment</span>
          </button>
        </div>
      </div>

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
          {Array.from({ length: 7 }).map((_, index) => (
            <tr key={index} className="bg-gray-100 text-center">
              <td>
                <input type="checkbox" className="checkbox checkbox-sm rounded" />
              </td>
              <td>Utility Tractor</td>
              <td>6</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>
                <div className="flex justify-center items-center gap-2">
                  {/* Rent */}
                  <div className="group flex items-center transition-all duration-200 ease-in-out">
                    <div className="flex items-center w-[20px] group-hover:w-[80px] transition-all duration-200 overflow-hidden">
                      <img
                        src={Rent}
                        alt="Rent"
                        className="w-4 h-4 mr-1"
                        onClick={() => setIsRentOpen(true)}
                      />
                      <span
                        className="opacity-0 group-hover:opacity-100 text-green-600 text-sm font-medium transition-opacity duration-200 whitespace-nowrap"
                        onClick={() => setIsRentOpen(true)}
                      >
                        Rent?
                      </span>
                    </div>
                  </div>

                  {/* Edit */}
                  <div className="group flex items-center transition-all duration-200 ease-in-out">
                    <div className="flex items-center w-[20px] group-hover:w-[80px] transition-all duration-200 overflow-hidden">
                      <img
                        src={Pencil}
                        alt="Edit"
                        className="w-4 h-4 mr-1"
                        onClick={() => setIsEditOpen(true)}
                      />
                      <span
                        className="opacity-0 group-hover:opacity-100 text-blue text-sm font-medium transition-opacity duration-200 whitespace-nowrap"
                        onClick={() => setIsEditOpen(true)}
                      >
                        Edit?
                      </span>
                    </div>
                  </div>

                  {/* Delete */}
                  <span
                    className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
                    onClick={() => setIsDeleteModalOpe(true)}
                  >
                    <img src={Trash} alt="Trash" className="w-4 h-4" />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
