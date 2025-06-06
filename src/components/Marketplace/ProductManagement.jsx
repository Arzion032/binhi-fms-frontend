import React, { useState, useEffect, useMemo } from "react";
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

const BADGE_STYLES = {
  Fruits: { color: "#7C3AED", background: "#F3E8FF", border: "#7C3AED" },
  "Milks & Dairy": { color: "#3B82F6", background: "#DDECFF", border: "#3B82F6" },
  Vegetable: { color: "#16A34A", background: "#D1FAE5", border: "#16A34A" },
  Grains: { color: "#B79900", background: "#FFF8D4", border: "#B79900" },
  "Root Crops": { color: "#F97316", background: "#FFEDD5", border: "#F97316" },
  Meats: { color: "#DC2626", background: "#FEE2E2", border: "#DC2626" },
  Fish: { color: "#0284C7", background: "#DEF5FF", border: "#0284C7" },
};

const CATEGORY_NAMES = [
  "Grains",
  "Vegetable",
  "Root Crops",
  "Milks & Dairy",
  "Meats",
  "Fruits",
  "Fish",
];

// Farmer code generator (format: JDC123)
function generateFarmerCode(name = "Juan D Cruz") {
  const [first, mid, last] = name.split(" ");
  const initials =
    (first ? first[0] : "") +
    (mid ? mid[0] : "") +
    (last ? last[0] : "");
  const digits = Math.floor(100 + Math.random() * 900);
  return `${initials.toUpperCase()}${digits}`;
}

