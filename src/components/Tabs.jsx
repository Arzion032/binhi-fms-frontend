import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [members, setMembers] = useState(
    [
    {
      id: 1,
      firstName: "Juan",
      lastName: "Dela Cruz",
      email: "juandcruz@gmail.com",
      role: "Member",
      address: "Masinag, Barangay Masinag, Purok 5, Street 10",
      dob: "1999-08-20",
      number: "09171234567",
      barangay: "Barangay Masinag",
      purok: "Purok 5",
      street: "Street 10",
      document: "ID12345",
      profilePic: "https://via.placeholder.com/100"
    },
  ]);
  const [editingMember, setEditingMember] = useState(null);
  const [addMemberForm, setAddMemberForm] = useState({
    step: 1,
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    address: '',
  });
  const [editForm, setEditForm] = useState({ 
    firstName: '', lastName: '', role: '', number: '', dob: '', barangay: '', purok: '', street: '', document: '' 
  });
  const [confirmAction, setConfirmAction] = useState(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const tabRefs = [useRef(null), useRef(null), useRef(null)];

  const filteredMembers = members.filter((member) => 
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleEditClick = (member) => {
    setEditingMember(member);
    setEditForm({
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role,
      number: member.number,
      dob: member.dob,
      barangay: member.barangay,
      purok: member.purok,
      street: member.street,
      document: member.document,
    });
  };

  const handleDeleteMember = (id) => {
    setConfirmAction({ type: 'deleteMember', id });
  };
  

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleConfirmEdit = () => {
    setConfirmAction('confirmEdit');
  };

  const handleCancelEdit = () => {
    setConfirmAction('cancelEdit');
  };

  const proceedAction = () => {
    if (confirmAction === 'confirmEdit') {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingMember.id ? { ...m, ...editForm } : m
        )
      );
      setEditingMember(null);
    } else if (confirmAction === 'discardChanges') {
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
      });
    } else if (confirmAction?.type === 'deleteMember') {
      setMembers((prev) => prev.filter((m) => m.id !== confirmAction.id));
    }
    setConfirmAction(null);
  };
  
  
  const cancelAction = () => {
    setConfirmAction(null);
  };

  const handleAddMemberInputChange = (e) => {
    setAddMemberForm({ ...addMemberForm, [e.target.name]: e.target.value });
  };

  const handleAddMemberSubmit = () => {
    const newMember = {
      id: members.length + 1,
      ...addMemberForm,
      address: `${addMemberForm.barangay}, ${addMemberForm.purok}, ${addMemberForm.street}`,
    };
    setMembers([...members, newMember]);
    setSuccessModalOpen(true); // Show success modal
     // Close the modal after adding
    setAddMemberForm({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      number: '',
      dob: '',
      barangay: '',
      purok: '',
      street: '',
      document: null,
    }); // Reset form
  };

  useEffect(() => {
    const currentTab = tabRefs[activeTab].current;
    if (currentTab) {
      setUnderlineStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div>
      {/* Tabs */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 relative">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" role="tablist">
          <li className="mr-[1cm]" role="presentation">
            <button
              ref={tabRefs[0]}
              className={`inline-block p-4 ${activeTab === 0 ? "text-green-600" : "text-gray-500 hover:text-gray-600"}`}
              onClick={() => handleTabChange(0)}
              role="tab"
            >
              Current Members
            </button>
          </li>
          <li className="mr-[1cm]" role="presentation">
            <button
              ref={tabRefs[1]}
              className={`inline-block p-4 ${activeTab === 1 ? "text-green-600" : "text-gray-500 hover:text-gray-600"}`}
              onClick={() => handleTabChange(1)}
              role="tab"
            >
              Pending Members
            </button>
          </li>
          <li className="mr-[1cm]" role="presentation">
            <button
              ref={tabRefs[2]}
              className={`inline-block p-4 ${activeTab === 2 ? "text-green-600" : "text-gray-500 hover:text-gray-600"}`}
              onClick={() => handleTabChange(2)}
              role="tab"
            >
              Rejected Members
            </button>
          </li>
        </ul>

        <div
          className="absolute bottom-0 h-0.5 bg-green-600 transition-all duration-300"
          style={{ left: underlineStyle.left, width: underlineStyle.width }}
        />
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Members..."
          className="p-2 border rounded w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

       {/* Add Member Button */}
      <button
        onClick={() => setIsAddMemberModalOpen(true)}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <FaPlus className="inline mr-2" />
        Add Member
      </button>


      {/* Current Members Content */}
      {activeTab === 0 && (
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel">
          <table className="min-w-full">
            <thead>
              <tr className="text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Address</th>
                <th className="p-2">DOB</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className="border-t">
                  <td className="p-2">{member.firstName} {member.lastName}</td>
                  <td className="p-2">{member.email}</td>
                  <td className="p-2">{member.role}</td>
                  <td className="p-2">{member.address}</td>
                  <td className="p-2">{member.dob}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEditClick(member)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
  onClick={() => handleDeleteMember(member.id)}
  className="text-red-500 hover:text-red-700"
>
  <FaTrash />
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-[#F8FCF8] dark:bg-gray-700 p-6 rounded-lg w-[90%] max-w-lg relative">
      
      {/* X Button */}
      <button
        onClick={() => setConfirmAction('discardAddMember')}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✖
      </button>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">{addMemberForm.step === 2 ? 'Basic Information' : 'Account Credentials'}</h3>
      </div>

      {/* Step 1: Account Credentials */}
      {addMemberForm.step === 1 && (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label>Email or Phone Number</label>
            <input
              type="text"
              name="emailOrPhone"
              value={addMemberForm.emailOrPhone || ''}
              onChange={handleAddMemberInputChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={addMemberForm.password || ''}
              onChange={handleAddMemberInputChange}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Re-enter Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={addMemberForm.confirmPassword || ''}
              onChange={handleAddMemberInputChange}
              className="p-2 border rounded"
            />
          </div>

          {/* Next Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                if (addMemberForm.password !== addMemberForm.confirmPassword) {
                  alert("Passwords do not match!");
                  return;
                }
                setAddMemberForm({ ...addMemberForm, step: 2 });
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Basic Info */}
      {addMemberForm.step === 2 && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={addMemberForm.firstName}
                onChange={handleAddMemberInputChange}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={addMemberForm.lastName}
                onChange={handleAddMemberInputChange}
                className="p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={addMemberForm.address || ''}
              onChange={handleAddMemberInputChange}
              className="p-2 border rounded"
            />
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-40 bg-gray-300 rounded flex justify-center items-center text-gray-600">
            Map Placeholder
          </div>

          {/* Finish Button */}
          <div className="flex justify-end mt-6">
          <button
              onClick={handleAddMemberSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-sm relative">
      
      {/* X Button */}
      <button
        onClick={() => setConfirmAction('discardChanges')}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✖
      </button>

      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold">Member added successfully!</h3>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setSuccessModalOpen(false);
            setIsAddMemberModalOpen(true);
            setAddMemberForm({ ...addMemberForm, step: 2 }); // Go back to Step 2
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
            }); // Reset form
          }}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Edit Member</h3>
            </div>
            <div className="space-y-4">
              {['firstName', 'lastName', 'role', 'number', 'dob', 'barangay', 'purok', 'street'].map((field) => (
                <div key={field} className="flex items-center gap-4">
                  <label className="w-24 capitalize">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type={field === 'dob' ? 'date' : 'text'}
                    name={field}
                    value={editForm[field]}
                    onChange={handleEditChange}
                    className="flex-1 p-2 border rounded"
                  />
                </div>
              ))}
              <div className="flex items-center gap-4">
                <label className="w-24 capitalize">Document</label>
                <input
                  type="file"
                  name="document"
                  onChange={(e) => setEditForm({ ...editForm, document: e.target.files[0] })}
                  className="flex-1 p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEdit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[80%] max-w-xs text-center">
            <p className="mb-6 text-lg font-semibold">
  {confirmAction === 'confirmEdit' 
    ? 'Are you sure you want to confirm changes?' 
    : confirmAction === 'discardChanges' 
    ? 'Are you sure you want to discard changes?'
    : 'Are you sure you want to disregard changes?'}
</p>
{confirmAction && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[80%] max-w-xs text-center">
      <p className="mb-6 text-lg font-semibold">
        {confirmAction?.type === 'deleteMember'
          ? 'Are you sure you want to delete this member?'
          : confirmAction === 'confirmEdit' 
          ? 'Are you sure you want to confirm changes?' 
          : 'Are you sure you want to discard changes?'}
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={proceedAction}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Yes
        </button>
        <button
          onClick={cancelAction}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          No
        </button>
      </div>
    </div>
  </div>
)}

            <div className="flex justify-center gap-4">
              <button
                onClick={proceedAction}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={cancelAction}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
