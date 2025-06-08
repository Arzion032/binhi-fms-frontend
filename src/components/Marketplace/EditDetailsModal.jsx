import React, { useState, useEffect, useCallback } from 'react';
import { X, Pencil, Trash2 } from 'lucide-react';
import axios from 'axios'; // Import axios

const API_BASE_URL = "http://127.0.0.1:8000";

// Categories will now be fetched from backend
const initialCategories = []; 

const units = [
  "Kilogram",
  "Gram",
  "Liter",
  "Milliliter",
  "Piece",
  "Dozen",
  "Pack",
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
  const [unitMeasurement, setUnitMeasurement] = useState('');
  const [variations, setVariations] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [association, setAssociation] = useState('');
  const [farmerCode, setFarmerCode] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [showDisregardModal, setShowDisregardModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [availableCategories, setAvailableCategories] = useState(initialCategories); // New state for fetched categories

  function formatPeso(value) {
    if (!value) return "";
    let num = Number(String(value).replace(/,/g, ''));
    if (isNaN(num)) return "";
    return num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  useEffect(() => {
    if (product && isOpen) {
      setName(product.name || '');
      setVariations(product.variations || []);
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
      setCategory(product.category?.id || '');
      console.log("product.category on modal open:", product.category);
      setUnitMeasurement(product.unit_measurement || '');
      setAssociation(product.association || '');
      setFarmerCode(product.farmer_code || '');
      setDescription(product.description || '');
      setError('');
      setShowSuccessModal(false);
      console.log("Product in EditDetailsModal:", product);
      console.log("Variants in EditDetailsModal:", product.variations);
    }
    if (!isOpen) setError('');
  }, [product, isOpen]);

  // Fetch categories when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/products/categories/`);
          setAvailableCategories(response.data);
        } catch (err) {
          console.error("Error fetching categories in EditDetailsModal:", err);
        }
      };
      fetchCategories();
    }
  }, [isOpen]);

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

    // Get values from the first variation for validation
    const firstVariant = variations[0] || {};
    const numericPrice = Number(String(firstVariant.unit_price || '').replace(/,/g, ''));
    const stockValue = String(firstVariant.stock || '').trim();
    const unitMeasurementValue = String(firstVariant.unit_measurement || '').trim();
    const categoryTrimmed = category.trim();
    const descriptionTrimmed = description.trim();

    console.log('Validating fields:');
    console.log('Variant Price (numeric):', numericPrice, '> 0: ', numericPrice > 0, 'isNaN:', isNaN(numericPrice));
    console.log('Variant Stock:', stockValue, '!stockValue:', !stockValue);
    console.log('Category:', categoryTrimmed, '!categoryTrimmed:', !categoryTrimmed);
    console.log('Variant Unit Measurement:', unitMeasurementValue, '!unitMeasurementValue:', !unitMeasurementValue);
    console.log('Description:', descriptionTrimmed, '!descriptionTrimmed:', !descriptionTrimmed);

    if (numericPrice <= 0 || isNaN(numericPrice) || !stockValue || !categoryTrimmed || !unitMeasurementValue || !descriptionTrimmed) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    if (mode === "edit" && onConfirm) {
      onConfirm({
        ...product,
        price: Number(String(price).replace(/,/g, '')),
        stock: Number(stock),
        category,
        unit_measurement: unitMeasurement,
        association,
        farmer_code: farmerCode,
        description,
        variations,
      });
    }
    setShowSuccessModal(true);
  }

  function handlePriceChange(e) {
    let val = e.target.value.replace(/[^\\d.]/g, ''); 
    if (val.split('.').length > 2) val = val.replace(/\\.+$/, '');
    if (val.includes('.')) {
      const [intPart, decPart] = val.split('.');
      val = intPart + '.' + decPart.slice(0,2);
    }
    let formatted = '';
    if (val) {
      let [intPart, decPart] = val.split('.');
      intPart = intPart ? String(Number(intPart)).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",") : '';
      formatted = decPart !== undefined ? `${intPart}.${decPart}` : intPart;
    }
    setPrice(formatted);
  }

  function handleStockChange(e) {
    let val = e.target.value.replace(/[^\\d]/g, '');
    setStock(val);
  }

  const handleVariantNameChange = useCallback((index, value) => {
    setVariations(prevVariants => {
      const newVariants = [...prevVariants];
      newVariants[index] = { ...newVariants[index], name: value };
      return newVariants;
    });
  }, []);

  const handleVariantPriceChange = useCallback((index, value) => {
    setVariations(prevVariants => {
      const newVariants = [...prevVariants];
      newVariants[index] = { ...newVariants[index], unit_price: value }; // Changed to unit_price
      return newVariants;
    });
  }, []);

  const handleVariantStockChange = useCallback((index, value) => {
    setVariations(prevVariants => {
      const newVariants = [...prevVariants];
      newVariants[index] = { ...newVariants[index], stock: value };
      return newVariants;
    });
  }, []);

  const handleVariantImageChange = useCallback((index, file) => {
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setVariations(prevVariants => {
        const newVariants = [...prevVariants];
        newVariants[index] = { ...newVariants[index], image: newImageUrl, newFile: file }; // newFile to hold the actual File object if needed for upload
        return newVariants;
      });
    }
  }, []);

  if (!isOpen) return null;

  const isDetails = mode === 'details';

  const variationRows = variations.map((variant, idx) => {
    // Find the main image or default to the first image
    const variantDisplayImage = variant.images?.find(img => img.is_main)?.image || variant.images?.[0]?.image || `${window.location.origin}/sampleproduct.png`;

    return (
      <div key={idx} className="grid grid-cols-4 gap-x-4 mb-4"> {/* Changed to grid for horizontal alignment of each variant's fields */}
        <div> {/* Wrapper for Variant Name and Image */}
          <label className="font-semibold text-base mb-1 block">
            Variant {idx + 1} <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <div className="flex items-center px-4 py-1 rounded-[2rem] border border-[#D1D5DB] text-base">
            <label className="cursor-pointer mr-3 flex-shrink-0">
              <img src={variantDisplayImage} alt={variant.name} className="rounded-full" style={{ width: 40, height: 40, objectFit: "cover" }} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleVariantImageChange(idx, e.target.files[0])}
                disabled={isDetails}
              />
            </label>
            <input
              type="text"
              className="flex-1 outline-none bg-transparent pl-2"
              value={variant.name}
              onChange={(e) => handleVariantNameChange(idx, e.target.value)}
              placeholder="Variant Name"
              disabled={isDetails}
            />
          </div>
        </div>
        <div> {/* Price field for this variant */}
          <label className="font-semibold text-base mb-1 block">
            Price <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <div className="flex items-center relative">
            <span className="absolute left-6 text-gray-500 text-lg">₱</span>
            <input
              className="w-full pl-12 pr-6 py-3 rounded-[2rem] border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base"
              value={variant.unit_price} // Use variant's unit_price
              onChange={isDetails ? undefined : e => handleVariantPriceChange(idx, e.target.value)}
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
        <div> {/* Unit field for this variant */}
          <label className="font-semibold text-base mb-1 block">
            Unit <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <select
            className="block w-full rounded-[2rem] border border-[#D1D5DB] px-6 py-3 text-base focus:border-[#16A34A] focus:outline-none"
            value={variant.unit_measurement}
            onChange={isDetails ? undefined : e => setVariations(prev => { const newV = [...prev]; newV[idx].unit_measurement = e.target.value; return newV; })}
            required
            style={{
              color: variant.unit_measurement ? '#222A35' : '#888',
              background: isDetails ? "#f3f4f6" : "#fff",
              pointerEvents: isDetails ? "none" : "auto"
            }}
            disabled={isDetails}
          >
            <option value="">Select Unit</option>
            {units.map(unit => (
              <option value={unit} key={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <div> {/* Stock field for this variant */}
          <label className="font-semibold text-base mb-1 block">
            Stock <span style={{ color: '#EF4444' }}>*</span>
          </label>
          <input
            type="number"
            className="w-full px-6 py-3 rounded-[2rem] border border-[#D1D5DB] text-base"
            value={variant.stock}
            onChange={isDetails ? undefined : e => handleVariantStockChange(idx, e.target.value)}
            placeholder="0"
            required
            style={{
              background: isDetails ? "#f3f4f6" : "#fff",
              color: '#222A35',
              pointerEvents: isDetails ? "none" : "auto"
            }}
            readOnly={isDetails}
            disabled={isDetails}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-30">
      {/* Main Modal */}
      <form
        className="relative bg-white w-full mx-auto rounded-[2rem] shadow-xl p-10 pt-9"
        style={{
          minWidth: 370,
          maxWidth: 1000, // Further widened modal
          border: '1px solid #858585'
        }}
        onSubmit={handleConfirm}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-8 top-7 text-gray-500 hover:text-gray-900 rounded-full focus:outline-none"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        {/* Title and subtitle */}
        <h2 className="text-2xl font-bold leading-tight mb-0">
          Edit Product
        </h2>
        <p className="text-base text-gray-600 mb-4">
          Please edit the product.
        </p>
        <hr className="mb-6 mt-1" />

        {/* Image, Product Name, and Variation */}
        <div className="flex items-center gap-4 mb-7">
          <img
            src={avatar || '/sampleproduct.png'}
            alt={name}
            className="rounded-full"
            style={{ width: 65, height: 65, objectFit: "cover" }}
          />
          <div>
            <div className="text-[1.3rem] font-bold text-[#222A35] leading-tight">{name}</div>
            {variations.length > 0 && (
              <div className="text-[1rem] text-gray-600" style={{ marginTop: 2 }}>Variation: {variations.map(v => v.name).join(", ")}</div>
            )}
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-5">
          {/* Product Name and Category */}
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label className="font-semibold text-base mb-1 block">
                Product Name <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                className="w-full px-6 py-3 rounded-[2rem] border border-[#D1D5DB] text-base"
                value={name}
                readOnly
                disabled
                style={{
                  background: "#f3f4f6",
                  color: '#222A35',
                  pointerEvents: "none",
                }}
              />
            </div>
            <div>
              <label className="font-semibold text-base mb-1 block">
                Category <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <select
                className="block w-full rounded-[2rem] border border-[#D1D5DB] px-6 py-3 text-base focus:border-[#16A34A] focus:outline-none"
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
                {availableCategories.map(cat => (
                  <option value={cat.id} key={cat.id}>{cat.name}</option> // Use cat.id for value, cat.name for display
                ))}
              </select>
            </div>
          </div>

          {/* Variation 1, Price, Unit, Stock */}
          {variations.length > 0 && variationRows}

          {/* Association and Farmer Code */}
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label className="font-semibold text-base mb-1 block">
                Association <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                className="w-full px-6 py-3 rounded-[2rem] border border-[#D1D5DB] text-base"
                value={association}
                onChange={isDetails ? undefined : e => setAssociation(e.target.value)}
                placeholder="Pantok Farmers Association"
                required
                style={{
                  background: "#f3f4f6",
                  color: '#222A35',
                  pointerEvents: "none",
                }}
                readOnly
                disabled
              />
            </div>
            <div>
              <label className="font-semibold text-base mb-1 block">
                Farmer Code <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                type="text"
                className="w-full px-6 py-3 rounded-[2rem] border border-[#D1D5DB] text-base"
                value={farmerCode}
                onChange={isDetails ? undefined : e => setFarmerCode(e.target.value)}
                placeholder="e.g. JDC158"
                required
                style={{
                  background: isDetails ? "#f3f4f6" : "#fff",
                  color: '#222A35',
                  pointerEvents: isDetails ? "none" : "auto"
                }}
                readOnly={isDetails}
                disabled={isDetails}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-base mb-1 block">
              Description <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <textarea
              className="w-full px-6 py-3 rounded-[2rem] border border-[#D1D5DB] text-base resize-none"
              rows="4"
              value={description}
              onChange={isDetails ? undefined : e => setDescription(e.target.value)}
              placeholder="0"
              required
              style={{
                background: isDetails ? "#f3f4f6" : "#fff",
                color: '#222A35',
                pointerEvents: isDetails ? "none" : "auto"
              }}
              readOnly={isDetails}
              disabled={isDetails}
            ></textarea>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-8 mt-6">
          <button
            type="button"
            onClick={() => setShowDisregardModal(true)}
            className="px-12 py-5 rounded-[2rem] font-semibold text-lg"
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
            }}
          >
            Disregard
          </button>
          <button
            type="submit"
            className="px-12 py-5 rounded-[2rem] font-semibold text-lg"
            style={{
              backgroundColor: "#16A34A",
              color: "#fff",
            }}
          >
            Confirm
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-4 text-sm">{error}</p>}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">Success!</h3>
              <p>Product details have been updated.</p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onClose();
                }}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Disregard Confirmation Modal */}
      {showDisregardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-3xl shadow-xl relative p-10 w-full max-w-xl text-center border" style={{ borderColor: "#b5b5b5" }}>

            <button
              onClick={() => setShowDisregardModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close"
              style={{ background: "none", border: "none" }}
            >
              &times;
            </button>
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
    </div>
  );
}
