import React, { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa";	
import { Search, SlidersHorizontal, X } from "lucide-react";
import loop from '../../assets/loop.png';
import Firstname from '../../assets/Firstname.png';
import Role from '../../assets/Role.png';
import Number from '../../assets/Number.png';
import DOB from '../../assets/DOB.png';
import Barangay from '../../assets/Barangay.png';
import Docs from '../../assets/Docs.png';
import Disregard from '../../assets/Disregard.png';
import Success from '../../assets/Success.png';
import edtIcon from '../../assets/Trash.png';
import Details from '../../assets/Details.png';
import Pantok from '../../assets/Pantok.png';
import Tatala from '../../assets/Tatala.png';
import Hulo from '../../assets/Hulo.png';
import Tagpos from '../../assets/Tagpos.png';
import Pugad from '../../assets/Pugad.png';
import Samahang from '../../assets/Samahang.png';
import Pencil2 from '../../assets/PencilBlack.png';
import Time from '../../assets/Time.png';
import NotificationModal from "../NotificationModal.jsx"; 

const currentMembersInitial = [
    {
      id: 1,
      name: "Pantok Farmers Association",
      location: "Pantok",
      area: "2.0",
      president: "Raul Picones",
      members: 2,
      image: Pantok,
      firstName: "Raul",
      lastName: "Picones",
      role: "President",
      number: "09171234567",
      DateofBirth: "1985-02-12",
      barangay: "Pantok",
      purok: "Purok 1",
      street: "123 Mabuhay St."
    },
    {
      id: 2,
      name: "Tatala Farmers Association",
      location: "Tatala",
      area: "25",
      president: "Rolando Anore",
      members: 25,
      image: Tatala,
      firstName: "Rolando",
      lastName: "Anore",
      role: "President",
      number: "09181112222",
      DateofBirth: "1978-11-03",
      barangay: "Tatala",
      purok: "Purok 2",
      street: "245 Green Ave."
    },
    {
      id: 3,
      name: "Hulo, Darangan Farmers Association",
      location: "Darangan",
      area: "5.5",
      president: "Eutiquio Mercado",
      members: 6,
      image: Hulo,
      firstName: "Eutiquio",
      lastName: "Mercado",
      role: "Secretary",
      number: "09223334444",
      DateofBirth: "1982-08-21",
      barangay: "Darangan",
      purok: "Purok 3",
      street: "46 Rizal St."
    },
    {
      id: 4,
      name: "Tagpos Farmers Association",
      location: "Tagpos",
      area: "9.0",
      president: "-",
      members: 3,
      image: Tagpos,
      firstName: "Julio",
      lastName: "Cruz",
      role: "Treasurer",
      number: "09191112222",
      DateofBirth: "1990-07-14",
      barangay: "Tagpos",
      purok: "Purok 1",
      street: "38 Sampaguita"
    },
    {
      id: 5,
      name: "Pugad St. Monique Farmers Association",
      location: "Darangan",
      area: "49.2",
      president: "Marcelino Domingo",
      members: 45,
      image: Pugad,
      firstName: "Marcelino",
      lastName: "Domingo",
      role: "President",
      number: "09234567890",
      DateofBirth: "1970-12-30",
      barangay: "Darangan",
      purok: "Purok 4",
      street: "2 Maharlika"
    },
    {
      id: 6,
      name: "Samahang Magsasaka ng Darangan",
      location: "Darangan",
      area: "40.5",
      president: "Rolando Leoncio",
      members: 42,
      image: Samahang,
      firstName: "Rolando",
      lastName: "Leoncio",
      role: "Vice President",
      number: "09332221111",
      DateofBirth: "1969-06-08",
      barangay: "Darangan",
      purok: "Purok 5",
      street: "98 Kalayaan"
    }
  ];

  const rejectedMembersInitial = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      email: "juandelacruz@gmail.com",
      appliedAs: "Member",
      reason: "Duplicate Registration",
      document: "nat_id_juandc.pdf",
      rejectedOn: "March 21, 2025",
    },
  ];
  
  
  
  
  export default function MemberTabs() {
  
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [showEditAssociationModal, setShowEditAssociationModal] = useState(false);
    const [showDetailAssociationModal, setShowDetailAssociationModal] = useState(false);
    const [selectedAssociation, setSelectedAssociation] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [showFarmerModal, setShowFarmerModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);

    const [newMember, setNewMember] = useState({
        name: '',
        location: '',
        president: '',
        area: '',
        members: '',
        image: Pantok, // default image
      });
      
      const handleClose = () => {
        setIsAddMemberModalOpen(false);
        setNewMember({ name: '', location: '', president: '', area: '', members: '', image: Pantok });
      };
      
    const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    location: "",
    president: "",
    area: "",
    members: "",
    image: "",
    });

    const handleEditClick = (member) => {
    setEditFormData({ ...member });
    setShowEditModal(true);
    };

    const handleDelete = () => {
        setFilteredMembers(prev => prev.filter(member => member.id !== memberToDelete));
        setSelectedMembers(prev => prev.filter(id => id !== memberToDelete));
        setIsDeleteModalOpen(false);
        setMemberToDelete(null);
      };
      

    const handleAssociationEditChange = (e) => {
        const { name, value } = e.target;
      
        setEditFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      
        // Clear validation error for this field if it's now valid
        if (value.trim()) {
          setValidationErrors((prev) => ({
            ...prev,
            [name]: false,
          }));
        }
      };
      

      const handleEditConfirm = () => {
        const errors = {};
        if (!editFormData.name.trim()) errors.name = true;
        if (!editFormData.location.trim()) errors.location = true;
        if (!editFormData.president.trim()) errors.president = true;
        if (!editFormData.area.trim()) errors.area = true;
        if (!editFormData.members.toString().trim()) errors.members = true;
      
        setValidationErrors(errors);
      
        // Only update if all fields are valid
        if (Object.keys(errors).length === 0) {
          const updatedList = members.map((item) =>
            item.id === editFormData.id ? { ...item, ...editFormData } : item
          );
          setMembers(updatedList);
          setShowEditModal(false);
          setValidationErrors({}); // clear all errors
        }
      };      


    const [clusterForm, setClusterForm] = useState({
      name: '',
      president: '',
      location: '',
      area: '',
      members: '',
    });
    
    // Tabs: current, pending, rejected
    const [activeTab, setActiveTab] = useState("current");
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef([]);
    
    // Members state for current tab
    const [members, setMembers] = useState(currentMembersInitial);
  
    
    // Search states
    const [searchCurrent, setSearchCurrent] = useState("");
    
    // Selected members for bulk actions
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    
    // Editing member and edit form
    const [editingMember, setEditingMember] = useState(null);
    const [editForm, setEditForm] = useState({
      firstName: '',
      lastName: '',
      role: '',
      number: '',
      DateofBirth: '',
      barangay: '',
      purok: '',
      street: '',
      document: '',
    });
    
    // Add member modal and form
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [addMemberForm, setAddMemberForm] = useState({
    step: 1,
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    address: '',
    barangay: '',
    purok: '',
    street: ''
    });

  
    const [isDeleteModalOpe, setIsDeleteModalOpe] = useState(false);
  
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
    
  
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
  
    const clearFilters = () => {
      setSelectedRole("");
    };
    
    // Success and confirm modals
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); // eg {type:'deleteMember',id:1}
    
    // Filter functions
    const filterMembersBySearch = (list, search) => {
      if (!search.trim()) return list;
      return list.filter(m => {
        const fullName = (m.firstName ? (m.firstName + " " + (m.lastName || "")).toLowerCase() : m.name?.toLowerCase?.() || "");
        return fullName.includes(search.toLowerCase());
      });
    };
    
    // Filtered members for current tab
    const [filteredMembers, setFilteredMembers] = useState(members);

        useEffect(() => {
        setFilteredMembers(members);
        }, [members]);

    
  
    useEffect(() => {
      const index = ["current", ].indexOf(activeTab);
      const currentTab = tabRefs.current[index];
      if (currentTab) {
        setUnderlineStyle({
          left: currentTab.offsetLeft,
          width: currentTab.offsetWidth,
        });
      }
    }, [activeTab]);
    
    // Toggle select all current filtered members
    const toggleSelectAll = () => {
      if (selectedMembers.length === filteredMembers.length) {
        setSelectedMembers([]);
      } else {
        setSelectedMembers(filteredMembers.map(m => m.id));
      }
    };
  

    // Toggle select member by id
    const toggleSelectMember = (id) => {
      setSelectedMembers(prev => prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]);
    };
  
  
    // Handle edit input change
    const handleEditChange = (e) => {
      const { name, value, files } = e.target;
      if(name === "document" && files.length > 0){
        setEditForm(prev => ({ ...prev, document: files[0]}));
      } else {
        setEditForm(prev => ({ ...prev, [name]: value }));
      }
    };
  
    // Confirm edit changes
    const handleConfirmEdit = () => {
      setConfirmAction('confirmEdit');
    };
  
    // Cancel edit changes
    const handleCancelEdit = () => {
      setConfirmAction('cancelEdit');
    };
  
    // Proceed action for confirm modals
    const proceedAction = () => {
      if (confirmAction === 'confirmEdit') {
        if(editingMember){
          setMembers(prev =>
            prev.map(m =>
              m.id === editingMember.id ? { ...m, ...editForm } : m
            )
          );
        }
        setEditingMember(null);
      } else if (confirmAction === 'discardChanges' || confirmAction === 'cancelEdit') {
        setIsAddMemberModalOpen(false);
        setEditingMember(null);
        setSuccessModalOpen(false);
        setAddMemberForm({
          step: 1,
          emailOrPhone: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          address: '',
          barangay: '',
          purok: '',
          street: '',
        });
      } else if (confirmAction?.type === 'deleteMember') {
        setMembers(prev => prev.filter(m => m.id !== confirmAction.id));
      }
      setConfirmAction(null);
    };
  
    // Cancel confirm modal
    const cancelAction = () => {
      setConfirmAction(null);
    };
  
    // Handle add member form input change
    const handleAddMemberInputChange = (e) => {
      const { name, value } = e.target;
      setAddMemberForm(prev => ({ ...prev, [name]: value }));
    };
    
    // Icons for edit form fields
    const fieldIcons = {
      firstName: Firstname,
      role: Role,
      number: Number,
      DateofBirth: DOB,
      barangay: Barangay,
      document: Docs,
    };
  


    
  
    return (
  
      
      <div className="p-0">
    {/* Header with Breadcrumbs */}
    <div className="w-full bg-binhi-100 shadow-sm">
      {/* Navbar with breadcrumbs and icons */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex-1">
          <div className="text-sm breadcrumbs font-inter text-base">
            <ul>
              <li><a className="text-binhigreen underline">Dashboard</a></li>
              <li><a className="text-binhigreen underline">Association Management</a></li>
              <li><a className="text-binhigreen underline">Members</a></li>
              <li className="text-gray-400">
                {activeTab === "current"
                  ? "Current Members"
                  : activeTab === "current"
                 }
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
  
      {/* Page Title */}
      <div className="px-6 pb-4 h-5 flex items-center">
        <h1 className="text-[40px] font-bold text-gray-800">Association Management</h1>
      </div>
    </div>
  
    {/* Tabs Navigation */}
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700 relative">
      <ul
        className="flex flex-wrap -mb-px text-sm font-medium text-center"
        role="tablist"
      >
        {["current"].map((tab, index) => (
          <li key={tab} className="mr-10" role="presentation">
            <button
              ref={(el) => (tabRefs.current[index] = el)}
              className={`inline-block p-4 ${
                activeTab === tab ? "text-green-600" : "text-gray-500 hover:text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab === "current"
                ? "Current Members"
                : tab === "pending"
                ? "Pending Members"
                : "Rejected Members"}
            </button>
          </li>
        ))}
      </ul>
      <div
        className="absolute bottom-0 h-0.5 bg-green-600 transition-all duration-300"
        style={{ left: underlineStyle.left, width: underlineStyle.width }}
      />
    </div>
  
        {/* Current Members Tab */}
        {activeTab === "current" && (
          <>
            <div className="flex items-center justify-between w-full mb-4">
      {/* Left Side */}
      <div className="flex items-center">
        {!showFilters && (
          <img
            src={loop}
            alt="loop"
            className="ml-5 mr-5 w-[20px] max-w-full object-contain"
          />
        )}
        {!showFilters ? (
          <div className="flex items-center">
            <span className="text-[15.5px] text-lg font-semibold mr-2">All Clusters</span>
            <span className="text-gray-400 font-normal text-xs">15</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 border rounded-l-3xl rounded-r-3xl px-3 py-1 cursor-pointer bg-white border border-[#858585] h-[35px]">
            <SlidersHorizontal className="w-4 h-4 text-[#3b82f6]" />
            <span className="mr-2 p-2 text-sm text-[#3b82f6] font-medium">Active Filters</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-[#858585] h-[35px] text-sm bg-white text-[#858585] pl-2 pr-6"
            >
              <option value="">Role</option>
              <option value="admin">Farmer</option>
              <option value="member">Member</option>
            </select>
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 rounded-r-3xl px-3 py-1 text-sm border-[#858585] h-[35px] text-[#858585]"
            >
              <X className="w-4 h-4 text-[#858585]" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative w-[280px] flex items-center border rounded-full px-3 py-1 bg-white">
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

        {/* Add Member Button */}
        <button
          onClick={() => {
            setIsAddMemberModalOpen(true);
            setAddMemberForm({
              step: 1,
              emailOrPhone: '',
              password: '',
              confirmPassword: '',
              firstName: '',
              lastName: '',
              address: '',
              barangay: '',
              purok: '',
              street: ''
            });
          }}
  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-7 h-[35px]"
>
  <FaPlus className="w-4 h-4" />
  <span className="font-semibold text-[15px]">Add Member</span>
</button>
      </div>
    </div>

    {/* Filter Panel */}
    {showFilters && (
      <div>
      </div>
    )}
  
  
  
            {/* Table 1 */}
            <div className="overflow-x-auto py-0">
    <table className="table w-full">
      <thead>
        <tr className="text-sm text-black" style={{ backgroundColor: "#F4F4F4" }}>
          <th className="p-4 rounded-tl-lg rounded-tr-lg text-left">
            <input
              type="checkbox"
              className="checkbox checkbox-sm rounded"
              checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
              onChange={toggleSelectAll}
              aria-label="Select all members"
            />
          </th>
          <th className="p-4 text-left">Name of Association</th>
          <th className="p-4 text-left">Farm Location</th>
          <th className="p-4 text-left">Area (has.)</th>
          <th className="p-4 text-center">Name of President</th>  
          <th className="p-4 text-center">No. of Members</th>     
          <th className="p-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredMembers.map((member) => (
          <tr key={member.id} className="border-t font-medium">
            <td className="p-4">
              <input
                type="checkbox"
                className="checkbox checkbox-sm rounded"
                checked={selectedMembers.includes(member.id)}
                onChange={() => toggleSelectMember(member.id)}
                aria-label={`Select member ${member.name}`}
              />
            </td>
  
            <td className="p-4 flex items-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <div className="font-medium">{member.name}</div>
              </div>
            </td>
  
            <td className="p-4">
              <div className="font-medium">{member.location}</div>
              <div className="text-xs text-gray-400 font-normal">Binangonan, Rizal</div>
            </td>
  
            <td className="p-4">
              <div className="font-medium">{member.area}</div>
              <div className="text-xs text-gray-400 font-normal">hectares</div>
            </td>
  
            {/* Centered TD */}
            <td className="p-4 text-center">
              <div className="font-medium">{member.president || "-"}</div>
            </td>
  
            {/* Centered TD */}
            <td className="p-4 text-center">
              <div className="font-medium">{member.members}</div>
            </td>
  
            <td className="p-4">
  <div className="flex justify-center items-center gap-3">
    {/* Group wrapper must be on the parent for hover to affect children */}
    <div className="group relative flex items-center justify-center w-5 h-5">
      {/* Details icon that moves on group hover */}
      <div
        onClick={() => {
          setSelectedAssociation(member);
          setShowDetailAssociationModal(true);
        }}
        className="transition-transform duration-300 ease-in-out group-hover:-translate-x-9 cursor-pointer"
      >
        <img src={Details} alt="Details" className="w-4 h-4" />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ease-in-out text-blue text-sm font-medium whitespace-nowrap">
        Details
      </span>
      </div>
    </div>

    {/* Delete icon stays still */}
    <span
      className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
      onClick={() => {
        setMemberToDelete(member.id);
        setIsDeleteModalOpe(true);
      }}
    >
      <img src={edtIcon} alt="Trash" className="w-4 h-4" />
    </span>
  </div>
</td>

          </tr>
        ))}
        {filteredMembers.length === 0 && (
          <tr>
            <td colSpan={7} className="p-4 text-center text-gray-600">No members found.</td>
          </tr>
        )}
      </tbody>
    </table>
  
  
  
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

  {showDetailAssociationModal && selectedAssociation && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white rounded-3xl w-[400px] max-w-full p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold">Association Details</h2>
          <p className="text-sm text-gray-600">Here's the details of this association.</p>
        </div>
        <button onClick={() => setShowDetailAssociationModal(false)} className="text-xl font-bold">&times;</button>
      </div>

      <div className="border-b border-gray-300 my-4"></div>

      {/* Image and name/location side-by-side */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={selectedAssociation.image}
          alt="Association"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-lg">{selectedAssociation.name}</h3>
          <p className="text-sm text-gray-700">{selectedAssociation.location}, Binangonan, Rizal</p>
        </div>
      </div>

      {/* Info Below Labels */}
      <div className="mt-4 text-sm space-y-4 text-left">
        <div>
          <p className="font-semibold text-gray-700">Association:</p>
          <p className="text-gray-900">{selectedAssociation.name}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Farm Location:</p>
          <p className="text-gray-900">{selectedAssociation.location}, Binangonan, Rizal</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Area (has.):</p>
          <p className="text-gray-900">{selectedAssociation.area}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">President:</p>
          <p className="text-gray-900">{selectedAssociation.president || "-"}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">No. of Members:</p>
          <p className="text-gray-900">{selectedAssociation.members}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-0 items-center mt-8">
        {/* Edit (Pencil2) */}
        <button
                className="flex items-center gap-2 text-sm font-medium font-semibold text-black px-4 py-2 rounded-full border border-transparent hover:border-blue focus:border-blue hover:text-blue focus:text-blue transition-all"
                onClick={() => {
                    handleEditClick(selectedAssociation);
                    setShowDetailAssociationModal(false);
                }}
                >
                <img src={Pencil2} alt="Edit" className="w-4 h-4" />
                Edit Details
                </button>


        <button className="flex items-center gap-2 text-sm font-medium font-semibold text-black px-4 py-2 rounded-full border border-transparent hover:border-blue focus:border-blue hover:text-blue focus:text-blue transition-all"
        onClick={() => setShowFarmerModal(true)}>
          <img src={Time} alt="Time" className="w-4 h-4" />
          View Farmers
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={() => setShowDetailAssociationModal(false)}
        className="mt-6 w-full bg-[#4CAE4F] text-white font-medium py-2 rounded-full"
      >
        Back
      </button>
    </div>
  </div>
)}


{showEditModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white rounded-3xl w-[420px] max-w-full p-6 shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-lg font-bold">Edit Association Details</h2>
          <p className="text-sm text-gray-600">Please edit the machinery.</p>
        </div>
        <button onClick={() => setShowEditModal(false)} className="text-xl font-bold">&times;</button>
      </div>

      <div className="border-b border-gray-300 my-4"></div>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={editFormData.image}
          alt="Association"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-lg">{editFormData.name}</h3>
          <p className="text-sm text-gray-700">{editFormData.location}, Binangonan, Rizal</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-semibold">
            Association Name{" "}
            <span className={validationErrors.name ? "text-red" : "text-gray"}>*</span>
          </label>
          <input
            name="name"
            value={editFormData.name}
            onChange={handleAssociationEditChange}
            className="input input-bordered w-full mt-1 rounded-full"
          />
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="text-sm font-semibold">
              Farm Location{" "}
              <span className={validationErrors.location ? "text-red" : "text-gray"}>*</span>
            </label>
            <select
              name="location"
              value={editFormData.location}
              onChange={handleAssociationEditChange}
              className="input input-bordered w-full mt-1 rounded-full"
            >
              <option value="">Select</option>
              <option value="Pantok">Pantok</option>
              <option value="Tatala">Tatala</option>
              <option value="Tagpos">Tagpos</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="text-sm font-semibold">City, Province</label>
            <input
              disabled
              value="Binangonan, Rizal"
              className="input input-bordered w-full mt-1 bg-gray-100 rounded-full"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">
            President{" "}
            <span className={validationErrors.president ? "text-red" : "text-gray"}>*</span>
          </label>
          <input
            name="president"
            value={editFormData.president}
            onChange={handleAssociationEditChange}
            className="input input-bordered w-full mt-1 rounded-full"
          />
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="text-sm font-semibold">
              Area (has.){" "}
              <span className={validationErrors.area ? "text-red" : "text-gray"}>*</span>
            </label>
            <input
              name="area"
              value={editFormData.area}
              onChange={handleAssociationEditChange}
              className="input input-bordered w-full mt-1 rounded-full"
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-semibold">
              No. of Members{" "}
              <span className={validationErrors.members ? "text-red" : "text-gray"}>*</span>
            </label>
            <input
              name="members"
              value={editFormData.members}
              onChange={handleAssociationEditChange}
              className="input input-bordered w-full mt-1 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6 gap-2">
      <button
            className="w-1/2 bg-red text-white font-semibold py-2 rounded-full"
            onClick={() => {
                setShowConfirmationModal(true);
                setShowEditModal(false);
            }}
            >
            Disregard
            </button>

        <button
            className="w-1/2 bg-green-600 text-white font-semibold py-2 rounded-full"
            onClick={() => {
                handleEditConfirm();
                setConfirmAction(true);
            }}
            >
            Confirm
            </button>

            </div>
            </div>
        </div>
        )}


{showFarmerModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white rounded-2xl w-[700px] max-w-full p-6 shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">Pantok Farmers Association</h2>
          <p className="text-sm text-gray-600">Here’s the farmers of this association.</p>
        </div>
        <button onClick={() => setShowFarmerModal(false)} className="text-xl font-bold">
          &times;
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search farmer name or code"
          className="input input-bordered w-full pl-10 rounded-full h-10 text-sm"
        />
        <svg className="w-4 h-4 absolute left-4 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.15 13.15z" />
        </svg>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="table w-full">
          <thead className="text-left text-sm text-black bg-[#F4F4F4]">
            <tr>
              <th>Farmer Name</th>
              <th>Code</th>
              <th>Address</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[...Array(4)].map((_, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2">Juan Dela Cruz</td>
                <td className="py-2">JDC192</td>
                <td className="py-2">
                  <div className="font-semibold">Masinag</div>
                  <div className="text-gray-500 text-xs">Bulacan</div>
                </td>
                <td className="py-2">
                  <div className="font-medium">20 Aug 1999</div>
                  <div className="text-gray-500 text-xs">78 Years Old</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2 items-center">
        <button className="px-2 py-1 rounded text-gray-400 cursor-not-allowed">{'<'}</button>
        <button className="btn btn-sm hover:bg-[#D9D9D9] rounded">1</button>
        <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-lg">{'>'}</button>
      </div>
    </div>
  </div>
)}

{isAddMemberModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-2xl w-[450px] max-w-full p-6 shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold">Add Association</h2>
          <p className="text-sm text-gray-600">Fill up the required fields.</p>
        </div>
        <button
          onClick={() => setIsAddMemberModalOpen(false)}
          className="text-xl font-bold text-gray-500 hover:text-black"
        >
          &times;
        </button>
      </div>
      <div className="border-b border-gray-300 my-4"></div>

      <div className="flex items-center gap-4 mb-4">
        <img
            src={Pantok}
            alt="Pantok.png"
            className="w-16 h-16 rounded-full object-cover"
        />
        <div>
            <h3 className="font-bold text-lg">Association Name</h3>
            <p className="text-sm text-gray-600">Farm Location</p>
        </div>
        </div>


      <div className="space-y-3">
        <div>
          <label className="text-sm font-semibold">Association Name <span className="text-red">*</span></label>
          <input type="text" placeholder="Please Enter Association Name" className="input input-bordered w-full rounded-full h-10 text-sm" />
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="text-sm font-semibold">Farm Location <span className="text-red">*</span></label>
            <select className="input input-bordered w-full rounded-full h-10 text-sm">
              <option>Select Farm Location</option>
              <option value="">Select</option>
              <option value="Pantok">Pantok</option>
              <option value="Tatala">Tatala</option>
              <option value="Tagpos">Tagpos</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="text-sm font-semibold">City, Province</label>
            <input
  type="text"
  placeholder="Binangonan, Rizal"
  className="input input-bordered w-full rounded-full h-10 text-sm bg-gray-100"
  value="Binangonan, Rizal"
  readOnly
/>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">President <span className="text-red">*</span></label>
          <input
  type="text"
  placeholder="Enter the President Name"
  className="input input-bordered w-full rounded-full h-10 text-sm"
  value={newMember.president}
  onChange={(e) => setNewMember({ ...newMember, president: e.target.value })}
/>
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="text-sm font-semibold">Area (has.)</label>
            <input
  type="text"
  placeholder="Enter the Area"
  className="input input-bordered w-full rounded-full h-10 text-sm"
  value={newMember.area}
  onChange={(e) => setNewMember({ ...newMember, area: e.target.value })}
/>
          </div>
          <div className="w-1/2">
            <label className="text-sm font-semibold">No. of Members <span className="text-red">*</span></label>
            <input
  type="number"
  placeholder="Enter the Quantity"
  className="input input-bordered w-full rounded-full h-10 text-sm"
  value={newMember.members}
  onChange={(e) => setNewMember({ ...newMember, members: e.target.value })}
/>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between gap-2">
      <button
            className="w-1/2 bg-red text-white py-2 rounded-full font-semibold hover:bg-red-700"
            onClick={() => {
                setShowConfirmationModal(true);
                setIsAddMemberModalOpen(false);
            }}
              
            >
          Disregard
        </button>
        <button
            className="w-1/2 bg-green-600 text-white py-2 rounded-full font-semibold hover:bg-green-700"
            onClick={() => {
                const newEntry = {
                  id: Date.now(),
                  ...newMember,
                };
                setMembers(prev => [...prev, newEntry]);
                setNewMember({ name: '', location: '', president: '', area: '', members: '', image: Pantok });
                setIsAddMemberModalOpen(false);
                setShowSuccessModal(true);
              }}
            >
            Confirm
            </button>

      </div>
    </div>
  </div>
)}

      
      </>
        )}
  
  
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
        The selected association will be permanently removed from your records.
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
            if (memberToDelete) {
              setFilteredMembers(prev => prev.filter(member => member.id !== memberToDelete));
              setSelectedMembers(prev => prev.filter(id => id !== memberToDelete));
            }
            setIsDeleteModalOpe(false);
            setMemberToDelete(null);
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

  

        {/* Edit Member Modal */}
        {editingMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#F8FCF8] p-6 rounded-3xl w-[450px] shadow-lg">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="user"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold leading-tight">
                      {editingMember.firstName} {editingMember.lastName}
                    </h2>
                    <p className="text-sm text-gray-600">{editingMember.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-800 text-xl"
                  aria-label="Close edit member modal"
                >
                  &times;
                </button>
              </div>
  
              <hr className="mb-4" />

              
  
              {/* Edit Member Modal */}
              <div className="space-y-1 ">
                
                {['firstName', 'lastName', 'role', 'number', 'DateofBirth', 'barangay', 'purok', 'street'].map((field) => (
                  <div key={field} className="flex items-center gap-4 ">
                    <div className="w-32 flex items-center gap-2 ">
                      {fieldIcons[field] ? (
                        <img src={fieldIcons[field]} alt={field} className="w-5 h-5" />
                      ) : (
                        <span className="w-5 h-5" /> // Empty placeholder to align labels
                      )}
                      <label className="capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                    </div>
                    <input
                      type={field === 'DateofBirth' ? 'date' : 'text'}
                      name={field}
                      value={editForm[field] || ''}
                      onChange={handleEditChange}
                      className="flex-1 p-2 rounded bg-[#F8FCF8] font-medium" 
                    />
                  </div>
                ))}
                <div className="flex items-center gap-4 ">
                  <div className="w-32 flex items-center gap-2">
                    <img src={fieldIcons.document} alt="document" className="w-5 h-5" />
                    <label className="capitalize">Document</label>
                  </div>
                  <input
                    type="file"
                    name="document"
                    onChange={handleEditChange}
                    className="flex-1 p-2 rounded font-medium"
                  />
                </div>
              </div>
  
              <div className="mt-6 flex justify-center items-center gap-4">
                <button
                  onClick={() => setShowConfirmationModal(true)}
                  className="px-12 py-2 bg-[#E02A3B] text-white border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white"
                >
                  Disregard
                </button>
                <button
                  onClick={handleConfirmEdit}
                  className="px-14 py-2 bg-[#4CAE4F] text-white border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
       {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-8 w-[500px] h-[300px] rounded-2xl shadow-md w-96 text-center relative border border-black">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
              onClick={() => setShowSuccessModal(false)}
            >
              &times;
            </button>
            <div className="mb-4 flex justify-center items-center">
              <img
                src={Success}
                alt="Success.png"
                className="w-[80px] max-w-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">Member added successfully!</h2>
            <p className="text-sm text-gray-600 mb-6">
              Everything’s set. Feel free to check the member!
            </p>
            <div className="flex justify-center gap-4 p-6">
              <button
                className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
                onClick={() => setShowSuccessModal(false)}
              >
                Back
              </button>
              <button
                className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                style={{ width: "130px", height: "39px" }}
                onClick={() => setShowSuccessModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
  
        {/* Confirmation Modal */}
        {confirmAction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-[25px] w-[480px] h-[310px] text-center border border-black">
              
                <div className="mb-4 flex justify-center items-center">
                <img
                  src={Success}
                  alt="Success.png"
                  className="w-[80px] max-w-full object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold mb-2">Details updated successfully!</h2>
              <p className="text-sm text-gray-600 mb-6">
                Everything’s set. Feel free to check it!
              </p>
              <div className="flex justify-center gap-4 p-9">
                <button
                  className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                  style={{ width: "130px", height: "39px" }}
                  onClick={cancelAction}
                >
                  Back
                </button>
                <button
                  className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                  style={{ width: "130px", height: "39px" }}
                  onClick={proceedAction}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Disregard Modal */}
        {showConfirmationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-3xl w-[400px] p-10 shadow-lg relative border border-black">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="absolute top-4 right-4 text-gray-400 text-xl"
              >
                ×
              </button>
              <div className="mb-4 flex justify-center items-center">
                      <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
                    </div>
              <h2 className="text-2xl text-center font-bold mb-2">Disregard editing?</h2>
              <p className="text-sm text-center text-gray-600">
              This action cannot be undone.
              </p>
              <p className="text-sm text-center text-gray-600">
                The changes will be lost.
              </p>
              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                  style={{ width: "130px", height: "39px" }}
                >
                  Cancel
                </button>
                <button
                onClick={() => {
                    setShowConfirmationModal(false);
                    setShowEditModal(false);
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
    );
  }
  
  