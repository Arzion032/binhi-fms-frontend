import React, { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa";	
import { Search, SlidersHorizontal, X } from "lucide-react";
import loop from '../assets/loop.png';
import Firstname from '../assets/Firstname.png';
import Role from '../assets/Role.png';
import Number from '../assets/Number.png';
import DOB from '../assets/DOB.png';
import Barangay from '../assets/Barangay.png';
import Docs from '../assets/Docs.png';
import Disregard from '../assets/Disregard.png';
import Success from '../assets/Success.png';
import edtIcon from '../assets/Trash.png';
import Pencil from '../assets/Pencil.png';
import Pantok from '../assets/Pantok.png';
import Tatala from '../assets/Tatala.png';
import Hulo from '../assets/Hulo.png';
import Tagpos from '../assets/Tagpos.png';
import Pugad from '../assets/Pugad.png';
import Samahang from '../assets/Samahang.png';
import NotificationModal from "./NotificationModal.jsx"; 


const currentMembersInitial = [
  {
    id: 1,
    name: "Pantok Farmers Association",
    location: "Pantok",
    area: "2.0",
    president: "Raul Picones",
    members: 2,
    image: Pantok,
  },
  {
    id: 2,
    name: "Tatala Farmers Association",
    location: "Tatala",
    area: "25",
    president: "Rolando Anore",
    members: 25,
    image: Tatala,
  },
  {
    id: 3,
    name: "Hulo, Darangan Farmers Association",
    location: "Darangan",
    area: "5.5",
    president: "Eutiquio Mercado",
    members: 6,
    image: Hulo,
  },
  {
    id: 4,
    name: "Tagpos Farmers Association",
    location: "Tagpos",
    area: "9.0",
    president: "-",
    members: 3,
    image: Tagpos,
  },
  {
    id: 5,
    name: "Pugad St. Monique Farmers Association",
    location: "Darangan",
    area: "49.2",
    president: "Marcelino Domingo",
    members: 45,
    image: Pugad,
  },
  {
    id: 6,
    name: "Samahang Magsasaka ng Darangan",
    location: "Darangan",
    area: "40.5",
    president: "Rolando Leoncio",
    members: 42,
    image: Samahang,
  },
];



export default function MemberTabs() {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [clusterForm, setClusterForm] = useState({
    name: '',
    president: '',
    location: '',
    area: '',
    members: '',
  });

  const openEditClusterModal = (member) => {
    setSelectedCluster(member);
    setClusterForm({
      name: member.name || '',
      president: member.president || '',
      location: member.location || '',
      area: member.area || '',
      members: member.members || '',
    });
    setIsEditModalOpen(true);
  };

  const handleClusterChange = (e) => {
    const { name, value } = e.target;
    setClusterForm((prev) => ({ ...prev, [name]: value }));
  };
  
  // Tabs: current, pending, rejected
  const [activeTab, setActiveTab] = useState("current");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);
  
  // Members state for current tab
  const [members, setMembers] = useState(currentMembersInitial);

  const [showRejectModal, setShowRejectModal] = useState(false);
  
  // Search states
  const [searchCurrent, setSearchCurrent] = useState("");
  const [searchRejected, setSearchRejected] = useState("");
  
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
    street: '',
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteModalOpe, setIsDeleteModalOpe] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDisregard = () => {
    setShowRejectModal(false); // Close the first modal
    setShowConfirmationModal(true); // Show the confirmation modal
  };

  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const clearFilters = () => {
    setSelectedRole("");
  };

  const handleConfirmDisregard = () => {
    setShowConfirmationModal(false); // Close the confirmation modal
    setShowSuccessMessage(true); // Show the success message
  };
  
  // Success and confirm modals
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // eg {type:'deleteMember',id:1}
  const [showApproveReject, setShowApproveReject] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Filter functions
  const filterMembersBySearch = (list, search) => {
    if (!search.trim()) return list;
    return list.filter(m => {
      const fullName = (m.firstName ? (m.firstName + " " + (m.lastName || "")).toLowerCase() : m.name?.toLowerCase?.() || "");
      return fullName.includes(search.toLowerCase());
    });
  };
  
  

  // Handle underline movement for tabs
  useEffect(() => {
    const index = ["current"].indexOf(activeTab);
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

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  const getDaysAgo = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    return `${diff} day${diff !== 1 ? 's' : ''}`;
  };
  
  // Toggle select member by id
  const toggleSelectMember = (id) => {
    setSelectedMembers(prev => prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]);
  };

  // Bulk delete selected members
  const handleBulkDelete = () => {
    setMembers(prev => prev.filter(m => !selectedMembers.includes(m.id)));
    setSelectedMembers([]);
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

  // Add member submit
  const handleAddMemberSubmit = () => {
    if(addMemberForm.password !== addMemberForm.confirmPassword){
      alert("Passwords do not match!");
      return;
    }
    const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
    const newMember = {
      id: newId,
      firstName: addMemberForm.firstName,
      lastName: addMemberForm.lastName,
      email: addMemberForm.emailOrPhone,
      role: "Member",
      address: addMemberForm.address,
      dob: addMemberForm.DateofBirth || '',
      dateAdded: (new Date()).toDateString(),
      barangay: addMemberForm.barangay,
      purok: addMemberForm.purok,
      street: addMemberForm.street,
    };
    setMembers([...members, newMember]);
    setSuccessModalOpen(true);
    setIsAddMemberModalOpen(false);
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
                : activeTab === "pending"
                ? "Pending Members"
                : "Rejected Members"}
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
      {["current", "pending", "rejected"].map((tab, index) => (
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
              <img
                src={loop}
                alt="loop"
                className="ml-5 mr-5 w-[20px] max-w-full object-contain"
              />
              <span className="text-[15.5px] text-lg font-semibold mr-2">All Clusters</span>
              <span className="text-gray-400 font-normal text-xs">15</span>
            </div>
            
            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
      <div className="relative w-[280px] flex items-center border rounded-full px-3 py-1 bg-white">
        <Search className="text-gray-500 w-5 h-5 mr-2 " />
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

       {/* Filter Panel */}
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

              {/* Add Member Button */}
              <button
                onClick={() => {
                  setIsAddMemberModalOpen(true);
                  setAddMemberForm({ step: 1, emailOrPhone: '', password: '', confirmPassword: '', firstName: '', lastName: '', address: '', barangay: '', purok: '', street: '' });
                }}
                className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-7 h-[35px]"
                data-model-id="1391:4664"
              >
                <FaPlus className="w-4 h-4" />
                <span className="font-semibold text-[15px]">Add Member</span>
              </button>
            </div>
          </div>

          {/* Bulk Delete Button */}
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" tabIndex={0}>
            <div className="flex justify-between items-center">
            </div>

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
        <th className="p-4 text-left">Actions</th>
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

          <td className="p-4 flex gap-2">
          <div className="flex justify-center items-center gap-3">
            <span
              onClick={() => openEditClusterModal(member)}
              className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
              aria-label={`Edit member ${member.name}`}
            >
              <img src={Pencil} alt="Edit" className="w-4 h-4" />
            </span>
            </div>
            <span
              className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <img src={edtIcon} alt="Delete" className="w-4 h-4" />
            </span>
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
</div>

    {/* Editable Modal */}
    {isEditModalOpen && selectedCluster && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-[#F7FAF6] rounded-3xl p-8 w-[450px] max-w-lg border border-black relative shadow-lg">
      <button
        onClick={() => setIsEditModalOpen(false)}
        className="absolute top-4 right-4 text-xl font-bold"
      >
        ×
      </button>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={selectedCluster.image}
          alt={selectedCluster.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            value={clusterForm.name}
            onChange={handleClusterChange}
            className="font-semibold text-lg bg-transparent outline-none"
            placeholder="Cluster Name"
          />
          <input
            type="text"
            name="president"
            value={clusterForm.president}
            onChange={handleClusterChange}
            className="text-gray-600 text-sm bg-transparent outline-none"
            placeholder="President name"
          />
        </div>
      </div>

      <hr className="my-4 border-gray-300" />
      <div className="space-y-1">
        {[
          { name: 'firstName', label: 'First Name' },
          { name: 'lastName', label: 'Last Name' },
          { name: 'role', label: 'Role' },
          { name: 'number', label: 'Number' },
          { name: 'DateofBirth', label: 'Date of Birth', type: 'date' },
          { name: 'barangay', label: 'Barangay' },
          { name: 'purok', label: 'Purok' },
          { name: 'street', label: 'Street' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name} className="flex items-center gap-4">
            <div className="w-32 flex items-center gap-2">
              {fieldIcons[name] ? (
                <img src={fieldIcons[name]} alt={name} className="w-5 h-5" />
              ) : (
                <span className="w-5 h-5" />
              )}
              <label>{label}</label>
            </div>
            <input
              type={type}
              name={name}
              value={clusterForm[name] || ''}
              onChange={handleClusterChange}
              className="flex-1 p-2 rounded bg-[#F8FCF8] font-medium"
            />
          </div>
        ))}

        {/* Document Field */}
        <div className="flex items-center gap-4">
          <div className="w-32 flex items-center gap-2">
            <img src={fieldIcons.document} alt="document" className="w-5 h-5" />
            <label>Document</label>
          </div>
          <input
            type="file"
            name="document"
            onChange={handleClusterChange}
            className="flex-1 p-2 rounded font-medium"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={() => setShowConfirmationModal(true)}
          className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
          style={{ width: "170px", height: "39px" }}
        >
          Disregard
        </button>
        <button
          onClick={handleConfirmEdit}
          className="px-10 py-2 bg-[#4CAE4F] text-white rounded-full hover:bg-green-600"
          style={{ width: "170px", height: "39px" }}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

        </>
      )}

      

      {/* Confirmation Modal */}
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
                
                className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
              >
                Disregard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-3xl w-[430px] h-[320px] p-7 shadow-lg relative border border-black">
          <button
              onClick={() => setShowConfirmationModal(false)}
              className="absolute top-4 right-5 text-gray-400 text-2xl"
            >
              ×
            </button>
          <div className="mb-4 flex justify-center items-center">
                    <img src={Success} alt="Success.png" className="w-[80px] max-w-full object-contain" />
                  </div>
            <h2 className="text-2xl text-center font-bold mb-2">
              Member Rejected Successfully!
            </h2>
            <p className="text-sm text-center text-gray-600">
            Everything’s set. Feel free to check it!
            </p>
            <div className="flex justify-center gap-3 mt-16">
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"                
                style={{ width: "130px", height: "39px" }}
              >
                Back
              </button>
              <button
                onClick={() => setShowSuccessMessage(false)}
                
                className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                style={{ width: "130px", height: "39px" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
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
                onClick={() => setShowConfirmationModal(false)}
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

