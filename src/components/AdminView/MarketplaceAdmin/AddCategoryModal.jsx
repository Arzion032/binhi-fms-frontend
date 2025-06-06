import React, { useState, useRef } from 'react';

export default function AddCategoryModal({ isOpen, mode = 'add', onClose, onSwitchMode }) {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [iconFile, setIconFile] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [showDisregardModal, setShowDisregardModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fileInputRef = useRef(null);

  // Manage categories state
  const [categories, setCategories] = useState([
    { name: 'Vegetable', products: 28, icon: '/Screenshot_195.png', bg: '#E9F7EC' },
    { name: 'Root Crops', products: 28, icon: '/Screenshot_195.png', bg: '#FDF3E7' },
    { name: 'Milks & Dairy', products: 28, icon: '/Screenshot_195.png', bg: '#E7EFFA' },
    { name: 'Meats', products: 28, icon: '/Screenshot_195.png', bg: '#FDE7EB' },
    { name: 'Fruits', products: 28, icon: '/Screenshot_195.png', bg: '#F2E7FA' },
    { name: 'Grains', products: 28, icon: '/Screenshot_195.png', bg: '#F9F5E3' },
  ]);
  const [editIndex, setEditIndex] = useState(null);
  const [editIcon, setEditIcon] = useState(null);
  const [editIconUrl, setEditIconUrl] = useState('');
  const [editName, setEditName] = useState('');
  const editFileInputRef = useRef(null);

  const AVATAR_SIZE = 56;

  // Tooltip state for info icon
  const [infoHoverIndex, setInfoHoverIndex] = useState(null);

  if (!isOpen) return null;

  const handleEditClick = (idx) => {
    setEditIndex(idx);
    setEditName(categories[idx].name);
    setEditIcon(null);
    setEditIconUrl(categories[idx].icon);
  };

  const handleEditIconChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setEditIcon(file);
      setEditIconUrl(URL.createObjectURL(file));
    }
  };

  const handleEditSave = () => {
    if (!editName.trim()) return;
    const newCategories = [...categories];
    newCategories[editIndex] = {
      ...newCategories[editIndex],
      name: editName,
      icon: editIconUrl,
    };
    setCategories(newCategories);
    setEditIndex(null);
    setEditIcon(null);
    setEditIconUrl('');
    setEditName('');
  };

  // --- Manage Categories Modal Layout ---
  if (mode === 'manage') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div
          className="bg-white rounded-[2.5rem] w-full max-w-xl mx-4 p-8 shadow-lg relative flex flex-col"
          style={{ minHeight: 800, maxHeight: 850 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
          {/* Header */}
          <h2 className="text-[2rem] font-bold mb-1">Manage Categories</h2>
          <p className="text-gray-700 mb-4">You can manage your categories here.</p>
          <hr className="border-t border-gray-200 mb-2" />

          {/* Search + Add Category Button */}
          <div className="flex items-center gap-3 mb-5 mt-4">
            <div className="flex items-center bg-white border border-gray-400 rounded-2xl px-4 py-2 flex-1">
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search Category"
                className="flex-1 bg-transparent outline-none text-base"
                style={{ color: '#111' }}
              />
            </div>
            <button
              className="px-6 py-2 rounded-2xl font-semibold"
              style={{
                backgroundColor: '#43B864',
                color: '#fff',
                fontSize: '1.07rem',
                fontWeight: 600,
              }}
              onClick={() => onSwitchMode && onSwitchMode('add')}
            >
              + Add Category
            </button>
          </div>
          {/* Category List (inline edit for active) */}
          <div
            className="flex flex-col gap-4 mb-7"
            style={{
              maxHeight: '410px',
              overflowY: 'auto',
              marginBottom: 0,
            }}
          >
            {categories.map((cat, idx) => (
              <div
                key={cat.name}
                className="flex items-center bg-white border border-gray-400 rounded-2xl px-5 py-4 shadow-sm relative group"
                style={{ transition: "box-shadow 0.2s" }}
              >
                {/* Inline edit mode */}
                {editIndex === idx ? (
                  <>
                    {/* Category Icon with gray overlay and pencil center */}
                    <div
                      className="flex items-center justify-center rounded-full mr-5 overflow-hidden relative cursor-pointer group"
                      style={{
                        background: cat.bg,
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                      }}
                      onClick={() => editFileInputRef.current.click()}
                    >
                      <img
                        src={editIconUrl}
                        alt="Category"
                        className="w-full h-full object-cover"
                        style={{
                          filter: 'grayscale(1) brightness(1)',
                          opacity: 0.6,
                        }}
                      />
                      {/* Gray overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'rgba(245,245,245,0.7)',
                        }}
                      />
                      {/* Centered Pencil Icon */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          pointerEvents: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="30" height="30" fill="none" stroke="#818181" strokeWidth={2.2} viewBox="0 0 24 24">
                          <path d="M15.232 5.232l3.536 3.536M9 13l6.192-6.192a2 2 0 1 1 2.828 2.828L11.828 15.828A4 4 0 0 1 9 17H5v-4a4 4 0 0 1 1.172-2.828l8.06-8.06z"/>
                        </svg>
                      </span>
                      <input
                        ref={editFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleEditIconChange}
                      />
                    </div>
                    {/* Name, editable */}
                    <div className="flex-1">
                      <input
                        className="font-bold text-lg outline-none bg-transparent border-b border-gray-300 w-full"
                        style={{ color: "#212121" }}
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        maxLength={32}
                      />
                      <div className="text-sm text-gray-600 flex items-center">
                        {cat.products} Products
                        {/* Info icon & tooltip not shown in edit mode */}
                      </div>
                    </div>
                    {/* Check icon for confirm (right) */}
                    <button
                      className="ml-2 rounded-full p-2 flex items-center justify-center"
                      style={{ width: 36, height: 36 }}
                      onClick={handleEditSave}
                      disabled={!editName.trim()}
                      title="Save"
                    >
                      {/* SVG from https://www.svgrepo.com/svg/460726/check-mark-circle with fill #43B864 */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#43B864">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.001 15L6.5 12.5l1.415-1.414 3.084 3.083 5.086-5.086L17.5 10.5l-6.501 6.5z" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Category Icon */}
                    <div
                      className="flex items-center justify-center rounded-full mr-5 overflow-hidden"
                      style={{
                        background: cat.bg,
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                      }}
                    >
                      <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover" />
                    </div>
                    {/* Category Info */}
                    <div className="flex-1 flex flex-col">
                      <div className="font-bold text-lg flex items-center" style={{ color: "#212121" }}>
                        {cat.name}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center relative">
                        {cat.products} Products
                        {/* Info icon, only on card hover */}
                        <span
                          className="ml-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          onMouseEnter={() => setInfoHoverIndex(idx)}
                          onMouseLeave={() => setInfoHoverIndex(null)}
                          style={{ position: 'relative' }}
                        >
                          {/* Info SVG from https://www.svgrepo.com/svg/59321/information-icon */}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#1e88e5" strokeWidth="2" fill="#e3f0fc"/>
                            <rect x="11" y="10" width="2" height="6" rx="1" fill="#1e88e5"/>
                            <rect x="11" y="7" width="2" height="2" rx="1" fill="#1e88e5"/>
                          </svg>
                          {/* Tooltip */}
                          {infoHoverIndex === idx && (
                            <span
                              style={{
                                position: 'absolute',
                                top: '120%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: '#222',
                                color: '#fff',
                                padding: '5px 14px',
                                borderRadius: 8,
                                fontSize: 13,
                                whiteSpace: 'nowrap',
                                zIndex: 100,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                              }}
                            >
                              Number of products under this category
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    {/* Right-side hover icons */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Edit */}
                      <button
                        className="p-2 rounded-full transition"
                        title="Edit Category"
                        onClick={() => handleEditClick(idx)}
                      >
                        <svg width="22" height="22" fill="none" stroke="#2563eb" strokeWidth={2.3} viewBox="0 0 24 24">
                          <path d="M15.232 5.232l3.536 3.536M9 13l6.192-6.192a2 2 0 1 1 2.828 2.828L11.828 15.828A4 4 0 0 1 9 17H5v-4a4 4 0 0 1 1.172-2.828l8.06-8.06z"/>
                        </svg>
                      </button>
                      {/* Delete */}
                      <button
                        className="p-2 rounded-full transition"
                        title="Delete Category"
                      >
                        <svg width="22" height="22" fill="none" stroke="#ef4444" strokeWidth={2.3} viewBox="0 0 24 24">
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-between gap-4 mt-auto pt-4">
            <button
              style={{
                backgroundColor: '#FF3B3F',
                color: '#FFFFFF',
                borderRadius: '2rem',
                fontSize: '1.2rem',
                fontWeight: 600,
                width: '47%',
              }}
              className="py-4 transition"
              onClick={() => setShowDisregardModal(true)}
            >
              Disregard
            </button>
            <button
              style={{
                backgroundColor: '#43B864',
                color: '#FFFFFF',
                borderRadius: '2rem',
                fontSize: '1.2rem',
                fontWeight: 600,
                width: '47%',
              }}
              className="py-4 transition"
              onClick={onClose}
            >
              Confirm
            </button>
          </div>

          {/* Disregard Modal */}
          {showDisregardModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white rounded-2xl shadow-xl relative p-8 w-full max-w-md text-center">
                <button
                  onClick={() => setShowDisregardModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                  aria-label="Close"
                >
                  &times;
                </button>
                <div className="flex justify-center mb-6">
                  <div className="bg-[#FF4B4B] rounded-full p-6 mb-6 flex items-center justify-center shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#FFFFFF">
                      <circle cx="12" cy="12" r="12" fill="#FF4B4B" />
                      <path d="M12 6a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-3 0v-7A1.5 1.5 0 0 1 12 6z" />
                      <circle cx="12" cy="18" r="1.5" fill="#FFFFFF" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Disregard editing?</h2>
                <p className="text-gray-700 mb-7">
                  This action cannot be undone.<br />
                  The changes will be lost.
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => setShowDisregardModal(false)}
                    className="bg-[#FF3B3F] text-white font-semibold rounded-full px-8 py-3 text-base hover:bg-[#ff5c5c] transition"
                    style={{ minWidth: 120 }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowDisregardModal(false);
                      onClose && onClose();
                    }}
                    className="border-2 border-[#FF3B3F] font-semibold rounded-full px-8 py-3 text-base bg-white transition"
                    style={{
                      minWidth: 120,
                      color: '#FF3B3F',
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
      </div>
    );
  }

  // --- Main Add Category Modal Layout (untouched) ---
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      {/* Main Add Category Modal */}
      <div
        className="bg-white rounded-[2.5rem] w-full max-w-xl mx-4 p-8 shadow-lg relative flex flex-col"
        style={{ minHeight: 660 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-[2rem] font-bold mb-1">Add Category</h2>
          <p className="text-gray-700 mb-4">Please add category.</p>
          <hr className="border-t border-gray-200 mb-2" />
        </div>

        {/* Avatar Circle + Overlapping Edit Icon at bottom right */}
        <div className="flex items-center mb-7 mt-1">
          <div
            className="flex-shrink-0 flex flex-col items-center"
            style={{ position: 'relative', width: 96, height: 96 }}
          >
            {/* Avatar Circle */}
            <div
              className="bg-[#dbdbdb] rounded-full flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
              style={{
                width: 96,
                height: 96,
                position: "relative",
                zIndex: 1,
              }}
              onClick={() => fileInputRef.current.click()}
              title="Upload Icon"
            >
              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt="Category Icon"
                  className="object-cover w-full h-full"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-[#888888] mb-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#888888"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.474 5.408l2.118 2.118a1.5 1.5 0 0 1 0 2.121l-9.193 9.193a2 2 0 0 1-.707.464l-3.363 1.121a.5.5 0 0 1-.632-.632l1.121-3.363a2 2 0 0 1 .464-.707l9.193-9.193a1.5 1.5 0 0 1 2.121 0z"
                    />
                  </svg>
                  <span className="text-[#888888] text-base">Add Icon</span>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const file = e.target.files[0];
                  if (file && file.type.startsWith('image/')) {
                    setIconFile(file);
                    setIconUrl(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
            {/* Overlapping Pen Icon (bottom right, inside the circle) */}
            <span
              className="absolute"
              style={{
                bottom: '7px',
                right: '2px',
                background: '#fff',
                borderRadius: '50%',
                border: '2px solid #e5e5e5',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                width: `32px`,
                height: `32px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
              }}
              onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[18px] h-[18px] text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 13l6.192-6.192a2 2 0 1 1 2.828 2.828L11.828 15.828A4 4 0 0 1 9 17H5v-4a4 4 0 0 1 1.172-2.828l8.06-8.06z"
                />
              </svg>
            </span>
          </div>
          {/* Name/Description */}
          <div className="ml-6 flex flex-col">
            <span className="text-2xl font-bold text-gray-900 mb-1">
              {categoryName ? categoryName : "Category Name"}
            </span>
            <span className="text-base text-gray-500">
              {description ? description : "Description"}
            </span>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="mb-2">
          <label className="block font-semibold mb-1">
            Category Name <span style={{ color: '#FF3B3F' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 rounded-2xl outline-none mb-5 focus:ring-2 focus:ring-green-500"
            style={{ fontSize: "1.08rem" }}
          />

          <label className="block font-semibold mb-1">Description</label>
          <textarea
            placeholder="Description"
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 resize-none"
            style={{ fontSize: "1.08rem" }}
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-4 mt-auto pt-8">
          <button
            onClick={() => setShowDisregardModal(true)}
            style={{
              backgroundColor: '#FF3B3F',
              color: '#FFFFFF',
              borderRadius: '2rem',
              fontSize: '1.2rem',
              fontWeight: 600,
              width: '47%',
            }}
            className="py-4 transition"
          >
            Disregard
          </button>
          <button
            onClick={() => {
              if (categoryName.trim() && description.trim()) {
                setShowSuccessModal(true);
              }
            }}
            disabled={!(categoryName.trim() && description.trim())}
            style={{
              backgroundColor: categoryName.trim() && description.trim() ? '#43B864' : '#C8E6CB',
              color: '#FFFFFF',
              borderRadius: '2rem',
              fontSize: '1.2rem',
              fontWeight: 600,
              width: '47%',
              cursor: categoryName.trim() && description.trim() ? "pointer" : "not-allowed",
            }}
            className="py-4 transition"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Disregard Confirmation Modal */}
      {showDisregardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-xl relative p-8 w-full max-w-md text-center">
            {/* Close Button */}
            <button
              onClick={() => setShowDisregardModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Close"
            >
              &times;
            </button>
            {/* ! Warning Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#FF4B4B] rounded-full p-6 mb-6 flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#FFFFFF">
                  <circle cx="12" cy="12" r="12" fill="#FF4B4B" />
                  <path d="M12 6a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-3 0v-7A1.5 1.5 0 0 1 12 6z" />
                  <circle cx="12" cy="18" r="1.5" fill="#FFFFFF" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Disregard editing?</h2>
            <p className="text-gray-700 mb-7">
              This action cannot be undone.<br />
              The changes will be lost.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowDisregardModal(false)}
                className="bg-[#FF3B3F] text-white font-semibold rounded-full px-8 py-3 text-base hover:bg-[#ff5c5c] transition"
                style={{ minWidth: 120 }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDisregardModal(false);
                  onClose && onClose();
                }}
                className="border-2 border-[#FF3B3F] font-semibold rounded-full px-8 py-3 text-base bg-white transition"
                style={{
                  minWidth: 120,
                  color: '#FF3B3F',
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-xl relative p-8 w-full max-w-md text-center">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <div className="bg-[#43B864] rounded-full p-6 mb-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Category added successfully!</h2>
              <p className="text-gray-700 mb-8">Everything’s set. Feel free to check it!</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="border-2 border-[#43B864] font-semibold rounded-full px-8 py-3 text-base bg-white text-[#43B864] transition"
                  style={{ minWidth: 120 }}
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    onSwitchMode && onSwitchMode('manage');
                  }}
                  className="bg-[#43B864] text-white font-semibold rounded-full px-8 py-3 text-base hover:bg-[#369C52] transition"
                  style={{ minWidth: 180 }}
                >
                  Manage Categories
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
