// Modals/AddEquipmentModal.jsx

import React from 'react';
import { X } from 'lucide-react';
import Disregard from './../../../assets/Disregard.png';
import Success from './../../../assets/Success.png';

const AddEquipmentModal = ({
  isModalOpen,
  showDiscardModal,
  showAddedModal,
  setIsModalOpen,
  setShowDiscardModal,
  setShowAddedModal,
  handleConfirm,
  handleCloseAll
}) => {
  if (!isModalOpen) return null;

  return (
    <>
      {/* Add Equipment Modal */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
        <div className="bg-white rounded-2xl w-[400px] p-6 border border-black relative shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Add Equipment</h2>
              <p className="text-sm text-gray-500">Please enter the new equipment.</p>
            </div>
            <button onClick={() => setIsModalOpen(false)}>
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="border-b border-gray-300 my-4"></div>
          <form className="space-y-4 mt-4" onSubmit={handleConfirm}>
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
                onClick={() => setShowDiscardModal(true)}
                className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                style={{ width: "160px", height: "39px" }}
              >
                Disregard
              </button>
              <button
                type="submit"
                onClick={() => setShowAddedModal(true)}
                className="px-14 py-2 bg-[#4CAE4F] text-white border border-[#4CAE4F] rounded-full hover:bg-[dark green] hover:text-white"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Disregard Modal */}
      {showDiscardModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl w-[450px] h-[330px] p-10 shadow-lg relative border border-black">
            <div className="flex justify-end">
              <button onClick={() => setShowDiscardModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 flex justify-center items-center">
                <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
              </div>
              <h2 className="text-2xl text-center font-bold mb-2">Disregard added equipment?</h2>
              <p className="text-sm text-center text-gray-600">
                This action cannot be undone. <br />
                The equipment details will be lost.
              </p>
              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={() => setShowDiscardModal(false)}
                  className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                  style={{ width: "130px", height: "39px" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCloseAll}
                  className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                  style={{ width: "130px", height: "39px" }}
                >
                  Disregard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showAddedModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 w-[500px] h-[300px] rounded-3xl shadow-md text-center relative border border-black">
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
              <h2 className="text-3xl font-bold mb-2">Equipment added successfully!</h2>
              <p className="text-sm text-gray-600 mb-6">
                Everything’s set. Feel free to check your equipment!
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowAddedModal(false)}
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

export default AddEquipmentModal;
