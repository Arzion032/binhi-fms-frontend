import React, { useState } from 'react';

const IncomeModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Reset all form fields and file list
  const resetForm = () => {
    setAmount('');
    setSource('');
    setPaymentMethod('');
    setRemarks('');
    setSelectedFiles([]);
  };

  // Finalize “Disregard” action
  const performDisregard = () => {
    resetForm();
    setIsCancelConfirmOpen(false);
    onClose();
  };

  const handleConfirm = () => {
    if (!amount || !source || !paymentMethod || selectedFiles.length === 0) {
      alert("Please complete all required fields and add at least one file.");
      return;
    }
    setIsSuccessModalOpen(true);
  };

  const handleDone = () => {
    resetForm();
    setIsSuccessModalOpen(false);
    onClose();
  };

  const handleFileSelect = e => {
    if (e.target.files && e.target.files.length) {
      const newFiles = Array.from(e.target.files);
      const unique = newFiles.filter(nf => !selectedFiles.some(sf => sf.name === nf.name));
      setSelectedFiles(prev => [...prev, ...unique]);
      setIsUploadModalOpen(false);
    }
  };

  const handleRemoveFile = idx => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  if (!isOpen) return null;

 // 1) Disregard Confirmation Modal
if (isCancelConfirmOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 transition-all duration-300">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-lg relative">
          {/* Close Button */}
          <button
            onClick={() => setIsCancelConfirmOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >✕</button>
  
          <div className="flex flex-col items-center">
            {/* Big Red Exclamation Icon */}
            <div className="bg-[#FF4B4B] rounded-full p-6 mb-6 flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#FFFFFF">
                    <circle cx="12" cy="12" r="12" fill="#FF4B4B" />
                    <path d="M12 6a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-3 0v-7A1.5 1.5 0 0 1 12 6z" />
                    <circle cx="12" cy="18" r="1.5" fill="#FFFFFF" />
                </svg>
            </div>
            {/* Title */}
            <h2 className="text-2xl font-bold text-black mb-2">Disregard added income?</h2>
  
            {/* Description */}
            <p className="text-center text-gray-600 mb-8">
              This action cannot be undone.<br />
              The income details will be lost.
            </p>
  
            {/* Buttons */}
            <div className="flex gap-4">
              {/* Cancel Button */}
              <button
                onClick={() => setIsCancelConfirmOpen(false)}
                className="px-8 py-2 bg-[#FF4B4B] text-white rounded-full font-medium hover:bg-[#E53E3E] transition-all"
              >
                Cancel
              </button>
  
              {/* Disregard Button */}
              <button
                onClick={performDisregard}
                className="px-8 py-2 border-2 border-[#FF4B4B] text-[#FF4B4B] rounded-full font-medium hover:bg-[#FF4B4B] hover:text-white transition-all"
              >
                Disregard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }  
  
  // 2) Success Modal
  if (isSuccessModalOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-lg relative">
          <button
            onClick={handleDone}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >✕</button>
          <div className="flex flex-col items-center">
            <div className="bg-green-500 rounded-full p-6 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Income recorded successfully!</h2>
            <p className="text-center text-gray-600 mb-8">Everything's set. Feel free to check your income!</p>
            <div className="flex gap-4">
              <button
                onClick={handleDone}
                className="btn btn-outline btn-success rounded-full px-8"
              >
                Back
              </button>
              <button
                onClick={handleDone}
                className="btn btn-success rounded-full px-8"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3) Upload Files Modal
  if (isUploadModalOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 border-[0.5px] border-gray-300 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Upload Files</h3>
            <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400">✕</button>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center mb-4">
            <p className="mb-1 font-medium text-center">Choose a file or drag & drop it here</p>
            <p className="mb-4 text-xs text-gray-500 text-center">JPEG, PNG, PDF, XLSX up to 5 MB</p>
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="bg-green-500 text-white py-2 px-6 rounded-full font-medium">Browse File</div>
              <input
                id="file-upload" type="file" className="hidden"
                accept=".jpeg,.jpg,.png,.pdf,.xlsx,.xls" multiple
                onChange={handleFileSelect}
              />
            </label>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {selectedFiles.map((file, i) => (
              <div key={i} className="flex justify-between items-center mb-2 bg-gray-100 rounded-2xl p-4">
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size/1024).toFixed(2)} KB</p>
                </div>
                <button onClick={() => handleRemoveFile(i)} className="text-red-500 hover:text-red-700">✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4) Main Income Modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 border-[0.5px] border-gray-300 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Income</h2>
          <button onClick={onClose} className="text-gray-400">✕</button>
        </div>
        <p className="mb-4 text-sm text-gray-500">Please enter the income.</p>
        <div className="mb-4 border-b border-gray-200" />

        {/* Amount */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">₱</span>
            </div>
            <input
              type="text" placeholder="Enter the Amount"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={amount} onChange={e => setAmount(e.target.value)}
            />
          </div>
        </div>

        {/* Source */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Source <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500"
              value={source} onChange={e => setSource(e.target.value)}
            >
              <option value="" disabled>Select the Source</option>
              <option value="marketplace">Marketplace</option>
              <option value="rental">Rental</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Payment Method <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500"
              value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
            >
              <option value="" disabled>Select the Payment Method</option>
              <option value="cash">Cash</option>
              <option value="gcash">GCash</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Remarks */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Remarks/Notes</label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-xl min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Remarks or Notes"
            value={remarks} onChange={e => setRemarks(e.target.value)}
          />
        </div>

        {/* Upload Receipt */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="w-full mb-6 py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span className="text-gray-600">Upload Receipt</span>
        </button>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => setIsCancelConfirmOpen(true)}
            className="flex-1 py-3 bg-[#E53E3E] text-white rounded-full font-medium hover:bg-[#C53030]"
          >
            Disregard
          </button>
          <button
            onClick={handleConfirm}
            disabled={!amount || !source || !paymentMethod || selectedFiles.length === 0}
            className="flex-1 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeModal;
