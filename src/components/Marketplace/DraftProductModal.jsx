import React, { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

// Same product data logic as ProductManagement.jsx
const BADGE_STYLES = {
  Fruits: { color: "#7C3AED", background: "#F3E8FF", border: "#7C3AED" },
  "Milks & Dairy": { color: "#3B82F6", background: "#DDECFF", border: "#3B82F6" },
  Vegetable: { color: "#16A34A", background: "#D1FAE5", border: "#16A34A" },
  Grains: { color: "#B79900", background: "#FFF8D4", border: "#B79900" },
  "Root Crops": { color: "#F97316", background: "#FFEDD5", border: "#F97316" },
  Meats: { color: "#DC2626", background: "#FEE2E2", border: "#DC2626" },
  Fish: { color: "#0284C7", background: "#DEF5FF", border: "#0284C7" },
};

const FARMER_NAMES = [
  "Juan D Cruz", "Maria L Santos", "Pedro M Ramos", "Elena P Villanueva",
  "Josefina B Lopez", "Ricardo A Mendoza", "Angelica F Reyes",
  "Carlos T Bautista", "Rosario G Flores", "Manuel C Garcia",
  "Consuelo R Torres", "Benito Q Morales"
];

function getRandomFarmerName() {
  const idx = Math.floor(Math.random() * FARMER_NAMES.length);
  return FARMER_NAMES[idx];
}

function generateFarmerCode(name = "Juan D Cruz") {
  const [first, mid, last] = name.split(" ");
  const initials =
    (first ? first[0] : "") +
    (mid ? mid[0] : "") +
    (last ? last[0] : "");
  const digits = Math.floor(100 + Math.random() * 900);
  return `${initials.toUpperCase()}${digits}`;
}

// Use the same products as in ProductManagement.jsx, but only status "Pending"
const RAW_PRODUCTS = [
  { id: 3, name: "Sticky Glutinous Rice", variation: "Sticky", avatar: "/Screenshot_195.png", price: 4800, category: "Grains", stock: 60, status: "Pending" },
  { id: 11, name: "Sorghum", variation: "Grain", avatar: "/Screenshot_195.png", price: 4200, category: "Grains", stock: 40, status: "Pending" },
  { id: 19, name: "Spinach", variation: "Green", avatar: "/Screenshot_195.png", price: 800, category: "Vegetable", stock: 50, status: "Pending" },
  { id: 7, name: "Black Rice Special", variation: "Black", avatar: "/Screenshot_195.png", price: 6000, category: "Grains", stock: 30, status: "Pending" },
  { id: 15, name: "Bitter Gourd", variation: "Small", avatar: "/Screenshot_195.png", price: 350, category: "Vegetable", stock: 40, status: "Pending" },
  { id: 49, name: "Beef Sirloin", variation: "Slice", avatar: "/Screenshot_195.png", price: 40000, category: "Meats", stock: 50, status: "Pending" },
  { id: 53, name: "Goat Meat", variation: "Cubes", avatar: "/Screenshot_195.png", price: 45000, category: "Meats", stock: 20, status: "Pending" },
  { id: 43, name: "Powdered Milk", variation: "Instant", avatar: "/Screenshot_195.png", price: 9500, category: "Milks & Dairy", stock: 70, status: "Pending" },
  { id: 28, name: "Ube", variation: "Purple", avatar: "/Screenshot_195.png", price: 1200, category: "Root Crops", stock: 40, status: "Pending" },
  { id: 33, name: "Carrot Root", variation: "Orange", avatar: "/Screenshot_195.png", price: 900, category: "Root Crops", stock: 60, status: "Pending" },
  { id: 39, name: "Cheddar Cheese", variation: "Block", avatar: "/Screenshot_195.png", price: 20000, category: "Milks & Dairy", stock: 40, status: "Pending" },
  { id: 72, name: "Galunggong", variation: "Round Scad", avatar: "/Screenshot_195.png", price: 1700, category: "Fish", stock: 70, status: "Pending" },
  { id: 60, name: "Red Watermelon", variation: "Seedless", avatar: "/Screenshot_195.png", price: 3000, category: "Fruits", stock: 60, status: "Pending" },
  { id: 78, name: "Salmon", variation: "Slice", avatar: "/Screenshot_195.png", price: 6800, category: "Fish", stock: 35, status: "Pending" },
  { id: 65, name: "Rambutan", variation: "Red", avatar: "/Screenshot_195.png", price: 5000, category: "Fruits", stock: 25, status: "Pending" },
];

const DRAFT_PRODUCTS = RAW_PRODUCTS.map((item) => {
  const farmerName = getRandomFarmerName();
  return {
    ...item,
    association: "Macamot Farmers Association",
    farmer: generateFarmerCode(farmerName),
    unit: "1kg",
    farmerName,
  };
});

function getVariationMap(products) {
  const map = {};
  products.forEach((p) => {
    if (!map[p.name]) map[p.name] = [];
    map[p.name].push(p.variation);
  });
  return map;
}

const ITEMS_PER_PAGE = 7;

export default function DraftProductModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const variationMap = useMemo(() => getVariationMap(DRAFT_PRODUCTS), []);
  const filteredProducts = useMemo(() => {
    let filtered = DRAFT_PRODUCTS;
    if (searchQuery.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }
    return filtered;
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const emptyRows = ITEMS_PER_PAGE - visibleProducts.length > 0 ? ITEMS_PER_PAGE - visibleProducts.length : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="relative bg-white rounded-2xl shadow-xl w-[99vw] max-w-[1560px] min-h-[800px] flex flex-col"
        style={{ maxHeight: "95vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-0">Draft Products</h2>
            <p className="text-gray-500 text-sm font-normal">
              Here’s the products that is not posted on your shop.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <X size={28} />
          </button>
        </div>
        {/* Body */}
        <div className="px-8 py-4 flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between mb-3">
            <span className="font-medium text-gray-700 text-base">
              All Draft Products{" "}
              <span className="text-gray-400 font-normal">{DRAFT_PRODUCTS.length}</span>
            </span>
            <div className="relative" style={{ width: "320px" }}>
              <Search
                size={20}
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6B7280",
                  zIndex: 2,
                }}
              />
              <input
                type="text"
                placeholder="Search Product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-full pl-9 pr-11 py-2 text-base w-full outline-none focus:ring-2 focus:ring-green-500"
              />
              <SlidersHorizontal
                size={20}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6B7280",
                  zIndex: 2,
                }}
              />
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto rounded-xl flex-1 max-h-[900px]">
            <table className="w-full table-fixed" style={{ borderCollapse: "collapse" }}>
              <colgroup>
                <col style={{ width: "4%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "13%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "9%" }} />
                <col style={{ width: "13%" }} />
                <col style={{ width: "7%" }} />
                <col style={{ width: "8%" }} />
              </colgroup>
              <thead className="bg-[#F7F7FB]">
                <tr
                  style={{
                    color: "#4B5563",
                    fontSize: "1rem",
                    fontWeight: 600,
                    height: "48px",
                    verticalAlign: "middle",
                  }}
                >
                  <th className="text-center py-3 px-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded"
                      checked={
                        selectedRows.length === visibleProducts.length &&
                        visibleProducts.length > 0
                      }
                      onChange={(e) =>
                        setSelectedRows(
                          e.target.checked ? visibleProducts.map((p) => p.id) : []
                        )
                      }
                    />
                  </th>
                  <th className="text-left px-3 py-3">Product</th>
                  <th className="text-left px-3 py-3">Variation</th>
                  <th className="text-left px-3 py-3">Association</th>
                  <th className="text-left px-3 py-3">Farmer</th>
                  <th className="text-left px-3 py-3">Unit</th>
                  <th className="text-left px-3 py-3">Price</th>
                  <th className="text-left px-3 py-3">Category</th>
                  <th className="text-left px-3 py-3">Stock</th>
                  <th className="text-left px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.map((p) => {
                  const style = BADGE_STYLES[p.category] || BADGE_STYLES["Grains"];
                  const isSelected = selectedRows.includes(p.id);
                  const variations = variationMap[p.name] || [];
                  let variationText = p.variation;
                  if (variations.length > 1) {
                    const extra = variations.length - 1;
                    variationText = `${p.variation} +${extra}`;
                  }
                  return (
                    <tr
                      key={p.id}
                      style={{
                        backgroundColor: isSelected ? "#F0FDFA" : "transparent",
                        minHeight: 44,
                        verticalAlign: "middle",
                        fontSize: "1rem",
                        fontWeight: 400,
                      }}
                    >
                      <td className="text-center px-3 py-3">
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
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3 min-h-[34px]">
                          <img
                            src={p.avatar}
                            alt={p.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="whitespace-nowrap text-gray-900 text-base">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">{variationText}</td>
                      <td className="px-3 py-3">{p.association}</td>
                      <td className="px-3 py-3">{p.farmer}</td>
                      <td className="px-3 py-3">{p.unit}</td>
                      <td className="px-3 py-3">
                        ₱{Number(p.price).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.16rem 0.6rem",
                            fontSize: "0.95rem",
                            borderRadius: "9999px",
                            color: style.color,
                            backgroundColor: style.background,
                            border: `1px solid ${style.border}`,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.category}
                        </span>
                      </td>
                      <td className="px-3 py-3">{p.stock}</td>
                      <td className="px-3 py-3">
                        <div className="group flex items-center gap-3">
                          <div
                            className="relative flex items-center cursor-pointer"
                            tabIndex={0}
                          >
                            <Pencil
                              size={18}
                              stroke="#3B82F6"
                              className="cursor-pointer transition-transform duration-200 group-hover:-translate-x-1"
                            />
                            <span className="absolute left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#3B82F6] text-xs font-medium transition-opacity duration-200 whitespace-nowrap" style={{ minWidth: 33 }}>
                              Edit
                            </span>
                          </div>
                          <Trash2
                            size={18}
                            stroke="#EF4444"
                            className="cursor-pointer transition-transform duration-200 group-hover:translate-x-8"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {Array.from({ length: emptyRows }).map((_, idx) => (
                  <tr key={`empty-row-${idx}`}>
                    <td className="px-3 py-3">&nbsp;</td>
                    {[...Array(9)].map((_, i) => (
                      <td key={i} className="px-3 py-3"></td>
                    ))}
                  </tr>
                ))}
                {visibleProducts.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center py-10 text-gray-400">
                      No draft products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center my-5">
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
                    className={`btn btn-sm ${
                      page === currentPage
                        ? "bg-gray-300 text-black"
                        : "btn-ghost text-gray-600"
                    }`}
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
      </div>
    </div>
  );
}
