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

// List of categories with their UUIDs
const categories = [
  { name: "Grains", uuid: "your-grains-uuid" },
  { name: "Vegetable", uuid: "your-vegetable-uuid" },
  { name: "Root Crops", uuid: "your-root-crops-uuid" },
  { name: "Milks & Dairy", uuid: "your-milks-dairy-uuid" },
  { name: "Meats", uuid: "your-meats-uuid" },
  { name: "Fruits", uuid: "your-fruits-uuid" },
  { name: "Fish", uuid: "your-fish-uuid" }
];

function VariationModal({ isOpen, onClose, onConfirm, variationNumber, initialValue }) {
  const [name, setName] = useState(initialValue?.name || '');
  const [image, setImage] = useState(initialValue?.image || null);
  const [price, setPrice] = useState(initialValue?.price || '');
  const [unitMeasurement, setUnitMeasurement] = useState(initialValue?.unitMeasurement || '');
  const [stock, setStock] = useState(initialValue?.stock || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(initialValue?.name || '');
    setImage(initialValue?.image || null);
    setPrice(initialValue?.price || '');
    setUnitMeasurement(initialValue?.unitMeasurement || '');
    setStock(initialValue?.stock || '');
    setError('');
  }, [initialValue, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (!unitMeasurement.trim()) {
      setError('Unit Measurement is required.');
      return;
    }
    onConfirm && onConfirm({ name, image, price, unitMeasurement, stock });
    onClose && onClose();
  };

  if (!isOpen) return null;

  const inputBox = "w-full px-6 py-3 rounded-[2rem] border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base bg-white placeholder-[#B7B7B7] font-medium";
  const discardBtn = "flex-1 font-bold rounded-full py-4 text-lg bg-[#F64B4B] text-white hover:bg-[#DD2626] transition";
  const confirmBtn = "flex-1 font-bold rounded-full py-4 text-lg bg-[#159945] text-white hover:bg-green-700 transition";

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white w-full max-w-[520px] mx-auto rounded-[2.2rem] shadow-xl p-9 pt-8" style={{ minWidth: 320, border: '1px solid #ececec' }}>
        <button type="button" onClick={onClose} className="absolute right-7 top-7 text-gray-400 hover:text-gray-700 rounded-full focus:outline-none text-2xl" aria-label="Close">
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
          <label className="font-semibold text-[17px] mb-1 block text-[#222A35]">
            Product Name <span className="text-[#F64B4B]">*</span>
          </label>
          <input className={inputBox} value={name} onChange={e => setName(e.target.value)} placeholder="Enter the Equipment" required />
        </div>
        <div className="mb-4">
          <label className="font-semibold text-[17px] mb-1 block text-[#222A35]">
            Product Picture <span className="text-[#F64B4B]">*</span>
          </label>
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
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="font-semibold text-[17px] mb-1 block text-[#222A35]">Unit Price</label>
          <div className="flex items-center relative">
            <span className="absolute left-6 text-gray-500 text-lg font-bold">₱</span>
            <input className="w-full pl-10 pr-4 py-3 rounded-[2rem] border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base bg-white placeholder-[#B7B7B7] font-medium"
              value={price}
              onChange={e => setPrice(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="Enter Unit Price"
              inputMode="decimal"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="font-semibold text-[17px] mb-1 block text-[#222A35]">
            Unit Measurement <span className="text-[#F64B4B]">*</span>
          </label>
          <input className={inputBox} value={unitMeasurement} onChange={e => { setUnitMeasurement(e.target.value); if (error) setError(''); }} placeholder="e.g. kg, pcs, liter" required />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="mb-8">
          <label className="font-semibold text-[17px] mb-1 block text-[#222A35]">Stock</label>
          <input className={inputBox} value={stock} onChange={e => setStock(e.target.value.replace(/\D/, ""))} placeholder="0" inputMode="numeric" />
        </div>
        <div className="flex gap-4 mt-4">
          <button type="button" className={discardBtn} onClick={onClose}>Disregard</button>
          <button type="button" className={confirmBtn} onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default function AddProductModal({ isOpen, onClose, onSaveProduct }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState(Array(5).fill(null));
  const [description, setDescription] = useState('');
  const [association] = useState('Macamot Farmers Association');
  const [farmerCode, setFarmerCode] = useState('');
  const [variants, setVariants] = useState([{}, {}, {}]);
  const [showVariationModal, setShowVariationModal] = useState(false);
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);
  const [error, setError] = useState('');
  const [backendError, setBackendError] = useState('');

  // Handle image change
  const handleImageChange = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImages(imgs => imgs.map((img, i) => (i === idx ? reader.result : img)));
    };
    reader.readAsDataURL(file);
  };

  // Remove a variant
  const handleDeleteVariant = (idx) => {
    setVariants(prev => prev.map((item, i) => (i === idx ? {} : item)));
  };

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
      if (!variants.some(v => v && v.name)) {
        setError('At least one variant is required.');
        return false;
      }
      if (!farmerCode.trim()) {
        setError('Farmer code is required.');
        return false;
      }
    }
    setError('');
    return true;
  }

  // Handle Save and Submit
  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    setBackendError('');
    if (!validateProduct(false)) return;

    const filledVariants = variants
      .filter(v => v && v.name)
      .map(v => ({
        name: v.name,
        unit_price: v.price,
        stock: v.stock,
        unit_measurement: v.unitMeasurement,
        is_available: true,
        is_default: true,
        status: "active"
      }));

    // Find the selected category object to get its UUID
    const selectedCategory = categories.find(cat => cat.name === category);

    const newProduct = {
      name: productName,
      category: selectedCategory ? selectedCategory.uuid : category, // send UUID
      vendor: farmerCode, // send farmer code
      images: images.filter(Boolean),
      description,
      association,
      variations: filledVariants
    };

    try {
      if (onSaveProduct) await onSaveProduct(newProduct);
      // Reset state and close
      setProductName('');
      setCategory('');
      setImages(Array(5).fill(null));
      setDescription('');
      setFarmerCode('');
      setVariants([{}, {}, {}]);
      setError('');
      onClose && onClose();
    } catch (err) {
      setBackendError(err?.response?.data?.detail || 'Failed to add product.');
    }
  };

  const inputBox = "w-full px-6 py-3 rounded-[2rem] border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base bg-white placeholder-[#B7B7B7] font-medium";
  const labelStyle = "font-semibold text-[17px] mb-1 block text-[#222A35]";
  const discardBtn = "flex-1 font-bold rounded-full py-4 text-lg bg-[#F64B4B] text-white hover:bg-[#DD2626] transition";
  const submitBtn = "flex-1 font-bold rounded-full py-4 text-lg bg-[#159945] text-white hover:bg-green-700 transition";

  return !isOpen ? null : (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        className="relative bg-white w-full max-w-[700px] mx-auto rounded-[2.8rem] shadow-2xl p-10 pt-9"
        style={{ border: '1px solid #f0f0f0', minWidth: 370, transition: 'height 0.25s cubic-bezier(.4,2.3,.3,1)' }}
        onSubmit={handleSaveSubmit}
      >
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
            <div className="relative">
              <select
                className={inputBox}
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              >
                <option value="">Please select a category</option>
                {categories.map(cat => (
                  <option key={cat.uuid} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Association & Farmer Code */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className={labelStyle}>Association </label>
            <input
              className={inputBox}
              value={association}
              disabled
              style={{ color: "#999", backgroundColor: "#f4f4f4" }}
              placeholder="Macamot Farmers Association"
              readOnly
            />
          </div>
          <div>
            <label className={labelStyle}>
              Farmer Code <span className="text-[#F64B4B]">*</span>
            </label>
            <input
              className={inputBox}
              value={farmerCode}
              onChange={e => setFarmerCode(e.target.value)}
              placeholder="Enter Farmer Code"
              required
            />
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
                  {`Variant ${idx + 1}`}
                  {idx === 0 && <span className="text-[#F64B4B]">*</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Error message */}
        {error && (
          <div className="text-red-500 text-base mb-3 text-center">{error}</div>
        )}
        {backendError && (
          <div className="text-red-500 text-base mb-3 text-center">{backendError}</div>
        )}
        {/* Modal Buttons */}
        <div className="flex gap-4 mt-8">
          <button type="button" className={discardBtn} onClick={onClose}>
            Disregard
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