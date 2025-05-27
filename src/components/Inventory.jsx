import React, { useState, useRef, useEffect } from 'react';
import { Search, PlusCircle, SlidersHorizontal, X } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import loop from '../assets/loop.png';
import edtIcon from '../assets/Trash.png';
import Pencil from '../assets/Pencil.png';
import Disregard from '../assets/Disregard.png';
import Success from '../assets/Success.png';
import Rent from '../assets/Rent.png';
import Return from '../assets/Return.png';
import Details from '../assets/Details.png';


export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState('equipment');
  const [searchCurrent, setSearchCurrent] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);
  const containerRef = useRef();

  const tabs = ['equipment', 'rentHistory'];

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const currentTab = tabsRef.current[activeIndex];
    if (currentTab && containerRef.current) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const tabRect = currentTab.getBoundingClientRect();
      const offsetLeft = tabRect.left - containerLeft;
  
      const extraLength = 50; 
  
      setIndicatorStyle({
        left: offsetLeft - extraLength / 2,
        width: tabRect.width + extraLength,
      });
    }
  }, [activeTab]);

  const [showRepairButton, setShowRepairButton] = useState(false);
  const [repaired, setRepaired] = useState(false);


  const clearFilters = () => {
    setSelectedRole('');
  };

  {/* Modals */}
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRentOpen, setIsRentOpen] = useState(false);
  const [showConfirmDiscard, setShowConfirmDiscard] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showAddedModal, setShowAddedModal] = useState(false); 
  const [isSuccessRentOpen, setIsSuccessRentOpen] = useState(false);
  const [isReturnEquipmentOpen, setIsReturnEquipmentOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showFixModal, setShowFixModal] = useState(false);
  const [showDisregardModal, setShowDisregardModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteModalOpe, setIsDeleteModalOpe] = useState(false);
  const [isSuccessRentOpe, setIsSuccessRentOpe] = useState(false);


  const handleConfirm = (e) => {
    e.preventDefault();
    setShowAddedModal(true);
    setIsRentOpen(false);
    setIsSuccessRentOpen(true);
  };

  const handleCloseAll = () => {
    setShowDiscardModal(false);
    setShowAddedModal(false);
    setIsModalOpen(false);
  };

  const rows = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    equipment: 'Utility Tractor',
    quantity: 2,
    statusNow: index < 3 ? 'Rented' : 'Returned',
    rentRate: '₱1,500',
    dateRented: 'March 21, 2025',
    rentedAgo: '4 days ago',
    dueDate: 'March 21, 2025',
    dueIn: index === 2 ? '5 days left' : index < 3 ? '4 days left' : '6 days ago',
    renter: 'Kaye Arroyo'
  }));

  return (
    <div className="p-0">
  {/* Header Section */}
  <div className="w-full bg-binhi-100 shadow-sm">
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex-1">
        <div className="text-sm breadcrumbs font-inter text-base">
          <ul>
            <li><a className="text-binhigreen underline">Dashboard</a></li>
            <li><a className="text-binhigreen underline">Inventory Management</a></li>
            <li className="text-gray-400">
              {activeTab === 'equipment' ? 'Equipment' : 'Rent History'}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="px-6 pb-4 h-5 flex items-center">
      <h1 className="text-[40px] font-bold text-gray-800">Inventory Management</h1>
    </div>
  </div>

  {/* Tabs and Content Section */}
  <div className="p-6 bg-gray-50 min-h-screen text-sm font-sans">
    <div
      className="relative flex gap-20 border-b pb-2 mb-4"
      ref={containerRef}
    >
      {/* Sliding Indicator */}
      <span
        className="absolute bottom-0 h-1 bg-[#4CAE4F] transition-all duration-300 rounded-full"
        style={{ ...indicatorStyle }}
      />

      {tabs.map((tab, index) => (
        <button
          key={tab}
          ref={el => (tabsRef.current[index] = el)}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 transition-colors duration-200 ${
            activeTab === tab
              ? 'text-green-600 font-semibold'
              : 'text-gray-500 font-semibold'
          } ${index === 0 ? 'ml-7' : ''}`}
        >
          {tab === 'equipment' ? 'Equipment' : 'Rent History'}
        </button>
      ))}
    </div>

        {activeTab === "equipment" && (
          <>
              <div className="flex flex-col gap-4 w-full">
              {/* Header and Tools in One Row */}
              <div className="flex justify-between items-center w-full flex-wrap gap-4">
                {/* Left side: All Equipments */}
                <div className="flex items-center">
                  <img
                    src={loop}
                    alt="loop"
                    className="ml-5 mr-5 w-[20px] max-w-full object-contain"
                  />
                  <span className="text-[15.5px] text-lg font-semibold mr-2">All Equipments</span>
                  <span className="text-gray-400 font-normal">24</span>
                </div>

                {/* Right side: Search + Filter */}
                <div className="flex items-center gap-4 flex-wrap justify-end">
                {/* Search Bar */}
                <div className="relative w-[280px] h-[35px] flex items-center border rounded-full px-3 py-1 bg-white">
                  <Search className="text-gray-500 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    placeholder="Search Member"
                    className="flex-1 outline-none bg-white"
                    value={searchCurrent}
                    onChange={(e) => setSearchCurrent(e.target.value)}
                  />
                  <button onClick={() => setShowFilters(!showFilters)}>
                    <SlidersHorizontal className="text-gray-600 w-5 h-5" />
                  </button>
                </div>

                {/* Filters */}
                {showFilters && (
                  <div className="flex items-center space-x-1 p-2 rounded-lg w-fit">
                    <div className="flex items-center space-x-1 border rounded-l-3xl px-3 py-1 cursor-pointer bg-white border border-[#858585] h-[35px]">
                      <SlidersHorizontal className="text-blue w-4 h-4" />
                      <span className="mr-2 p-2 text-sm text-blue font-medium">Active Filters</span>
                    </div>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="border border-[#858585] h-[35px] w-[60px] text-center text-sm bg-white text-[#858585]"
                    >
                      <option value="">Role</option>
                      <option value="admin"></option>
                      <option value="member"></option>
                    </select>
                    <button
                      onClick={clearFilters}
                      className="flex items-center space-x-1 border rounded-r-3xl px-3 py-1 text-sm border border-[#858585] h-[35px] bg-white text-[#858585]"
                    >
                      <X className="w-4 h-4 text-[#858585]" />
                      <span>Clear</span>
                    </button>
                  </div>
                )}

                {/* Add Equipment Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2"
                >
                  <FaPlus className="w-5 h-5" />
                  <span className="font-semibold text-[16px]">Add Equipment</span>
                </button>
              </div>

              {/*Add Equipment Modal */}
              {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black  bg-opacity-40 z-50">
                      <div className="bg-white rounded-2xl w-[400px] p-6 border border-black relative shadow-xl">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h2 className="text-lg font-bold text-gray-800">Add Equipment</h2>
                            <p className="text-sm text-gray-500">Please enter the new equipment.</p>
                          </div>
                          
                          <button onClick={() => setIsModalOpen(false)}>
                            <X className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                        <div className="border-b border-gray-300 my-4"></div>
                        <form className="space-y-4 mt-4" onSubmit={handleConfirm}>
                          <div>
                            <label className="block text-sm font-semibold">
                              Equipment <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter the Equipment"
                              className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold">
                              Quantity <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              placeholder="Enter the Quantity"
                              className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold">Rental Price</label>
                            <div className="flex items-center border border-gray-300 rounded-full px-3">
                              <span className="text-gray-500 text-sm">₱</span>
                              <input
                                type="number"
                                placeholder="Enter the Rental Price"
                                className="w-full px-2 py-2 bg-transparent focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold">Remarks/Notes</label>
                            <textarea
                              placeholder="Remarks or Notes"
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                              rows="3"
                            />
                          </div>

                          <div className="flex justify-center gap-3 mt-6">
                            <button
                              type="button"
                              onClick={() => setShowDiscardModal(true)}
                              className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                              style={{ width: "160px", height: "39px" }}
                            >
                              Disregard
                            </button>
                            <button
                              type="submit"
                            
                              className="px-14 py-2 bg-[#4CAE4F] text-white border border-[#4CAE4F] rounded-full hover:bg-[dark green] hover:text-white"
                            >
                              Confirm
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

      {/* DISREGARD CONFIRMATION MODAL */}
      {showDiscardModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl w-[450px] h-[330px] p-10 shadow-lg relative border border-black">
            <div className="flex justify-end">
              <button onClick={() => setShowDiscardModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col items-center">
            <div className="mb-4 flex justify-center items-center">
                    <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
                  </div>
                  <h2 className="text-2xl text-center font-bold mb-2">Disregard added equipment?</h2>
                  <p className="text-sm text-center text-gray-600">
                This action cannot be undone. <br />
                The equipment details will be lost.
              </p>
              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={() => setShowDiscardModal(false)}
                  
                className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                style={{ width: "130px", height: "39px" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCloseAll}
                  className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
                >
                  Disregard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ SUCCESS MODAL */}
      {showAddedModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 w-[500px] h-[300px] rounded-3xl shadow-md w-96 text-center relative border border-black">
            <div className="flex justify-end">
              <button onClick={handleCloseAll}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col items-center">
            <div className="mb-4 flex justify-center items-center">
              <img
                src={Success}
                alt="Success.png"
                className="w-[80px] max-w-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">Equipment added successfully!</h2>
            <p className="text-sm text-gray-600 mb-6">
                Everything’s set. Feel free to check your equipment!
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowAddedModal(false)}
                  className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
                >
                  Back
                </button>
                <button
                  onClick={handleCloseAll}
                  className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                style={{ width: "130px", height: "39px" }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

   {/* Top Section */}
   <div className="flex flex-wrap justify-center gap-4">
          {/* CARD 1 */}
          <div className="relative group bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[80px] w-[506px] shadow-sm cursor-pointer">
  {/* Side Accent */}
  <div className="absolute left-0 top-0 h-full w-3 rounded-tl-3xl rounded-bl-3xl bg-[#4caf50]" />

  {/* Button Area */}
  <div className="absolute top-2 right-2 z-20">
    {/* Plus Button (default) */}
    <div className="group-hover:hidden">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowRepairButton(true);
        }}
        className="flex items-center justify-center w-[32px] h-[32px] text-[#4caf50] rounded-full hover:bg-[#4caf50] hover:text-white transition-all"
      >
        <PlusCircle className="w-[20px] h-[20px]" />
      </button>
    </div>

    {/* Add Button (expand on hover) */}
    <div className="hidden group-hover:inline-flex overflow-hidden transition-all duration-300 ease-in-out">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setRepaired(true);
          setIsModalOpen(true);
        }}
        className={`flex items-center gap-1 pl-3 pr-4 py-[2px] h-[28px] rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
          repaired
            ? "bg-[#4caf50] text-white"
            : "text-[#4caf50] border border-[#4caf50] bg-white hover:bg-[#4caf50] hover:text-white"
        }`}
        style={{ width: 'auto', maxWidth: '150px' }}
      >
        <PlusCircle className="w-[16px] h-[16px] shrink-0" />
        <span className="ml-1">Add Equipment</span>
      </button>
    </div>
  </div>

  {/* Card Content */}
  <div className="flex flex-col justify-center px-6 h-full">
    <span className="text-sm text-gray-500">Available</span>
    <span className="text-3xl font-bold text-black leading-tight">15</span>
  </div>
</div>

          {/* CARD 2 */}
          <div className="relative group bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[80px] w-[506px] shadow-sm cursor-pointer">
  {/* Side Accent */}
  <div className="absolute left-0 top-0 h-full w-3 rounded-tl-2xl rounded-bl-2xl bg-[#FF3B4E]" />

  {/* Button Area */}
  <div className="absolute top-2 right-2 z-20">
    {/* Plus Button (default) */}
    <div className="group-hover:hidden">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsRentOpen(true);
        }}
        className="flex items-center justify-center w-[32px] h-[32px] text-[#FF3B4E] rounded-full hover:bg-[#FF3B4E] hover:text-white transition-all"
      >
        <PlusCircle className="w-[20px] h-[20px]" />
      </button>
    </div>

    {/* Add Button (expand on hover) */}
    <div className="hidden group-hover:inline-flex overflow-hidden transition-all duration-300 ease-in-out">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setRepaired(true);
          setIsRentOpen(true);
        }}
        className={`flex items-center gap-1 pl-3 pr-4 py-[2px] h-[28px] rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
          repaired
            ? "bg-[#FF3B4E] text-white"
            : "text-[#FF3B4E] border border-[#FF3B4E] bg-white hover:bg-[#FF3B4E] hover:text-white"
        }`}
        style={{ width: 'auto', maxWidth: '150px' }}
      >
        <PlusCircle className="w-[16px] h-[16px] shrink-0" />
        <span className="ml-1">Add Rented</span>
      </button>
    </div>
  </div>

  {/* Card Content */}
  <div className="flex flex-col justify-center px-6 h-full">
    <span className="text-sm text-gray-500">Rented</span>
    <span className="text-3xl font-bold text-black leading-tight">15</span>
  </div>
</div>

          {/* CARD 3 */}
          <div className="relative group bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[80px] w-[506px] shadow-sm cursor-pointer">
  {/* Side Accent */}
  <div className="absolute left-0 top-0 h-full w-3 rounded-tl-2xl rounded-bl-2xl bg-[#D1A157]" />

  {/* Button Area */}
  <div className="absolute top-2 right-2 z-20">
    {/* Plus Button (default) */}
    <div className="group-hover:hidden">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowRepairButton(true);
        }}
        className="flex items-center justify-center w-[32px] h-[32px] text-[#D1A157] rounded-full hover:bg-[#D1A157] hover:text-white transition-all"
      >
        <PlusCircle className="w-[20px] h-[20px]" />
      </button>
    </div>

    {/* Add Repair Button (expand on hover) */}
    <div className="hidden group-hover:inline-flex overflow-hidden transition-all duration-300 ease-in-out">
            <button
          onClick={(e) => {
            e.stopPropagation();
            setRepaired(true);
            setShowFixModal(true);
          }}
          className={`flex items-center gap-1 pl-3 pr-4 py-[2px] h-[28px] rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
            repaired
              ? "bg-[#D1A157] text-white"
              : "bg-white text-[#D1A157] border border-[#D1A157] hover:bg-[#D1A157] hover:text-white"
          }`}
          style={{ width: 'auto', maxWidth: '150px' }}
        >
          <PlusCircle className="w-[16px] h-[16px] shrink-0" />
          <span className="ml-1">Add Repair</span>
        </button>

    </div>
  </div>

  {/* Card Content */}
  <div className="flex flex-col justify-center px-6 h-full">
    <span className="text-sm text-gray-500">Repair Needed</span>
    <span className="text-3xl font-bold text-black leading-tight">15</span>
  </div>
</div>
</div>

{showFixModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
    <div className="bg-white rounded-3xl border border-black w-[400px] p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold">Fix Equipment</h2>
          <p className="text-sm text-gray-500">Please provide the information.</p>
        </div>
        <button
          onClick={() => setShowFixModal(false)}
          className="text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
      </div>

      <div className="border-b border-gray-300 my-4"></div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Equipment</label>
          <input
            type="text"
            value="Utility Tractor"
            className="w-full rounded-full border px-4 py-2 text-sm mt-1"
            readOnly
          />
        </div>
        <div>
          <label className="text-sm font-medium">
            Reported by <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Renter Name"
            className="w-full rounded-full border px-4 py-2 text-sm mt-1"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-sm font-medium">
              Repair Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full rounded-full border px-4 py-2 text-sm mt-1"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium">
              Estimated Completion <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full rounded-full border px-4 py-2 text-sm mt-1"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Remarks/Notes</label>
          <textarea
            className="w-full rounded-xl border px-4 py-2 text-sm mt-1"
            rows={4}
            placeholder="Remarks or Notes"
          />
        </div>
      </div>

      {/* Footer Buttons */}
                <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => {
                setShowFixModal(false);
                setShowDisregardModal(true);
              }}
              className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                style={{ width: "170px", height: "39px" }}
            >
              Disregard
            </button>
            <button
              onClick={() => {
                setShowFixModal(false);
                setShowSuccessModal(true); // success modal only from Confirm
              }}
              className="px-10 py-2 bg-[#4CAE4F] text-white rounded-full hover:bg-green-600"
              style={{ width: "170px", height: "39px" }}
            >
              Confirm
            </button>
      </div>
    </div>
  </div>
)}

          {showDisregardModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex  items-center justify-center">
              <div className="bg-white rounded-3xl w-[400px] p-6 shadow-lg border border-black text-center">
              <div className="flex justify-end">
                        <button onClick={handleCloseAll}>
                          <X className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
              <div className="mb-4 flex justify-center items-center">
                  <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
              </div>
                  <h2 className="text-2xl text-center font-bold mb-2">Disregard editing?</h2>
                  <p className="text-sm text-center text-gray-600">This action cannot be undone.<br />The changes will be lost.</p>

                <div className="flex justify-center gap-3 mt-6 ">
                  <button
                    onClick={() => setShowDisregardModal(false)}
                    className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                          style={{ width: "130px", height: "39px" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowDisregardModal(false); // no success modal here
                    }}
                    className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                          style={{ width: "130px", height: "39px" }}
                  >
                    Disregard
                  </button>
                </div>
              </div>
            </div>
          )}

          {showSuccessModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white rounded-3xl w-[430px] h-[320px] p-6 shadow-lg border border-black text-center">
              <div className="flex justify-end">
                        <button onClick={handleCloseAll}>
                          <X className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
              <div className="mb-4 flex justify-center items-center">
                        <img
                          src={Success}
                          alt="Success.png"
                          className="w-[80px] max-w-full object-contain"
                        />
                      </div>
                <h2 className="text-3xl font-bold mb-2">Equipment now available!</h2>
                <p className="text-sm text-gray-600 mb-6">Everything’s set. Feel free to check your equipment!</p>

                <div className="flex justify-center gap-4 mt-11">
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                          style={{ width: "130px", height: "39px" }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                          style={{ width: "130px", height: "39px" }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}


  

              {/* Table */}
              <div className="w-full overflow-x-auto rounded-xl">
  <table className="table w-full table-fixed">
    <thead>
      <tr className="bg-[#F4F4F4] text-center text-sm text-black">
        <th className="w-[5%]">
          <input type="checkbox" className="checkbox checkbox-sm rounded" />
        </th>
        <th className="w-[15%]">Equipment</th>
        <th className="w-[12%]">Quantity</th>
        <th className="w-[12%]">Available</th>
        <th className="w-[12%]">Rented</th>
        <th className="w-[14%]">Repair Needed</th>
        <th className="w-[30%]">Actions</th>
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: 7 }).map((_, index) => (
        <tr key={index} className="bg-gray-100 text-center">
          <td>
            <input type="checkbox" className="checkbox checkbox-sm rounded" />
          </td>
          <td>Utility Tractor</td>
          <td>6</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>
            <div className="flex justify-center items-center gap-2">
              {/* Rent */}
              <div className="group flex items-center transition-all duration-200 ease-in-out">
                <div className="flex items-center w-[20px] group-hover:w-[80px] transition-all duration-200 overflow-hidden">
                  <img
                    src={Rent}
                    alt="Rent"
                    className="w-4 h-4 mr-1"
                    onClick={() => setIsRentOpen(true)}
                  />
                  <span
                    className="opacity-0 group-hover:opacity-100 text-green-600 text-sm font-medium transition-opacity duration-200 whitespace-nowrap"
                    onClick={() => setIsRentOpen(true)}
                  >
                    Rent?
                  </span>
                </div>
              </div>

              {/* Edit */}
              <div className="group flex items-center transition-all duration-200 ease-in-out">
                <div className="flex items-center w-[20px] group-hover:w-[80px] transition-all duration-200 overflow-hidden">
                  <img
                    src={Pencil}
                    alt="Edit"
                    className="w-4 h-4 mr-1"
                    onClick={() => setIsEditOpen(true)}
                  />
                  <span
                    className="opacity-0 group-hover:opacity-100 text-blue text-sm font-medium transition-opacity duration-200 whitespace-nowrap"
                    onClick={() => setIsEditOpen(true)}
                  >
                    Edit?
                  </span>
                </div>
              </div>

              {/* Delete */}
              <span
                className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
                onClick={() => setIsDeleteModalOpe(true)}
              >
                <img src={edtIcon} alt="Trash" className="w-4 h-4" />
              </span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>


    {isDeleteModalOpe && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-6 w-[400px] border border-black shadow-lg relative text-center">
              <button
                onClick={() => setIsDeleteModalOpe(false)}
                className="absolute top-2 right-3 text-gray-400 hover:text-black"
              >
                &times;
              </button>
            
              <div className="mb-4 flex justify-center items-center">
                    <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
                  </div>
                <h2 className="text-2xl text-center font-bold mb-2">Confirm Deletion?</h2>
                <p className="text-sm text-center text-gray-600">
                  The selected equipment will be permanently removed from your records.
                </p>
                
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    onClick={() => setIsDeleteModalOpe(false)}
                    className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                    style={{ width: "130px", height: "39px" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Add deletion logic here
                      setIsDeleteModalOpe(false);
                    }}
                    className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                    style={{ width: "130px", height: "39px" }}
                  >
                    Delete
                  </button>
                </div>
              
            </div>
          </div>
        )}


     {/* Pagination */}
     <div className="absolute bottom-0 left-0 w-full">
            <div className="flex justify-center items-center gap-10 p-20 space-x-2 text-gray-500 text-sm font-bold">
  <button className="px-2 hover:bg-[#D9D9D9] rounded">‹</button>
  {[1, 2, 3, 4, 5].map((num) => (
    <button
      key={num}
      className={`w-8 h-8 rounded ${
        num === 1
          ? "bg-gray-300 text-black"
          : "hover:bg-[#D9D9D9] hover:text-black"
      }`}
    >
      {num}
    </button>
  ))}
  <span>...</span>
  <button className="px-2 hover:bg-gray-300 rounded">›</button>
</div>
</div>
</div>
</div>

   {/* Edit Modal */}
   {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex justify-center items-center">
          <div className="bg-white rounded-3xl p-6 w-[360px] max-w-full border border-black shadow-lg relative">
            <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 text-gray-400">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold mb-1">Edit Equipment</h2>
            <p className="text-sm text-gray-500 mb-4">Please edit the equipment.</p>
            <div className="border-b border-gray-300 my-4"></div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditOpen(false);
                setShowSuccess(true);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-sm font-medium">Equipment *</label>
                <input type="text" defaultValue="Utility Tractor" className="w-full rounded-full border px-4 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Total Quantity *</label>
                <input type="number" defaultValue={6} className="w-full rounded-full border px-4 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Repair Needed</label>
                <input type="number" defaultValue={2} className="w-full rounded-full border px-4 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Rental Price</label>
                <input type="text" defaultValue="₱ 1,500" className="w-full rounded-full border px-4 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Remarks/Notes</label>
                <textarea className="w-full rounded-xl border px-4 py-2" rows="3" placeholder="Remarks or Notes" />
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowConfirmDiscard(true)}
                  className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                style={{ width: "130px", height: "39px" }}
                >
                  Disregard
                </button>
                <button
                  type="submit"
                  className="px-10 py-2 bg-[#4CAE4F] text-white rounded-full hover:bg-green-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white p-8 w-[450px] h-[290px] rounded-2xl shadow-md w-96 text-center relative border border-black">
            <button onClick={() => setShowSuccess(false)} className="absolute top-4 right-4 text-gray-400">
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 flex justify-center items-center">
              <img
                src={Success}
                alt="Success.png"
                className="w-[80px] max-w-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">Equipment updated successfully!</h2>
            <p className="text-sm text-gray-600 mb-6">Everything’s set. Feel free to check your equipment!</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
              >
                Back
              </button>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                style={{ width: "130px", height: "39px" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rent Modal */}
      {isRentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-3xl w-[400px] p-6 border border-black relative shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Rent Equipment</h2>
                <p className="text-sm text-gray-500">Please provide the information.</p>
              </div>
              <button onClick={() => setIsRentOpen(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="border-b border-gray-300 my-4"></div>
            {/* Form */}
            <form className="space-y-4 mt-4" onSubmit={handleConfirm}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Equipment</label>
                <input
                  type="text"
                  value="Utility Tractor"
                  disabled
                  className="w-full px-4 py-2 border rounded-full text-sm bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Renter Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter the Renter Name"
                  className="w-full px-4 py-2 border rounded-full text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+63 | Enter the Contact Number"
                  className="w-full px-4 py-2 border rounded-full text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter the Quantity"
                  className="w-full px-4 py-2 border rounded-full text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Agreement Receipt</label>
                <input
                  type="file"
                  className="w-full px-4 py-2 border rounded-full text-sm"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowConfirmDiscard(true)}
                  className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                style={{ width: "130px", height: "39px" }}
                >
                  Disregard
                </button>
                <button
                  type="submit"
                  onClick={() => setIsSuccessRentOpe(true)}
                  className="px-10 py-2 bg-[#4CAE4F] text-white rounded-full hover:bg-green-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessRentOpe && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-2xl p-8 w-[440px] text-center relative shadow-xl">
                      <button
                        className="absolute top-4 right-4 text-gray-500"
                        onClick={() => setIsSuccessRentOpe(false)}
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="mb-4 flex justify-center items-center">
                        <img
                          src={Success}
                          alt="Success.png"
                          className="w-[80px] max-w-full object-contain"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Equipment rented successfully!</h3>
                      <p className="text-gray-600 mb-6">Everything’s set. Feel free to check your equipment!</p>
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => setIsSuccessRentOpe(false)}
                          className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                          style={{ width: "130px", height: "39px" }}
                        >
                          Back
                        </button>
                        <button
                          onClick={() => setIsSuccessRentOpe(false)}
                          className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                          style={{ width: "130px", height: "39px" }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                )}

      {/* Disregard Confirmation Modal */}
      {showConfirmDiscard && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white rounded-3xl w-[400px] h-[310px] p-10 shadow-lg relative border border-black">
            <button onClick={() => setShowConfirmDiscard(false)} className="absolute top-4 right-4 text-gray-400">
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 flex justify-center items-center">
                    <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
                  </div>
                  <h2 className="text-2xl text-center font-bold mb-2">Disregard editing?</h2>
                  <p className="text-sm text-center text-gray-600">This action cannot be undone.<br />The changes will be lost.</p>

                  <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setShowConfirmDiscard(false)}
                className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                style={{ width: "130px", height: "39px" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmDiscard(false);
                  setIsEditOpen(false);
                }}
                className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
              >
                Disregard
              </button>
            </div>
          </div>
        </div>
        
      )}

</div>

          </>
        )}

        {activeTab === "rentHistory" && (
          <>
            <div className="bg-[#F9FCF7] min-h-screen flex justify-center px-4">
              <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  {/* Left side: All Requests */}
                  <div className="flex items-center">
                                <img
                                  src={loop}
                                  alt="loop"
                                  className="ml-5 mr-5 w-[20px] max-w-full object-contain"
                                />
                    <span className="text-[15.5px] text-lg font-semibold mr-2">Rented Equipments</span>
                    <span className="text-gray-400 font-normal">24</span>
                  </div>

            {/* Right side: Search + Filters + Button */}
            <div className="flex items-center space-x-4">
              <div className="relative w-[280px] h-[35px] flex items-center border rounded-full px-3 py-1 bg-white">
                <Search className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Search Member"
                  className="flex-1 outline-none bg-white"
                  value={searchCurrent}
                  onChange={(e) => setSearchCurrent(e.target.value)}
                />
                <button onClick={() => setShowFilters(!showFilters)}>
                  <SlidersHorizontal className="text-gray-600 w-5 h-5" />
                </button>
              </div>

              {showFilters && (
                <div className="flex items-center space-x-1 p-2 rounded-lg w-fit">
                  <div className="flex items-center space-x-1 border rounded-l-3xl px-3 py-1 cursor-pointer bg-white border border-[#858585] h-[35px]">
                    <SlidersHorizontal className="text-blue w-4 h-4" />
                    <span className="mr-2 p-2 text-sm text-blue font-medium">Active Filters</span>
                  </div>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border border-[#858585] h-[35px] w-[60px] text-center text-sm bg-white text-[#858585]"
                  >
                    <option value="">Role</option>
                    <option value="admin"></option>
                    <option value="member"></option>
                  </select>
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-1 border rounded-r-3xl px-3 py-1 text-sm border border-[#858585] h-[35px] bg-white text-[#858585]"
                  >
                    <X className="w-4 h-4 text-[#858585]" />
                    <span>Clear</span>
                  </button>
                </div>
              )}

              <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2"
                  >
                    <FaPlus className="w-5 h-5" />
                    <span className="font-semibold text-[16px]">Add Equipment</span>
                  </button>
                </div>
                </div> 

                
     
      {/* Table */}
      <div className="w-full overflow-x-auto rounded-xl">
  <table className="table w-full table-fixed">
    <thead>
      <tr className="text-center bg-[#F4F4F4] text-sm text-black">
        <th className="w-[4%]">
          <input type="checkbox" className="checkbox checkbox-sm rounded" />
        </th>
        <th className="w-[14%] px-3 py-3">Equipment</th>
        <th className="w-[10%] px-3 py-3">Quantity</th>
        <th className="w-[12%] px-3 py-3">Status Now</th>
        <th className="w-[12%] px-3 py-3">Rent Rate</th>
        <th className="w-[14%] px-3 py-3">Date Rented <span className="inline-block">↓</span></th>
        <th className="w-[14%] px-3 py-3">Due/Date Returned</th>
        <th className="w-[10%] px-3 py-3">Status</th>
        <th className="w-[20%] px-3 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.id} className="bg-[#F8FCF8] border-b border-gray-200 text-center">
          <td>
            <input type="checkbox" className="checkbox checkbox-sm rounded" />
          </td>
          <td className="px-3 py-4 text-black align-middle">{row.equipment}</td>
          <td className="px-3 py-4 text-black align-middle">{row.quantity}</td>
          <td className="px-3 py-4 text-black align-middle">{row.statusNow}</td>
          <td className="px-3 py-4 align-middle">
            <div className="font-bold text-black">{row.rentRate}</div>
            <div className="text-xs text-gray-500 -mt-1">per day</div>
          </td>
          <td className="px-3 py-4 align-middle">
            <div className="text-black">{row.dateRented}</div>
            <div className="text-xs text-gray-500 -mt-1">{row.rentedAgo}</div>
          </td>
          <td className="px-3 py-4 align-middle">
            <div className="text-black">{row.dueDate}</div>
            <div className="text-xs text-gray-500 -mt-1">{row.dueIn}</div>
          </td>
          <td className="px-3 py-4 text-black align-middle">{row.renter}</td>
          <td className="px-3 py-4 align-middle">
            <div className="flex justify-center items-center gap-2 cursor-pointer">
              {/* Return */}
              <div className="group flex items-center transition-all duration-200 ease-in-out">
                <div className="flex items-center w-[20px] group-hover:w-[80px] transition-all duration-200 overflow-hidden">
                  <img
                    src={Return}
                    alt="Return"
                    className="w-4 h-4 mr-1"
                    onClick={() => setIsReturnEquipmentOpen(true)}
                  />
                  <span
                    className="opacity-0 group-hover:opacity-100 text-[#16A34A] text-sm font-medium transition-opacity duration-200 whitespace-nowrap"
                    onClick={() => setIsReturnEquipmentOpen(true)}
                  >
                    Return?
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="group flex items-center transition-all duration-200 ease-in-out">
                <div className="flex items-center w-[20px] group-hover:w-[80px] transition-all duration-200 overflow-hidden">
                  <img
                    src={Details}
                    alt="Details"
                    className="w-4 h-4 mr-1"
                    onClick={() => setIsDetailsOpen(true)}
                  />
                  <span
                    className="opacity-0 group-hover:opacity-100 text-blue text-sm font-medium transition-opacity duration-200 whitespace-nowrap"
                    onClick={() => setIsDetailsOpen(true)}
                  >
                    Details
                  </span>
                </div>
              </div>

              {/* Delete */}
              <div className="group flex items-center transition-all duration-200 ease-in-out">
                <span
                  className="cursor-pointer"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <img src={edtIcon} alt="Trash" className="w-4 h-4 mr-1" />
                </span>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
 
      
                    {/* Return Modal */}
      {isReturnEquipmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-3xl w-[400px] p-6 relative border border-black shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Return Equipment</h2>
                <p className="text-sm text-gray-600">Please enter the new equipment.</p>
              </div>
              <button onClick={() => setIsReturnEquipmentOpen(false)}>
                <span className="text-gray-500 text-xl">&times;</span>
              </button>
            </div>

            <hr className="my-2" />

            {/* Form */}
            <form className="space-y-3 text-sm">
              <div>
                <label className="block font-semibold">Equipment</label>
                <input type="text" value="Utility Tractor" readOnly className="w-full border rounded-xl px-4 py-2 bg-gray-100" />
              </div>

              <div>
                <label className="block font-semibold">
                  Renter Name<span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="Enter the Renter Name" className="w-full border rounded-xl px-4 py-2" />
              </div>

              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block font-semibold">
                    Rented on<span className="text-red-500">*</span>
                  </label>
                  <input type="date" className="w-full border rounded-xl px-4 py-2" />
                </div>
                <div className="w-1/2">
                  <label className="block font-semibold">
                    Returned on<span className="text-red-500">*</span>
                  </label>
                  <input type="date" className="w-full border rounded-xl px-4 py-2" />
                </div>
              </div>

              <div>
                <label className="block font-semibold">Remarks/Notes</label>
                <textarea placeholder="Remarks or Notes" className="w-full border rounded-xl px-4 py-2 h-24 resize-none" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="damaged" />
                <label htmlFor="damaged" className="text-sm font-medium">Mark as Damaged</label>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-[#F44336] text-white rounded-full w-[160px] py-2 font-semibold"
                  onClick={() => setShowDiscardModal(true)}
                >
                  Disregard
                </button>
                <button
                  type="submit"
                  className="bg-[#4CAF50] text-white rounded-full w-[160px] py-2 font-semibold"
                  onClick={() => setIsSuccessRentOpen(true)}
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RETURN SUCCESS MODAL */}
      {isSuccessRentOpen && (
       <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-2xl p-8 w-[440px] text-center relative shadow-xl">
            <div className="flex justify-end">
              <button onClick={handleCloseAll}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col items-center">
            <div className="mb-4 flex justify-center items-center">
              <img
                src={Success}
                alt="Success.png"
                className="w-[80px] max-w-full object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">Equipment rented successfully!</h3>
            <p className="text-sm text-gray-600 mb-6">
              Everything’s set. Feel free to check your equipment!
              </p>
             <div className="flex justify-center gap-4">
                <button
                   onClick={() => setIsSuccessRentOpen(false)}
                  className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
                >
                  Back
                </button>
                <button
                  onClick={handleCloseAll}
                  className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                style={{ width: "130px", height: "39px" }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ❗️DISREGARD CONFIRMATION MODAL */}
      {showDiscardModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl w-[450px] h-[330px] p-10 shadow-lg relative border border-black">
            <div className="flex justify-end">
              <button onClick={() => setShowDiscardModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col items-center">
            <div className="mb-4 flex justify-center items-center">
                    <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
                  </div>
                  <h2 className="text-2xl text-center font-bold mb-2">Disregard added equipment?</h2>
                  <p className="text-sm text-center text-gray-600">
                This action cannot be undone. <br />
                The equipment details will be lost.
              </p>
              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={() => setShowDiscardModal(false)}
                  
                className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                style={{ width: "130px", height: "39px" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCloseAll}
                  className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
                >
                  Disregard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

                  {/*Add Equipment Modal */}
         {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black  bg-opacity-40 z-50">
          <div className="bg-white rounded-3xl w-[400px] p-6 border border-black relative shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Add Equipment</h2>
                <p className="text-sm text-gray-500">Please enter the new equipment.</p>
              </div>
              
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="border-b border-gray-300 my-4"></div>
            <form className="space-y-4 mt-4" onSubmit={handleConfirm}>
              <div>
                <label className="block text-sm font-semibold">
                  Equipment <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter the Equipment"
                  className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter the Quantity"
                  className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">Rental Price</label>
                <div className="flex items-center border border-gray-300 rounded-full px-3">
                  <span className="text-gray-500 text-sm">₱</span>
                  <input
                    type="number"
                    placeholder="Enter the Rental Price"
                    className="w-full px-2 py-2 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold">Remarks/Notes</label>
                <textarea
                  placeholder="Remarks or Notes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                  rows="3"
                />
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowDiscardModal(true)}
                  className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                  style={{ width: "160px", height: "39px" }}
                >
                  Disregard
                </button>
                <button
                  type="submit"
                  onClick={() => setShowAddedModal (true)}
                  className="px-14 py-2 bg-[#4CAE4F] text-white border border-[#4CAE4F] rounded-full hover:bg-[dark green] hover:text-white"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DISREGARD CONFIRMATION MODAL */}
      {showDiscardModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl w-[450px] h-[330px] p-10 shadow-lg relative border border-black">
            <div className="flex justify-end">
              <button onClick={() => setShowDiscardModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col items-center">
            <div className="mb-4 flex justify-center items-center">
                    <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
                  </div>
                  <h2 className="text-2xl text-center font-bold mb-2">Disregard added equipment?</h2>
                  <p className="text-sm text-center text-gray-600">
                This action cannot be undone. <br />
                The equipment details will be lost.
              </p>
              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={() => setShowDiscardModal(false)}
                  
                className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                style={{ width: "130px", height: "39px" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCloseAll}
                  className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
                >
                  Disregard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ SUCCESS MODAL */}
      {showAddedModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 w-[500px] h-[300px] rounded-3xl shadow-md w-96 text-center relative border border-black">
            <div className="flex justify-end">
              <button onClick={handleCloseAll}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col items-center">
            <div className="mb-4 flex justify-center items-center">
              <img
                src={Success}
                alt="Success.png"
                className="w-[80px] max-w-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">Equipment added successfully!</h2>
            <p className="text-sm text-gray-600 mb-6">
                Everything’s set. Feel free to check your equipment!
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowAddedModal(false)}
                  className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
                >
                  Back
                </button>
                <button
                  onClick={handleCloseAll}
                  className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                style={{ width: "130px", height: "39px" }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


                {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-6 w-[400px] border border-black shadow-lg relative text-center">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="absolute top-2 right-3 text-gray-400 hover:text-black"
              >
                &times;
              </button>
            
              <div className="mb-4 flex justify-center items-center">
                    <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
                  </div>
                <h2 className="text-2xl text-center font-bold mb-2">Confirm Deletion?</h2>
                <p className="text-sm text-center text-gray-600">
                  The selected equipment will be permanently removed from your records.
                </p>
                
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                    style={{ width: "130px", height: "39px" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Add deletion logic here
                      setIsDeleteModalOpen(false);
                    }}
                    className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                    style={{ width: "130px", height: "39px" }}
                  >
                    Delete
                  </button>
                </div>
              
            </div>
          </div>
        )}

            {/* Pagination */}
            
            <nav
  className="absolute bottom-0 left-0 w-full flex justify-center items-center gap-10 p-20 text-sm font-bold bg-[#F8FCF8] text-gray-500 select-none"
  aria-label="Pagination"
>
  <button
    aria-label="Previous page"
    className="px-2 hover:bg-[#D9D9D9] rounded"
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </button>

  <button
    aria-current="page"
    className="bg-gray-300 text-black w-8 h-8 rounded"
  >
    1
  </button>

  {[2, 3, 4, 5].map((page) => (
    <button
      key={page}
      className="w-8 h-8 rounded hover:bg-[#D9D9D9] hover:text-black"
    >
      {page}
    </button>
  ))}

  <span className="px-2">...</span>

  <button
    aria-label="Next page"
    className="px-2 hover:bg-[#D9D9D9] rounded"
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </button>
</nav>
</div>
</div>
</div>


          {/* Details Modal */}
                {isDetailsOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white rounded-3xl w-[400px] p-6 border border-black shadow-xl">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-xl font-bold">Equipment Details</h2>
                      <p className="text-sm text-gray-600">This equipment is currently rented.</p>
                    </div>
                    <button onClick={() => setIsDetailsOpen(false)}>
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="border-b border-gray-300 my-4"></div>
                  {/* Equipment Info */}
                  <div className="space-y-3 text-sm">
                    <div><strong>Equipment</strong><br />Utility Tractor</div>
                    <div><strong>Condition</strong><br />Good</div>
                    <div><strong>Date Rented</strong><br />March 12, 2025, 11:34 AM</div>
                    <div><strong>Due/Date Returned</strong><br />March 12, 2025, 11:34 AM</div>
                    <div><strong>Renter Name</strong><br />Kaye Arroyo</div>
                  </div>

                  {/* Action */}
                  <div className="mt-6 text-sm">
                    <p className="font-medium mb-2">Already Returned?</p>
                    <span className="text-green-600 flex items-center gap-2">
                    <img src={Return} alt="Return" className="w-4 h-4" />
                      Return Equipment
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowDiscardModal(true)}
                  className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                  style={{ width: "160px", height: "39px" }}
                >
                  Disregard
                </button>
                <button
                  type="submit"
                  onClick={() => setIsConfirmOpen(true)}
                  className="px-14 py-2 bg-[#4CAE4F] text-white border border-[#4CAE4F] rounded-full hover:bg-[dark green] hover:text-white"
                >
                  Confirm
                </button>
              </div>
                </div>
              </div>
        )}

                {isConfirmOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-2xl w-[430px] p-8 shadow-xl text-center">
                    <div className="mb-4 flex justify-center items-center">
                          <img
                            src={Success}
                            alt="Success.png"
                            className="w-[80px] max-w-full object-contain"
                          />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Equipment now available!</h2>
                      <p className="text-sm text-gray-600 mb-6">Everything’s set. Feel free to check your equipment!</p>
                      <div className="flex justify-center gap-4">
                        <button className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }} onClick={() => setIsConfirmOpen(false)}>Back</button>
                        <button className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                style={{ width: "130px", height: "39px" }} onClick={() => setIsConfirmOpen(false)}>Done</button>
                      </div>
                    </div>
                  </div>
                )}


          
          

                {/* Disregard Confirmation Modal */}
                {showConfirmDiscard && (
                  <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-3xl w-[400px] h-[310px] p-10 shadow-lg relative border border-black">
                      <button onClick={() => setShowConfirmDiscard(false)} className="absolute top-4 right-4 text-gray-400">
                        <X className="w-5 h-5" />
                      </button>

                      <div className="mb-4 flex justify-center items-center">
                              <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
                            </div>
                            <h2 className="text-2xl text-center font-bold mb-2">Disregard editing?</h2>
                            <p className="text-sm text-center text-gray-600">This action cannot be undone.<br />The changes will be lost.</p>

                            <div className="flex justify-center gap-3 mt-6">
                        <button
                          onClick={() => setShowConfirmDiscard(false)}
                          className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                          style={{ width: "130px", height: "39px" }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setShowConfirmDiscard(false);
                            setIsEditOpen(false);
                          }}
                          className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                          style={{ width: "130px", height: "39px" }}
                        >
                          Disregard
                        </button>
                      </div>
                    </div>
                  </div>
      )}

          </>
        )}
      </div>
    </div>
  );
}
