import React from 'react';
import { X } from 'lucide-react';

export default function AddEquipmentModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl w-[400px] p-6 border border-black relative shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Add Equipment</h2>
            <p className="text-sm text-gray-500">Please enter the new equipment.</p>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="border-b border-gray-300 my-4"></div>

        <form className="space-y-4 mt-4" onSubmit={onConfirm}>
          <div>
            <label className="block text-sm font-semibold">
              Equipment <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the Equipment"
              className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter the Quantity"
              className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Rental Price</label>
            <div className="flex items-center border border-gray-300 rounded-full px-3">
              <span className="text-gray-500 text-sm">₱</span>
              <input
                type="number"
                placeholder="Enter the Rental Price"
                className="w-full px-2 py-2 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold">Remarks/Notes</label>
            <textarea
              placeholder="Remarks or Notes"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
              rows="3"
            />
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
              style={{ width: '160px', height: '39px' }}
            >
              Disregard
            </button>
            <button
              type="submit"
              className="px-14 py-2 bg-[#4CAE4F] text-white border border-[#4CAE4F] rounded-full hover:bg-green-700"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
