// EquipmentCards.jsx

import React from 'react';
import { PlusCircle } from 'lucide-react';

const EquipmentCards = ({
  setShowRepairButton,
  setRepaired,
  setIsModalOpen,
  setIsRentOpen,
  setShowFixModal
}) => {
  const cardConfigs = [
    {
      label: 'Available',
      count: 15,
      accent: 'bg-[#4caf50]',
      onClick: () => {
        setShowRepairButton(true);
      },
      onHoverClick: () => {
        setRepaired(true);
        setIsModalOpen(true);
      },
      hoverText: 'Add Equipment',
    },
    {
      label: 'Rented',
      count: 15,
      accent: 'bg-[#FF3B4E]',
      onClick: () => {
        setIsRentOpen(true);
      },
      onHoverClick: () => {
        setRepaired(true);
        setIsRentOpen(true);
      },
      hoverText: 'Add Rented',
    },
    {
      label: 'Repair Needed',
      count: 15,
      accent: 'bg-[#D1A157]',
      onClick: () => {
        setShowRepairButton(true);
      },
      onHoverClick: () => {
        setRepaired(true);
        setShowFixModal(true);
      },
      hoverText: 'Add Repair',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {cardConfigs.map((config, index) => (
        <div
          key={index}
          className="relative group bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[80px] w-[506px] shadow-sm cursor-pointer"
        >
          <div className={`absolute left-0 top-0 h-full w-3 ${config.accent} rounded-tl-2xl rounded-bl-2xl`} />

          <div className="absolute top-2 right-2 z-20">
            <div className="group-hover:hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  config.onClick();
                }}
                className={`flex items-center justify-center w-[32px] h-[32px] text-[#4caf50] rounded-full hover:bg-[#4caf50] hover:text-white transition-all`}
              >
                <PlusCircle className="w-[20px] h-[20px]" />
              </button>
            </div>

            <div className="hidden group-hover:inline-flex overflow-hidden transition-all duration-300 ease-in-out">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  config.onHoverClick();
                }}
                className={`flex items-center gap-1 pl-3 pr-4 py-[2px] h-[28px] rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap text-[#4caf50] border border-[#4caf50] bg-white hover:bg-[#4caf50] hover:text-white`}
                style={{ width: 'auto', maxWidth: '150px' }}
              >
                <PlusCircle className="w-[16px] h-[16px] shrink-0" />
                <span className="ml-1">{config.hoverText}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 h-full">
            <span className="text-sm text-gray-500">{config.label}</span>
            <span className="text-3xl font-bold text-black leading-tight">{config.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EquipmentCards;
