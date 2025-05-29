// InventoryModals.jsx
import React from 'react';
import { X } from 'lucide-react';
import Success from './../../assets/Success.png';
import Disregard from './../../assets/Disregard.png';

const InventoryModals = ({ modalState, closeModal }) => {
  return (
    <>
      {/* Add Modal */}
      {modalState.add && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl w-[400px] p-6 border border-black shadow-xl relative">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Add Equipment</h2>
                <p className="text-sm text-gray-500">Please enter the new equipment.</p>
              </div>
              <button onClick={() => closeModal('add')}><X className="w-5 h-5 text-gray-600" /></button>
            </div>
            <form className="space-y-4 mt-2">
              <input className="w-full border rounded-full px-3 py-2" placeholder="Equipment Name" />
              <input className="w-full border rounded-full px-3 py-2" placeholder="Quantity" type="number" />
              <input className="w-full border rounded-full px-3 py-2" placeholder="Rental Price" type="number" />
              <textarea className="w-full border rounded-xl px-3 py-2" rows="3" placeholder="Remarks or Notes" />
              <div className="flex justify-center gap-3">
                <button type="button" onClick={() => closeModal('add')} className="px-4 py-2 bg-red-500 text-white rounded-full">Disregard</button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-full">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {modalState.success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 w-[400px] rounded-2xl text-center border border-black shadow-lg relative">
            <button className="absolute top-4 right-4 text-gray-400" onClick={() => closeModal('success')}>
              <X className="w-5 h-5" />
            </button>
            <img src={Success} alt="Success" className="w-[80px] mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Operation successful!</h2>
            <p className="text-sm text-gray-600 mb-6">Everything’s set. You may proceed.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => closeModal('success')} className="px-4 py-2 border border-green-500 text-green-600 rounded-full">Back</button>
              <button onClick={() => closeModal('success')} className="px-4 py-2 bg-green-500 text-white rounded-full">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {modalState.delete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 w-[400px] rounded-2xl text-center border border-black shadow-lg relative">
            <button className="absolute top-4 right-4 text-gray-400" onClick={() => closeModal('delete')}>
              <X className="w-5 h-5" />
            </button>
            <img src={Disregard} alt="Disregard" className="w-[80px] mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Confirm Deletion?</h2>
            <p className="text-sm text-gray-600 mb-6">This action is permanent. Are you sure?</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => closeModal('delete')} className="px-4 py-2 border border-red-500 text-red-600 rounded-full">Cancel</button>
              <button onClick={() => closeModal('delete')} className="px-4 py-2 bg-red-500 text-white rounded-full">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryModals;
