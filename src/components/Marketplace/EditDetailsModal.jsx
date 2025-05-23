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
  onConfirm
}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product && isOpen) {
      setName(product.name || '');
      setPrice(product.price ? product.price.toLocaleString() : '');
      setStock(product.stock ? product.stock.toString() : '');
      setCategory(product.category || '');
      setError('');
    }
    if (!isOpen) {
      setError('');
    }
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
    if (!name.trim() || !price.trim() || !stock.trim() || !category.trim()) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    if (onConfirm) {
      onConfirm({
        ...product,
        name,
        price: Number(price.replace(/,/g, '')),
        stock: Number(stock),
        category
      });
    }
    onClose();
  }

  function handlePriceChange(e) {
    let val = e.target.value.replace(/[^\d]/g, '');
    val = val ? parseInt(val, 10).toLocaleString() : '';
    setPrice(val);
  }

  function handleStockChange(e) {
    let val = e.target.value.replace(/[^\d]/g, '');
    setStock(val);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <form
        className="relative bg-white w-full max-w-md mx-auto rounded-3xl shadow-xl p-8 pt-7"
        style={{
          minWidth: 350,
          maxWidth: 430,
          border: '1px solid #858585'
        }}
        onSubmit={handleConfirm}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold leading-tight">Edit Equipment</h2>
            <p className="text-sm text-gray-500 mt-1 mb-3">
              Please edit the <span className="font-medium">equipment</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 text-gray-500 hover:text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Close"
          >
            <svg width={22} height={22} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <hr className="mb-4 mt-2" />

        {/* Fields */}
        <div className="space-y-3">
          <div>
            <label className="font-semibold text-sm mb-1 block">
              Product Name <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              className="w-full px-4 py-2 rounded-2xl border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Product Name"
              required
              style={{ color: '#222A35' }}
            />
          </div>
          <div>
            <label className="font-semibold text-sm mb-1 block">
              Price <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div className="flex items-center relative">
              <span className="absolute left-4 text-gray-500 text-lg">₱</span>
              <input
                className="w-full pl-9 pr-4 py-2 rounded-2xl border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base"
                value={price}
                onChange={handlePriceChange}
                placeholder="1,000"
                required
                inputMode="numeric"
                style={{ color: '#222A35' }}
              />
            </div>
          </div>
          <div>
            <label className="font-semibold text-sm mb-1 block">
              Stocks <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              className="w-full px-4 py-2 rounded-2xl border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base"
              value={stock}
              onChange={handleStockChange}
              placeholder="0"
              required
              inputMode="numeric"
              style={{ color: '#222A35' }}
            />
          </div>
          <div>
            <label className="font-semibold text-sm mb-1 block">
              Category
            </label>
            <select
              className="block w-full rounded-2xl border border-[#858585] px-4 py-2 text-sm focus:border-[#16A34A] focus:outline-none"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              style={{ color: '#222A35', background: '#fff' }}
            >
              <option value="">Please select a category</option>
              {categories.map(cat => (
                <option value={cat} key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-between gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#EF4444] text-white font-semibold rounded-full py-3 transition hover:bg-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
          >
            Disregard
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#16A34A] text-white font-semibold rounded-full py-3 transition hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#15803D]"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
