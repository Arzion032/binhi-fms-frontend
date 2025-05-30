import React, { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  RefreshCw,
  Plus,
  BookOpen,
  Copy,
  Pencil,
  Trash2,
} from "lucide-react";
import AddCategoryModal from "./AddCategoryModal";
import EditDetailsModal from "./EditDetailsModal";

const CATEGORIES_SUMMARY = [
  { name: "Grains", count: 28 },
  { name: "Vegetable", count: 35 },
  { name: "Root Crops", count: 41 },
  { name: "Milks & Dairy", count: 51 },
  { name: "Meats", count: 60 },
  { name: "Fruits", count: 75 },
];

const BADGE_STYLES = {
  Fruits: { color: "#7C3AED", background: "#F3E8FF", border: "#7C3AED" },
  "Milks & Dairy": { color: "#3B82F6", background: "#DDECFF", border: "#3B82F6" },
  Vegetable: { color: "#16A34A", background: "#D1FAE5", border: "#16A34A" },
  Grains: { color: "#B79900", background: "#FFF8D4", border: "#B79900" },
  "Root Crops": { color: "#F97316", background: "#FFEDD5", border: "#F97316" },
  Meats: { color: "#DC2626", background: "#FEE2E2", border: "#DC2626" },
};

const INITIAL_PRODUCTS = [
  { id: 1, name: "Premium Farm Fresh Sweet Corn", variation: "Yellow, White", avatar: "/Screenshot_195.png", price: 12999, category: "Fruits", stock: 25, status: "Approved" },
  { id: 2, name: "Train Your Dragon's Treasure Exotic Fruit", variation: "Yellow, White", avatar: "/Screenshot_195.png", price: 12999, category: "Milks & Dairy", stock: 25, status: "Pending" },
  { id: 3, name: "Ultra-Green Superfood Broccoli Hulk Flavored", variation: "Yellow, White", avatar: "/Screenshot_195.png", price: 12999, category: "Vegetable", stock: 25, status: "Approved" },
  { id: 4, name: "HAAHAHA PANG SAMGYUP", variation: "Yellow, White", avatar: "/Screenshot_195.png", price: 12999, category: "Grains", stock: 25, status: "Pending" },
  { id: 5, name: "Creamy Black Gold Avocado with Balut", variation: "Yellow, White", avatar: "/Screenshot_195.png", price: 12999, category: "Fruits", stock: 25, status: "Approved" },
  { id: 6, name: "Organic Rainbow Carrots", variation: "Orange, Purple, White", avatar: "/Screenshot_195.png", price: 8999, category: "Root Crops", stock: 40, status: "Approved" },
  { id: 7, name: "Premium Angus Beef Strips", variation: "Tenderloin, Ribeye", avatar: "/Screenshot_195.png", price: 35999, category: "Meats", stock: 15, status: "Approved" },
  { id: 8, name: "Fresh Farm Milk Bottles", variation: "Whole, Low-fat", avatar: "/Screenshot_195.png", price: 4599, category: "Milks & Dairy", stock: 60, status: "Pending" },
  { id: 9, name: "Heirloom Tomatoes Mix", variation: "Red, Green, Yellow", avatar: "/Screenshot_195.png", price: 15999, category: "Vegetable", stock: 30, status: "Approved" },
  { id: 10, name: "Artisan Wheat Flour", variation: "All-purpose, Bread", avatar: "/Screenshot_195.png", price: 6999, category: "Grains", stock: 50, status: "Approved" },
  { id: 11, name: "Tropical Mango Paradise", variation: "Manila, Carabao", avatar: "/Screenshot_195.png", price: 18999, category: "Fruits", stock: 20, status: "Pending" },
  { id: 12, name: "Sweet Purple Yam", variation: "Large, Medium", avatar: "/Screenshot_195.png", price: 11999, category: "Root Crops", stock: 35, status: "Approved" },
  { id: 13, name: "Farm Fresh Chicken Breast", variation: "Boneless, Bone-in", avatar: "/Screenshot_195.png", price: 24999, category: "Meats", stock: 25, status: "Approved" },
  { id: 14, name: "Artisan Cheese Collection", variation: "Cheddar, Mozzarella", avatar: "/Screenshot_195.png", price: 28999, category: "Milks & Dairy", stock: 18, status: "Pending" },
  { id: 15, name: "Crispy Lettuce Heads", variation: "Iceberg, Romaine", avatar: "/Screenshot_195.png", price: 7999, category: "Vegetable", stock: 45, status: "Approved" },
];

