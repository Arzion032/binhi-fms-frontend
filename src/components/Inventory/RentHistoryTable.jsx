// RentHistoryTable.jsx

import React from 'react';
import Return from '../../assets/Return.png';
import Details from '../../assets/Details.png';
import Trash from '../../assets/Trash.png';

const rows = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  equipment: 'Utility Tractor',
  quantity: 2,
  statusNow: index < 3 ? 'Rented' : 'Returned',
  rentRate: '₱1,500',
  dateRented: 'March 21, 2025',
  rentedAgo: '4 days ago',
  dueDate: 'March 21, 2025',
  dueIn: index === 2 ? '5 days left' : index < 3 ? '4 days left' : '6 days ago',
  renter: 'Kaye Arroyo'
}));

const RentHistoryTable = ({ setIsReturnEquipmentOpen, setIsDetailsOpen, setIsDeleteModalOpen }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <table className="table w-full table-fixed">
        <thead>
          <tr className="text-center bg-[#F4F4F4] text-sm text-black">
            <th className="w-[4%]"><input type="checkbox" className="checkbox checkbox-sm rounded" /></th>
            <th className="w-[14%]">Equipment</th>
            <th className="w-[10%]">Quantity</th>
            <th className="w-[12%]">Status Now</th>
            <th className="w-[12%]">Rent Rate</th>
            <th className="w-[14%]">Date Rented</th>
            <th className="w-[14%]">Due/Returned</th>
            <th className="w-[10%]">Status</th>
            <th className="w-[20%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id} className="bg-[#F8FCF8] border-gray-200 text-center">
              <td><input type="checkbox" className="checkbox checkbox-sm rounded" /></td>
              <td>{row.equipment}</td>
              <td>{row.quantity}</td>
              <td>{row.statusNow}</td>
              <td>
                <div className="font-bold text-black">{row.rentRate}</div>
                <div className="text-xs text-gray-500 -mt-1">per day</div>
              </td>
              <td>
                <div className="text-black">{row.dateRented}</div>
                <div className="text-xs text-gray-500 -mt-1">{row.rentedAgo}</div>
              </td>
              <td>
                <div className="text-black">{row.dueDate}</div>
                <div className="text-xs text-gray-500 -mt-1">{row.dueIn}</div>
              </td>
              <td>{row.renter}</td>
              <td>
                <div className="flex justify-center items-center gap-2 cursor-pointer">
                  <img src={Return} alt="Return" className="w-4 h-4" onClick={() => setIsReturnEquipmentOpen(true)} />
                  <img src={Details} alt="Details" className="w-4 h-4" onClick={() => setIsDetailsOpen(true)} />
                  <img src={Trash} alt="Trash" className="w-4 h-4" onClick={() => setIsDeleteModalOpen(true)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentHistoryTable;
