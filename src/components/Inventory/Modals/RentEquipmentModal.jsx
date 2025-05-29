// Modals/RentEquipmentModal.jsx

import React from 'react';
import { X } from 'lucide-react';
import Success from '../../assets/Success.png';
import Disregard from '../../assets/Disregard.png';

const RentEquipmentModal = ({
  isRentOpen,
  isSuccessRentOpe,
  showConfirmDiscard,
  setIsRentOpen,
  setIsSuccessRentOpe,
  setShowConfirmDiscard,
  handleConfirm
}) => {
  if (!isRentOpen) return null;

  return (
    <>
      {/* Rent Equipment Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
        <div className="bg-white rounded-3xl w-[400px] p-6 border border-black relative shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Rent Equipment</h2>
              <p className="text-sm text-gray-500">Please provide the information.</p>
            </div>
            <button onClick={() => setIsRentOpen(false)}>
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="border-b border-gray-300 my-4"></div>

          <form className="space-y-4 mt-4" onSubmit={handleConfirm}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Equipment</label>
              <input
                type="text"
                value="Utility Tractor"
                disabled
                className="w-full px-4 py-2 border rounded-full text-sm bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Renter Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter the Renter Name"
                className="w-full px-4 py-2 border rounded-full text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="+63 | Enter the Contact Number"
                className="w-full px-4 py-2 border rounded-full text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter the Quantity"
                className="w-full px-4 py-2 border rounded-full text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Agreement Receipt</label>
              <input
                type="file"
                className="w-full px-4 py-2 border rounded-full text-sm"
              />
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
                onClick={() => setIsSuccessRentOpe(true)}
                className="px-10 py-2 bg-[#4CAE4F] text-white rounded-full hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessRentOpe && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl p-8 w-[440px] text-center relative shadow-xl">
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setIsSuccessRentOpe(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-4 flex justify-center items-center">
              <img
                src={Success}
                alt="Success.png"
                className="w-[80px] max-w-full object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">Equipment rented successfully!</h3>
            <p className="text-gray-600 mb-6">Everything’s set. Feel free to check your equipment!</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsSuccessRentOpe(false)}
                className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
              >
                Back
              </button>
              <button
                onClick={() => setIsSuccessRentOpe(false)}
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

export default RentEquipmentModal;
