import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import loop from '../assets/loop.png';
import edtIcon from '../assets/Trash.png';
import Disregard from '../assets/Disregard.png';
import Success from '../assets/Success.png';
import Rent from '../assets/Rent.png';
import Details from '../assets/Details.png';
import Select from 'react-select';
import InventoryModal from "./InventoryModal.jsx";
import UploadDocument from "../assets/UploadDocument.png";
import Uploadfiles from "../assets/UploadFiles.png";
import Upload from "../assets/Upload.png";
import RentSchedule from './RentSchedule.jsx';
import NotificationModal from "./NotificationModal.jsx";
import { fetchInventoryItems, updateItemStatus, deleteInventoryItem } from '../api/inventory';

export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState('machineries');
  const [searchCurrent, setSearchCurrent] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);
  const containerRef = useRef();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    console.log('leg')
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

  // Fetch items from API
  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchInventoryItems();
      setItems(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Handle status update
  const handleStatusChange = async (itemId, newStatus) => {
    try {
      await updateItemStatus(itemId, newStatus);
      // Update local state
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Handle item deletion
  const handleDeleteItem = async (itemId) => {
    try {
      await deleteInventoryItem(itemId);
      // Update local state
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle item addition
  const handleItemAdded = () => {
    fetchItems(); // Refresh the list after adding a new item
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
    <div className="min-h-screen bg-[#F9FCF7]">
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex justify-center mb-8" ref={containerRef}>
          {tabs.map((tab, index) => (
            <button
              key={tab}
              ref={el => tabsRef.current[index] = el}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-lg font-medium relative ${
                activeTab === tab ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
          <div
            className="absolute bottom-0 h-1 bg-green-600 transition-all duration-300"
            style={indicatorStyle}
          />
        </div>

        {/* Content */}
        {activeTab === "machineries" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <SlidersHorizontal className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machinery</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rental Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.model}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₱{item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setIsEditOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "rentHistory" && (
          <div className="bg-[#F9FCF7] min-h-screen flex justify-center px-4">
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
              <InventoryModal
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
                <h2 className="text-3xl font-bold mb-2">Machinery added successfully!</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Everything's set. Feel free to check your machinery!
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
  );
}
