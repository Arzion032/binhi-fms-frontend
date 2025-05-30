import React from "react";
import { FaPlus } from "react-icons/fa";

export default function PendingMembers(props) {
  const {
    searchCurrent,
    setSearchCurrent,
    showFilters,
    setShowFilters,
    selectedRole,
    setSelectedRole,
    clearFilters,
    setIsAddMemberModalOpen,
    addMemberForm,
    setAddMemberForm,
    Pencil,
    edtIcon,
    Search,
    SlidersHorizontal,
    X,
    loop,
  } = props;

  return (
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
          >
            <FaPlus className="w-5 h-[15px]" />
            <span className="font-semibold text-[15px]">Add Member</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="p-0 rounded-lg bg-gray-50 dark:bg-gray-800"
        role="tabpanel"
        tabIndex={0}
      >
        <div className="flex h-[691px] w-full p-4 bg-gray-100">
          {/* Sidebar */}
          <div className="w-1/5 bg-white rounded-xl shadow-md p-4 border border-black">
            {/* Fixed Header */}
            <div className="w-full bg-[#D9D9D9] px-4 py-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm">Sort:</span>
                <span className="text-sm font-bold text-gray-600">
                  Date Added
                </span>
              </div>
            </div>

            {/* Scrollable User List */}
            <div
              className="space-y-2 overflow-y-auto"
              style={{ maxHeight: "620px" }}
            >
              {[
                "Juan Dela Cruz",
                "Miles Padilla Ocampo",
                "Jayson Labrador Padilla",
                "Ryuu Tenn de Mesa",
                "Yuji Silva Fortunado",
                "Juan Dela Cruz",
                "Miles Padilla Ocampo",
                "Jayson Labrador Padilla",
                "Ryuu Tenn de Mesa",
                "Yuji Silva Fortunado",
              ].map((name, idx) => {
                const role = Math.random() > 0.5 ? "Farmer" : "Member";
                const avatarId = 10 + idx;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-2 rounded-xl cursor-pointer"
                    style={{ backgroundColor: "#FFFFFF" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#D9D9D9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#FFFFFF")
                    }
                  >
                    <img
                      src={`https://i.pravatar.cc/40?img=${avatarId}`}
                      alt="user"
                      className="rounded-full w-10 h-10"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "path/to/local/image.png";
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{name}</span>
                      <span
                        className="text-center font-bold"
                        style={{
                          color: "#0038A8",
                          borderRadius: "200px",
                          border: "0.75px solid #0038A8",
                          opacity: 0.75,
                          background: "#C0D5FF",
                          padding: "0px 8px",
                          fontSize: "10px",
                          display: "inline-block",
                          height: "16px",
                          width: "60px",
                        }}
                      >
                        {role}
                      </span>
                      <span className="text-xs text-gray-400">
                        Apr 9, 2025, 11:34 AM
                      </span>
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
                    color: "#0038A8",
                    borderRadius: "200px",
                    border: "0.75px solid #0038A8",
                    opacity: 0.75,
                    background: "#C0D5FF",
                    padding: "0px 8px",
                    fontSize: "10px",
                    display: "inline-block",
                    height: "18px",
                    width: "60px",
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
                style={{ width: "156px", height: "39px" }}
              >
                Reject
              </button>
              <button
                onClick={() => setShowApproveMessage(true)}
                className="px-4 py-2 rounded-3xl bg-[#4CAE4F] font-bold text-white hover:bg-green-600"
                style={{ width: "156px", height: "39px" }}
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
                    onClick={handleDisregard}
                    className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-red-600 text-sm"
                    style={{ width: "156px", height: "39px" }}
                  >
                    Disregard
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                      setShowSuccessMessage(true);
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
        </div>
      </div>
    </>
  );
}