const INITIAL_PRODUCTS = [
    { id: 41, name: "Yogurt", variation: "Plain", avatar: "/Screenshot_195.png", price: 7000, category: "Milks & Dairy", stock: 60, status: "Approved" },
  { id: 3, name: "Sticky Glutinous Rice", variation: "Sticky", avatar: "/Screenshot_195.png", price: 4800, category: "Grains", stock: 60, status: "Pending" },
  { id: 27, name: "Taro", variation: "Large", avatar: "/Screenshot_195.png", price: 800, category: "Root Crops", stock: 50, status: "Approved" },
  { id: 75, name: "Dilis", variation: "Anchovy", avatar: "/Screenshot_195.png", price: 900, category: "Fish", stock: 110, status: "Approved" },
  { id: 59, name: "Banana Lacatan", variation: "Yellow", avatar: "/Screenshot_195.png", price: 1500, category: "Fruits", stock: 80, status: "Approved" },
  { id: 20, name: "Cauliflower", variation: "White", avatar: "/Screenshot_195.png", price: 950, category: "Vegetable", stock: 30, status: "Approved" },
  { id: 54, name: "Duck Meat", variation: "Whole", avatar: "/Screenshot_195.png", price: 40000, category: "Meats", stock: 40, status: "Approved" },
  { id: 11, name: "Sorghum", variation: "Grain", avatar: "/Screenshot_195.png", price: 4200, category: "Grains", stock: 40, status: "Pending" },
  { id: 68, name: "Dragonfruit", variation: "Red", avatar: "/Screenshot_195.png", price: 9000, category: "Fruits", stock: 35, status: "Approved" },
  { id: 35, name: "Camote", variation: "Red", avatar: "/Screenshot_195.png", price: 800, category: "Root Crops", stock: 55, status: "Approved" },
  { id: 45, name: "Greek Yogurt", variation: "Plain", avatar: "/Screenshot_195.png", price: 15000, category: "Milks & Dairy", stock: 30, status: "Approved" },
  { id: 66, name: "Lanzones", variation: "Sweet", avatar: "/Screenshot_195.png", price: 6000, category: "Fruits", stock: 45, status: "Approved" },
  { id: 70, name: "Tilapia", variation: "Whole", avatar: "/Screenshot_195.png", price: 1800, category: "Fish", stock: 60, status: "Approved" },
  { id: 19, name: "Spinach", variation: "Green", avatar: "/Screenshot_195.png", price: 800, category: "Vegetable", stock: 50, status: "Pending" },
  { id: 25, name: "Sweet Potato", variation: "Orange", avatar: "/Screenshot_195.png", price: 600, category: "Root Crops", stock: 55, status: "Approved" },
  { id: 29, name: "Yam", variation: "White", avatar: "/Screenshot_195.png", price: 1100, category: "Root Crops", stock: 60, status: "Approved" },
  { id: 64, name: "Papaya", variation: "Hawaiian", avatar: "/Screenshot_195.png", price: 2800, category: "Fruits", stock: 65, status: "Approved" },
  { id: 21, name: "Okra", variation: "Slender", avatar: "/Screenshot_195.png", price: 400, category: "Vegetable", stock: 80, status: "Approved" },
  { id: 44, name: "Cream Cheese", variation: "Soft", avatar: "/Screenshot_195.png", price: 18000, category: "Milks & Dairy", stock: 25, status: "Approved" },
  { id: 48, name: "Chicken Drumsticks", variation: "Cut", avatar: "/Screenshot_195.png", price: 20000, category: "Meats", stock: 100, status: "Approved" },
  { id: 30, name: "Radish", variation: "Red", avatar: "/Screenshot_195.png", price: 550, category: "Root Crops", stock: 45, status: "Approved" },
  { id: 13, name: "Eggplant", variation: "Long", avatar: "/Screenshot_195.png", price: 500, category: "Vegetable", stock: 60, status: "Approved" },
  { id: 55, name: "Lamb Chops", variation: "Chop", avatar: "/Screenshot_195.png", price: 70000, category: "Meats", stock: 15, status: "Approved" },
  { id: 38, name: "Carabao Milk", variation: "Whole", avatar: "/Screenshot_195.png", price: 5200, category: "Milks & Dairy", stock: 50, status: "Approved" },
  { id: 10, name: "Oats", variation: "Rolled", avatar: "/Screenshot_195.png", price: 3800, category: "Grains", stock: 60, status: "Approved" },
  { id: 63, name: "Pineapple", variation: "Large", avatar: "/Screenshot_195.png", price: 7000, category: "Fruits", stock: 70, status: "Approved" },
  { id: 47, name: "Fresh Pork Belly", variation: "Sliced", avatar: "/Screenshot_195.png", price: 38000, category: "Meats", stock: 80, status: "Approved" },
  { id: 74, name: "Tamban", variation: "Small", avatar: "/Screenshot_195.png", price: 1200, category: "Fish", stock: 100, status: "Approved" },
  { id: 49, name: "Beef Sirloin", variation: "Slice", avatar: "/Screenshot_195.png", price: 40000, category: "Meats", stock: 50, status: "Pending" },
  { id: 80, name: "Sardines", variation: "Can", avatar: "/Screenshot_195.png", price: 1500, category: "Fish", stock: 200, status: "Approved" },
  { id: 53, name: "Goat Meat", variation: "Cubes", avatar: "/Screenshot_195.png", price: 45000, category: "Meats", stock: 20, status: "Pending" },
  { id: 22, name: "Pechay", variation: "Baguio", avatar: "/Screenshot_195.png", price: 500, category: "Vegetable", stock: 70, status: "Approved" },
  { id: 40, name: "Mozzarella Cheese", variation: "Shredded", avatar: "/Screenshot_195.png", price: 21000, category: "Milks & Dairy", stock: 30, status: "Approved" },
  { id: 46, name: "Gouda Cheese", variation: "Block", avatar: "/Screenshot_195.png", price: 25000, category: "Milks & Dairy", stock: 20, status: "Approved" },
  { id: 67, name: "Atis", variation: "Sugar Apple", avatar: "/Screenshot_195.png", price: 4200, category: "Fruits", stock: 40, status: "Approved" },
  { id: 56, name: "Beef Brisket", variation: "Slab", avatar: "/Screenshot_195.png", price: 43000, category: "Meats", stock: 30, status: "Approved" },
  { id: 57, name: "Turkey", variation: "Whole", avatar: "/Screenshot_195.png", price: 48000, category: "Meats", stock: 12, status: "Approved" },
  { id: 81, name: "Tulingan", variation: "Skipjack", avatar: "/Screenshot_195.png", price: 1800, category: "Fish", stock: 30, status: "Approved" },
  { id: 5, name: "Jasmine Rice", variation: "Fragrant", avatar: "/Screenshot_195.png", price: 5200, category: "Grains", stock: 90, status: "Approved" },
  { id: 23, name: "Bell Pepper", variation: "Red, Green", avatar: "/Screenshot_195.png", price: 1300, category: "Vegetable", stock: 40, status: "Approved" },
  { id: 50, name: "Ground Pork", variation: "Lean", avatar: "/Screenshot_195.png", price: 25000, category: "Meats", stock: 90, status: "Approved" },
  { id: 32, name: "Ginger", variation: "Yellow", avatar: "/Screenshot_195.png", price: 1400, category: "Root Crops", stock: 80, status: "Approved" },
  { id: 1, name: "Premium White Rice", variation: "Long Grain", avatar: "/Screenshot_195.png", price: 4500, category: "Grains", stock: 100, status: "Approved" },
  { id: 28, name: "Ube", variation: "Purple", avatar: "/Screenshot_195.png", price: 1200, category: "Root Crops", stock: 40, status: "Pending" },
  { id: 51, name: "Pork Chop", variation: "Bone-in", avatar: "/Screenshot_195.png", price: 30000, category: "Meats", stock: 60, status: "Approved" },
  { id: 2, name: "Brown Rice Deluxe", variation: "Brown", avatar: "/Screenshot_195.png", price: 5000, category: "Grains", stock: 80, status: "Approved" },
  { id: 6, name: "Corn Grits", variation: "Yellow", avatar: "/Screenshot_195.png", price: 3200, category: "Grains", stock: 100, status: "Approved" },
  { id: 77, name: "Lapu-Lapu", variation: "Grouper", avatar: "/Screenshot_195.png", price: 5400, category: "Fish", stock: 20, status: "Approved" },
  { id: 7, name: "Black Rice Special", variation: "Black", avatar: "/Screenshot_195.png", price: 6000, category: "Grains", stock: 30, status: "Pending" },
  { id: 15, name: "Bitter Gourd", variation: "Small", avatar: "/Screenshot_195.png", price: 350, category: "Vegetable", stock: 40, status: "Pending" },
  { id: 76, name: "Hasa-hasa", variation: "Short Mackerel", avatar: "/Screenshot_195.png", price: 2000, category: "Fish", stock: 80, status: "Approved" },
  { id: 4, name: "Organic Red Rice", variation: "Red", avatar: "/Screenshot_195.png", price: 5300, category: "Grains", stock: 70, status: "Approved" },
  { id: 61, name: "Apple Fuji", variation: "Red", avatar: "/Screenshot_195.png", price: 4000, category: "Fruits", stock: 75, status: "Approved" },
  { id: 26, name: "Cassava", variation: "Brown", avatar: "/Screenshot_195.png", price: 500, category: "Root Crops", stock: 70, status: "Approved" },
  { id: 43, name: "Powdered Milk", variation: "Instant", avatar: "/Screenshot_195.png", price: 9500, category: "Milks & Dairy", stock: 70, status: "Pending" },
  { id: 14, name: "Tomato", variation: "Red", avatar: "/Screenshot_195.png", price: 600, category: "Vegetable", stock: 75, status: "Approved" },
  { id: 60, name: "Red Watermelon", variation: "Seedless", avatar: "/Screenshot_195.png", price: 3000, category: "Fruits", stock: 60, status: "Pending" },
  { id: 18, name: "Lettuce", variation: "Iceberg", avatar: "/Screenshot_195.png", price: 1200, category: "Vegetable", stock: 55, status: "Approved" },
  { id: 9, name: "Barley", variation: "Whole", avatar: "/Screenshot_195.png", price: 3400, category: "Grains", stock: 50, status: "Approved" },
  { id: 39, name: "Cheddar Cheese", variation: "Block", avatar: "/Screenshot_195.png", price: 20000, category: "Milks & Dairy", stock: 40, status: "Pending" },
  { id: 79, name: "Maya-maya", variation: "Snapper", avatar: "/Screenshot_195.png", price: 3600, category: "Fish", stock: 45, status: "Approved" },
  { id: 17, name: "Cabbage", variation: "Round", avatar: "/Screenshot_195.png", price: 1100, category: "Vegetable", stock: 85, status: "Approved" },
  { id: 24, name: "Broccoli", variation: "Green", avatar: "/Screenshot_195.png", price: 2000, category: "Vegetable", stock: 25, status: "Approved" },
  { id: 69, name: "Grapes", variation: "Purple", avatar: "/Screenshot_195.png", price: 10000, category: "Fruits", stock: 32, status: "Approved" },
  { id: 31, name: "Turnip", variation: "Purple", avatar: "/Screenshot_195.png", price: 850, category: "Root Crops", stock: 35, status: "Approved" },
  { id: 36, name: "Fresh Cow's Milk", variation: "Whole", avatar: "/Screenshot_195.png", price: 4800, category: "Milks & Dairy", stock: 65, status: "Approved" },
  { id: 58, name: "Carabao Mango", variation: "Yellow", avatar: "/Screenshot_195.png", price: 2500, category: "Fruits", stock: 120, status: "Approved" },
  { id: 34, name: "Singkamas", variation: "Large", avatar: "/Screenshot_195.png", price: 450, category: "Root Crops", stock: 70, status: "Approved" },
  { id: 73, name: "Tuna", variation: "Steak", avatar: "/Screenshot_195.png", price: 3200, category: "Fish", stock: 40, status: "Approved" },
  { id: 72, name: "Galunggong", variation: "Round Scad", avatar: "/Screenshot_195.png", price: 1700, category: "Fish", stock: 70, status: "Pending" },
  { id: 62, name: "Orange Valencia", variation: "Orange", avatar: "/Screenshot_195.png", price: 3500, category: "Fruits", stock: 50, status: "Approved" },
  { id: 71, name: "Bangus", variation: "Milkfish", avatar: "/Screenshot_195.png", price: 2300, category: "Fish", stock: 50, status: "Approved" },
  { id: 8, name: "Wheat Flour", variation: "All-purpose", avatar: "/Screenshot_195.png", price: 2500, category: "Grains", stock: 120, status: "Approved" },
  { id: 16, name: "Carrots", variation: "Orange", avatar: "/Screenshot_195.png", price: 850, category: "Vegetable", stock: 60, status: "Approved" },
  { id: 33, name: "Carrot Root", variation: "Orange", avatar: "/Screenshot_195.png", price: 900, category: "Root Crops", stock: 60, status: "Pending" },
  { id: 12, name: "Quinoa", variation: "White", avatar: "/Screenshot_195.png", price: 12000, category: "Grains", stock: 25, status: "Approved" },
  { id: 52, name: "Chicken Breast", variation: "Boneless", avatar: "/Screenshot_195.png", price: 22000, category: "Meats", stock: 70, status: "Approved" },
  { id: 42, name: "Butter", variation: "Salted", avatar: "/Screenshot_195.png", price: 8500, category: "Milks & Dairy", stock: 45, status: "Approved" },
  { id: 78, name: "Salmon", variation: "Slice", avatar: "/Screenshot_195.png", price: 6800, category: "Fish", stock: 35, status: "Pending" },
  { id: 65, name: "Rambutan", variation: "Red", avatar: "/Screenshot_195.png", price: 5000, category: "Fruits", stock: 25, status: "Pending" },
  { id: 60, name: "Red Watermelon", variation: "Seedless", avatar: "/Screenshot_195.png", price: 3000, category: "Fruits", stock: 60, status: "Pending" },
  { id: 37, name: "Low-fat Milk", variation: "Low-fat", avatar: "/Screenshot_195.png", price: 4500, category: "Milks & Dairy", stock: 55, status: "Approved" },
].map((item) => ({
  ...item,
  association: "Macamot Farmers Association",
  farmer: generateFarmerCode("Juan D Cruz"),
  unit: "1kg",
}));

