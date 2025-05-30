import React from "react";
import { FaPlus } from "react-icons/fa";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function CurrentMembers(props) {
  const {
    members,
    filteredMembers,
    selectedMembers,
    toggleSelectAll,
    toggleSelectMember,
    openEditClusterModal,
    selectedCluster,
    setSelectedCluster,
    isEditModalOpen,
    setIsEditModalOpen,
    clusterForm,
    handleClusterChange,
    showFilters,
    setShowFilters,
    selectedRole,
    setSelectedRole,
    clearFilters,
    setIsAddMemberModalOpen,
    addMemberForm,
    setAddMemberForm,
    handleAddMemberInputChange,
    handleAddMemberSubmit,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDeleteModalOpe,
    setIsDeleteModalOpe,
    showRejectModal,
    setShowRejectModal,
    showConfirmationModal,
    setShowConfirmationModal,
    showSuccessMessage,
    setShowSuccessMessage,
    handleDisregard,
    Pencil,
    edtIcon,
    fieldIcons,
    confirmAction,
    setConfirmAction,
    proceedAction,
    cancelAction,
    editingMember,
    setEditingMember,
    editForm,
    handleEditChange,
    handleConfirmEdit,
    handleCancelEdit,
    showApproveMessage,
    setShowApproveMessage,
    showAcceptedMessage,
    setShowAcceptedMessage,
    isApplicationDetailsOpen,
    setIsApplicationDetailsOpen,
    showApproveReject,
    setShowApproveReject,
    showSuccessModal,
    setShowSuccessModal,
    handleApprove,
    Success,
    Disregard,
    Alert,
  } = props;

  return (
    <>
      <div className="flex items-center justify-between w-full mb-4">
        {/* Left Side */}
        <div className="flex items-center">
          <img
            src={require("../assets/loop.png")}
            alt="loop"
            className="ml-5 mr-5 w-[20px] max-w-full object-contain"
          />
          <span className="text-[15.5px] text-lg font-semibold mr-2">
            All Clusters
          </span>
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
              value={props.searchCurrent}
              onChange={(e) => props.setSearchCurrent(e.target.value)}
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
                <span className="mr-2 p-2 text-sm text-blue font-medium">
                  Active Filters
                </span>
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
              setAddMemberForm({
                step: 1,
                emailOrPhone: "",
                password: "",
                confirmPassword: "",
                firstName: "",
                lastName: "",
                address: "",
                barangay: "",
                purok: "",
                street: "",
              });
            }}
            className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2"
            data-model-id="1391:4664"
          >
            <FaPlus className="w-5 h-5" />
            <span className="font-semibold text-[16px]">Add Member</span>
          </button>
        </div>
      </div>

      {/* Table 1 */}
      <div className="overflow-x-auto py-0 rounded-lg bg-gray-50 dark:bg-gray-800">
        <table className="table w-full">
          <thead>
            <tr
              className="text-sm text-black"
              style={{ backgroundColor: "#F4F4F4" }}
            >
              <th className="p-4 rounded-tl-lg rounded-tr-lg text-left">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm rounded"
                  checked={
                    selectedMembers.length === filteredMembers.length &&
                    filteredMembers.length > 0
                  }
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
                  <div className="text-xs text-gray-400 font-normal">
                    Binangonan, Rizal
                  </div>
                </td>

                <td className="p-4">
                  <div className="font-medium">{member.area}</div>
                  <div className="text-xs text-gray-400 font-normal">hectares</div>
                </td>

                <td className="p-4 text-center">
                  <div className="font-medium">{member.president || "-"}</div>
                </td>

                <td className="p-4 text-center">
                  <div className="font-medium">{member.members}</div>
                </td>

                <td className="p-4 flex gap-2">
                  <span
                    onClick={() => openEditClusterModal(member)}
                    className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
                    aria-label={`Edit member ${member.name}`}
                  >
                    <img src={Pencil} alt="Edit" className="w-4 h-4" />
                  </span>
                  <span
                    className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
                    onClick={() => setIsDeleteModalOpe(true)}
                  >
                    <img src={edtIcon} alt="Delete" className="w-4 h-4" />
                  </span>
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

        {/* Pagination */}
        <div className="fixed bottom-0 left-0 w-full py-4 bg-gray-50">
          <div className="flex justify-center">
            <div className="flex items-center gap-1">
              <button className="btn btn-sm hover:bg-[#D9D9D9] rounded">«</button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`btn btn-sm ${
                    page === 1
                      ? "bg-gray-300 text-black"
                      : "btn-ghost text-gray-600 hover:bg-[#D9D9D9] hover:text-black"
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
                { name: "firstName", label: "First Name" },
                { name: "lastName", label: "Last Name" },
                { name: "role", label: "Role" },
                { name: "number", label: "Number" },
                { name: "DateofBirth", label: "Date of Birth", type: "date" },
                { name: "barangay", label: "Barangay" },
                { name: "purok", label: "Purok" },
                { name: "street", label: "Street" },
              ].map(({ name, label, type = "text" }) => (
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
                    value={clusterForm[name] || ""}
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
              <img
                src={Disregard}
                alt="Disregard.png"
                className="w-[80px] max-w-full object-contain"
              />
            </div>
            <h2 className="text-2xl text-center font-bold mb-2">
              Disregard editing?
            </h2>
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

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-3xl w-[430px] h-[320px] p-7 shadow-lg relative border border-black">
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="absolute top-4 right-5 text-gray-400 text-2xl"
            >
              ×
            </button>
            <div className="mb-4 flex justify-center items-center">
              <img
                src={Success}
                alt="Success.png"
                className="w-[80px] max-w-full object-contain"
              />
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
              onClick={() => setShowApproveMessage(false)}
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
                onClick={() => setShowApproveMessage(false)}
                className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAcceptedMessage(true)}
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
                onClick={() => setShowAcceptedMessage(false)}
                className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
              >
                Back
              </button>
              <button
                onClick={() => setShowAcceptedMessage(false)}
                className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                style={{ width: "130px", height: "39px" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
