import React, { useState, useEffect } from 'react';

const categories = [
  'Fruits',
  'Milks & Dairy',
  'Vegetable',
  'Grains',
  'Root Crops',
  'Meats'
];

export default function EditDetailsModal({
  isOpen,
  onClose,
  product,
  onConfirm,
  mode = "details", // "details" for preview, "edit" for edit
}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [variation, setVariation] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const [showDisregardModal, setShowDisregardModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fix money formatting by storing the raw value and formatting on display
  function formatPeso(value) {
    // Accept empty string
    if (!value) return "";
    // Accept "0", "1234", "1,234.50" etc
    let num = Number(String(value).replace(/,/g, ''));
    if (isNaN(num)) return "";
    return num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  useEffect(() => {
    if (product && isOpen) {
      setName(product.name || '');
      setVariation(product.variation || '');
      setAvatar(product.avatar || '');
      setPrice(
        typeof product.price === 'number'
          ? formatPeso(product.price)
          : formatPeso(product.price)
      );
      setStock(
        typeof product.stock === 'number'
          ? product.stock.toString()
          : product.stock || ''
      );
      setCategory(product.category || '');
      setError('');
    }
    if (!isOpen) setError('');
  }, [product, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  function handleConfirm(e) {
    e.preventDefault();
    // For both modes: allow Approve, but only update data in edit mode
    if (!price.trim() || !stock.trim() || !category.trim()) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    if (mode === "edit" && onConfirm) {
      onConfirm({
        ...product,
        price: Number(String(price).replace(/,/g, '')),
        stock: Number(stock),
        category
      });
    }
    setShowSuccessModal(true);
  }

  function handlePriceChange(e) {
    let val = e.target.value.replace(/[^\d.]/g, ''); // accept numbers and dots only
    if (val.split('.').length > 2) val = val.replace(/\.+$/, ''); // remove trailing dots if more than one
    // Only allow 2 decimal places max
    if (val.includes('.')) {
      const [intPart, decPart] = val.split('.');
      val = intPart + '.' + decPart.slice(0,2);
    }
    // Format with commas on display, but keep decimals
    let formatted = '';
    if (val) {
      let [intPart, decPart] = val.split('.');
      intPart = intPart ? String(Number(intPart)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
      formatted = decPart !== undefined ? `${intPart}.${decPart}` : intPart;
    }
    setPrice(formatted);
  }

  function handleStockChange(e) {
    let val = e.target.value.replace(/[^\d]/g, '');
    setStock(val);
  }

  if (!isOpen) return null;

  const isDetails = mode === 'details';
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-30">
      {/* Main Modal */}
      <form
        className="relative bg-white w-full max-w-xl mx-auto rounded-[2.2rem] shadow-xl p-10 pt-9"
        style={{
          minWidth: 370,
          maxWidth: 490,
          border: '1px solid #858585'
        }}
        onSubmit={handleConfirm}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-8 top-7 text-gray-500 hover:text-gray-900 rounded-full focus:outline-none text-2xl"
          aria-label="Close"
        >
          <svg width={22} height={22} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
        {/* Title and subtitle */}
        <h2 className="text-2xl font-bold leading-tight mb-0">
          {isDetails ? "Product Preview" : "Edit Product Details"}
        </h2>
        <p className="text-base text-gray-600 mb-4">
          {isDetails ? "Here’s the details of the product." : "Update the product information below."}
        </p>
        <hr className="mb-6 mt-1" />

        {/* Image, Product Name, and Variation */}
        <div className="flex items-center gap-4 mb-7">
          <img
            src={avatar || '/Screenshot_195.png'}
            alt={name}
            className="rounded-full"
            style={{ width: 65, height: 65, objectFit: "cover" }}
          />
          <div>
            <div className="text-[1.3rem] font-bold text-[#222A35] leading-tight">{name}</div>
            {variation && (
              <div className="text-[1rem] text-gray-600" style={{ marginTop: 2 }}>Variation: {variation}</div>
            )}
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-5">
          <div>
            <label className="font-semibold text-base mb-1 block">
              Price <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div className="flex items-center relative">
              <span className="absolute left-6 text-gray-500 text-lg">₱</span>
              <input
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base"
                value={price}
                onChange={isDetails ? undefined : handlePriceChange}
                placeholder="0.00"
                required
                inputMode="decimal"
                style={{
                  color: '#222A35',
                  background: isDetails ? "#f3f4f6" : "#fff",
                  pointerEvents: isDetails ? "none" : "auto"
                }}
                readOnly={isDetails}
                disabled={isDetails}
              />
            </div>
          </div>
          <div>
            <label className="font-semibold text-base mb-1 block">
              Category <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <select
              className="block w-full rounded-2xl border border-[#D1D5DB] px-6 py-3 text-base focus:border-[#16A34A] focus:outline-none"
              value={category}
              onChange={isDetails ? undefined : e => setCategory(e.target.value)}
              required
              style={{
                color: category ? '#222A35' : '#888',
                background: isDetails ? "#f3f4f6" : "#fff",
                pointerEvents: isDetails ? "none" : "auto"
              }}
              disabled={isDetails}
            >
              <option value="">Please select a category</option>
              {categories.map(cat => (
                <option value={cat} key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-base mb-1 block">
              Stock <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              className="w-full px-6 py-3 rounded-2xl border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base"
              value={stock}
              onChange={isDetails ? undefined : handleStockChange}
              placeholder="0"
              required
              inputMode="numeric"
              style={{
                color: '#222A35',
                background: isDetails ? "#f3f4f6" : "#fff",
                pointerEvents: isDetails ? "none" : "auto"
              }}
              readOnly={isDetails}
              disabled={isDetails}
            />
          </div>
          {error && (
            <div className="text-red-500 text-base">{error}</div>
          )}
        </div>

        {/* Footer buttons - always show */}
        <div className="flex justify-between gap-4 mt-12">
          <button
            type="button"
            onClick={() => setShowDisregardModal(true)}
            className="flex-1 bg-[#EF4444] text-white font-semibold rounded-full py-4 text-lg transition hover:bg-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
            style={{ fontSize: "1.15rem" }}
          >
            Disregard
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#16A34A] text-white font-semibold rounded-full py-4 text-lg transition hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#15803D]"
            style={{ fontSize: "1.15rem" }}
          >
            Approve
          </button>
        </div>
      </form>

      {/* Disregard Confirmation Modal */}
      {showDisregardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-3xl shadow-xl relative p-10 w-full max-w-xl text-center border" style={{ borderColor: "#b5b5b5" }}>
            {/* Close Button */}
            <button
              onClick={() => setShowDisregardModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close"
              style={{ background: "none", border: "none" }}
            >
              &times;
            </button>
            {/* Red Exclamation Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#FF4B4B] rounded-full flex items-center justify-center mb-2" style={{ width: 110, height: 110 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#FF4B4B" />
                  <path d="M12 7v5m0 4h.01" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 mt-1" style={{ color: "#222" }}>Disregard editing?</h2>
            <p className="text-gray-700 mb-8">
              This action cannot be undone.<br />
              The changes will be lost.
            </p>
            <div className="flex justify-center gap-5 mt-2">
              <button
                onClick={() => setShowDisregardModal(false)}
                className="bg-[#FF3B3F] text-white font-semibold rounded-full px-12 py-4 text-base hover:bg-[#ff5c5c] transition"
                style={{ minWidth: 140, fontSize: "1.12rem" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDisregardModal(false);
                  onClose && onClose();
                }}
                className="border-2 border-[#FF3B3F] font-semibold rounded-full px-12 py-4 text-base bg-white transition"
                style={{
                  minWidth: 140,
                  color: '#FF3B3F',
                  fontSize: "1.12rem"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FF3B3F';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = '#FF3B3F';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#FF3B3F';
                  e.currentTarget.style.borderColor = '#FF3B3F';
                }}
              >
                Disregard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-3xl shadow-xl relative p-10 w-full max-w-xl text-center border" style={{ borderColor: "#b5b5b5" }}>
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close"
              style={{ background: "none", border: "none" }}
            >
              &times;
            </button>
            {/* Green Check Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#43B864] rounded-full flex items-center justify-center mb-2" style={{ width: 110, height: 110 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#43B864" />
                  <polyline points="17 9.5 12 15 9 12.2" fill="none" stroke="#fff" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 mt-1" style={{ color: "#111", fontSize: "2rem" }}>Product approved successfully!</h2>
            <p className="text-gray-700 mb-8" style={{ fontSize: "1.15rem" }}>
              Everything’s set. Feel free to check it!
            </p>
            <div className="flex justify-center gap-5 mt-2">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="border-2 border-[#43B864] font-semibold rounded-full px-12 py-4 text-base bg-white text-[#43B864] transition"
                style={{ minWidth: 140, fontSize: "1.12rem" }}
              >
                Back
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onClose && onClose();
                }}
                className="bg-[#43B864] text-white font-semibold rounded-full px-12 py-4 text-base hover:bg-[#369C52] transition"
                style={{ minWidth: 140, fontSize: "1.12rem" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
