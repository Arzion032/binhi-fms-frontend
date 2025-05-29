import React from 'react';
import { X } from 'lucide-react';
import Disregard from '../../assets/Disregard.png';

export default function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-6 w-[400px] border border-black shadow-lg relative text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 flex justify-center items-center">
          <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Confirm Deletion?</h2>
        <p className="text-sm text-gray-600">
          The selected equipment will be permanently removed from your records.
        </p>

        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
            style={{ width: '130px', height: '39px' }}
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
            style={{ width: '130px', height: '39px' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
