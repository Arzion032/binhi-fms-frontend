// Modals/EditEquipmentModal.jsx

import React from 'react';
import { X } from 'lucide-react';
import Success from '../../assets/Success.png';
import Disregard from '../../assets/Disregard.png';

const EditEquipmentModal = ({
  isEditOpen,
  showSuccess,
  showConfirmDiscard,
  setIsEditOpen,
  setShowSuccess,
  setShowConfirmDiscard
}) => {
  if (!isEditOpen) return null;

  return (
    <>
      {/* Edit Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex justify-center items-center">
        <div className="bg-white rounded-3xl p-6 w-[360px] max-w-full border border-black shadow-lg relative">
          <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 text-gray-400">
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bold mb-1">Edit Equipment</h2>
          <p className="text-sm text-gray-500 mb-4">Please edit the equipment.</p>
          <div className="border-b border-gray-300 my-4"></div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditOpen(false);
              setShowSuccess(true);
            }}
            className="space-y-3"
          >
            <div>
              <label className="block text-sm font-medium">Equipment *</label>
              <input type="text" defaultValue="Utility Tractor" className="w-full rounded-full border px-4 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Total Quantity *</label>
              <input type="number" defaultValue={6} className="w-full rounded-full border px-4 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Repair Needed</label>
              <input type="number" defaultValue={2} className="w-full rounded-full border px-4 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Rental Price</label>
              <input type="text" defaultValue="₱ 1,500" className="w-full rounded-full border px-4 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Remarks/Notes</label>
              <textarea className="w-full rounded-xl border px-4 py-2" rows="3" placeholder="Remarks or Notes" />
            </div>

            <div className="flex justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowConfirmDiscard(true)}
                className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                style={{ width: "130px", height: "39px" }}
              >
                Disregard
              </button>
              <button
                type="submit"
                className="px-10 py-2 bg-[#4CAE4F] text-white rounded-full hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white p-8 w-[450px] h-[290px] rounded-2xl shadow-md w-96 text-center relative border border-black">
            <button onClick={() => setShowSuccess(false)} className="absolute top-4 right-4 text-gray-400">
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 flex justify-center items-center">
              <img
                src={Success}
                alt="Success.png"
                className="w-[80px] max-w-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">Equipment updated successfully!</h2>
            <p className="text-sm text-gray-600 mb-6">Everything’s set. Feel free to check your equipment!</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
              >
                Back
              </button>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                style={{ width: "130px", height: "39px" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditEquipmentModal;
