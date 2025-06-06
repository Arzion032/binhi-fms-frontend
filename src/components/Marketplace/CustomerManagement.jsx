import React, { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";
import OrderHistoryModal from "./OrderHistoryModal";

const CUSTOMER_DATA = [
  { id: 1, name: "Juan Dela Cruz", email: "juandcruz@gmail.com", address: "Masinag", province: "Bulacan", birthdate: "20 Aug 1999", age: 78, avatar: "/sampleproduct.png", contact: "(+63) 948 122 9142" },
  { id: 2, name: "Maria Reyes", email: "mariareyes@gmail.com", address: "Poblacion", province: "Bulacan", birthdate: "15 Feb 1987", age: 37, avatar: "/sampleproduct.png", contact: "(+63) 912 345 6789" },
  { id: 3, name: "Pedro Santos", email: "pedrosantos@gmail.com", address: "San Roque", province: "Bulacan", birthdate: "04 Nov 1965", age: 58, avatar: "/sampleproduct.png", contact: "(+63) 999 888 7777" },
  { id: 4, name: "Anna Flores", email: "annaflores@gmail.com", address: "Sta. Maria", province: "Bulacan", birthdate: "30 Sep 1973", age: 50, avatar: "/sampleproduct.png", contact: "(+63) 922 222 4444" },
  { id: 5, name: "Josefa Diaz", email: "josefadiaz@gmail.com", address: "Muzon", province: "Bulacan", birthdate: "12 May 1980", age: 44, avatar: "/sampleproduct.png", contact: "(+63) 901 222 3333" },
  { id: 6, name: "Enrique Villanueva", email: "enriquevillanueva@gmail.com", address: "Marilao", province: "Bulacan", birthdate: "10 Dec 1958", age: 65, avatar: "/sampleproduct.png", contact: "(+63) 977 123 4567" },
  { id: 7, name: "Paula Martinez", email: "paulamartinez@gmail.com", address: "San Jose", province: "Bulacan", birthdate: "03 Mar 1970", age: 54, avatar: "/sampleproduct.png", contact: "(+63) 934 567 8910" },
];

const SAMPLE_ORDERS = [
  { seller: "Juan Dela Cruz", productName: "Fresh Rice", variation: "Premium", price: 2300, quantity: 2, status: "Delivered" },
  { seller: "Maria Santos", productName: "Brown Sugar", variation: "1kg pack", price: 155, quantity: 5, status: "Delivered" },
  { seller: "Pedro Gomez", productName: "Organic Corn", variation: "Yellow", price: 300, quantity: 3, status: "Delivered" },
  { seller: "Anna Lee", productName: "Peanuts", variation: "Raw", price: 95, quantity: 1, status: "Completed" },
  { seller: "Karla Cruz", productName: "Coconut Oil", variation: "500ml", price: 175, quantity: 4, status: "Delivered" },
  { seller: "Martin Dela Paz", productName: "Cassava", variation: "Fresh", price: 250, quantity: 2, status: "Completed" },
  { seller: "Luisa Ramos", productName: "Mongo Beans", variation: "Green", price: 210, quantity: 3, status: "Delivered" },
  { seller: "Elena Mendoza", productName: "Sweet Potato", variation: "Purple", price: 180, quantity: 2, status: "Completed" },
];

export default function CustomerManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomerRows, setSelectedCustomerRows] = useState([]);
  const [customerPage, setCustomerPage] = useState(1);
  const customersPerPage = 7;
  const [orderHistoryOpen, setOrderHistoryOpen] = useState(false);
  const [orderHistoryCustomer, setOrderHistoryCustomer] = useState(null);

  const filteredCustomers = CUSTOMER_DATA.filter(c =>
    c.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    || c.email.toLowerCase().includes(searchQuery.trim().toLowerCase())
    || c.address.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const customerTotalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const visibleCustomers = filteredCustomers.slice(
    (customerPage - 1) * customersPerPage,
    customerPage * customersPerPage
  );

  useEffect(() => { setCustomerPage(1); }, [searchQuery]);

  return (
    <div className="px-6 pb-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between py-4">
        {selectedCustomerRows.length > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCustomerRows([])}
              className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-red-50"
              style={{ color: "#dc2626" }}
            >
              Remove
              <span className="text-gray-500 ml-1">{selectedCustomerRows.length} Selected</span>
            </button>
            <button
              onClick={() => setSelectedCustomerRows([])}
              className="flex items-center gap-1 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100"
            >
              ✕ Clear
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2" style={{ color: "#374151" }}>
            <RefreshCw size={20} style={{ color: "#16A34A" }} />
            <span style={{ fontWeight: 500 }}>{`Total Customers ${CUSTOMER_DATA.length}`}</span>
          </div>
        )}

        {/* Search bar and filters */}
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
              placeholder="Search Customer"
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
      {/* Table */}
      <div style={{ borderRadius: '1rem', overflow: 'hidden', minHeight: 420 }}>
        <h2 className="px-4 pt-4 text-xl font-bold text-gray-900">Customer List</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#F7F7FB' }}>
            <tr style={{ color: '#4B5563', fontSize: '0.875rem', fontWeight: 600 }}>
              <th style={{ padding: '0.75rem' }}>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm rounded"
                  checked={selectedCustomerRows.length === visibleCustomers.length && visibleCustomers.length > 0}
                  onChange={e =>
                    setSelectedCustomerRows(e.target.checked
                      ? visibleCustomers.map(c => c.id)
                      : [])
                  }
                />
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Customer</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Address</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Birthdate</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleCustomers.map(c => {
              const isSelected = selectedCustomerRows.includes(c.id);
              return (
                <tr
                  key={c.id}
                  style={{
                    backgroundColor: isSelected ? '#F0FDFA' : 'transparent',
                    height: '49px'
                  }}
                >
                  <td style={{ padding: '0.75rem' }}>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded"
                      checked={isSelected}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedCustomerRows([...selectedCustomerRows, c.id]);
                        } else {
                          setSelectedCustomerRows(selectedCustomerRows.filter(id => id !== c.id));
                        }
                      }}
                    />
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={c.avatar}
                        alt={c.name}
                        style={{ width: 32, height: 32, borderRadius: '50%' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#111827' }}>{c.name}</div>
                        <div style={{ fontSize: '0.83rem', color: '#6B7280' }}>
                          {c.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ fontWeight: 500 }}>{c.address}</span>
                    <div className="text-gray-400 text-[0.93rem]">{c.province}</div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ fontWeight: 600 }}>{c.birthdate}</span>
                    <div className="text-gray-400 text-[0.93rem]">{c.age} Years Old</div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <button
                      className="text-[#24B96F] font-semibold flex items-center gap-1 hover:underline"
                      onClick={() => {
                        setOrderHistoryCustomer(c);
                        setOrderHistoryOpen(true);
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M2.5 10a7.5 7.5 0 1 1 7.5 7.5" stroke="#24B96F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.5 6.667V10h3.333" stroke="#24B96F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 5v5l4.167 2.5" stroke="#24B96F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Order History
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
              onClick={() => setCustomerPage(p => Math.max(1, p - 1))}
              className="btn btn-sm"
              disabled={customerPage === 1}
            >«</button>
            {[...Array(customerTotalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCustomerPage(page)}
                  className={`btn btn-sm ${page === customerPage ? 'bg-gray-300 text-black' : 'btn-ghost text-gray-600'}`}
                >{page}</button>
              );
            })}
            <button
              onClick={() => setCustomerPage(p => Math.min(customerTotalPages, p + 1))}
              className="btn btn-sm"
              disabled={customerPage === customerTotalPages}
            >»</button>
          </div>
        </div>
      </div>
      {/* MODAL */}
      <OrderHistoryModal
        isOpen={orderHistoryOpen}
        onClose={() => setOrderHistoryOpen(false)}
        customerName={orderHistoryCustomer?.name || ""}
        orders={SAMPLE_ORDERS}
      />
    </div>
  );
}
