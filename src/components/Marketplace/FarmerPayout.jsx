import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, RefreshCw } from "lucide-react";
import PayoutModal from "./PayoutModal";

const FARMER_PAYOUT_SUMMARY = [
  { name: "Complete", count: 15, color: "#16A34A", bg: "#E6F9EC", border: "#16A34A" },
  { name: "Pending", count: 15, color: "#92400E", bg: "#FFF7E6", border: "#D1A157" },
  { name: "Failed", count: 15, color: "#DC2626", bg: "#FEE2E2", border: "#DC2626" },
];

const FARMER_PAYOUT_ROWS = [
  { id: 1, farmer: { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", avatar: "/Screenshot_195.png" }, product: { name: "Farm Fresh Sweet Corn", variation: "Yellow, White", image: "/Screenshot_195.png", quantity: 1 }, status: "Pending", paymentMethod: "GCash", gcashNumber: "0938-100-4277", gcashName: "J*** D*** C***" },
  { id: 2, farmer: { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", avatar: "/Screenshot_195.png" }, product: { name: "Farm Fresh Sweet Corn", variation: "Yellow, White", image: "/Screenshot_195.png", quantity: 1 }, status: "Pending", paymentMethod: "GCash", gcashNumber: "0938-100-4277", gcashName: "J*** D*** C***" },
  { id: 3, farmer: { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", avatar: "/Screenshot_195.png" }, product: { name: "Farm Fresh Sweet Corn", variation: "Yellow, White", image: "/Screenshot_195.png", quantity: 1 }, status: "Pending", paymentMethod: "GCash", gcashNumber: "0938-100-4277", gcashName: "J*** D*** C***" },
  { id: 4, farmer: { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", avatar: "/Screenshot_195.png" }, product: { name: "Farm Fresh Sweet Corn", variation: "Yellow, White", image: "/Screenshot_195.png", quantity: 1 }, status: "Pending", paymentMethod: "GCash", gcashNumber: "0938-100-4277", gcashName: "J*** D*** C***" },
  { id: 5, farmer: { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", avatar: "/Screenshot_195.png" }, product: { name: "Farm Fresh Sweet Corn", variation: "Yellow, White", image: "/Screenshot_195.png", quantity: 1 }, status: "Pending", paymentMethod: "GCash", gcashNumber: "0938-100-4277", gcashName: "J*** D*** C***" },
  { id: 6, farmer: { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", avatar: "/Screenshot_195.png" }, product: { name: "Farm Fresh Sweet Corn", variation: "Yellow, White", image: "/Screenshot_195.png", quantity: 1 }, status: "Pending", paymentMethod: "GCash", gcashNumber: "0938-100-4277", gcashName: "J*** D*** C***" },
];

const FARMER_PAYOUT_BADGE_STYLES = {
  Complete: { color: "#16A34A", background: "#E6F9EC", border: "#16A34A" },
  Pending: { color: "#92400E", background: "#FEF3C7", border: "#FACC15" },
  Failed: { color: "#DC2626", background: "#FEE2E2", border: "#DC2626" },
  default: { color: "#757575", background: "#E5E7EB", border: "#D4D4D8" },
};

export default function FarmerPayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFarmerRows, setSelectedFarmerRows] = useState([]);
  const [farmerPayoutPage, setFarmerPayoutPage] = useState(1);
  const farmerRowsPerPage = 6;
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [currentPayout, setCurrentPayout] = useState(null);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  const filteredFarmerRows = FARMER_PAYOUT_ROWS.filter(row =>
    row.farmer.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    row.product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const farmerPayoutTotalPages = Math.ceil(filteredFarmerRows.length / farmerRowsPerPage);
  const visibleFarmerRows = filteredFarmerRows.slice(
    (farmerPayoutPage - 1) * farmerRowsPerPage,
    farmerPayoutPage * farmerRowsPerPage
  );
  useEffect(() => { setFarmerPayoutPage(1); }, [searchQuery]);

  const handlePayNow = (row) => {
    setCurrentPayout(row);
    setShowPayoutModal(true);
    setPayoutSuccess(false);
  };
  const handleProceedPayout = () => {
    setPayoutSuccess(true);
  };
  const handlePayoutBack = () => {
    setShowPayoutModal(false);
    setCurrentPayout(null);
    setPayoutSuccess(false);
  };
  const handlePayoutClose = () => {
    setShowPayoutModal(false);
    setCurrentPayout(null);
    setPayoutSuccess(false);
  };

  return (
    <div className="px-6 pb-6">
      {/* Top bar: All Payouts & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 mb-2">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <RefreshCw size={20} style={{ color: "#16A34A" }} />
          <span style={{ fontWeight: 500 }}>{`All Payouts ${FARMER_PAYOUT_ROWS.length}`}</span>
          {selectedFarmerRows.length > 0 && (
            <>
              <button
                onClick={() => setSelectedFarmerRows([])}
                className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-red-50 ml-3"
                style={{ color: "#dc2626" }}
              >
                Remove
                <span className="text-gray-500 ml-1">{selectedFarmerRows.length} Selected</span>
              </button>
              <button
                onClick={() => setSelectedFarmerRows([])}
                className="flex items-center gap-1 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100 ml-1"
              >
                ✕ Clear
              </button>
            </>
          )}
        </div>
        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative" style={{ width: "240px" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6B7280",
              }}
            />
            <input
              type="text"
              placeholder="Search Farmer"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 2.5rem 0.5rem 2.5rem",
                border: "1px solid #D1D5DB",
                borderRadius: "9999px",
                outline: "none",
              }}
            />
            <SlidersHorizontal
              size={18}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6B7280",
              }}
            />
          </div>
        </div>
      </div>
      {/* PAYOUT STATUS CARDS */}
      <div className="pb-4">
        <div className="flex gap-4 overflow-x-auto">
          {FARMER_PAYOUT_SUMMARY.map((item) => (
            <div
              key={item.name}
              style={{
                position: "relative",
                border: `1.5px solid #858585`,
                borderRadius: "1.6rem",
                minWidth: "180px",
                height: "80px",
                padding: "0 1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#fff",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  bottom: "0",
                  width: "14px",
                  backgroundColor: item.border,
                  borderRadius: "1.6rem 0 0 1.6rem",
                }}
              />
              <span style={{ fontSize: "0.93rem", color: "#9CA3AF", fontWeight: 500, marginLeft: "12px" }}>
                {item.name}
              </span>
              <span style={{ fontSize: "2.1rem", fontWeight: 900, color: "#000", marginLeft: "12px" }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Table */}
      <div style={{ borderRadius: "1rem", overflow: "hidden", minHeight: 420 }}>
        <h2 className="px-4 pt-4 text-xl font-bold text-gray-900">Farmer Payouts</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#F7F7FB" }}>
            <tr style={{ color: "#4B5563", fontSize: "0.875rem", fontWeight: 600 }}>
              <th style={{ padding: "0.75rem" }}>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm rounded"
                  checked={
                    selectedFarmerRows.length === visibleFarmerRows.length &&
                    visibleFarmerRows.length > 0
                  }
                  onChange={e =>
                    setSelectedFarmerRows(
                      e.target.checked
                        ? visibleFarmerRows.map(row => row.id)
                        : []
                    )
                  }
                />
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Farmer</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Product</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Status</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleFarmerRows.map(row => {
              const isSelected = selectedFarmerRows.includes(row.id);
              const badge = FARMER_PAYOUT_BADGE_STYLES[row.status] || FARMER_PAYOUT_BADGE_STYLES.default;
              return (
                <tr
                  key={row.id}
                  style={{
                    backgroundColor: isSelected ? "#F0FDFA" : "transparent",
                    height: "56px"
                  }}
                >
                  <td style={{ padding: "0.75rem" }}>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded"
                      checked={isSelected}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedFarmerRows([...selectedFarmerRows, row.id]);
                        } else {
                          setSelectedFarmerRows(selectedFarmerRows.filter(id => id !== row.id));
                        }
                      }}
                    />
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img
                        src={row.farmer.avatar}
                        alt={row.farmer.name}
                        style={{ width: 32, height: 32, borderRadius: "50%" }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: "#111827" }}>{row.farmer.name}</div>
                        <div style={{ fontSize: "0.83rem", color: "#6B7280" }}>
                          {row.farmer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img
                        src={row.product.image}
                        alt={row.product.name}
                        style={{ width: 32, height: 32, borderRadius: "0.7rem", border: "1.5px solid #EFEFEF" }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: "#111827" }}>{row.product.name}</div>
                        <div style={{ fontSize: "0.83rem", color: "#9CA3AF" }}>
                          Variation: {row.product.variation}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.85rem",
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        borderRadius: "9999px",
                        color: badge.color,
                        backgroundColor: badge.background,
                        border: `1px solid ${badge.border}`,
                        minWidth: 80,
                        textAlign: "center"
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        backgroundColor: "#16A34A",
                        borderRadius: "999px",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "1rem",
                        border: "none",
                        padding: "0.45rem 1.1rem",
                        boxShadow: "0 2px 8px 0 rgba(36,185,111,0.08)",
                        cursor: "pointer"
                      }}
                      onClick={() => handlePayNow(row)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                        <polyline points="23 11 12 2 1 11" />
                        <rect x="1" y="11" width="22" height="11" rx="2" />
                      </svg>
                      Pay Now
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center my-6">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFarmerPayoutPage(p => Math.max(1, p - 1))}
              className="btn btn-sm"
              disabled={farmerPayoutPage === 1}
            >«</button>
            {[...Array(farmerPayoutTotalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setFarmerPayoutPage(page)}
                  className={`btn btn-sm ${page === farmerPayoutPage ? 'bg-gray-300 text-black' : 'btn-ghost text-gray-600'}`}
                >{page}</button>
              );
            })}
            <button
              onClick={() => setFarmerPayoutPage(p => Math.min(farmerPayoutTotalPages, p + 1))}
              className="btn btn-sm"
              disabled={farmerPayoutPage === farmerPayoutTotalPages}
            >»</button>
          </div>
        </div>
      </div>
      {/* MODAL */}
      <PayoutModal
        isOpen={showPayoutModal}
        onClose={handlePayoutClose}
        payout={currentPayout}
        onProceed={handleProceedPayout}
        onBack={handlePayoutBack}
        isSuccess={payoutSuccess}
      />
    </div>
  );
}
s