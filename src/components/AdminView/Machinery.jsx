import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import loop from '../../assets/loop.png';
import edtIcon from '../../assets/Trash.png';
import Disregard from '../../assets/Disregard.png';
import Success from '../../assets/Success.png';
import Rent from '../../assets/Rent.png';
import Details from '../../assets/Details.png';
import Select from 'react-select';
import MachineryModal from "./../AdminView/MachineryModal.jsx";
import UploadDocument from "../../assets/UploadDocument.png";
import Uploadfiles from "../../assets/UploadFiles.png";
import Upload from "../../assets/Upload.png";
import RentSchedule from './RentSchedule.jsx';
import NotificationModal from "./NotificationModal.jsx"; 

export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState('machineries');
  const [searchCurrent, setSearchCurrent] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);
  const containerRef = useRef();

  const tabs = ['machineries', 'rentHistory'];

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

  const [selectedStatus, setSelectedStatus] = useState("Operational");
  const [itemStatuses, setItemStatuses] = useState({});

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Operational':
        return 'text-green-700 bg-green-100 border border-green-500';
      case 'Non-operational':
        return 'text-[#A51B29] bg-[#FFDADE] border border-[#A51B29]';
      case 'Need Maintenance':
        return 'text-yellow-800 bg-yellow-100 border border-yellow-500';
      default:
        return 'text-gray-700 bg-gray-100 border border-gray-300';
    }
  };
  

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
  const [showDisregardModal, setShowDisregardModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteModalOpe, setIsDeleteModalOpe] = useState(false);
  const [isSuccessRentOpe, setIsSuccessRentOpe] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedMachineryName, setSelectedMachineryName] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showSuccessDoneModal, setShowSuccessDoneModal] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

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

  const items = [
    { id: 1, name: "Utility Tractor 1", model: "Kubota L4028", status: "Operational" },
    { id: 2, name: "Utility Tractor 2", model: "Kubota L4028", status: "Non-operational" },
    { id: 3, name: "Combine Harvester", model: "Kubota DC-35 PRO PH", status: "Need Maintenance" },
    { id: 4, name: "Multi-tiller", model: "Stihl MH 710", status: "Operational" },
  ];

  const groupedOptions = [
    {
      label: "Bilibiran, Binangonan, Rizal",
      options: [
        { value: "bilibiran_veg", label: "Bilibiran Vegetable Farmers Association" },
        { value: "bilibiran", label: "Bilibiran Farmers Association" }
      ]
    },
    {
      label: "Calumpang, Binangonan, Rizal",
      options: [
        { value: "calumpang_veg", label: "Calumpang Vegetable Farmers Association" },
        { value: "calumpang", label: "Calumpang Farmers Association" }
      ]
    },
    {
      label: "Darangan, Binangonan, Rizal",
      options: [
        { value: "darangan_veg", label: "Darangan Vegetable Farmers Association" },
        { value: "pugad_monique_veg", label: "Pugad St. Monique Vegetable Farmers Association (Vegetable)" },
        { value: "halang_integrated", label: "Halang Integrated Farmers Association" },
        { value: "hulo_darangan", label: "Hulo, Darangan Farmers Association" },
        { value: "pugad_monique_rice", label: "Pugad St. Monique Farmers Association (Rice)" },
        { value: "samahang_darangan", label: "Samahang Magsasaka ng Darangan" },
        { value: "tabing_dagat", label: "Tabing-Dagat Farmers Association" }
      ]
    },
    {
      label: "Macamot, Binangonan, Rizal",
      options: [
        { value: "macamot_organic", label: "Macamot Organic Vegetable Farmers Association" },
        { value: "pulong_parang", label: "Pulong Parang Organic Vegetable Farmers Association" },
        { value: "sitio_halang", label: "Sitio Halang Vegetable Farmers Association" },
        { value: "macamot", label: "Macamot Farmers Association" },
        { value: "halang_macamot", label: "Halang, Macamot Farmers Association" }
      ]
    },
    {
      label: "Mambog, Binangonan, Rizal",
      options: [
        { value: "layunan_organic", label: "Layunan Organic Vegetable Farmers Association" }
      ]
    },
    {
      label: "Pantok / Pantok-Palangoy, Binangonan, Rizal",
      options: [
        { value: "pantok_pal_fa", label: "Pantok-Palangoy Vegetable F.A." },
        { value: "pantok_fa", label: "Pantok Farmers Association" },
        { value: "kaysapon", label: "Kaysapon Farmers Association" },
        { value: "kaykansa", label: "Kaykansa Farmers Association" },
        { value: "kaymaputi", label: "Kaymaputi Farmers Association" }
      ]
    },
    {
      label: "Pila-Pila, Binangonan, Rizal",
      options: [
        { value: "pilapila", label: "Pila-Pila Farmers Association" }
      ]
    },
    {
      label: "Tagpos, Binangonan, Rizal",
      options: [
        { value: "tagpos_veg", label: "Tagpos Vegetable Farmers Association" },
        { value: "tagpos", label: "Tagpos Farmers Association" }
      ]
    },
    {
      label: "Tatala, Binangonan, Rizal",
      options: [
        { value: "tatala", label: "Tatala Farmers Association" }
      ]
    }
  ];
  
  

  return (
    <div className="p-0">
  {/* Header Section */}
  <div className="w-full bg-binhi-100 shadow-sm">
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex-1">
        <div className="text-sm breadcrumbs font-inter text-base">
          <ul>
            <li><a className="text-binhigreen underline">Dashboard</a></li>
            <li><a className="text-binhigreen underline">Machineries Management</a></li>
            <li className="text-gray-400">
              {activeTab === 'machineries' ? 'Machineries' : 'Rent Schedule'}
            </li>
          </ul>
        </div>
      </div>
      {/* Notification and Dots Button */}
      <div className="flex items-center gap-2 ml-4">
        {/* Notification Icon */}
        <button
            className="btn btn-square bg-transparent hover:bg-transparent shadow-none border-none"
            onClick={() => setIsNotifOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <NotificationModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

        {/* Dots Button */}
        <button
                className="p-1 text-gray-400 hover:text-gray-600"
                onClick={() => setShowMenu((v) => !v)}
              >
                <svg width="23" height="23" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="4" r="1.5" />
                  <circle cx="10" cy="10" r="1.5" />
                  <circle cx="10" cy="16" r="1.5" />
                </svg>
              </button>
              </div>
            
    </div>
    <div className="px-6 pb-4 h-5 flex items-center">
      <h1 className="text-[40px] font-bold text-gray-800">Machineries Management</h1>
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
          {tab === 'machineries' ? 'Machineries' : 'Rent Schedule'}
        </button>
      ))}
    </div>

        {activeTab === "machineries" && (
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
                  <span className="text-[15.5px] text-lg font-semibold mr-2">All Machineries</span>
                  <span className="text-gray-400 font-normal">4</span>
                </div>

                {/* Right side: Search + Filter */}
                <div className="flex items-center gap-4 flex-wrap justify-end">
                {/* Search Bar */}
                <div className="relative w-[280px] h-[35px] flex items-center border rounded-full px-3 py-1 bg-white">
                  <Search className="text-gray-500 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    placeholder="Search Machinery"
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
                      <option value="admin">Farmer</option>
                      <option value="member">Member</option>
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
                  <span className="font-semibold text-[16px]">Add Machinery</span>
                </button>
              </div>

              
            {/* Modal Component */}
          <MachineryModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleConfirm={handleConfirm}
                showAddedModal={showAddedModal}
                setShowAddedModal={setShowAddedModal}
                handleCloseAll={handleCloseAll}
                showDisregardModal={showDisregardModal}
                setShowDisregardModal={setShowDisregardModal}
                Success={Success}
                Disregard={Disregard}
              />
              
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
                <h2 className="text-3xl font-bold mb-2">Machinery now available!</h2>
                <p className="text-sm text-gray-600 mb-6">Everything’s set. Feel free to check your Machinery!</p>

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


  

              {/* Table 1 */}
              <div className="w-full overflow-x-auto rounded-xl">
  <table className="table w-full table-fixed">
  <thead>
  <tr className="bg-[#F4F4F4] text-left text-sm text-black">
    <th className="w-[5%]">
      <input type="checkbox" className="checkbox checkbox-sm rounded" />
    </th>
    <th className="w-[20%]">Machinery</th>
    <th className="w-[15%]">Model</th>
    <th className="w-[15%]">Rental Price</th>
    <th className="w-[15%]">Status</th>
    <th className="w-[30%] text-center">Actions</th>
  </tr>
</thead>
<tbody>
  {items.map((item) => (
    <tr key={item.id} className="text-left border-t">
      <td>
        <input type="checkbox" className="checkbox checkbox-sm rounded" />
      </td>
      <td className="font-medium">{item.name}</td>
      <td>{item.model}</td>
      <td>
        <div className="leading-tight">
          <div className="font-semibold">₱1,500</div>
          <div className="text-xs text-gray-500">per hectares</div>
        </div>
      </td>
      <td>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadgeClass(itemStatuses[item.id] || item.status)}`}>
          {itemStatuses[item.id] || item.status}
        </span>

          </td>

          <td>
            <div className="flex justify-center items-center gap-3">
              {/* Rent */}
              <div
            className="group flex items-center transition-all duration-200 ease-in-out cursor-pointer"
            onClick={() => {
              if (item?.name) {
                setSelectedEquipment(item.name);
              } else {
                setSelectedEquipment(''); // fallback
              }
              setIsRentOpen(true);
            }}
          >
            <div className="flex items-center w-[20px] group-hover:w-[80px] transition-all duration-200 overflow-hidden">
              <img
                src={Rent}
                alt="Rent"
                className="w-4 h-4 mr-1"
              />
              <span
                className="opacity-0 group-hover:opacity-100 text-green-600 text-sm font-medium transition-opacity duration-200 whitespace-nowrap"
              >
                Rent out?
              </span>
            </div>
          </div>


              {/* Details */}
                 <div 
                   onClick={() => {
                    setSelectedItem(item);
                    setShowEditModal(true);
                  }}
                  className="cursor-pointer group flex items-center justify-center transition-all duration-200 ease-in-out"
                >
                  <div className="flex items-center w-[20px] group-hover:w-[80px] transition-all duration-200 overflow-hidden">
                    <img src={Details} alt="Details" className="w-4 h-4 mr-1" />
                    <span className="opacity-0 group-hover:opacity-100 text-blue text-sm font-medium transition-opacity duration-200 whitespace-nowrap">
                      Details
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

            <MachineryModal
        
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    selectedItem={selectedItem}
                    isEditOpen={isEditOpen}
                    setIsEditOpen={setIsEditOpen}
                    setShowSuccess={setShowSuccess}
                    setShowConfirmDiscard={setShowConfirmDiscard}
                    setActiveTab={setActiveTab}
                    isHistoryOpen={isHistoryOpen}
                    setIsHistoryOpen={setIsHistoryOpen}
                    historyData={historyData}
                    setHistoryData={setHistoryData}
                    selectedMachineryName={selectedMachineryName}
                    setSelectedMachineryName={setSelectedMachineryName}
                    onStatusChange={(id, status) => {
                      setItemStatuses((prev) => ({
                        ...prev,
                        [id]: status,
                      }));
                    }}

      />
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
                  The selected machinery will be permanently removed from your records.
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
    <div className="fixed bottom-0 left-0 w-full py-4">
  <div className="flex justify-center">
    <div className="flex items-center gap-1">
      <button className="btn btn-sm hover:bg-[#D9D9D9] rounded">«</button>

      {[1].map((page) => (
        <button
          key={page}
          className={`btn btn-sm ${
            page === 1
              ? 'bg-gray-300 text-black'
              : 'btn-ghost text-gray-600 hover:bg-[#D9D9D9] hover:text-black'
          }`}
        >
          {page}
        </button>
      ))}

      <button className="btn btn-sm hover:bg-[#D9D9D9] rounded">»</button>
    </div>
  </div>
  </div>
  </div>
</div>

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
            <h2 className="text-2xl font-bold mb-2">Machinery updated successfully!</h2>
            <p className="text-sm text-gray-600 mb-6">Everything’s set. Feel free to check your machinery!</p>

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
                <h2 className="text-lg font-bold text-gray-800">Rent Machinery</h2>
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
                <label className="block text-sm font-medium text-gray-700">Machinery <span className="text-red">*</span></label>
                <input
                  type="text"
                  value={selectedEquipment}
                  disabled
                  className="w-full px-4 py-2 border rounded-full text-sm bg-gray-100 "
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Association Name <span className="text-red">*</span>
                </label>
                <Select
                options={groupedOptions}
                placeholder="Choose Association Name"
                className="w-[350px] text-sm"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderRadius: '9999px',
                    minHeight: '32px',
                    height: '40px',
                    fontSize: '0.95rem',
                    borderColor: 'black',
                    boxShadow: state.isFocused ? '0 0 0 2px #22c55e' : 'none', // Tailwind green-500
                    '&:hover': {
                      borderColor: 'black',
                      boxShadow: '0 0 0 2px #22c55e'
                    }
                  }),
                  
                  valueContainer: (base) => ({
                    ...base,
                    padding: '0 8px',
                  }),
                  input: (base) => ({
                    ...base,
                    margin: 0,
                    padding: 0,
                  }),
                  option: (base, state) => ({
                    ...base,
                    paddingTop: 4,
                    paddingBottom: 4,
                    fontSize: '0.75rem',
                    backgroundColor: state.isSelected
                      ? '#22c55e'
                      : state.isFocused
                      ? '#bbf7d0'
                      : 'white',
                    color: state.isSelected || state.isFocused ? 'black' : 'inherit',
                    cursor: 'pointer',
                  }),
                  menu: (base) => ({
                    ...base,
                    fontSize: '0.75rem',
                  }),
                }}
              />
              </div>

              <div className="flex gap-4">
              {/* Schedule Time */}
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Schedule Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  placeholder="Schedule Time"
                  className="w-full px-4 py-2 border rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Schedule Date */}
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Schedule Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  placeholder="Schedule Date"
                  className="w-full px-4 py-2 border rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>


              <div>
                  {/* Trigger Button */}
                  <div className="flex justify-center mb-6">
                    <div className="w-[450px]">
                      <label className="block mb-1 font-semibold text-gray-800 text-sm text-left">
                        Agreement Receipt
                      </label>
                      <button
                        onClick={() => setShowModal(true)}
                        className="bg-white text-[#858585] border border-black px-6 py-2 rounded-full hover:border-green-600 hover:bg-green-50 transition w-full flex items-center justify-center gap-2"
                      >
                        <img src={UploadDocument} alt="Upload Icon" className="w-5 h-5" />
                        Upload Agreement Receipt
                      </button>
                    </div>
                  </div>

                  {/* Modal Component */}
                  <MachineryModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedDoc={selectedDoc}
                    setSelectedDoc={setSelectedDoc}
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    Upload={Upload}
                    Uploadfiles={Uploadfiles}
                    onStatusChange={setSelectedStatus}
                    
                  />
                </div>

              {/* Buttons */}
              <div className="flex justify-center gap-3 mt-6 pt-20">
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
                      <h3 className="text-2xl font-bold mb-2">Machinery rented successfully!</h3>
                      <p className="text-gray-600 mb-6">Everything’s set. Feel free to check your machinery!</p>
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
            <div className="bg-[#F9FCF7] min-h-screen flex justify-center px-">

              <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                  {/* Left side: All Requests */}
                  <div className="flex items-center">
                                <img
                                  src={loop}
                                  alt="loop"
                                  className="ml-5 mr-5 w-[20px] max-w-full object-contain"
                                />
                    <span className="text-[15.5px] text-lg font-semibold mr-2">Schedule Today</span>
                    <span className="text-gray-400 font-normal">8</span>
                  </div>

            {/* Right side: Search + Filters + Button */}
            <div className="flex items-center space-x-4">
              <div className="relative w-[280px] h-[35px] flex items-center border rounded-full px-3 py-1 bg-white">
                <Search className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Search Machinery"
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
                    <option value="admin">Farmer</option>
                    <option value="member">Member</option>
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
                    <span className="font-semibold text-[16px]">Add Machinery</span>
                  </button>
                </div>
                </div> 

                
     
      {/* Table 2 */}
                  
      <RentSchedule
  setIsDoneModalOpen={setIsDoneModalOpen}
  isDoneModalOpen={isDoneModalOpen}
  setSelectedRow={setSelectedRow}
  selectedRow={selectedRow}
  showSuccessDoneModal={showSuccessDoneModal}
  setShowSuccessDoneModal={setShowSuccessDoneModal}
  showConfirmDiscard={showConfirmDiscard}
  setShowConfirmDiscard={setShowConfirmDiscard}
  isDeleteModalOpen={isDeleteModalOpen}
  setIsDeleteModalOpen={setIsDeleteModalOpen}
/>
       
      {/* Add Machinery Modal Component */}
      <MachineryModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleConfirm={handleConfirm}
                showAddedModal={showAddedModal}
                setShowAddedModal={setShowAddedModal}
                handleCloseAll={handleCloseAll}
                showDisregardModal={showDisregardModal}
                setShowDisregardModal={setShowDisregardModal}
                Success={Success}
                Disregard={Disregard}
              />
      

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
            <h2 className="text-3xl font-bold mb-2">Machinery added successfully!</h2>
            <p className="text-sm text-gray-600 mb-6">
                Everything’s set. Feel free to check your machinery!
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


                

  
            
      {/* Pagination */}
     <div className="fixed bottom-0 left-0 w-full py-4">
  <div className="flex justify-center">
    <div className="flex items-center gap-1">
      <button className="btn btn-sm hover:bg-[#D9D9D9] rounded">«</button>

      {[1].map((page) => (
        <button
          key={page}
          className={`btn btn-sm ${
            page === 1
              ? 'bg-gray-300 text-black'
              : 'btn-ghost text-gray-600 hover:bg-[#D9D9D9] hover:text-black'
          }`}
        >
          {page}
        </button>
      ))}

      <button className="btn btn-sm hover:bg-[#D9D9D9] rounded">»</button>
    </div>
  </div>
  </div>
    </div>
    </div>


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
