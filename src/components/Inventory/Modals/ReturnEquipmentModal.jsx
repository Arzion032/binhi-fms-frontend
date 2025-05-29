// Modals/ReturnEquipmentModal.jsx

import React from 'react';
import { X } from 'lucide-react';
import Success from './../../../assets/Success.png';


const ReturnEquipmentModal = ({
  isReturnEquipmentOpen,
  isSuccessRentOpen,
  setIsReturnEquipmentOpen,
  setIsSuccessRentOpen,
  setShowDiscardModal,
  handleCloseAll
}) => {
  if (!isReturnEquipmentOpen) return null;

  return (
    <>
      {/* Return Equipment Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-3xl w-[400px] p-6 relative border border-black shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Return Equipment</h2>
              <p className="text-sm text-gray-600">Please enter the new equipment.</p>
            </div>
            <button onClick={() => setIsReturnEquipmentOpen(false)}>
              <span className="text-gray-500 text-xl">&times;</span>
            </button>
          </div>

          <hr className="my-2" />

          <form className="space-y-3 text-sm">
            <div>
              <label className="block font-semibold">Equipment</label>
              <input
                type="text"
                value="Utility Tractor"
                readOnly
                className="w-full border rounded-xl px-4 py-2 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-semibold">
                Renter Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter the Renter Name"
                className="w-full border rounded-xl px-4 py-2"
              />
            </div>

            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block font-semibold">
                  Rented on<span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border rounded-xl px-4 py-2" />
              </div>
              <div className="w-1/2">
                <label className="block font-semibold">
                  Returned on<span className="text-red-500">*</span>
                </label>
                <input type="date" className="w-full border rounded-xl px-4 py-2" />
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
                className="bg-[#F44336] text-white rounded-full w-[160px] py-2 font-semibold"
                onClick={() => setShowDiscardModal(true)}
              >
                Disregard
              </button>
              <button
                type="submit"
                className="bg-[#4CAF50] text-white rounded-full w-[160px] py-2 font-semibold"
                onClick={() => setIsSuccessRentOpen(true)}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Return Success Modal */}
      {isSuccessRentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl p-8 w-[440px] text-center relative shadow-xl">
            <div className="flex justify-end">
              <button onClick={handleCloseAll}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 flex justify-center items-center">
                <img
                  src={Success}
                  alt="Success.png"
                  className="w-[80px] max-w-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Equipment rented successfully!</h3>
              <p className="text-sm text-gray-600 mb-6">
                Everything’s set. Feel free to check your equipment!
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsSuccessRentOpen(false)}
                  className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                  style={{ width: "130px", height: "39px" }}
                >
                  Back
                </button>
                <button
                  onClick={handleCloseAll}
                  className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                  style={{ width: "130px", height: "39px" }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReturnEquipmentModal;
