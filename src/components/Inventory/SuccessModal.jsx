import React from 'react';
import { X } from 'lucide-react';
import Success from '../../assets/Success.png';

export default function SuccessModal({ isOpen, onClose, title = 'Success!', description = 'Everything’s set. Feel free to check your equipment!' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="bg-white p-8 w-[450px] h-[290px] rounded-2xl shadow-md text-center relative border border-black">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 flex justify-center items-center">
          <img src={Success} alt="Success.png" className="w-[80px] max-w-full object-contain" />
        </div>

        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{description}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
            style={{ width: '130px', height: '39px' }}
          >
            Back
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
            style={{ width: '130px', height: '39px' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
