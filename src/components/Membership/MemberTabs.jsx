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
import Pantok from '../assets/Pantok.png';
import Tatala from '../assets/Tatala.png';
import Hulo from '../assets/Hulo.png';
import Tagpos from '../assets/Tagpos.png';
import Pugad from '../assets/Pugad.png';
import Samahang from '../assets/Samahang.png';

import CurrentMembers from './CurrentMembers';
import PendingMembers from './PendingMembers';
import RejectedMembers from './RejectedMembers';

const currentMembersInitial = [
  { id: 1, name: "Pantok Farmers Association", location: "Pantok", area: "2.0", president: "Raul Picones", members: 2, image: Pantok },
  { id: 2, name: "Tatala Farmers Association", location: "Tatala", area: "25", president: "Rolando Anore", members: 25, image: Tatala },
  { id: 3, name: "Hulo, Darangan Farmers Association", location: "Darangan", area: "5.5", president: "Eutiquio Mercado", members: 6, image: Hulo },
  { id: 4, name: "Tagpos Farmers Association", location: "Tagpos", area: "9.0", president: "-", members: 3, image: Tagpos },
  { id: 5, name: "Pugad St. Monique Farmers Association", location: "Darangan", area: "49.2", president: "Marcelino Domingo", members: 45, image: Pugad },
  { id: 6, name: "Samahang Magsasaka ng Darangan", location: "Darangan", area: "40.5", president: "Rolando Leoncio", members: 42, image: Samahang },
];

const rejectedMembersInitial = [
  { id: 1, name: "Juan Dela Cruz", email: "juandelacruz@gmail.com", appliedAs: "Member", reason: "Duplicate Registration", document: "nat_id_juandc.pdf", rejectedOn: "March 21, 2025" },
];

