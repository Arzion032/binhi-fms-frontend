import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, RefreshCw } from "lucide-react";
import OrderManagementModal from "./OrderManagementModal";

const ORDER_STATUS_CARDS = [
  { name: "Pending", count: 35, color: "#757575", border: "#D4D4D8" },
  { name: "Confirmed", count: 41, color: "#15803D", border: "#4CAE4F" },
  { name: "Processing", count: 51, color: "#2563EB", border: "#2563EB" },
  { name: "Shipped", count: 60, color: "#7C3AED", border: "#5E35B1" },
  { name: "Delivered", count: 75, color: "#15803D", border: "#26A69A" },
  { name: "Cancelled", count: 35, color: "#DC2626", border: "#DC2626" },
  { name: "Returned", count: 35, color: "#F59E42", border: "#FB8C00" },
];

const ORDER_BADGE_STYLES = {
  Pending: { color: "#757575", background: "#E5E7EB", border: "#D4D4D8" },
  Confirmed: { color: "#15803D", background: "#D1FAE5", border: "#15803D" },
  Processing: { color: "#2563EB", background: "#DBEAFE", border: "#2563EB" },
  Shipped: { color: "#7C3AED", background: "#EDE9FE", border: "#7C3AED" },
  Delivered: { color: "#15803D", background: "#D1FAE5", border: "#15803D" },
  Cancelled: { color: "#DC2626", background: "#FEE2E2", border: "#DC2626" },
  Returned: { color: "#F59E42", background: "#FEF3C7", border: "#F59E42" },
  Paid: { color: "#16A34A", background: "#D1FAE5", border: "#16A34A" },
  Refunded: { color: "#F59E42", background: "#FEF3C7", border: "#F59E42" },
};

const SAMPLE_ORDER_ROWS = [
  { id: "#01234", customer: { name: "Juan Dela Cruz", email: "juandcruz@gmail.com", avatar: "/sampleproduct.png", address: "Purok 3 Zone 6 Penafrancia Cupang Antipolo City", contact: "(+63) 948 122 9142" }, product: { name: "Premium Farm Fresh Sweet Corn", variation: "Yellow, White" }, date: "20 Aug 1999", time: "01:23:42 PM", status: "Pending", transaction: "Pending" },
  { id: "#01235", customer: { name: "Maria Reyes", email: "mariareyes@gmail.com", avatar: "/sampleproduct.png", address: "Purok 1, Poblacion, Bulacan", contact: "(+63) 912 345 6789" }, product: { name: "Premium Angus Beef Strips", variation: "Tenderloin, Ribeye" }, date: "23 Mar 2001", time: "10:30:10 AM", status: "Delivered", transaction: "Paid" },
  { id: "#01236", customer: { name: "Pedro Santos", email: "pedrosantos@gmail.com", avatar: "/sampleproduct.png", address: "San Roque, Bulacan", contact: "(+63) 999 888 7777" }, product: { name: "Organic Rainbow Carrots", variation: "Orange, Purple, White" }, date: "05 Jul 2020", time: "09:01:22 AM", status: "Processing", transaction: "Pending" },
  { id: "#01237", customer: { name: "Anna Flores", email: "annaflores@gmail.com", avatar: "/sampleproduct.png", address: "Sta. Maria, Bulacan", contact: "(+63) 922 222 4444" }, product: { name: "Artisan Wheat Flour", variation: "All-purpose, Bread" }, date: "09 Nov 2021", time: "04:45:12 PM", status: "Shipped", transaction: "Pending" },
];

