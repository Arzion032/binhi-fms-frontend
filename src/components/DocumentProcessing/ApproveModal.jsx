// src/components/ApproveModal.jsx
import React, { useState, useEffect } from 'react';

export function RejectModal({ isOpen, onClose, onConfirm, request }) {
  // two stages: 'form' to enter reason, 'success' to show confirmation
  const [stage, setStage] = useState('form');
  const [name, setName] = useState('');
  const [documentRequest, setDocumentRequest] = useState('');
  const [requestedOn, setRequestedOn] = useState('');
  const [reason, setReason] = useState('');

// EMMAN POGI

  useEffect(() => {
    if (isOpen) {
      // reset when modal opens
      setStage('form');
      setName(request.name);
      setDocumentRequest(request.document);
      setRequestedOn(request.requestedOn);
      setReason('');
    }
  }, [isOpen, request]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reason) {
      alert('Please state your reason.');
      return;
    }
    onConfirm({ name, documentRequest, requestedOn, reason });
    setStage('success');
  };

  const handleDone = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {stage === 'form' ? (
          <>
            <h2 className="text-2xl font-bold text-black mb-2 text-center">
              Reason for Rejection
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Please state your reason.
            </p>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Document Request</label>
                <input
                  type="text"
                  value={documentRequest}
                  onChange={e => setDocumentRequest(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Requested On</label>
                <input
                  type="text"
                  value={requestedOn}
                  onChange={e => setRequestedOn(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Reason <span className="text-red-500">*</span>
                </label>
                <select
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="" disabled>State your reason</option>
                  <option value="Incomplete Document">Incomplete Document</option>
                  <option value="Invalid Information">Invalid Information</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-[#E53E3E] text-white rounded-full font-medium hover:bg-[#C53030] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!reason}
                className="flex-1 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 disabled:opacity-50 transition"
              >
                Confirm
              </button>
            </div>
          </>
        ) : (
          // success stage: reuse approve’s check icon & styling
          <div className="flex flex-col items-center">
            <div className="bg-green-500 rounded-full p-6 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center">
              Document rejected successfully!
            </h2>
            <p className="text-center text-gray-600 mb-8">
              The request has been marked as rejected.
            </p>
            <button
              onClick={handleDone}
              className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ApproveModal({ isOpen, onClose, onApprove }) {
  const [stage, setStage] = useState('confirm');

  useEffect(() => {
    if (isOpen) setStage('confirm');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBack = () => onClose();
  const handleApprove = () => {
    if (onApprove) onApprove();
    setStage('success');
  };
  const handleDone = () => onClose();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-lg mx-4 p-8 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {stage === 'confirm' ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-2">
              Are you sure to approve?
            </h2>
            <p className="text-center text-gray-600 mb-8">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleBack}
                className="px-8 py-3 border-2 border-green-500 text-green-500 rounded-full font-medium hover:bg-green-50 transition"
              >
                Back
              </button>
              <button
                onClick={handleApprove}
                className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition"
              >
                Approve
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="bg-green-500 rounded-full p-6 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center">
              Document approved successfully!
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Everything’s set. Feel free to check the requests.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleBack}
                className="px-8 py-3 border-2 border-green-500 text-green-500 rounded-full font-medium hover:bg-green-50 transition"
              >
                Back
              </button>
              <button
                onClick={handleDone}
                className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