const rejectedData = [
  { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", appliedAs: "Member", reason: "Duplicate Registration", document: "nat_id_juandc.pdf", date: "March 21, 2025", daysAgo: "5 days ago" },
  { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", appliedAs: "Member", reason: "Invalid Document", document: "nat_id_juandc.pdf", date: "March 21, 2025", daysAgo: "5 days ago" },
  { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", appliedAs: "Member", reason: "Suspicious Information", document: "nat_id_juandc.pdf", date: "March 21, 2025", daysAgo: "5 days ago" },
  { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", appliedAs: "Member", reason: "Suspicious Information", document: "nat_id_juandc.pdf", date: "March 21, 2025", daysAgo: "5 days ago" },
  { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", appliedAs: "Member", reason: "Suspicious Information", document: "nat_id_juandc.pdf", date: "March 21, 2025", daysAgo: "5 days ago" },
  { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", appliedAs: "Member", reason: "Suspicious Information", document: "nat_id_juandc.pdf", date: "March 21, 2025", daysAgo: "5 days ago" },
];

const fieldIcons = {
  firstName: Firstname,
  role: Role,
  number: Number,
  DateofBirth: DOB,
  barangay: Barangay,
  document: Docs,
};

export default function MemberTabs() {
  const [selectedMember, setSelectedMember] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [clusterForm, setClusterForm] = useState({ name: '', president: '', location: '', area: '', members: '' });

  const openEditClusterModal = (member) => {
    setSelectedCluster(member);
    setClusterForm({ name: member.name || '', president: member.president || '', location: member.location || '', area: member.area || '', members: member.members || '' });
    setIsEditModalOpen(true);
  };

  const handleClusterChange = (e) => {
    const { name, value } = e.target;
    setClusterForm((prev) => ({ ...prev, [name]: value }));
  };

  const [activeTab, setActiveTab] = useState("current");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  const [members, setMembers] = useState(currentMembersInitial);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [searchCurrent, setSearchCurrent] = useState("");
  const [searchRejected, setSearchRejected] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', role: '', number: '', DateofBirth: '', barangay: '', purok: '', street: '', document: '' });
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [addMemberForm, setAddMemberForm] = useState({ step: 1, emailOrPhone: '', password: '', confirmPassword: '', firstName: '', lastName: '', address: '', barangay: '', purok: '', street: '' });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteModalOpe, setIsDeleteModalOpe] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showApproveMessage, setShowApproveMessage] = useState(false);
  const [showAcceptedMessage, setShowAcceptedMessage] = useState(false);
  const [isApplicationDetailsOpen, setIsApplicationDetailsOpen] = useState(false);
  const [showApproveReject, setShowApproveReject] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDisregard = () => {
    setShowRejectModal(false);
    setShowConfirmationModal(true);
  };

  const clearFilters = () => {
    setSelectedRole("");
  };

  const filterMembersBySearch = (list, search) => {
    if (!search.trim()) return list;
    return list.filter(m => {
      const fullName = (m.firstName ? (m.firstName + " " + (m.lastName || "")).toLowerCase() : m.name?.toLowerCase?.() || "");
      return fullName.includes(search.toLowerCase());
    });
  };

  const filteredMembers = filterMembersBySearch(members, searchCurrent);
  const [rejectedMembers] = useState(rejectedMembersInitial);
  const filteredRejectedMembers = filterMembersBySearch(rejectedMembers, searchRejected);

  useEffect(() => {
    const index = ["current", "pending", "rejected"].indexOf(activeTab);
    const currentTab = tabRefs.current[index];
    if (currentTab) {
      setUnderlineStyle({ left: currentTab.offsetLeft, width: currentTab.offsetWidth });
    }
  }, [activeTab]);

  const toggleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(m => m.id));
    }
  };

  const toggleSelectMember = (id) => {
    setSelectedMembers(prev => prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]);
  };

  const handleBulkDelete = () => {
    setMembers(prev => prev.filter(m => !selectedMembers.includes(m.id)));
    setSelectedMembers([]);
  };

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

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "document" && files.length > 0) {
      setEditForm(prev => ({ ...prev, document: files[0] }));
    } else {
      setEditForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleConfirmEdit = () => {
    setConfirmAction('confirmEdit');
  };

  const handleCancelEdit = () => {
    setConfirmAction('cancelEdit');
  };

  const proceedAction = () => {
    if (confirmAction === 'confirmEdit') {
      if (editingMember) {
        setMembers(prev => prev.map(m => m.id === editingMember.id ? { ...m, ...editForm } : m));
      }
      setEditingMember(null);
    } else if (confirmAction === 'discardChanges' || confirmAction === 'cancelEdit') {
      setIsAddMemberModalOpen(false);
      setEditingMember(null);
      setSuccessModalOpen(false);
      setAddMemberForm({ step: 1, emailOrPhone: '', password: '', confirmPassword: '', firstName: '', lastName: '', address: '', barangay: '', purok: '', street: '' });
    } else if (confirmAction?.type === 'deleteMember') {
      setMembers(prev => prev.filter(m => m.id !== confirmAction.id));
    }
    setConfirmAction(null);
  };

  const cancelAction = () => {
    setConfirmAction(null);
  };

  const handleAddMemberInputChange = (e) => {
    const { name, value } = e.target;
    setAddMemberForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMemberSubmit = () => {
    if (addMemberForm.password !== addMemberForm.confirmPassword) {
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
    setAddMemberForm({ step: 1, emailOrPhone: '', password: '', confirmPassword: '', firstName: '', lastName: '', address: '', barangay: '', purok: '', street: '' });
  };

  const handleApprove = () => {
    setShowApproveReject(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="p-0">
      {/* Header and Tabs Navigation */}
      <div className="w-full bg-binhi-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex-1">
            <div className="text-sm breadcrumbs font-inter text-base">
              <ul>
                <li><a className="text-binhigreen underline">Dashboard</a></li>
                <li><a className="text-binhigreen underline">Membership Management</a></li>
                <li><a className="text-binhigreen underline">Members</a></li>
                <li className="text-gray-400">
                  {activeTab === "current" ? "Current Members" : activeTab === "pending" ? "Pending Members" : "Rejected Members"}
                </li>
              </ul>
            </div>
          </div>

          <button className="btn btn-square btn-binhi ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-4 h-5 flex items-center">
          <h1 className="text-[40px] font-bold text-gray-800">Membership Management</h1>
        </div>
      </div>

      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 relative">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
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
        <div className="absolute bottom-0 h-0.5 bg-green-600 transition-all duration-300" style={{ left: underlineStyle.left, width: underlineStyle.width }} />
      </div>

      {/* Tab contents */}
      {activeTab === "current" && (
        <CurrentMembers
          members={members}
          filteredMembers={filteredMembers}
          selectedMembers={selectedMembers}
          toggleSelectAll={toggleSelectAll}
          toggleSelectMember={toggleSelectMember}
          openEditClusterModal={openEditClusterModal}
          selectedCluster={selectedCluster}
          setSelectedCluster={setSelectedCluster}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          clusterForm={clusterForm}
          handleClusterChange={handleClusterChange}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          clearFilters={clearFilters}
          setIsAddMemberModalOpen={setIsAddMemberModalOpen}
          addMemberForm={addMemberForm}
          setAddMemberForm={setAddMemberForm}
          handleAddMemberInputChange={handleAddMemberInputChange}
          handleAddMemberSubmit={handleAddMemberSubmit}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          isDeleteModalOpe={isDeleteModalOpe}
          setIsDeleteModalOpe={setIsDeleteModalOpe}
          showRejectModal={showRejectModal}
          setShowRejectModal={setShowRejectModal}
          showConfirmationModal={showConfirmationModal}
          setShowConfirmationModal={setShowConfirmationModal}
          showSuccessMessage={showSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
          handleDisregard={handleDisregard}
          Pencil={Pencil}
          edtIcon={edtIcon}
          fieldIcons={fieldIcons}
          confirmAction={confirmAction}
          setConfirmAction={setConfirmAction}
          proceedAction={proceedAction}
          cancelAction={cancelAction}
          editingMember={editingMember}
          setEditingMember={setEditingMember}
          editForm={editForm}
          handleEditChange={handleEditChange}
          handleConfirmEdit={handleConfirmEdit}
          handleCancelEdit={handleCancelEdit}
          showApproveMessage={showApproveMessage}
          setShowApproveMessage={setShowApproveMessage}
          showAcceptedMessage={showAcceptedMessage}
          setShowAcceptedMessage={setShowAcceptedMessage}
          isApplicationDetailsOpen={isApplicationDetailsOpen}
          setIsApplicationDetailsOpen={setIsApplicationDetailsOpen}
          showApproveReject={showApproveReject}
          setShowApproveReject={setShowApproveReject}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
          handleApprove={handleApprove}
          Success={Success}
          Disregard={Disregard}
          Alert={Alert}
          editIcon={editIcon}
          PDF={PDF}
          Juan={Juan}
        />
      )}

      {activeTab === "pending" && (
        <PendingMembers
          searchCurrent={searchCurrent}
          setSearchCurrent={setSearchCurrent}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          clearFilters={clearFilters}
          setIsAddMemberModalOpen={setIsAddMemberModalOpen}
          addMemberForm={addMemberForm}
          setAddMemberForm={setAddMemberForm}
          Pencil={Pencil}
          edtIcon={edtIcon}
          Search={Search}
          SlidersHorizontal={SlidersHorizontal}
          X={X}
          loop={loop}
          FaPlus={FaPlus}
        />
      )}

      {activeTab === "rejected" && (
        <RejectedMembers
          rejectedData={rejectedData}
          selectedMembers={selectedMembers}
          toggleSelectAll={toggleSelectAll}
          setIsApplicationDetailsOpen={setIsApplicationDetailsOpen}
          isApplicationDetailsOpen={isApplicationDetailsOpen}
          setIsDeleteModalOpe={setIsDeleteModalOpe}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          clearFilters={clearFilters}
          setIsAddMemberModalOpen={setIsAddMemberModalOpen}
          addMemberForm={addMemberForm}
          setAddMemberForm={setAddMemberForm}
          editIcon={editIcon}
          edtIcon={edtIcon}
          PDF={PDF}
          Juan={Juan}
          Disregard={Disregard}
          Success={Success}
          Alert={Alert}
          showApproveReject={showApproveReject}
          setShowApproveReject={setShowApproveReject}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
          showConfirmationModal={showConfirmationModal}
          setShowConfirmationModal={setShowConfirmationModal}
          setShowApproveMessage={setShowApproveMessage}
          showApproveMessage={showApproveMessage}
          showAcceptedMessage={showAcceptedMessage}
          setShowAcceptedMessage={setShowAcceptedMessage}
          handleApprove={handleApprove}
          isDeleteModalOpe={isDeleteModalOpe}
          setIsDeleteModalOpe={setIsDeleteModalOpe}
          FaPlus={FaPlus}
        />
      )}
    </div>
  );
}
