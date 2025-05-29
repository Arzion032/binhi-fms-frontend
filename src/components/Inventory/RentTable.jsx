import React from 'react';
import Return from '../assets/Return.png';
import Details from '../assets/Details.png';
import Trash from '../assets/Trash.png';

export default function RentTable({ rows = [], onReturn, onDetails, onDelete }) {
  return (
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
          {rows.map((row, index) => (
            <tr key={index} className="bg-[#F8FCF8] border-gray-200 text-center">
              <td><input type="checkbox" className="checkbox checkbox-sm rounded" /></td>
              <td className="px-3 py-4">{row.equipment}</td>
              <td className="px-3 py-4">{row.quantity}</td>
              <td className="px-3 py-4">{row.statusNow}</td>
              <td className="px-3 py-4">{row.rentRate}</td>
              <td className="px-3 py-4">{row.dateRented}</td>
              <td className="px-3 py-4">{row.dueDate}</td>
              <td className="px-3 py-4">{row.renter}</td>
              <td className="px-3 py-4">
                <div className="flex justify-center items-center gap-2 cursor-pointer">
                  <div className="group flex items-center transition-all duration-200 ease-in-out">
                    <div className="flex items-center w-[20px] group-hover:w-[80px] transition-all duration-200 overflow-hidden">
                      <img src={Return} alt="Return" className="w-4 h-4 mr-1" onClick={() => onReturn(row)} />
                      <span className="opacity-0 group-hover:opacity-100 text-[#16A34A] text-sm font-medium transition-opacity duration-200 whitespace-nowrap">Return?</span>
                    </div>
                  </div>
                  <div className="group flex items-center transition-all duration-200 ease-in-out">
                    <div className="flex items-center w-[20px] group-hover:w-[80px] transition-all duration-200 overflow-hidden">
                      <img src={Details} alt="Details" className="w-4 h-4 mr-1" onClick={() => onDetails(row)} />
                      <span className="opacity-0 group-hover:opacity-100 text-blue text-sm font-medium transition-opacity duration-200 whitespace-nowrap">Details</span>
                    </div>
                  </div>
                  <div className="group flex items-center transition-all duration-200 ease-in-out">
                    <span className="cursor-pointer" onClick={() => onDelete(row)}>
                      <img src={Trash} alt="Trash" className="w-4 h-4 mr-1" />
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
