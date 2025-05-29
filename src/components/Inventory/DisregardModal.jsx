import React from 'react';
import { X } from 'lucide-react';
import Disregard from '../../assets/Disregard.png';

export default function DisregardModal({ isOpen, onCancel, onConfirm, message = 'added equipment' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl w-[450px] h-[330px] p-10 shadow-lg relative border border-black text-center">
        <div className="flex justify-end">
          <button onClick={onCancel}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="mb-4 flex justify-center items-center">
            <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Disregard {message}?</h2>
          <p className="text-sm text-gray-600">
            This action cannot be undone. <br /> The {message} details will be lost.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
              style={{ width: '130px', height: '39px' }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
              style={{ width: '130px', height: '39px' }}
            >
              Disregard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
