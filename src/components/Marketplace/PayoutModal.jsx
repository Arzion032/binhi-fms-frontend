import React from 'react';

export default function PayoutModal({
  isOpen,
  onClose,
  payout,
  onProceed,
  isSuccess = false,
  onBack,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl w-[430px] max-w-full p-6 shadow-xl relative border border-gray-200">
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {/* Header */}
        <div className="mb-1">
          <h2 className="text-2xl font-bold text-gray-900">Payout Details</h2>
          <p className="text-gray-500 text-sm mt-1">
            Shown below is the payout details.
          </p>
        </div>
        <hr className="my-4 border-gray-200" />
        {/* Main Content */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={payout?.farmer?.avatar || "/sampleproduct.png"}
              alt={payout?.farmer?.name || "Farmer"}
              className="w-16 h-16 rounded-full object-cover border border-gray-200"
            />
            <div>
              <div className="text-xl font-bold text-gray-900">
                {payout?.farmer?.name || 'Juan Dela Cruz'}
              </div>
              <div className="text-gray-500 font-medium -mt-1">Farmer</div>
            </div>
          </div>
          {/* Items Sold */}
          <div className="mb-3">
            <div className="font-bold text-gray-900">Items Sold</div>
            <div className="flex items-center gap-2 mt-1">
              <img
                src={payout?.product?.image || "/sampleproduct.png"}
                alt={payout?.product?.name || "Product"}
                className="w-9 h-9 rounded-md object-cover border border-gray-200"
              />
              <div>
                <div className="font-semibold text-gray-800 leading-tight">
                  {payout?.product?.name || "Farm Fresh Sweet Corn"}
                </div>
                <div className="text-gray-500 text-xs">
                  Variation: {payout?.product?.variation || "Yellow, White"}
                </div>
              </div>
              <div className="ml-auto font-semibold text-black">x{payout?.product?.quantity || 1}</div>
            </div>
          </div>
          {/* Status */}
          <div className="mb-3">
            <div className="font-bold text-gray-900">Status</div>
            <div className="text-gray-700">
              {payout?.status || "Pending"}
            </div>
          </div>
          {/* Payment Method */}
          <div className="mb-3">
            <div className="font-bold text-gray-900">Payment Method</div>
            <div className="text-gray-700">
              {payout?.paymentMethod || "GCash"}
            </div>
          </div>
          {/* GCash Account */}
          <div className="mb-6">
            <div className="font-bold text-gray-900">GCash Account</div>
            <div className="text-gray-800 font-medium tracking-wider">{payout?.gcashNumber || "0938-100-4277"}</div>
            <div className="text-gray-500 text-sm">{payout?.gcashName || "J*** D*** C***"}</div>
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center justify-between gap-4 mt-2">
          <button
            className="w-1/2 py-2 rounded-full border-2 border-[#16A34A] text-[#16A34A] font-semibold transition hover:bg-[#F0FDF4]"
            onClick={onBack}
          >
            Back
          </button>
          <button
            className="w-1/2 py-2 rounded-full bg-[#16A34A] text-white font-semibold transition hover:bg-[#15803D]"
            onClick={onProceed}
          >
            Proceed
          </button>
        </div>
        {/* Success State */}
        {isSuccess && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-2xl">
            <svg className="mb-2" width="54" height="54" fill="none" viewBox="0 0 54 54">
              <circle cx="27" cy="27" r="27" fill="#16A34A" />
              <path d="M37 21L24.375 33.625L17 26.25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="text-xl font-bold text-[#16A34A]">Payment Successful!</div>
            <div className="text-gray-600 text-base mt-1">The payout has been marked as paid.</div>
            <button
              className="mt-6 px-7 py-2 rounded-full bg-[#16A34A] text-white font-semibold"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
