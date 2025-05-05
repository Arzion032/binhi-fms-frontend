import React, { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";	
import { Search } from "lucide-react";
import Step1 from '../assets/Step1.png';
import Step2 from '../assets/Step2.png';
import loop from '../assets/loop.png';
import Member from '../assets/Member.png';
import Dis from '../assets/Dis.png';
import Firstname from '../assets/Firstname.png';
import Role from '../assets/Role.png';
import Number from '../assets/Number.png';
import DOB from '../assets/DOB.png';
import Barangay from '../assets/Barangay.png';
import Docs from '../assets/Docs.png';
import Juan from '../assets/Juan.png';

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

export default function MemberTabs() {
  // Tabs: current, pending, rejected
  const [activeTab, setActiveTab] = useState("current");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);
  
  // Members state for current tab
  const [members, setMembers] = useState(currentMembersInitial);
  
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
       <div className="w-full bg-binhi-100 shadow-sm">
      {/* Navbar with breadcrumbs and right icon */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Breadcrumbs */}
        <div className="flex-1">
          <div className="text-sm breadcrumbs font-inter text-base">
            <ul>
              <li><a className="text-binhigreen underline">Dashboard</a></li>
              <li><a className="text-binhigreen underline">Membership Management</a></li>
              <li><a className="text-binhigreen underline">Members</a></li>
              <li className="text-gray-400">Current Members</li>
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
        <h1 className="text-[40px] font-bold text-gray-800">
          Membership Management
        </h1>
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
                className={`inline-block p-4 ${activeTab === tab ? "text-green-600" : "text-gray-500 hover:text-gray-600"}`}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab === "current" ? "Current Members" : tab === "pending" ? "Pending Members" : "Rejected Members"}
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
              <div className="relative w-[279px]">
                <input
                  type="text"
                  placeholder="Search Members..."
                  className="w-full h-[41px] pl-10 pr-3 border rounded-full p-2"
                  value={searchCurrent}
                  onChange={(e) => setSearchCurrent(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>

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
          <div className="p-0 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" tabIndex={0}>
            <div className="flex justify-between items-center mb-4">
            </div>

            {/* Table */}
            <table className="min-w-full border-spacing-y-2">
              <thead>
                <tr className="text-left" style={{ backgroundColor: "#F4F4F4" }}>
                  <th className="p-2 rounded-tl-lg rounded-tr-lg">
                    <input
                      type="checkbox"
                      checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                      onChange={toggleSelectAll}
                      aria-label="Select all members"
                    />
                  </th>
                  <th className="p-2">Username</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Address</th>
                  <th className="p-2">Date of Birth</th>
                  <th className="p-2">Date Added</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-t">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => toggleSelectMember(member.id)}
                        aria-label={`Select member ${member.firstName} ${member.lastName}`}
                      />
                    </td>
                    <td className="p-2 flex items-center">
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
                    <td className="p-2">
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
                    <td className="p-2">{member.address}</td>
                    <td className="p-2">{member.dob}</td>
                    <td className="p-2">{member.dateAdded}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => handleEditClick(member)}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label={`Edit member ${member.firstName} ${member.lastName}`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => setConfirmAction({ type: 'deleteMember', id: member.id })}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Delete member ${member.firstName} ${member.lastName}`}
                      >
                        <FaTrash />
                      </button>
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
    <div className="relative w-[279px]">
      <input
        type="text"
        placeholder="Search Members..."
        className="w-full h-[41px] pl-10 pr-3 border rounded-full p-2"
        value={searchCurrent}
        onChange={(e) => setSearchCurrent(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
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
      className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2"
    >
      <FaPlus className="w-5 h-5" />
      <span className="font-semibold text-[16px]">Add Member</span>
    </button>
  </div>
</div>

{/* Main Content */}
<div
  className="p-0 rounded-lg bg-gray-50 dark:bg-gray-800"
  role="tabpanel"
  tabIndex={0}
>
  <div className="flex h-[691px] w-[px] p-4 bg-gray-100">
    {/* Sidebar */}
<div className="w-1/5 bg-white rounded-xl shadow-md p-4">
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
    <div className="flex-1 bg-white rounded-xl shadow-md ml-4 p-6">
  <div className="flex justify-between items-start mb-6">
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

 
  {/* Action Buttons */}
 
<div className="border-b border-gray-300 my-4"></div>
  <div className="flex justify-end gap-4 mt-20">
    <button
      className="px-4 py-2 rounded-3xl bg-[#FF3B4E] font-bold text-white hover:bg-red-600"
      style={{ width: '156px', height: '39px' }}
    >
      Reject
    </button>
    <button
      className="px-4 py-2 rounded-3xl bg-[#4CAE4F] font-bold text-white hover:bg-green-600"
      style={{ width: '156px', height: '39px' }}
    >
      Approve
    </button>
  </div>
</div>
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
              <div className="relative w-[279px]">
                <input
                  type="text"
                  placeholder="Search Members..."
                  className="w-full h-[41px] pl-10 pr-3 border rounded-full p-2"
                  value={searchCurrent}
                  onChange={(e) => setSearchCurrent(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>

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
          <div className="p-0 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" tabIndex={0}>
            <div className="flex justify-between items-center mb-4">
            </div>

            {/* Table */}
            <table className="min-w-full border-spacing-y-2">
  <thead>
    <tr className="text-left" style={{ backgroundColor: "#F4F4F4" }}>
      <th className="p-2 rounded-tl-lg rounded-tr-lg">
        <input
          type="checkbox"
          checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
          onChange={toggleSelectAll}
          aria-label="Select all members"
        />
      </th>
      <th className="p-2">Username</th>
      <th className="p-2">Applied As</th>
      <th className="p-2">Reason of Rejection</th>
      <th className="p-2">Document</th>
      <th className="p-2">Rejected on</th>
      <th className="p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredMembers.map((rejectedMembers) => (
      <tr key={rejectedMembers.id} className="border-t">
        <td className="p-2">
          <input
            type="checkbox"
            checked={selectedMembers.includes(rejectedMembers.id)}
            onChange={() => toggleSelectMember(rejectedMembers.id)}
            aria-label={`Select member ${rejectedMembers.name}`}
          />
        </td>
        <td className="p-2 flex items-center">
          <img
            src={Juan}
            alt={rejectedMembers.name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <div>{rejectedMembers.name}</div>
            <div className="text-sm text-gray-600">{rejectedMembers.email}</div>
          </div>
        </td>
        <td className="p-2">
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
            {rejectedMembers.appliedAs}
          </div>
        </td>
        <td className="p-2">
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
            {rejectedMembers.reason}
          </div>
        </td>
        <td className="p-2">{rejectedMembers.document}</td>
        <td className="p-2">{rejectedMembers.rejectedOn}</td>
        <td className="p-2 flex gap-2">
          <button
            onClick={() => handleEditClick(rejectedMembers)}
            className="text-blue-500 hover:text-blue-700"
            aria-label={`Edit member ${rejectedMembers.name}`}
          >
            <FaEdit />
          </button>
          <button
            onClick={() => setConfirmAction({ type: 'deleteMember', id: rejectedMembers.id })}
            className="text-red-500 hover:text-red-700"
            aria-label={`Delete member ${rejectedMembers.name}`}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ))}
    {filteredMembers.length === 0 && (
      <tr>
        <td colSpan={7} className="p-4 text-center text-gray-600">
          No members found.
        </td>
      </tr>
    )}
  </tbody>
</table>

          </div>
        </>
      )}

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className={`bg-[#F8FCF8] dark:bg-gray-700 p-6 rounded-3xl relative w-[523px] ${
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
            className="bg-white dark:bg-gray-800 p-6 w-[90%] max-w-sm relative rounded-[25px]"
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
              <p className="mb-6 text-lg font-semibold">Member added successfully!</p>
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
            <div className="space-y-1">
              {['firstName', 'lastName', 'role', 'number', 'DateofBirth', 'barangay', 'purok', 'street'].map((field) => (
                <div key={field} className="flex items-center gap-4">
                  <div className="w-32 flex items-center gap-2">
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
              <div className="flex items-center gap-4">
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
                onClick={handleCancelEdit}
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-[25px] w-[380px] h-[300px] text-center">
            {(confirmAction === 'discardChanges' || confirmAction === 'cancelEdit') ? (
              <div className="mb-4">
                <div className="mb-6 text-center">
                  <div className="mb-4 flex justify-center items-center">
                    <img src={Dis} alt="Dis" className="w-[260px] max-w-full object-contain" />
                  </div>
                </div>
              </div>
            ) : (
              <p className="mb-6 text-lg font-semibold">
                Are you sure you want to confirm changes?
              </p>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={cancelAction}
                className="px-10 py-2 bg-[#FF3B4E] text-white rounded-full hover:bg-[#E02A3B] font-bold"
              >
                Cancel
              </button>
              <button
                onClick={proceedAction}
                className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white font-bold"
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

