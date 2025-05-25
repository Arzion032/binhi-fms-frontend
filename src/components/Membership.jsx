import React, { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa";	
import { Search, SlidersHorizontal, X } from "lucide-react";
import Step1 from '../assets/Step1.png';
import Step2 from '../assets/Step2.png';
import loop from '../assets/loop.png';
import Member from '../assets/Member.png';
import Firstname from '../assets/Firstname.png';
import Role from '../assets/Role.png';
import Number from '../assets/Number.png';
import DOB from '../assets/DOB.png';
import Barangay from '../assets/Barangay.png';
import Docs from '../assets/Docs.png';
import Juan from '../assets/Juan.png';
import Disregard from '../assets/Disregard.png';
import Success from '../assets/Success.png';
import Alert from '../assets/Alert.png';
import editIcon from '../assets/Edit.png';
import edtIcon from '../assets/Trash.png';
import Pencil from '../assets/Pencil.png';
import PDF from '../assets/PDF.png';


const currentMembersInitial = [
  {
    id: 1,
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juandelacruz@gmail.com",
    role: "Member",
    address: "Masiang, Bulacan",
    dob: "20 Aug 1999",
    dateAdded: "March 21, 2025",
  },
  {
    id: 1,
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juandelacruz@gmail.com",
    role: "Member",
    address: "Masiang, Bulacan",
    dob: "20 Aug 1999",
    dateAdded: "March 21, 2025",
  },
  {
    id: 1,
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juandelacruz@gmail.com",
    role: "Member",
    address: "Masiang, Bulacan",
    dob: "20 Aug 1999",
    dateAdded: "March 21, 2025",
  },
  {
    id: 1,
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juandelacruz@gmail.com",
    role: "Member",
    address: "Masiang, Bulacan",
    dob: "20 Aug 1999",
    dateAdded: "March 21, 2025",
  },
  {
    id: 1,
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juandelacruz@gmail.com",
    role: "Member",
    address: "Masiang, Bulacan",
    dob: "20 Aug 1999",
    dateAdded: "March 21, 2025",
  },
  
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

const rejectedData = [
  {
    name: "Juan Dela Cruz",
    email: "juandcruz@gmail.com",
    appliedAs: "Member",
    reason: "Duplicate Registration",
    document: "nat_id_juandc.pdf",
    date: "March 21, 2025",
    daysAgo: "5 days ago",
  },
  {
    name: "Juan Dela Cruz",
    email: "juandcruz@gmail.com",
    appliedAs: "Member",
    reason: "Invalid Document",
    document: "nat_id_juandc.pdf",
    date: "March 21, 2025",
    daysAgo: "5 days ago",
  },
  {
    name: "Juan Dela Cruz",
    email: "juandcruz@gmail.com",
    appliedAs: "Member",
    reason: "Suspicious Information",
    document: "nat_id_juandc.pdf",
    date: "March 21, 2025",
    daysAgo: "5 days ago",
  },
  {
    name: "Juan Dela Cruz",
    email: "juandcruz@gmail.com",
    appliedAs: "Member",
    reason: "Suspicious Information",
    document: "nat_id_juandc.pdf",
    date: "March 21, 2025",
    daysAgo: "5 days ago",
  },
  {
    name: "Juan Dela Cruz",
    email: "juandcruz@gmail.com",
    appliedAs: "Member",
    reason: "Suspicious Information",
    document: "nat_id_juandc.pdf",
    date: "March 21, 2025",
    daysAgo: "5 days ago",
  },
  {
    name: "Juan Dela Cruz",
    email: "juandcruz@gmail.com",
    appliedAs: "Member",
    reason: "Suspicious Information",
    document: "nat_id_juandc.pdf",
    date: "March 21, 2025",
    daysAgo: "5 days ago",
  },
];



export default function MemberTabs() {
  
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
  const [showApproveMessage, setShowApproveMessage] = useState(false);
  const [showAcceptedMessage, setShowAcceptedMessage] = useState(false);
  const [isApplicationDetailsOpen, setIsApplicationDetailsOpen] = useState(false);
  const [showApproveReject, setShowApproveReject] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleApprove = () => {
    setShowApproveReject(false);
    setShowSuccessModal(true);
  };

  // Filter functions
  const filterMembersBySearch = (list, search) => {
    if (!search.trim()) return list;
    return list.filter(m => {
      const fullName = (m.firstName ? (m.firstName + " " + (m.lastName || "")).toLowerCase() : m.name?.toLowerCase?.() || "");
      return fullName.includes(search.toLowerCase());
    });
  };
  
  // Filtered members for current tab
  const filteredMembers = filterMembersBySearch(members, searchCurrent);
  
  // For rejected members search
  const [rejectedMembers] = useState(rejectedMembersInitial);
  const filteredRejectedMembers = filterMembersBySearch(rejectedMembers, searchRejected);

  // Handle underline movement for tabs
  useEffect(() => {
    const index = ["current", "pending", "rejected"].indexOf(activeTab);
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

  // Bulk delete selected members
  const handleBulkDelete = () => {
    setMembers(prev => prev.filter(m => !selectedMembers.includes(m.id)));
    setSelectedMembers([]);
  };

  // Handle edit click
  const handleEditClick = (member) => {
    setEditingMember(member);
    setEditForm({
      firstName: member.firstName || '',
      lastName: member.lastName || '',
      role: member.role || '',
      number: member.number || '',
      DateofBirth: member.dob || '',
      barangay: member.barangay || '',
      purok: member.purok || '',
      street: member.street || '',
      document: member.document || '',
      email: member.email || '',
    });
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
    {/* Navbar with breadcrumbs and dots icon */}
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex-1">
        <div className="text-sm breadcrumbs font-inter text-base">
          <ul>
            <li><a className="text-binhigreen underline">Dashboard</a></li>
            <li><a className="text-binhigreen underline">Membership Management</a></li>
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

      {/* Dots Button */}
      <button className="btn btn-square btn-binhi ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h.01M12 12h.01M19 12h.01"
          />
        </svg>
      </button>
    </div>

    {/* Page Title */}
    <div className="px-6 pb-4 h-5 flex items-center">
      <h1 className="text-[40px] font-bold text-gray-800">Membership Management</h1>
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
              <span className="text-[15.5px] text-lg font-semibold mr-2">All Members</span>
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
                className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2"
                data-model-id="1391:4664"
              >
                <FaPlus className="w-5 h-5" />
                <span className="font-semibold text-[16px]">Add Member</span>
              </button>
            </div>
          </div>

          {/* Bulk Delete Button */}
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" tabIndex={0}>
            <div className="flex justify-between items-center">
            </div>

            {/* Table */}
            <div className="overflow-x-auto py-0">
            <table className="table w-full">
              <thead>
                <tr className="text-left" style={{ backgroundColor: "#F4F4F4" }}>
                  <th className="p-4 rounded-tl-lg rounded-tr-lg">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded"
                      checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                      onChange={toggleSelectAll}
                      aria-label="Select all members"
                    />
                  </th>
                  <th className="p-4">User Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Date of Birth</th>
                  <th className="p-4">Date Added</th>
                  <th className="p-4">Actions</th>
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
                        aria-label={`Select member ${member.firstName} ${member.lastName}`}
                      />
                    </td>
                    <td className="p-4 flex items-center">
                      <img
                        src={Juan}
                        alt={`${member.firstName} ${member.lastName}`}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div>{member.firstName} {member.lastName}</div>
                        <div className="text-sm text-gray-600">{member.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div
                        className="text-center font-bold"
                        style={{
                          color: '#0038A8',
                          borderRadius: '200px',
                          border: '0.75px solid #0038A8',
                          opacity: 0.75,
                          background: '#C0D5FF',
                          padding: '0px 8px',
                          fontSize: '12px',
                          display: 'inline-block',
                        }}
                      >
                        {member.role}
                      </div>
                    </td>
                    <td className="p-4">{member.address}</td>
                    <td className="p-4">{member.dob}</td>
                    <td className="p-4">{member.dateAdded}</td>
                    <td className="p-4 flex gap-2">

                    <span
                      onClick={() => handleEditClick(member)}
                      className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
                      aria-label={`Edit member ${member.firstName} ${member.lastName}`}
                    >
                      <img src={Pencil} alt="Pencil" className="w-4 h-4" />
                    </span>


                    <span className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block">
                        <img src={edtIcon} alt="Trash" className="w-4 h-4" />
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

            <div className="flex justify-center mt-10 mb-4">
<div className="join space-x-10">
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">1</button>
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">2</button>
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">3</button>
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">4</button>
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">5</button>
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">...</button>
</div>
</div>
          </div>
          </div>
        </>
      )}

      {/* Pending Members Tab */}
      {activeTab === "pending" && (
  <>
    <div className="flex items-center justify-between w-full mb-4">
      {/* Left Side */}
      <div className="flex items-center">
        <img
          src={loop}
          alt="loop"
          className="ml-5 mr-5 w-[20px] max-w-full object-contain"
        />
        <span className="text-[15.5px] text-lg font-semibold mr-2">
          Pending Members
        </span>
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

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-[#858585] h-[35px] text-sm bg-white text-[#858585]"
          >
            <option value="">Document</option>
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
          className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2"
        >
          <FaPlus className="w-5 h-[15px]" />
          <span className="font-semibold text-[15px]">Add Member</span>
        </button>
      </div>
    </div>

    {/* Main Content */}
    <div className="p-0 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel " tabIndex={0}>
      <div className="flex h-[691px] w-full p-4 bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/5 bg-white rounded-xl shadow-md p-4 border border-black">
          {/* Fixed Header */}
          <div className="w-full bg-[#D9D9D9] px-4 py-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">Sort:</span>
              <span className="text-sm font-bold text-gray-600">Date Added</span>
            </div>
          </div>

          {/* Scrollable User List */}
          <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '620px' }}>
            {/* Example list items */}
            {[
              'Juan Dela Cruz',
              'Miles Padilla Ocampo',
              'Jayson Labrador Padilla',
              'Ryuu Tenn de Mesa',
              'Yuji Silva Fortunado',
              'Juan Dela Cruz',
              'Miles Padilla Ocampo',
              'Jayson Labrador Padilla',
              'Ryuu Tenn de Mesa',
              'Yuji Silva Fortunado',
            ].map((name, idx) => {
              const role = Math.random() > 0.5 ? 'Farmer' : 'Member';
              const avatarId = 10 + idx; // ensures different avatars
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2 rounded-xl cursor-pointer"
                  style={{ backgroundColor: '#FFFFFF' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D9D9D9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  <img
                    src={`https://i.pravatar.cc/40?img=${avatarId}`}
                    alt="user"
                    className="rounded-full w-10 h-10"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'path/to/local/image.png';
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{name}</span>
                    <span
                      className="text-center font-bold"
                      style={{
                        color: '#0038A8',
                        borderRadius: '200px',
                        border: '0.75px solid #0038A8',
                        opacity: 0.75,
                        background: '#C0D5FF',
                        padding: '0px 8px',
                        fontSize: '10px',
                        display: 'inline-block',
                        height: '16px',
                        width: '60px',
                      }}
                    >
                      {role}
                    </span>
                    <span className="text-xs text-gray-400">Apr 9, 2025, 11:34 AM</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Panel */}
        <div className="flex-1 bg-white rounded-xl shadow-md ml-4 p-6 border border-black">
          <div className="flex justify-between items-start mb-6 ">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/40"
                alt="user"
                className="rounded-full w-12 h-12"
              />
              <div>
                <h2 className="text-lg font-semibold">Juan Dela Cruz</h2>
                <p className="text-sm text-gray-500">juandelacruz@gmail.com</p>
              </div>
            </div>
            <div className="text-gray-400 text-2xl cursor-pointer">•••</div>
          </div>

          <div className="border-b border-gray-300 my-4"></div>

          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Applied as</p>
              <span
                className="text-center font-bold"
                style={{
                  color: '#0038A8',
                  borderRadius: '200px',
                  border: '0.75px solid #0038A8',
                  opacity: 0.75,
                  background: '#C0D5FF',
                  padding: '0px 8px',
                  fontSize: '10px',
                  display: 'inline-block',
                  height: '18px',
                  width: '60px',
                }}
              >
                Member
              </span>
            </div>

            <div>
              <p className="font-semibold">Uploaded Document</p>
              <p className="text-xs text-gray-500">National ID</p>
              <a href="#" className="text-blue-600 underline">
                nat_id_juande.pdf
              </a>
              <p className="text-xs text-gray-400">Click to view</p>
            </div>

            <div>
              <p className="font-semibold">Date of Birth</p>
              <p>July 17, 1997</p>
            </div>

            <div>
              <p className="font-semibold">Address</p>
              <p>Matthew St., Macamot, Bulacan</p>
            </div>

            <div>
              <p className="font-semibold">Submitted on</p>
              <p>March 12, 2025, 11:34 AM</p>
            </div>
          </div>

          <div className="border-b border-gray-300 my-4"></div>

          <div className="flex justify-end gap-4 mt-20">
            <button
              onClick={() => setShowRejectModal(true)}
              className="px-4 py-2 rounded-3xl bg-[#FF3B4E] font-bold text-white hover:bg-red-600"
              style={{ width: '156px', height: '39px' }}
            >
              Reject
            </button>
            <button
              onClick={() => setShowApproveMessage(true)}   
              className="px-4 py-2 rounded-3xl bg-[#4CAE4F] font-bold text-white hover:bg-green-600"
              style={{ width: '156px', height: '39px' }}
            >
              Approve
            </button>
          </div>
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-3xl w-[400px] p-9 shadow-lg relative border border-black">
            <button
              onClick={() => setShowRejectModal(false)}
              className="absolute top-4 right-4 text-gray-400 text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-2">Are you sure?</h2>
            <p className="text-sm text-gray-600 mb-4">
              Please state your reason for rejection.
            </p>

            <div className="border-b border-gray-300 my-4"></div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 ">
                Reason for Rejection <span className="text-red-500">*</span>
              </label>
              <select className="w-full p-2 border rounded text-sm rounded-full">
                <option value="">Please select the reason</option>
                <option value="incomplete">Incomplete Requirements</option>
                <option value="invalid">Invalid Document</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 ">
                Remarks or Notes
              </label>
              <textarea
                className="w-full p-2 border rounded h-20 text-sm rounded-3xl"
                placeholder="Remarks or Notes"
              ></textarea>
            </div>

            <div className="flex justify-center gap-1 mt-6">
              <button
                onClick={handleDisregard} // Triggers the confirmation modal
                className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-red-600 text-sm"
                style={{ width: "156px", height: "39px" }}
              >
                Disregard
              </button>
              <button
              onClick={() => {
                setShowRejectModal(false);      // Close reject modal
                setShowSuccessMessage(true);    // Show success message
              }}
                className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                style={{ width: "156px", height: "39px" }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
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

      {/* Approve Message */}
      {showApproveMessage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-3xl w-[430px] h-[300px] p-7 shadow-lg relative border border-black">
      <button
        onClick={() => setShowApproveMessage(false)}  // Fixed
        className="absolute top-4 right-5 text-gray-400 text-2xl"
      >
        ×
      </button>
      <div className="mb-4 flex justify-center items-center">
        <img
          src={Alert}
          alt="Alert.png"
          className="w-[80px] max-w-full object-contain"
        />
      </div>
      <h2 className="text-2xl text-center font-bold mb-2">
        Approve member?
      </h2>
      <p className="text-sm text-center text-gray-600">
        The selected member will be moved
      </p>
      <p className="text-sm text-center text-gray-600">
        to current members.
      </p>
      <div className="flex justify-center gap-3 mt-9">
        <button
          onClick={() => setShowApproveMessage(false)}  // Fixed
          className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
          style={{ width: "130px", height: "39px" }}
        >
          Cancel
        </button>
        <button
          onClick={() => setShowAcceptedMessage(true)}  // Fixed
          className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
          style={{ width: "130px", height: "39px" }}
        >
          Approve
        </button>
      </div>
    </div>
  </div>
)}
{showAcceptedMessage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-3xl w-[420px] h-[290px] p-6 shadow-lg text-center border border-black">
      <div className="mb-4 flex justify-center items-center">
        <img
          src={Success}
          alt="Success.png"
          className="w-[80px] max-w-full object-contain"
        />
      </div>
      <h2 className="text-2xl font-bold mb-2">
        Member accepted successfully!!
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Everything’s set. Feel free to check it!
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowAcceptedMessage(false)} // Correct state
          className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
          style={{ width: "130px", height: "39px" }}
        >
          Back
        </button>
        <button
          onClick={() => setShowAcceptedMessage(false)} // Correct state
          className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
          style={{ width: "130px", height: "39px" }}
        >
          Done
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    </div>
  </>
)}


      {/* Rejected Members Tab */}
      {activeTab === "rejected" && (
        <>
        <div className="flex items-center justify-between w-full mb-4">
            {/* Left Side */}
            <div className="flex items-center">
              <img
                src={loop}
                alt="loop"
                className="ml-5 mr-5 w-[20px] max-w-full object-contain"
              />
              <span className="text-[15.5px] text-lg font-semibold mr-2">Rejected Members</span>
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

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-[#858585] h-[35px] w-[150px] text-sm bg-white text-[#858585]"
          >
            <option value="">Reason of Rejection</option>
            <option value="admin">Duplicate Registration</option>
            <option value="member">Invalid Document</option>
            <option value="admin">Suspicious Information</option>
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
                className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2"
                data-model-id="1391:4664"
              >
                <FaPlus className="w-5 h-[15px]" />
                <span className="font-semibold text-[15px]">Add Member</span>
              </button>
            </div>
          </div>

           {/* Bulk Delete Button */}
           <div className="rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" tabIndex={0}>
            <div className="flex justify-between items-center">
            </div>

          {/* Table */}
         <div className="overflow-x-auto">
      <table className="table w-full">
        <thead className="bg-gray-50 text-gray-700 font-semibold">
        <tr className="text-left" style={{ backgroundColor: "#F4F4F4" }}>
            <th className="p-4 rounded-tl-lg rounded-tr-lg">
              <input
               className="checkbox checkbox-sm rounded"
                type="checkbox"
                checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
          onChange={toggleSelectAll}
          aria-label="Select all members"
              />
            </th>
            <th className="p-4">User Name</th>
            <th className="p-4">Applied As</th>
            <th className="p-4">Reason of Rejection</th>
            <th className="p-4">Document</th>
            <th className="p-4">Rejected on</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {rejectedData.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm rounded"
                />
              </td>
              <td className="p-4 flex items-center">
                <img
                src={Juan}
                alt={rejectedMembers.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
                  
                />

                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500 font-medium">{item.email}</div>
                </div>
              </td>
              <td className="p-4">
                <span className="text-center font-bold"
                      style={{
                        color: '#0038A8',
                        borderRadius: '200px',
                        border: '0.75px solid #0038A8',
                        opacity: 0.75,
                        background: '#C0D5FF',
                        padding: '0px 8px',
                        fontSize: '12px',
                        display: 'inline-block',
                      }}
                    >
                  {item.appliedAs}
                </span>
              </td>
              <td className="p-4">
                <span className="text-center font-bold"
                      style={{
                        color: '#A51B29',
                        borderRadius: '200px',
                        border: '0.75px solid #A51B29',
                        opacity: 0.75,
                        background: '#FFDBDE',
                        padding: '0px 8px',
                        fontSize: '12px',
                        display: 'inline-block',
                      }}
                    >
                  {item.reason}
                </span>
              </td>
              <td className="p-4">
              <a href="/path/to/nat_id_juandc.pdf" className="text-[#0038A8] text-sm font-medium underline" target="_blank" rel="noopener noreferrer">
                          <img src={PDF} alt="PDF" className="inline-block mr-2" width="20" height="20" />
                  {item.document}
                </a>
                <div className="text-xs text-gray-400">Click to view</div>
              </td>
              <td className="p-4">
                <div className="text-sm font-bold">{item.date}</div>
                <div className="text-xs text-gray-400">{item.daysAgo}</div>
              </td>
              <td className="p-4 flex items-center gap-3">
              <span
                      className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
                      onClick={() => setIsApplicationDetailsOpen(true)}
                    >
                      <img src={editIcon} alt="Edit" className="w-4 h-4" />
                    </span>
                <span className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block">
                    <img src={edtIcon} alt="Trash" className="w-4 h-4" />
                </span>
              </td>
            </tr>
          ))}

                  {isApplicationDetailsOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white rounded-3xl p-6 w-[400px] shadow-lg relative border border-black">
                        <button
                          className="absolute top-3 right-3 text-gray-500 text-3xl"
                          onClick={() => setIsApplicationDetailsOpen(false)}
                        >
                          ×
                        </button>
                        <h2 className="text-2xl font-bold mb-1">Application Details</h2>
                        <p className="text-base text-gray-500 mb-4">Here is the details of the application.</p>
                        <div className="border-b border-gray-300 my-4"></div>
                        <div className="space-y-1 text-base">
                          <p><strong>Name</strong></p>
                          </div>
                          <div className="space-y-4 text-base">
                          <p>Juan Dela Cruz</p>
                          <p><strong>Applied as</strong></p>
                          </div>
                          <div className="space-y-4 text-base">
                          <p>Member</p>
                          <p><strong>Reason of Rejection</strong></p>
                          </div>
                          <div className="space-y-4 text-base">
                          <p>Duplicate Rejection</p>
                          <p><strong>Document</strong></p>
                          </div>
                          <div className="space-y-4 text-base">
                          <p>National ID</p>
                          <a href="/path/to/nat_id_juandc.pdf" className="text-[#0038A8] underline" target="_blank" rel="noopener noreferrer">
                          <img src={PDF} alt="PDF" className="inline-block mr-2" width="20" height="20" />
                          nat_id_juandc.pdf
                         </a>
                          <p><strong>Applied on</strong></p>
                          </div>
                          <div className="space-y-4 text-base">
                          <p>March 15, 2025</p>
                          <p><strong>Rejected on</strong> </p>
                          </div>
                          <div className="space-y-4 text-base">
                          <p>March 21, 2025</p>
                        </div>
                        <div className="flex justify-center gap-2 mt-4">
                          <button
                            className="px-4 py-2 rounded-3xl bg-[#FF3B4E] font-medium text-white hover:bg-red-600"
                            style={{ width: '156px', height: '39px' }}
                            onClick={() => setShowConfirmationModal(true)}
                          >
                            Back
                          </button>
                          <button
                            className="px-4 py-2 rounded-3xl bg-[#4CAE4F] font-medium text-white hover:bg-green-600 text-sm"
                            style={{ width: "156px", height: "39px" }}
                            onClick={() => setShowApproveReject(true)}
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

{showApproveReject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-8 rounded-3xl w-[450px] shadow-md w-96 text-center relative border border-black">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
              onClick={() => setShowApproveReject(false)}
            >
              &times;
            </button>
            <div className="mb-4 flex justify-center items-center">
                    <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
                  </div>
            <h2 className="text-2xl font-bold mb-2">Approve member?</h2>
            <p className="text-sm text-gray-600 mb-6">
              The selected member will be moved to current members.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-11 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white font-bold"
                onClick={() => setShowApproveReject(false)}
              >
                Cancel
              </button>
              <button
                className="px-10 py-2 bg-[#FF3B4E] text-white rounded-full hover:bg-[#E02A3B] font-bold"
                onClick={handleApprove}
              >
                Approve
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

        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-10 mb-4">
<div className="join space-x-10">
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">1</button>
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">2</button>
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">3</button>
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">4</button>
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">5</button>
  <button className="join-item btn bg-[#F8FCF8] text-[#909090] hover:bg-[#409943]">...</button>
</div>
</div>
    </div>
    </div>
        </>
      )}

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          <div
            className={`bg-[#F8FCF8] dark:bg-gray-700 p-6 rounded-3xl relative w-[523px] border border-black ${
              addMemberForm.step === 1 ? 'h-[775px]' : 'h-auto'
            }`}
          >
            {/* X Button */}
            <button
              onClick={() => setConfirmAction('discardChanges')}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close add member modal"
            >
              ✖
            </button>

            {/* Step 1 */}
            {addMemberForm.step === 1 && (
              <div className="space-y-4">
                <div className="mb-4">
                  <img src={Step1} alt="Step 1" />
                </div>
                <div className="flex flex-col gap-3">
                  <label>Phone Number/Email</label>
                  <input
                    type="text"
                    name="emailOrPhone"
                    value={addMemberForm.emailOrPhone}
                    onChange={handleAddMemberInputChange}
                    className="w-[450px] h-[60px] border rounded-full mx-auto"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={addMemberForm.password}
                    onChange={handleAddMemberInputChange}
                    className="w-[450px] h-[60px] border rounded-full mx-auto"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Re-enter Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={addMemberForm.confirmPassword}
                    onChange={handleAddMemberInputChange}
                    className="w-[450px] h-[60px] border rounded-full mx-auto"
                  />
                </div>

                {/* Password Requirements */}
                <div className="text-sm text-gray-600 mt-2">
                  <p>Your password must contain...</p>
                  <ul className="list-disc pl-5">
                    <li className="text-[#4CAE4F]">Minimum of 8 Characters</li>
                    <li className="text-[#4CAE4F]">At least 1 lower and upper case letters</li>
                    <li className="text-[#4CAE4F]">At least 1 symbol (@#$)</li>
                    <li className="text-[#4CAE4F]">At least 1 number (123)</li>
                  </ul>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => {
                      if (addMemberForm.password !== addMemberForm.confirmPassword) {
                        alert("Passwords do not match!");
                        return;
                      }
                      setAddMemberForm((prev) => ({ ...prev, step: 2 }));
                    }}
                    className="w-[476px] h-[60px] bg-[#4CAE4F] text-white rounded-full hover:bg-[#429C3D]"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {addMemberForm.step === 2 && (
              <div className="space-y-6">
                <div className="mb-4">
                  <img src={Step2} alt="Step 2" />
                </div>
                <div className="flex gap-4">
                  <div className="bg-[#F8FCF8] dark:bg-gray-700 rounded-lg flex-1 flex flex-col">
                    <label className="block mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={addMemberForm.firstName}
                      onChange={handleAddMemberInputChange}
                      className="h-[60px] p-2 border rounded-full"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={addMemberForm.lastName}
                      onChange={handleAddMemberInputChange}
                      className="h-[60px] p-2 border rounded-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={addMemberForm.address}
                    onChange={handleAddMemberInputChange}
                    className="h-[60px] p-2 border rounded-full"
                  />
                </div>
                {/* Map Placeholder */}
                <div className="w-full h-40 bg-gray-300 rounded flex justify-center items-center text-gray-600">
                  Map Placeholder
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleAddMemberSubmit}
                    className="w-[476px] h-[60px] bg-[#4CAE4F] text-white rounded-full hover:bg-[#429C3D]"
                  >
                    Finish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white dark:bg-gray-800 p-6 w-[90%] max-w-sm relative rounded-[25px] border border-black"
          >
            <button
              onClick={() => setConfirmAction('discardChanges')}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close success modal"
            >
              ✖
            </button>

            <div className="mb-6 text-center">
              <div className="mb-4">
                <img src={Member} alt="Member" />
              </div>
              
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setSuccessModalOpen(false);
                  setIsAddMemberModalOpen(true);
                  setAddMemberForm(prev => ({ ...prev, step: 2 }));
                }}
                className="px-10 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white font-bold"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setSuccessModalOpen(false);
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
                }}
                className="px-10 py-2 bg-[#4CAE4F] text-white rounded-full hover:bg-green-600 font-bold"
              >
                Done
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

            {/* Edit Form Fields */}
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

