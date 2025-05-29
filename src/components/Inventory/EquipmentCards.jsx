import React from 'react';
import { PlusCircle } from 'lucide-react';

export default function EquipmentCards({ setIsModalOpen }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {/* Card 1: Available */}
      <div className="relative group bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[80px] w-[506px] shadow-sm cursor-pointer">
        <div className="absolute left-0 top-0 h-full w-3 rounded-tl-3xl rounded-bl-3xl bg-[#4caf50]" />
        <div className="absolute top-2 right-2 z-20">
          <div className="group-hover:hidden">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center w-[32px] h-[32px] text-[#4caf50] rounded-full hover:bg-[#4caf50] hover:text-white transition-all"
            >
              <PlusCircle className="w-[20px] h-[20px]" />
            </button>
          </div>
          <div className="hidden group-hover:inline-flex overflow-hidden transition-all duration-300 ease-in-out">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 pl-3 pr-4 py-[2px] h-[28px] rounded-full text-sm font-semibold text-[#4caf50] border border-[#4caf50] bg-white hover:bg-[#4caf50] hover:text-white"
              style={{ width: 'auto', maxWidth: '150px' }}
            >
              <PlusCircle className="w-[16px] h-[16px] shrink-0" />
              <span className="ml-1">Add Equipment</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 h-full">
          <span className="text-sm text-gray-500">Available</span>
          <span className="text-3xl font-bold text-black leading-tight">15</span>
        </div>
      </div>

      {/* Card 2: Rented */}
      <div className="relative group bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[80px] w-[506px] shadow-sm cursor-pointer">
        <div className="absolute left-0 top-0 h-full w-3 rounded-tl-2xl rounded-bl-2xl bg-[#FF3B4E]" />
        <div className="flex flex-col justify-center px-6 h-full">
          <span className="text-sm text-gray-500">Rented</span>
          <span className="text-3xl font-bold text-black leading-tight">15</span>
        </div>
      </div>

      {/* Card 3: Repair Needed */}
      <div className="relative group bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[80px] w-[506px] shadow-sm cursor-pointer">
        <div className="absolute left-0 top-0 h-full w-3 rounded-tl-2xl rounded-bl-2xl bg-[#D1A157]" />
        <div className="flex flex-col justify-center px-6 h-full">
          <span className="text-sm text-gray-500">Repair Needed</span>
          <span className="text-3xl font-bold text-black leading-tight">15</span>
        </div>
      </div>
    </div>
  );
}
