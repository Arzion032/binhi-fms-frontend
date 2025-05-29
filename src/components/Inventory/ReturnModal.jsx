import React from 'react';
import { X } from 'lucide-react';

export default function ReturnModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-3xl w-[400px] p-6 relative border border-black shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Return Equipment</h2>
            <p className="text-sm text-gray-600">Please fill in the return details.</p>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <hr className="my-2" />

        <form className="space-y-3 text-sm" onSubmit={onConfirm}>
          <div>
            <label className="block font-semibold">Equipment</label>
            <input type="text" value="Utility Tractor" readOnly className="w-full border rounded-xl px-4 py-2 bg-gray-100" />
          </div>

          <div>
            <label className="block font-semibold">Renter Name<span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter the Renter Name" className="w-full border rounded-xl px-4 py-2" required />
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block font-semibold">Rented on<span className="text-red-500">*</span></label>
              <input type="date" className="w-full border rounded-xl px-4 py-2" required />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold">Returned on<span className="text-red-500">*</span></label>
              <input type="date" className="w-full border rounded-xl px-4 py-2" required />
            </div>
          </div>

          <div>
            <label className="block font-semibold">Remarks/Notes</label>
            <textarea placeholder="Remarks or Notes" className="w-full border rounded-xl px-4 py-2 h-24 resize-none" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="damaged" />
            <label htmlFor="damaged" className="text-sm font-medium">Mark as Damaged</label>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#F44336] text-white rounded-full w-[160px] py-2 font-semibold"
            >
              Disregard
            </button>
            <button
              type="submit"
              className="bg-[#4CAF50] text-white rounded-full w-[160px] py-2 font-semibold"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