export default function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoriesSummary = useMemo(() => {
    return CATEGORY_NAMES.map((cat) => ({
      name: cat,
      count: products.filter((p) => p.category === cat).length,
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );
    }
    return filtered;
  }, [products, selectedCategory, searchQuery]);

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const emptyRows = itemsPerPage - visibleProducts.length > 0 ? itemsPerPage - visibleProducts.length : 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleDeleteSelected = () => {
    if (!window.confirm("Delete selected products?")) return;
    setProducts((prev) => prev.filter((p) => !selectedRows.includes(p.id)));
    setSelectedRows([]);
  };

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

  const handleCategoryClick = (cat) => {
    setSelectedCategory((prev) => (prev === cat ? null : cat));
    setSelectedRows([]);
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
          {categoriesSummary.map((cat) => {
            const style = BADGE_STYLES[cat.name] || BADGE_STYLES["Grains"];
            const isActive = selectedCategory === cat.name;
            return (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                style={{
                  position: "relative",
                  border: isActive ? `2px solid ${style.border}` : "1px solid #858585",
                  borderRadius: "1.6rem",
                  minWidth: "150px",
                  height: "80px",
                  padding: "0 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: isActive ? style.background : "#FFFFFF",
                  flex: "1",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 2px 8px 0 rgba(2,132,199,0.08)" : undefined,
                  transition: "border 0.18s, background 0.18s",
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
                <span style={{ fontSize: "0.81rem", color: "#9CA3AF", fontWeight: 500, marginLeft: "8px" }}>{cat.name}</span>
                <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#000000", marginLeft: "8px" }}>{cat.count}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* TABLE */}
      <div style={{ borderRadius: "1rem", overflow: "hidden", minHeight: 420 }}>
        <h2 className="px-4 pt-4 text-xl font-bold text-gray-900">Product List</h2>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed"
        }}>
          <colgroup>
            <col style={{ width: "4%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "19%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "9%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "8%" }} />
          </colgroup>
          <thead style={{ backgroundColor: "#F7F7FB" }}>
            <tr style={{
              color: "#4B5563",
              fontSize: "0.92rem",
              fontWeight: 600,
              height: "48px",
              verticalAlign: "middle"
            }}>
              <th style={{ padding: "0.55rem", verticalAlign: "middle", textAlign: "center" }}>
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
              <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Product</th>
              <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Variation</th>
              <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", maxWidth: 210, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Association</th>
              <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Farmer Code</th>
              <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Unit</th>
              <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Price</th>
              <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Category</th>
              <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Stock</th>
              <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Status</th>
              <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Actions</th>
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
                    minHeight: 44,
                    verticalAlign: "middle",
                    fontSize: "0.94rem"
                  }}
                >
                  <td style={{
                    padding: "0.55rem",
                    verticalAlign: "middle",
                    textAlign: "center"
                  }}>
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
                  <td style={{
                    padding: "0.55rem",
                    verticalAlign: "middle",
                    fontSize: "0.97rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      minHeight: "34px"
                    }}>
                      <img
                        src={p.avatar}
                        alt={p.name}
                        style={{ width: 28, height: 28, borderRadius: "50%" }}
                      />
                      <div>
                        <div style={{
                          fontWeight: 600,
                          color: "#111827",
                          fontSize: "0.97rem",
                          lineHeight: 1.2,
                          whiteSpace: "nowrap"
                        }}>{p.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{
                    padding: "0.55rem",
                    verticalAlign: "middle",
                    fontSize: "0.96rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap"
                  }}>
                    {p.variation}
                  </td>
                  <td style={{
                    padding: "0.55rem",
                    verticalAlign: "middle",
                    fontSize: "0.96rem",
                    fontWeight: 500,
                    maxWidth: 210,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }} title={p.association}>
                    {p.association}
                  </td>
                  <td style={{
                    padding: "0.55rem",
                    verticalAlign: "middle",
                    fontSize: "0.96rem",
                    fontWeight: 500,
                    maxWidth: 140,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }} title={p.farmer}>
                    {p.farmer}
                  </td>
                  <td style={{
                    padding: "0.55rem",
                    verticalAlign: "middle",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap"
                  }}>
                    {p.unit}
                  </td>
                  <td style={{
                    padding: "0.55rem",
                    verticalAlign: "middle",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap"
                  }}>
                    ₱{Number(p.price).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td style={{
                    padding: "0.55rem",
                    verticalAlign: "middle",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap"
                  }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.16rem 0.6rem",
                        fontSize: "0.88rem",
                        fontWeight: 500,
                        borderRadius: "9999px",
                        color: style.color,
                        backgroundColor: style.background,
                        border: `1px solid ${style.border}`,
                        whiteSpace: "nowrap"
                      }}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td style={{
                    padding: "0.55rem",
                    verticalAlign: "middle",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap"
                  }}>
                    {p.stock}
                  </td>
                  <td style={{
                    padding: "0.55rem",
                    verticalAlign: "middle",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap"
                  }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.16rem 0.6rem",
                        fontSize: "0.88rem",
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
                        whiteSpace: "nowrap"
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={{
                    padding: "0.55rem",
                    verticalAlign: "middle",
                    textAlign: "left",
                    minWidth: 115,
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap"
                  }}>
                    <div className="group flex items-center gap-3">
                      {p.status === "Pending" ? (
                        <div className="relative flex items-center" style={{ cursor: "pointer" }} onClick={() => handleDetails(p)}>
                          <Copy size={18} stroke="#16A34A" className="transition-transform duration-200 group-hover:-translate-x-2" />
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#16A34A] text-xs font-medium transition-opacity duration-200 whitespace-nowrap" style={{ minWidth: 42 }}>
                            Details
                          </span>
                        </div>
                      ) : (
                        <div className="relative flex items-center" style={{ cursor: "pointer" }}>
                          <Pencil size={18} stroke="#3B82F6" className="cursor-pointer transition-transform duration-200 group-hover:-translate-x-1" onClick={() => handleEdit(p)} />
                          <span className="absolute left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#3B82F6] text-xs font-medium transition-opacity duration-200 whitespace-nowrap" style={{ minWidth: 33 }}>
                            Edit
                          </span>
                        </div>
                      )}
                      <Trash2 size={18} stroke="#EF4444" className="cursor-pointer transition-transform duration-200 group-hover:translate-x-8" />
                    </div>
                  </td>
                </tr>
              );
            })}
            {Array.from({ length: emptyRows }).map((_, idx) => (
              <tr key={`empty-row-${idx}`} style={{ minHeight: 44, background: "transparent" }}>
                <td style={{ padding: "0.55rem" }}>&nbsp;</td>
                <td style={{ padding: "0.55rem" }}></td>
                <td style={{ padding: "0.55rem" }}></td>
                <td style={{ padding: "0.55rem" }}></td>
                <td style={{ padding: "0.55rem" }}></td>
                <td style={{ padding: "0.55rem" }}></td>
                <td style={{ padding: "0.55rem" }}></td>
                <td style={{ padding: "0.55rem" }}></td>
                <td style={{ padding: "0.55rem" }}></td>
                <td style={{ padding: "0.55rem" }}></td>
                <td style={{ padding: "0.55rem" }}></td>
              </tr>
            ))}
            {visibleProducts.length === 0 && (
              <tr>
                <td colSpan={11} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                  No products found.
                </td>
              </tr>
            )}
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
        mode={editModalMode}
      />
    </div>
  );
}
