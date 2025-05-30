import React from "react";
import { FaPlus } from "react-icons/fa";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function RejectedMembers(props) {
  const {
    rejectedData,
    selectedMembers,
    toggleSelectAll,
    setIsApplicationDetailsOpen,
    isApplicationDetailsOpen,
    setIsDeleteModalOpe,
    showFilters,
    setShowFilters,
    selectedRole,
    setSelectedRole,
    clearFilters,
    setIsAddMemberModalOpen,
    addMemberForm,
    setAddMemberForm,
    editIcon,
    edtIcon,
    PDF,
    Juan,
    Disregard,
    Success,
    Alert,
    showApproveReject,
    setShowApproveReject,
    showSuccessModal,
    setShowSuccessModal,
    showConfirmationModal,
    setShowConfirmationModal,
    setShowApproveMessage,
    showApproveMessage,
    showAcceptedMessage,
    setShowAcceptedMessage,
    handleApprove,
    isDeleteModalOpe,
    setIsDeleteModalOpe,
    FaPlus,
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
            Rejected Members
          </span>
          <span className="text-gray-400 font-normal text-xs">24</span>
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
            <FaPlus className="w-5 h-[15px]" />
            <span className="font-semibold text-[15px]">Add Member</span>
          </button>
        </div>
      </div>

      {/* Bulk Delete Button */}
      <div
        className="rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        tabIndex={0}
      >
        <div className="flex justify-between items-center"></div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-700 font-semibold">
              <tr
                className="text-left text-sm text-black"
                style={{ backgroundColor: "#F4F4F4" }}
              >
                <th className="p-4 rounded-tl-lg rounded-tr-lg">
                  <input
                    className="checkbox checkbox-sm rounded"
                    type="checkbox"
                    checked={
                      selectedMembers.length === rejectedData.length &&
                      rejectedData.length > 0
                    }
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
                      aria-label={`Select rejected member ${item.name}`}
                    />
                  </td>
                  <td className="p-4 flex items-center">
                    <img
                      src={Juan}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />

                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500 font-normal">
                        {item.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className="text-center font-medium"
                      style={{
                        color: "#0038A8",
                        borderRadius: "200px",
                        border: "0.75px solid #0038A8",
                        opacity: 0.75,
                        background: "#C0D5FF",
                        padding: "0px 8px",
                        fontSize: "12px",
                        display: "inline-block",
                      }}
                    >
                      {item.appliedAs}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className="text-center font-medium"
                      style={{
                        color: "#A51B29",
                        borderRadius: "200px",
                        border: "0.75px solid #A51B29",
                        opacity: 0.75,
                        background: "#FFDBDE",
                        padding: "0px 8px",
                        fontSize: "12px",
                        display: "inline-block",
                      }}
                    >
                      {item.reason}
                    </span>
                  </td>
                  <td className="p-4">
                    <a
                      href="/path/to/nat_id_juandc.pdf"
                      className="text-[#0038A8] text-sm font-medium underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={PDF}
                        alt="PDF"
                        className="inline-block mr-2"
                        width="20"
                        height="20"
                      />
                      {item.document}
                    </a>
                    <div className="text-xs text-gray-400">Click to view</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium">{item.date}</div>
                    <div className="text-xs text-gray-400">{item.daysAgo}</div>
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <span
                      className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
                      onClick={() => setIsApplicationDetailsOpen(true)}
                    >
                      <img src={editIcon} alt="Edit" className="w-4 h-4" />
                    </span>
                    <span
                      className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
                      onClick={() => setIsDeleteModalOpe(true)}
                    >
                      <img src={edtIcon} alt="Trash" className="w-4 h-4" />
                    </span>
                  </td>
                </tr>
              ))}

              {/* Application Details Modal */}
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
                    <p className="text-base text-gray-500 mb-4">
                      Here is the details of the application.
                    </p>
                    <div className="border-b border-gray-300 my-4"></div>
                    <div className="space-y-1 text-base">
                      <p>
                        <strong>Name</strong>
                      </p>
                    </div>
                    <div className="space-y-4 text-base">
                      <p>Juan Dela Cruz</p>
                      <p>
                        <strong>Applied as</strong>
                      </p>
                    </div>
                    <div className="space-y-4 text-base">
                      <p>Member</p>
                      <p>
                        <strong>Reason of Rejection</strong>
                      </p>
                    </div>
                    <div className="space-y-4 text-base">
                      <p>Duplicate Rejection</p>
                      <p>
                        <strong>Document</strong>
                      </p>
                    </div>
                    <div className="space-y-4 text-base">
                      <p>National ID</p>
                      <a
                        href="/path/to/nat_id_juandc.pdf"
                        className="text-[#0038A8] underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={PDF}
                          alt="PDF"
                          className="inline-block mr-2"
                          width="20"
                          height="20"
                        />
                        nat_id_juandc.pdf
                      </a>
                      <p>
                        <strong>Applied on</strong>
                      </p>
                    </div>
                    <div className="space-y-4 text-base">
                      <p>March 15, 2025</p>
                      <p>
                        <strong>Rejected on</strong>{" "}
                      </p>
                    </div>
                    <div className="space-y-4 text-base">
                      <p>March 21, 2025</p>
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                      <button
                        className="px-4 py-2 rounded-3xl bg-[#FF3B4E] font-medium text-white hover:bg-red-600"
                        style={{ width: "156px", height: "39px" }}
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

              {/* Approve/Reject Confirmation Modal */}
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
                      <img
                        src={Disregard}
                        alt="Disregard.png"
                        className="w-[80px] max-w-full object-contain"
                      />
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
                    <h2 className="text-3xl font-bold mb-2">
                      Member added successfully!
                    </h2>
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

              {/* Delete Modal */}
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
                      <img
                        src={Disregard}
                        alt="Disregard.png"
                        className="w-[80px] max-w-full object-contain"
                      />
                    </div>
                    <h2 className="text-2xl text-center font-bold mb-2">
                      Confirm Deletion?
                    </h2>
                    <p className="text-sm text-center text-gray-600">
                      The selected equipment will be permanently removed from your
                      records.
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
            </tbody>
          </table>

          {/* Pagination */}
          <div className="fixed bottom-0 left-0 w-full py-4">
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
      </div>
    </>
  );
}