export default function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  const handleDeleteSelected = () => {
    if (!window.confirm("Delete selected products?")) return;
    setProducts((prev) => prev.filter((p) => !selectedRows.includes(p.id)));
    setSelectedRows([]);
  };

  // Modal State
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryModalMode, setCategoryModalMode] = useState("add");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editModalMode, setEditModalMode] = useState("edit");

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProduct(null);
  };

  const handleDetails = (product) => {
    setEditProduct(product);
    setEditModalMode("details");
    setShowEditModal(true);
  };
  const handleEdit = (product) => {
    setEditProduct(product);
    setEditModalMode("edit");
    setShowEditModal(true);
  };

  return (
    <div className="px-6 pb-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between py-4">
        {selectedRows.length > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-red-50"
              style={{ color: "#dc2626" }}
            >
              <Trash2 size={18} stroke="#dc2626" />
              Delete
              <span className="text-gray-500 ml-1">{selectedRows.length} Selected</span>
            </button>
            <button
              onClick={() => setSelectedRows([])}
              className="flex items-center gap-1 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100"
            >
              ✕ Clear
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2" style={{ color: "#374151" }}>
            <RefreshCw size={20} style={{ color: "#16A34A" }} />
            <span style={{ fontWeight: 500 }}>{`All Products ${products.length}`}</span>
          </div>
        )}

        {/* Search, filters, add/manage categories */}
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
              placeholder="Search Product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              onClick={() => setShowFilters((f) => !f)}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6B7280",
              }}
            />
          </div>
          <>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1.2rem",
                backgroundColor: "#16A34A",
                color: "#fff",
                border: "none",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 2px 8px 0 rgba(36,185,111,0.05)",
              }}
              onClick={() => {
                setCategoryModalMode("add");
                setShowAddCategory(true);
              }}
            >
              <Plus size={18} /> Add Category
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1.2rem",
                backgroundColor: "#fff",
                color: "#16A34A",
                border: "1.5px solid #16A34A",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 2px 8px 0 rgba(36,185,111,0.05)",
              }}
              onClick={() => {
                setCategoryModalMode("manage");
                setShowAddCategory(true);
              }}
            >
              <BookOpen size={18} /> Manage Categories
            </button>
          </>
        </div>
      </div>
      {/* CATEGORY SUMMARY */}
      <div className="pb-4">
        <div className="flex gap-4 overflow-x-auto">
          {CATEGORIES_SUMMARY.map((cat) => {
            const style = BADGE_STYLES[cat.name] || BADGE_STYLES["Grains"];
            return (
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
                    backgroundColor: style.background,
                    borderRadius: "1.6rem 0 0 1.6rem",
                  }}
                />
                <span style={{ fontSize: "0.875rem", color: "#9CA3AF", fontWeight: 500, marginLeft: "8px" }}>{cat.name}</span>
                <span style={{ fontSize: "1.875rem", fontWeight: 900, color: "#000000", marginLeft: "8px" }}>{cat.count}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* TABLE */}
      <div style={{ borderRadius: "1rem", overflow: "hidden", minHeight: 420 }}>
        <h2 className="px-4 pt-4 text-xl font-bold text-gray-900">Product List</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#F7F7FB" }}>
            <tr style={{ color: "#4B5563", fontSize: "0.875rem", fontWeight: 600 }}>
              <th style={{ padding: "0.75rem" }}>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm rounded"
                  checked={selectedRows.length === visibleProducts.length && visibleProducts.length > 0}
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked ? visibleProducts.map((p) => p.id) : []
                    )
                  }
                />
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Product</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Price</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Category</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Stock</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Status</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((p) => {
              const style = BADGE_STYLES[p.category] || BADGE_STYLES["Grains"];
              const isSelected = selectedRows.includes(p.id);
              return (
                <tr
                  key={p.id}
                  style={{
                    backgroundColor: isSelected ? "#F0FDFA" : "transparent",
                    height: "49px",
                  }}
                >
                  <td style={{ padding: "0.75rem" }}>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded"
                      checked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows([...selectedRows, p.id]);
                        } else {
                          setSelectedRows(selectedRows.filter((id) => id !== p.id));
                        }
                      }}
                    />
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img
                        src={p.avatar}
                        alt={p.name}
                        style={{ width: 32, height: 32, borderRadius: "50%" }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: "#111827" }}>{p.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                          Variation: {p.variation}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem" }}>₱{Number(p.price).toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        borderRadius: "9999px",
                        color: style.color,
                        backgroundColor: style.background,
                        border: `1px solid ${style.border}`,
                      }}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem" }}>{p.stock}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        borderRadius: "9999px",
                        color:
                          p.status === "Pending"
                            ? "#92400E"
                            : p.status === "Approved"
                            ? "#15803D"
                            : "#DC2626",
                        backgroundColor:
                          p.status === "Pending"
                            ? "#FEF3C7"
                            : p.status === "Approved"
                            ? "#D1FAE5"
                            : "#FEE2E2",
                        border: `1px solid ${
                          p.status === "Pending"
                            ? "#92400E"
                            : p.status === "Approved"
                            ? "#15803D"
                            : "#DC2626"
                        }`,
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem", textAlign: "left", minWidth: 160 }}>
                    <div className="group flex items-center gap-4">
                      {p.status === "Pending" ? (
                        <div className="relative flex items-center" style={{ cursor: "pointer" }} onClick={() => handleDetails(p)}>
                          <Copy size={20} stroke="#16A34A" className="transition-transform duration-200 group-hover:-translate-x-2" />
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#16A34A] text-sm font-medium transition-opacity duration-200 whitespace-nowrap" style={{ minWidth: 50 }}>
                            Details
                          </span>
                        </div>
                      ) : (
                        <div className="relative flex items-center" style={{ cursor: "pointer" }}>
                          <Pencil size={20} stroke="#3B82F6" className="cursor-pointer transition-transform duration-200 group-hover:-translate-x-1" onClick={() => handleEdit(p)} />
                          <span className="absolute left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#3B82F6] text-sm font-medium transition-opacity duration-200 whitespace-nowrap" style={{ minWidth: 40 }}>
                            Edit
                          </span>
                        </div>
                      )}
                      <Trash2 size={20} stroke="#EF4444" className="cursor-pointer transition-transform duration-200 group-hover:translate-x-8" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* PAGINATION */}
        <div className="flex justify-center my-6">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="btn btn-sm"
              disabled={currentPage === 1}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`btn btn-sm ${page === currentPage ? "bg-gray-300 text-black" : "btn-ghost text-gray-600"}`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="btn btn-sm"
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>
      {/* MODALS */}
      <AddCategoryModal
        isOpen={showAddCategory}
        mode={categoryModalMode}
        onClose={() => setShowAddCategory(false)}
        onSwitchMode={(mode) => setCategoryModalMode(mode)}
      />
      <EditDetailsModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        product={editProduct}
        onConfirm={(updatedProduct) => {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
            )
          );
        }}
        mode={editModalMode}Add commentMore actions
      />
    </div>
  );
}