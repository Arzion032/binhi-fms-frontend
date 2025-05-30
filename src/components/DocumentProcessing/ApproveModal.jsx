import React, { useState, useRef, useEffect } from 'react';

// ICONS (inline SVGs for no dependencies)
const PencilIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 2 20l.5-5L16.5 3.5z" /></svg>
);
const TrashIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
);
const PlusIcon = ({ className = "" }) => (
  <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const categories = [
  "Vegetable", "Root Crops", "Milks & Dairy", "Meats", "Fruits", "Grains"
];

// Variation Modal (internal)
function VariationModal({ isOpen, onClose, onConfirm, variationNumber, initialValue }) {
  const [name, setName] = useState(initialValue?.name || '');
  const [image, setImage] = useState(initialValue?.image || null);
  const [price, setPrice] = useState(initialValue?.price || '');
  const [stock, setStock] = useState(initialValue?.stock || '');

  useEffect(() => {
    setName(initialValue?.name || '');
    setImage(initialValue?.image || null);
    setPrice(initialValue?.price || '');
    setStock(initialValue?.stock || '');
  }, [initialValue, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    onConfirm && onConfirm({ name, image, price, stock });
    onClose && onClose();
  };

  if (!isOpen) return null;

  const inputBox = "w-full px-6 py-3 rounded-[2rem] border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base bg-white placeholder-[#B7B7B7] font-medium";
  const discardBtn = "flex-1 font-bold rounded-full py-4 text-lg bg-[#F64B4B] text-white hover:bg-[#DD2626] transition";
  const confirmBtn = "flex-1 font-bold rounded-full py-4 text-lg bg-[#159945] text-white hover:bg-green-700 transition";

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="relative bg-white w-full max-w-[520px] mx-auto rounded-[2.2rem] shadow-xl p-9 pt-8"
        style={{ minWidth: 320, border: '1px solid #ececec' }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-7 top-7 text-gray-400 hover:text-gray-700 rounded-full focus:outline-none text-2xl"
          aria-label="Close"
        >
          <svg width={26} height={26} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <h2 className="text-[1.6rem] font-bold text-[#193319] mb-0 leading-tight" style={{ letterSpacing: "-1px" }}>
          Variation {variationNumber}
        </h2>
        <p className="text-base text-gray-600 mb-2">Please enter the details of Variation {variationNumber}.</p>
        <hr className="mb-6 mt-1 border-[#D8D8D8]" />

        <div className="mb-4">
          <label className="font-semibold text-[17px] mb-1 block text-[#222A35]">Product Name <span className="text-[#F64B4B]">*</span></label>
          <input
            className={inputBox}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter the Equipment"
            required
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold text-[17px] mb-1 block text-[#222A35]">Product Picture <span className="text-[#F64B4B]">*</span></label>
          <div className="flex">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#C1C1C1] rounded-xl w-[85px] h-[85px] text-[#888] text-xs bg-[#fafafa] cursor-pointer hover:border-[#16A34A] transition">
              {image ? (
                <img src={image} alt={`Preview`} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <>
                  <span className="text-2xl font-bold">+</span>
                  <span>Add Image</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="font-semibold text-[17px] mb-1 block text-[#222A35]">Unit Price</label>
          <div className="flex items-center relative">
            <span className="absolute left-6 text-gray-500 text-lg font-bold">₱</span>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-[2rem] border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base bg-white placeholder-[#B7B7B7] font-medium"
              value={price}
              onChange={e => setPrice(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="Enter the Rental Price"
              inputMode="decimal"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="font-semibold text-[17px] mb-1 block text-[#222A35]">Stock</label>
          <input
            className={inputBox}
            value={stock}
            onChange={e => setStock(e.target.value.replace(/\D/, ""))}
            placeholder="0"
            inputMode="numeric"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button type="button" className={discardBtn} onClick={onClose}>
            Disregard
          </button>
          <button type="button" className={confirmBtn} onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AddProductModal({ isOpen, onClose, onSaveProduct }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef();
  const [images, setImages] = useState(Array(5).fill(null));
  const [description, setDescription] = useState('');
  const [variants, setVariants] = useState([{}, {}, {}]);
  const [showVariationModal, setShowVariationModal] = useState(false);
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);
  const [error, setError] = useState('');
  const [drafts, setDrafts] = useState([]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };
    if (showCategoryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCategoryDropdown]);

  const handleImageChange = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImages(imgs => imgs.map((img, i) => (i === idx ? reader.result : img)));
    };
    reader.readAsDataURL(file);
  };

  const handleAddVariant = () => {
    setVariants(prev => [...prev, {}, {}, {}]);
  };

  // Remove a variant
  const handleDeleteVariant = (idx) => {
    setVariants(prev =>
      prev.map((item, i) => (i === idx ? {} : item))
    );
  };

  // Variants grid scroll settings
  const maxRows = 2;
  const rowHeight = 82;
  const showScrollable = variants.length > maxRows * 3;
  const scrollBoxHeight = showScrollable
    ? (rowHeight * 2.6)
    : 'auto';

  const inputBox =
    "w-full px-6 py-3 rounded-[2rem] border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base bg-white placeholder-[#B7B7B7] font-medium";
  const labelStyle = "font-semibold text-[17px] mb-1 block text-[#222A35]";
  const discardBtn = "flex-1 font-bold rounded-full py-4 text-lg bg-[#F64B4B] text-white hover:bg-[#DD2626] transition";
  const draftBtn = "flex-1 font-bold rounded-full py-4 text-lg bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 transition";
  const submitBtn = "flex-1 font-bold rounded-full py-4 text-lg bg-[#159945] text-white hover:bg-green-700 transition";

  // Validate form for save and submit
  function validateProduct(isDraft = false) {
    if (!isDraft) {
      if (!productName.trim()) {
        setError('Product name is required.');
        return false;
      }
      if (!category.trim()) {
        setError('Category is required.');
        return false;
      }
      if (!images.filter(Boolean).length) {
        setError('At least one product image is required.');
        return false;
      }
      // No variant requirement
    }
    setError('');
    return true;
  }

  // Handle Save and Submit
  const handleSaveSubmit = (e) => {
    e.preventDefault();
    if (!validateProduct(false)) return;

    const filledVariants = variants.filter(v => v && v.name);
    const newProduct = {
      name: productName,
      category,
      images: images.filter(Boolean),
      description,
      variants: filledVariants, // Can be empty
      status: "Active"
    };

    if (onSaveProduct) onSaveProduct(newProduct);

    // Reset state and close
    setProductName('');
    setCategory('');
    setImages(Array(5).fill(null));
    setDescription('');
    setVariants([{}, {}, {}]);
    setError('');
    onClose && onClose();
  };

  // Handle Save as Draft
  const handleSaveDraft = (e) => {
    e.preventDefault();

    const newDraft = {
      name: productName,
      category,
      images: images.filter(Boolean),
      description,
      variants: variants.filter(v => v && v.name),
      status: "Draft"
    };

    setDrafts(prev => [...prev, newDraft]);

    // Optionally, you can send the draft to parent
    // if (onSaveProduct) onSaveProduct(newDraft);

    // Reset state and close
    setProductName('');
    setCategory('');
    setImages(Array(5).fill(null));
    setDescription('');
    setVariants([{}, {}, {}]);
    setError('');
    onClose && onClose();
  };

  return !isOpen ? null : (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        className="relative bg-white w-full max-w-[700px] mx-auto rounded-[2.8rem] shadow-2xl p-10 pt-9"
        style={{ border: '1px solid #f0f0f0', minWidth: 370, transition: 'height 0.25s cubic-bezier(.4,2.3,.3,1)' }}
        onSubmit={handleSaveSubmit}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-8 top-8 text-gray-400 hover:text-gray-700 rounded-full focus:outline-none text-2xl"
          aria-label="Close"
        >
          <svg width={26} height={26} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <h2 className="text-[2rem] font-bold text-[#193319] mb-0 leading-tight" style={{ letterSpacing: "-1px" }}>Add Product</h2>
        <p className="text-base text-gray-600 mb-2">Please enter the new product.</p>
        <hr className="mb-6 mt-1 border-[#D8D8D8]" />

        {/* Product Name & Category */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className={labelStyle}>Product Name <span className="text-[#F64B4B]">*</span></label>
            <input
              className={inputBox}
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="Enter the Equipment"
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Category <span className="text-[#F64B4B]">*</span></label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowCategoryDropdown(open => !open)}
                className="flex justify-between items-center w-full px-6 py-3 rounded-[2rem] border border-[#D1D5DB] bg-white text-left text-base font-medium focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] transition"
                style={{ color: category ? "#222A35" : "#B7B7B7" }}
              >
                {category ? category : "Please select a category"}
                <svg
                  className={`ml-2 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#222A35"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showCategoryDropdown && (
                <ul className="absolute left-0 top-[110%] z-40 w-full bg-white border border-[#16A34A] rounded-xl shadow-lg animate-dropdown">
                  {categories.map(cat => (
                    <li
                      key={cat}
                      className={`px-6 py-2 cursor-pointer hover:bg-[#16A34A] hover:text-white transition rounded-xl ${category === cat ? "bg-[#e9faef] font-bold text-[#159945]" : "text-[#222A35]"}`}
                      onClick={() => {
                        setCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
              <style>{`
                .animate-dropdown {
                  animation: dropdown-fade 0.16s cubic-bezier(.22,.74,.6,1.05);
                }
                @keyframes dropdown-fade {
                  0% { opacity: 0; transform: translateY(-8px);}
                  100% { opacity: 1; transform: translateY(0);}
                }
              `}</style>
            </div>
          </div>
        </div>

        {/* Product Pictures */}
        <div className="mb-2">
          <div className="flex items-end justify-between">
            <label className={labelStyle + " mb-0"}>Product Picture <span className="text-[#F64B4B]">*</span></label>
            <span className="text-[#F64B4B] text-2xl font-bold" style={{ visibility: 'hidden' }}>*</span>
          </div>
          <div className="flex gap-3 mt-1 mb-2">
            {images.map((img, idx) => (
              <label
                key={idx}
                className="flex flex-col items-center justify-center border-2 border-dashed border-[#C1C1C1] rounded-xl w-[85px] h-[85px] text-[#888] text-xs bg-[#fafafa] cursor-pointer hover:border-[#16A34A] transition"
              >
                {img ? (
                  <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <>
                    <span className="text-2xl font-bold">+</span>
                    <span>Add Image</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleImageChange(e, idx)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className={labelStyle}>Description</label>
          <textarea
            className="w-full px-6 py-3 rounded-[2rem] border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base bg-white min-h-[90px] resize-none"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            maxLength={600}
            style={{ fontSize: "15.5px", fontWeight: 500 }}
          />
        </div>

        {/* Variants */}
        <div className="w-full mt-1 mb-1">
          <div
            id="variant-row"
            className="grid grid-cols-3 gap-x-4 gap-y-2"
            style={{
              maxHeight: showScrollable ? scrollBoxHeight : 'none',
              overflowY: showScrollable ? 'auto' : 'visible',
              paddingRight: showScrollable ? 6 : 0,
              marginBottom: 6,
              transition: 'max-height 0.25s cubic-bezier(.4,2.3,.3,1)'
            }}
          >
            {variants.map((variant, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center mb-1"
                style={{ minWidth: 120, maxWidth: 210 }}
              >
                {/* Filled variant button */}
                {variant?.name ? (
                  <div className="flex items-center border rounded-full px-2 py-2 bg-white w-full justify-between gap-2 shadow"
                    style={{
                      borderColor: "#C1C1C1",
                      minHeight: 44,
                      maxWidth: 210
                    }}
                  >
                    {/* Image */}
                    {variant.image ? (
                      <img src={variant.image} alt="variant" className="w-8 h-8 rounded-full object-cover border mr-2" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center" />
                    )}
                    {/* Name */}
                    <span className="font-semibold text-[15px] flex-1 truncate" title={variant.name}>
                      {variant.name}
                    </span>
                    {/* Edit */}
                    <button
                      type="button"
                      className="p-1 hover:bg-gray-100 rounded-full"
                      onClick={() => {
                        setEditingVariantIndex(idx);
                        setShowVariationModal(true);
                      }}
                      aria-label="Edit Variant"
                    >
                      <PencilIcon />
                    </button>
                    {/* Delete */}
                    <button
                      type="button"
                      className="p-1 hover:bg-red-50 rounded-full ml-1"
                      onClick={() => handleDeleteVariant(idx)}
                      aria-label="Delete Variant"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ) : (
                  // Unfilled variant button
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#888] rounded-full font-semibold text-white text-base border-0"
                    tabIndex={-1}
                    onClick={() => {
                      setEditingVariantIndex(idx);
                      setShowVariationModal(true);
                    }}
                  >
                    <PlusIcon /> Add Variant
                  </button>
                )}
                <div className="text-center text-xs mt-1 text-gray-900 font-bold">
                  {`Variant ${idx + 1}`}<span className="text-[#F64B4B]">*</span>
                </div>
              </div>
            ))}
          </div>
          {/* Only one clickable "add variant" trigger (with HRs, always at bottom) */}
          <div className="flex items-center mt-2">
            <hr className="flex-1 border-t border-[#D1D5DB]" />
            <button
              type="button"
              className="mx-3 text-[#787878] text-base font-semibold hover:underline transition px-1"
              onClick={handleAddVariant}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                outline: "none",
                lineHeight: 1.2
              }}
            >
              Click here to add more variants
            </button>
            <hr className="flex-1 border-t border-[#D1D5DB]" />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-base mb-3 text-center">{error}</div>
        )}

        {/* Modal Buttons */}
        <div className="flex gap-4 mt-8">
          <button type="button" className={discardBtn} onClick={onClose}>
            Disregard
          </button>
          <button type="button" className={draftBtn} onClick={handleSaveDraft}>
            Save as Draft
          </button>
          <button type="submit" className={submitBtn}>
            Save and Submit
          </button>
        </div>

        {/* Variation Modal */}
        <VariationModal
          isOpen={showVariationModal}
          onClose={() => setShowVariationModal(false)}
          onConfirm={(data) => {
            setVariants(prev =>
              prev.map((item, i) =>
                i === editingVariantIndex ? data : item
              )
            );
            setShowVariationModal(false);
          }}
          variationNumber={editingVariantIndex + 1}
          initialValue={variants[editingVariantIndex]}
        />
      </form>
    </div>
  );
}
