import React from "react";
import { X, Check } from "lucide-react";
import Pencil2 from '../assets/PencilBlack.png';
import Time from '../assets/Time.png';

const InventoryModal = ({
    showModal,
    setShowModal,
    setSelectedDoc,
    uploadedFile,
    setUploadedFile,
    Upload,
    Uploadfiles,
    isEditOpen,
    setIsEditOpen,
    setShowSuccess,
    setShowConfirmDiscard,
    showEditModal,
    setShowEditModal,
    selectedItem,
    setActiveTab={setActiveTab}
  }) => {
    if (!showModal && !isEditOpen && (!showEditModal || !selectedItem)) return null;


const { name, model, price, unit, status } = selectedItem;

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] relative shadow-lg transition-all duration-300">
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedDoc("");
                setUploadedFile(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 border rounded-full flex items-center justify-center">
                <img src={Uploadfiles} alt="Uploadfiles" className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-left">Upload Files</h2>
                <p className="text-gray-500 text-sm">Select and upload the file do you need</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center w-full mb-4">
              <div className="flex justify-center mb-3">
                <img src={Upload} alt="Upload Icon" className="w-6 h-6" />
              </div>
              <p className="font-semibold text-sm mb-1">
                Choose a file or <span className="text-green-600">drag & drop it here</span>
              </p>
              <p className="text-gray-500 text-xs mb-4">
                JPEG, PNG, PDF, and XLXS formats, up to 5 MB
              </p>
              <label className="inline-block bg-green-600 text-white text-sm font-medium px-6 py-2 rounded-full cursor-pointer hover:bg-green-700">
                Browse File
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                />
              </label>
            </div>

            {uploadedFile && (
              <div className="bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/pdf-icon.png" alt="PDF" className="w-8 h-8" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(0)} KB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-semibold text-sm">100%</span>
                  <Check className="text-green-600 w-4 h-4" />
                  <button onClick={() => setUploadedFile(null)} className="text-gray-500 hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

        {/* Details */}

            {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white rounded-3xl p-6 w-[380px] max-w-full border border-gray-300 shadow-lg relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-left">
              <h2 className="text-lg font-bold mb-1">Machinery Details</h2>
              <p className="text-sm text-gray-600 mb-4">Here’s the details of this machinery.</p>
            </div>

            <div className="border-b border-gray-300 mb-4"></div>

            <div className="text-sm space-y-4 text-left">
              <div>
                <strong className="block text-gray-800">Machinery</strong>
                <span>{selectedItem?.name || 'N/A'}</span>
              </div>
              <div>
                <strong className="block text-gray-800">Model</strong>
                <span>{selectedItem?.model || 'N/A'}</span>
              </div>
              <div>
                <strong className="block text-gray-800">Rental Price</strong>
                <span>{selectedItem?.price || '₱1,500'}</span>
              </div>
              <div>
                <strong className="block text-gray-800">Unit</strong>
                <span>{selectedItem?.unit || 'Per Hectares'}</span>
              </div>
              <div>
                <strong className="block text-gray-800">Status</strong>
                <span>{selectedItem?.status || 'Available'}</span>
              </div>
            </div>

            <div className="flex justify-center gap-0 items-center mt-8">
                <button
                    onClick={() => {
                    setShowEditModal(false);
                    setIsEditOpen(true);
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-black px-4 py-2 rounded-full border border-transparent hover:border-blue focus:border-blue hover:text-blue focus:text-blue transition-all"
                >
                    <img src={Pencil2} alt="Edit" className="w-4 h-4" />
                    Edit Details
                </button>

                <button
                    onClick={() => {
                    setShowEditModal(false);
                    setActiveTab("rentHistory");
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-black px-4 py-2 rounded-full border border-transparent hover:border-blue focus:border-blue hover:text-blue focus:text-blue transition-all"
                >
                    <img src={Time} alt="Time" className="w-4 h-4" />
                    View Rent History
                </button>
                </div>

            <button
              onClick={() => setShowEditModal(false)}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-full"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
            <div className="bg-white rounded-3xl p-6 w-[360px] max-w-full border border-black shadow-lg relative">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-4 right-4 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold mb-1 text-left">Edit Equipment</h2>
            <p className="text-sm text-gray-500 mb-4 text-left">Please edit the equipment.</p>
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
                <label className="block text-sm font-semibold text-left">
                  Equipment <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={selectedItem?.name || ''}
                  className="w-full rounded-full border px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-left">
                  Model <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={selectedItem?.model || ''}
                  className="w-full rounded-full border px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-left">Rental Price</label>
                <div className="flex items-center rounded-full border px-4 py-2">
                  <span className="text-gray-500 pr-1">₱</span>
                  <input
                    type="text"
                    defaultValue={selectedItem?.price?.replace('₱', '') || ''}
                    className="w-full outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-left">Remarks/Notes</label>
                <textarea
                  placeholder="Remarks or Notes"
                  className="w-full rounded-3xl border px-4 py-2 text-sm placeholder:text-gray-400"
                  rows="3"
                />
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowConfirmDiscard(true)}
                  className="w-full py-2 rounded-full bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                >
                  Disregard
                </button>
                <button
                  type="submit"
                  className="w-full py-2 rounded-full bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryModal;
