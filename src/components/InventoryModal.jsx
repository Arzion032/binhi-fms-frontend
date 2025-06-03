import React from "react";
import { X, Check } from "lucide-react";

const InventoryModal = ({
  showModal,
  setShowModal,
  selectedDoc,
  setSelectedDoc,
  uploadedFile,
  setUploadedFile,
  Upload,
  Uploadfiles,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[420px] relative shadow-lg transition-all duration-300">
        {/* Close Button */}
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

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 border rounded-full flex items-center justify-center">
            <img src={Uploadfiles} alt="Uploadfiles" className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-left">Upload Files</h2>
            <p className="text-gray-500 text-sm">Select and upload the file do you need</p>
          </div>
        </div>

        {/* File Drop Area */}
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

        {/* Uploaded File Preview */}
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
  );
};

export default InventoryModal;
