import React, { useState } from "react";
import { X } from "lucide-react";

const UploadDocumentModal = ({ onClose }) => {
  const [selectedDoc, setSelectedDoc] = useState("");
  const [file, setFile] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[600px] relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 border rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0L8 8m4 0l4-4M4 16a8 8 0 1116 0H4z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">Upload Files</h2>
            <p className="text-gray-500 text-sm">Select and upload the file do you need</p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Select Dropdown */}
        <div className="mb-6">
          <label className="block font-semibold mb-1 text-sm text-gray-800">Select your Document</label>
          <select
            className="w-full rounded-full border border-gray-400 text-sm px-4 py-2 text-gray-500"
            value={selectedDoc}
            onChange={(e) => setSelectedDoc(e.target.value)}
          >
            <option value="">Barangay</option>
            <option value="barangay-clearance">Barangay Clearance</option>
            <option value="valid-id">Valid ID</option>
          </select>
        </div>

        {/* Upload Field */}
        <div className="flex justify-center mb-2">
          <div className="w-[550px]">
            <label className="block mb-1 font-semibold text-gray-700 text-left text-sm">
              Upload a Document
            </label>
            <input
              type="file"
              className="w-full rounded-full border border-gray-300 text-gray-600 text-sm cursor-pointer py-2 px-4"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