export default function OrderManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderRows, setSelectedOrderRows] = useState([]);
  const [orderRows, setOrderRows] = useState(SAMPLE_ORDER_ROWS);
  const [orderPage, setOrderPage] = useState(1);
  const ordersPerPage = 7;
  const [orderManagementModalOpen, setOrderManagementModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrderRows = orderRows.filter(
    (order) =>
      order.customer.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      order.product.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const orderTotalPages = Math.ceil(filteredOrderRows.length / ordersPerPage);
  const visibleOrderRows = filteredOrderRows.slice(
    (orderPage - 1) * ordersPerPage,
    orderPage * ordersPerPage
  );
  useEffect(() => { setOrderPage(1); }, [searchQuery]);

  const handleDeleteOrderRows = () => {
    if (!window.confirm("Delete selected orders?")) return;
    setOrderRows((prev) => prev.filter((_, i) => !selectedOrderRows.includes(i)));
    setSelectedOrderRows([]);
  };

  return (
    <div className="px-6 pb-6">
      {/* Top bar: All Orders & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 mb-2">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <RefreshCw size={20} style={{ color: "#16A34A" }} />
          <span style={{ fontWeight: 500 }}>{`All Orders ${orderRows.length}`}</span>
          {selectedOrderRows.length > 0 && (
            <>
              <button
                onClick={handleDeleteOrderRows}
                className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-red-50 ml-3"
                style={{ color: "#dc2626" }}
              >
                Delete
                <span className="text-gray-500 ml-1">{selectedOrderRows.length} Selected</span>
              </button>
              <button
                onClick={() => setSelectedOrderRows([])}
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
              placeholder="Search Order"
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
      {/* ORDER STATUS CARDS */}
      <div className="pb-4">
        <div className="flex gap-4 overflow-x-auto">
          {ORDER_STATUS_CARDS.map((cat, idx) => (
            <div
              key={cat.name}
              style={{
                position: "relative",
                border: "1px solid #858585",
                borderRadius: "1.6rem",
                minWidth: "150px",
                height: "80px",
                padding: "0 1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
                flex: "1",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  bottom: "0",
                  width: "20px",
                  backgroundColor: cat.border,
                  borderRadius: "1.6rem 0 0 1.6rem",
                }}
              />
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#9CA3AF",
                  fontWeight: 500,
                  marginLeft: "8px",
                }}
              >
                {cat.name}
              </span>
              <span
                style={{
                  fontSize: "1.875rem",
                  fontWeight: 900,
                  color: "#000000",
                  marginLeft: "8px",
                }}
              >
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Table */}
      <div style={{ borderRadius: "1rem", overflow: "hidden", minHeight: 420 }}>
        <h2 className="px-4 pt-4 text-xl font-bold text-gray-900">Orders List</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#F7F7FB" }}>
            <tr style={{ color: "#4B5563", fontSize: "0.875rem", fontWeight: 600 }}>
              <th style={{ padding: "0.75rem" }}>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm rounded"
                  checked={
                    selectedOrderRows.length === visibleOrderRows.length &&
                    visibleOrderRows.length > 0
                  }
                  onChange={e =>
                    setSelectedOrderRows(
                      e.target.checked
                        ? visibleOrderRows.map((_, idx) => idx)
                        : []
                    )
                  }
                />
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Order ID</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Customer</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Product</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Date Ordered</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Order Status</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Transaction</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrderRows.map((o, idx) => {
              const isSelected = selectedOrderRows.includes(idx);
              return (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: isSelected ? "#F0FDFA" : "transparent",
                    height: "60px",
                  }}
                >
                  <td style={{ padding: "0.75rem" }}>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded"
                      checked={isSelected}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedOrderRows([...selectedOrderRows, idx]);
                        } else {
                          setSelectedOrderRows(selectedOrderRows.filter(i => i !== idx));
                        }
                      }}
                    />
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span className="font-medium">{o.id}</span>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem"
                    }}>
                      <img
                        src={o.customer.avatar}
                        alt={o.customer.name}
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          objectFit: "cover"
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: "#111827" }}>
                          {o.customer.name}
                        </div>
                        <div style={{ fontSize: "0.87rem", color: "#6B7280" }}>
                          {o.customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <div>
                      <div style={{ fontWeight: 600, color: "#111827" }}>
                        {o.product.name}
                      </div>
                      <div style={{
                        fontSize: "0.87rem",
                        color: "#9CA3AF",
                        marginTop: "1px"
                      }}>
                        Variation: {o.product.variation}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span style={{ fontWeight: 500 }}>{o.date}</span>
                    <div className="text-gray-400 text-[0.93rem]">{o.time}</div>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        borderRadius: "9999px",
                        color: ORDER_BADGE_STYLES[o.status].color,
                        backgroundColor: ORDER_BADGE_STYLES[o.status].background,
                        border: `1px solid ${ORDER_BADGE_STYLES[o.status].border}`
                      }}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        borderRadius: "9999px",
                        color: ORDER_BADGE_STYLES[o.transaction]?.color || "#757575",
                        backgroundColor: ORDER_BADGE_STYLES[o.transaction]?.background || "#E5E7EB",
                        border: `1px solid ${ORDER_BADGE_STYLES[o.transaction]?.border || "#D4D4D8"}`
                      }}
                    >
                      {o.transaction}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <div
                      className="group flex items-center gap-2 cursor-pointer"
                      onClick={() => {
                        setSelectedOrder(o);
                        setOrderManagementModalOpen(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4CAE4F"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <circle cx={11} cy={11} r={8} />
                        <line x1={21} y1={21} x2={16.65} y2={16.65} />
                      </svg>
                      <span
                        style={{ color: "#4CAE4F", marginLeft: 7, whiteSpace: "nowrap" }}
                        className="text-[0.98rem] font-semibold"
                      >
                        View Order
                      </span>
                    </div>
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
              onClick={() => setOrderPage(p => Math.max(1, p - 1))}
              className="btn btn-sm"
              disabled={orderPage === 1}
            >«</button>
            {[...Array(orderTotalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setOrderPage(page)}
                  className={`btn btn-sm ${page === orderPage ? 'bg-gray-300 text-black' : 'btn-ghost text-gray-600'}`}
                >{page}</button>
              );
            })}
            <button
              onClick={() => setOrderPage(p => Math.min(orderTotalPages, p + 1))}
              className="btn btn-sm"
              disabled={orderPage === orderTotalPages}
            >»</button>
          </div>
        </div>
      </div>
      {/* MODAL */}
      <OrderManagementModal
        isOpen={orderManagementModalOpen}
        onClose={() => setOrderManagementModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
