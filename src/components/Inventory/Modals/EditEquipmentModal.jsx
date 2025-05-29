import React from 'react';
import { X } from 'lucide-react';

export default function EditEquipmentModal({ isOpen, onClose, onConfirm, defaultValues }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex justify-center items-center">
      <div className="bg-white rounded-3xl p-6 w-[360px] max-w-full border border-black shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold mb-1">Edit Equipment</h2>
        <p className="text-sm text-gray-500 mb-4">Please edit the equipment.</p>
        <div className="border-b border-gray-300 my-4"></div>

        <form onSubmit={onConfirm} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Equipment *</label>
            <input type="text" defaultValue={defaultValues?.equipment} className="w-full rounded-full border px-4 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Total Quantity *</label>
            <input type="number" defaultValue={defaultValues?.quantity} className="w-full rounded-full border px-4 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Repair Needed</label>
            <input type="number" defaultValue={defaultValues?.repair || 0} className="w-full rounded-full border px-4 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Rental Price</label>
            <input type="text" defaultValue={defaultValues?.price} className="w-full rounded-full border px-4 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Remarks/Notes</label>
            <textarea className="w-full rounded-xl border px-4 py-2" rows="3" placeholder="Remarks or Notes">
              {defaultValues?.remarks}
            </textarea>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
              style={{ width: '130px', height: '39px' }}
            >
              Disregard
            </button>
            <button
              type="submit"
              className="px-10 py-2 bg-[#4CAE4F] text-white rounded-full hover:bg-green-600"
              style={{ width: '130px', height: '39px' }}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
