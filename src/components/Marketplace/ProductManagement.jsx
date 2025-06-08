import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  SlidersHorizontal,
  RefreshCw,
  Plus,
  BookOpen,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import AddProductModal from "./AddProductModal";
import EditDetailsModal from "./EditDetailsModal";
import DraftProductModal from "./DraftProductModal";
import axios from "axios";
import { BASE_URL } from "../../api";

// Helper to normalize category names for consistent lookup in BADGE_STYLES
// This function is specifically to handle cases like "Vegetables" from backend matching "Vegetable" in BADGE_STYLES
const normalizeCategoryNameForLookup = (name) => {
  if (!name) return "";
  if (name === "Vegetables") return "Vegetable";
  if (name === "Dairy") return "Milks & Dairy"; // Ensure consistency for lookup
  return name; // Return as is for other categories
};

const BADGE_STYLES = {
  Fruits: { color: "#7C3AED", background: "#F3E8FF", border: "#7C3AED" },
  "Milks & Dairy": { color: "#3B82F6", background: "#DDECFF", border: "#3B82F6" },
  Vegetable: { color: "#16A34A", background: "#D1FAE5", border: "#16A34A" },
  Grains: { color: "#B79900", background: "#FFF8D4", border: "#B79900" },
  "Root Crops": { color: "#F97316", background: "#FFEDD5", border: "#F97316" },
  Meats: { color: "#DC2626", background: "#FEE2E2", border: "#DC2626" },
  Fish: { color: "#0284C7", background: "#DEF5FF", border: "#0284C7" },
};

const STATUS_STYLES = {
  pending_approval: { color: "#F97316", background: "#FFEDD5", border: "#F97316", text: "Pending" }, // Orange for pending
  approved: { color: "#16A34A", background: "#D1FAE5", border: "#16A34A", text: "Approved" }, // Green for approved
  hidden: { color: "#DC2626", background: "#FEE2E2", border: "#DC2626", text: "Hidden" },       // Red for hidden
  published: { color: "#3B82F6", background: "#DDECFF", border: "#3B82F6", text: "Published" },   // Blue for published
  out_of_stock: { color: "#6B7280", background: "#E5E7EB", border: "#6B7280", text: "Out of Stock" }, // Gray for out of stock
  rejected: { color: "#EF4444", background: "#FEE2E2", border: "#EF4444", text: "Rejected" },     // Lighter red for rejected
};

const CATEGORY_NAMES = [
  "Grains",
  "Vegetables",
  "Root Crops",
  "Dairy",
  "Meats",
  "Fruits",
  "Fish",
];

const API_BASE_URL = "http://127.0.0.1:8000"; // Updated to match your backend URL

export default function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDraftProducts, setShowDraftProducts] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState([]);
  const [summaryProducts, setSummaryProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  // For editing
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editModalMode, setEditModalMode] = useState("edit");

  // For image preview
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageLoadErrors, setImageLoadErrors] = useState({}); // Stores image errors

  // Helper to handle image loading errors
  const handleImageError = useCallback((productId) => {
    setImageLoadErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }));
  }, []);

  const openImagePreview = useCallback((url) => {
    setImagePreviewUrl(url);
    setShowImagePreview(true);
  }, []);

  const closeImagePreview = useCallback(() => {
    setShowImagePreview(false);
    setImagePreviewUrl("");
  }, []);

  // Image Preview Modal Component
  const ImagePreviewModal = useCallback(({ isOpen, onClose, imageUrl }) => {
    if (!isOpen) return null;

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
        onClick={onClose}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "0.5rem",
            position: "relative",
            maxHeight: "90%",
            maxWidth: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#333",
            }}
          >
            <X size={24} />
          </button>
          <img
            src={imageUrl}
            alt="Product Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    );
  }, []); // No dependencies, as it's a pure presentational component with props

  const closeEditModal = useCallback(() => {
    setShowEditModal(false);
    setEditProduct(null);
  }, []);

  const handleEdit = useCallback((product) => {
    setEditProduct(product);
    setEditModalMode("edit");
    setShowEditModal(true);
  }, []);

  const handleCategoryClick = useCallback((cat) => {
    setSelectedCategory((prev) => (prev === cat ? null : cat));
    setSearchQuery(""); // Clear search query when category is selected or deselected
    setSelectedRows([]);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    console.log('Changing page to:', newPage);
    setCurrentPage(newPage);
  }, []);

  // Add debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update fetchProducts to use debouncedSearchQuery
  const fetchProducts = useCallback(async () => {
    console.log('fetchProducts dependencies:', { currentPage, debouncedSearchQuery, selectedCategory, selectedStatus });
    try {
      setLoading(true);
      console.log('Fetching products...');
      
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage,
        per_page: 7,
        ...(debouncedSearchQuery && { search: debouncedSearchQuery }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedStatus && { status: selectedStatus })
      });

      const url = `${API_BASE_URL}/products/?${params}`;
      console.log('Fetching products from URL:', url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log('Fetched products raw data:', data);
      
      if (data.products) {
        setProducts(data.products);
        setTotalPages(data.total_pages);
        setTotalProducts(data.total);
        console.log('Products state set to:', data.products);
      } else {
        setProducts([]);
        setTotalPages(1);
        setTotalProducts(0);
        console.log('Products state set to empty array (no data.products).');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      setProducts([]);
      console.log('Products state set to empty array due to error.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchQuery, selectedCategory, selectedStatus]); // Use debouncedSearchQuery instead of searchQuery

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories/`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
      console.log('Fetched categories for summary:', data);
    } catch (err) {
      console.error('Error fetching categories for summary:', err);
      setError('Failed to load categories for summary. Please try again.');
    }
  }, []); // No dependencies, runs once on mount

  // Fetch all products for summary counts
  const fetchSummaryProducts = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/?summarize=true`);
      if (!response.ok) {
        throw new Error('Failed to fetch summary products');
      }
      const data = await response.json();
      setSummaryProducts(data.products || []);
      console.log('Fetched summary products:', data.products.length);
    } catch (err) {
      console.error('Error fetching summary products:', err);
    } finally {
    }
  }, []); // No dependencies, runs once on mount

  // Fetch products on mount and when filters change
  useEffect(() => {
    console.log('useEffect (fetchProducts) triggered.');
    fetchProducts();
  }, [fetchProducts]); // Depend only on the memoized fetchProducts function

  // Fetch categories and summary products on mount
  useEffect(() => {
    fetchCategories();
    fetchSummaryProducts(); 
  }, [fetchCategories, fetchSummaryProducts]); // Depend on memoized functions

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products; 
  }, [products]);

  const categoriesSummary = useMemo(() => {
    // Use summaryProducts for counts
    return CATEGORY_NAMES.map((catName) => {
      const lookupCategoryName = normalizeCategoryNameForLookup(catName);
      const style = BADGE_STYLES[lookupCategoryName] || BADGE_STYLES["Grains"];
      // Count products by normalizing their category name for comparison against summaryProducts
      const count = summaryProducts.filter((p) => normalizeCategoryNameForLookup(p.category_name) === lookupCategoryName).length;
      const isActive = selectedCategory === catName; // Use catName directly for active state

      return (
        <div
          key={catName} // Use catName as key
          onClick={() => handleCategoryClick(catName)} // Use catName for click handler
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
          {loading && (
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: semi-transparent overlay
                borderRadius: "1.6rem", // Match the card's border radius
              }}
            >
              <img
                src="/categoryloading-unscreen.gif"
                alt="Loading"
                style={{ 
                  width: "80px", 
                  height: "80px",
                  objectFit: "contain"
                }}
              />
            </div>
          )}
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
          <span style={{ fontSize: "0.81rem", color: "#9CA3AF", fontWeight: 500, marginLeft: "8px" }}>{catName}</span> {/* Use catName for display */}
          <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#000000", marginLeft: "8px" }}>{count}</span>
        </div>
      );
    });
  }, [summaryProducts, selectedCategory, handleCategoryClick]);

  const itemsPerPage = 7;
  const emptyRows = itemsPerPage - products.length > 0 ? itemsPerPage - products.length : 0;

  // Delete logic (batch)
  const handleDeleteSelected = async () => {
    if (!window.confirm("Delete selected products?")) return;
    try {
      const response = await axios.post(`${API_BASE_URL}/products/batch-delete/`, {
        ids: selectedRows,
      });
      
      // Show success message
      alert(response.data.message);
      
      // If there are products that couldn't be deleted, show a warning
      if (response.data.warning) {
        alert(response.data.warning);
      }
      
      setSelectedRows([]);
      fetchProducts(); // Refresh the list
      // Refresh category summary
      fetchSummaryProducts();
    } catch (err) {
      console.error("Error deleting products:", err);
      alert(err.response?.data?.error || err.response?.data?.details || "Failed to delete products");
    }
  };

  // Single delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/products/delete/${id}/`);
      setSelectedRows((sel) => sel.filter((sid) => sid !== id));
      fetchProducts(); // Refresh the list
      // Refresh category summary
      fetchSummaryProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  // Add product callback (from modal)
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products/create/`, newProduct);
      setProducts((prev) => [...prev, response.data]);
      setShowAddProduct(false);
      // Refresh category summary
      fetchSummaryProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
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
            <span style={{ fontWeight: 500 }}>{`All Products ${totalProducts}`}</span>
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
              onChange={(e) => {
                const value = e.target.value;
                console.log('Search input changed:', value);
                setSearchQuery(value);
              }}
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
              onClick={() => setShowAddProduct(true)}
            >
              <Plus size={18} /> Add Products
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
              onClick={() => setShowDraftProducts(true)}
            >
              <BookOpen size={18} /> Draft Products
            </button>
          </>
        </div>
      </div>

      {/* CATEGORY SUMMARY */}
      <div className="pb-4">
        <div className="flex gap-4 overflow-x-auto">
          {categoriesSummary}
        </div>
      </div>

      {/* TABLE */}
      <div style={{ borderRadius: "1rem", overflow: "hidden", minHeight: 420 }}>
        <h2 className="px-4 pt-4 text-xl font-bold text-gray-900">Product List</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <img
              src="/BINHI-LOADING-unscreen.gif"
              alt="Loading..."
              style={{ width: 120, height: 120, objectFit: "contain" }}
            />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-500">
            {error}
          </div>
        ) : (
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
                <th style={{ padding: "0.55rem", verticalAlign: "middle", textAlign: "center", fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm rounded"
                    checked={selectedRows.length === products.length && products.length > 0}
                    onChange={(e) =>
                      setSelectedRows(
                        e.target.checked ? products.map((p) => p.id) : []
                      )
                    }
                  />
                </th>
                <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Product</th>
                <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Variation</th>
                <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", maxWidth: 210, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Association</th>
                <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Farmer</th>
                <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Unit</th>
                <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Price</th>
                <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Category</th>
                <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Stock</th>
                <th style={{ padding: "0.55rem", textAlign: "center", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Status</th>
                <th style={{ padding: "0.55rem", textAlign: "left", verticalAlign: "middle", fontWeight: 600, fontSize: "0.97rem", whiteSpace: "nowrap" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const lookupCategoryName = normalizeCategoryNameForLookup(p.category_name);
                const style = BADGE_STYLES[lookupCategoryName] || BADGE_STYLES["Grains"];
                // Correctly use STATUS_STYLES for status display
                const statusStyle = STATUS_STYLES[p.status] || { color: "#6B7280", background: "#E5E7EB", border: "#6B7280", text: p.status };
                const isSelected = selectedRows.includes(p.id);
                const variantCount = p.variations?.length || 1;
                let variationText = p.variations?.[0]?.name || "";
                if (variationText && variantCount > 1) {
                  const extra = variantCount - 1;
                  variationText = `${p.variations[0]?.name} +${extra}`;
                }
                const imageUrl = p.images[0].image;
                const hasImageError = false; // No imageLoadErrors state anymore
                const imageSrc = imageUrl.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`;
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
                        {hasImageError || !imageUrl ? (
                            <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', color: '#757575' }}>
                                No Img
                            </div>
                        ) : (
                            <img
                                src={imageSrc}
                                alt={p.name}
                                style={{ width: 28, height: 28, borderRadius: "50%", cursor: 'pointer' }}
                                onClick={() => {}} // Removed openImagePreview
                                onError={() => {}} // Removed handleImageError
                            />
                        )}
                        <div>
                          <div style={{
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
                      whiteSpace: "nowrap"
                    }}>
                      {variationText}
                    </td>
                    <td style={{
                      padding: "0.55rem",
                      verticalAlign: "middle",
                      fontSize: "0.96rem",
                      maxWidth: 210,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }} title={p.vendor_name}>
                      {p.vendor_name}
                    </td>
                    <td style={{
                      padding: "0.55rem",
                      verticalAlign: "middle",
                      fontSize: "0.96rem",
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
                      whiteSpace: "nowrap"
                    }}>
                      {p.variations?.[0]?.unit_measurement || "1kg"}
                    </td>
                    <td style={{
                      padding: "0.55rem",
                      verticalAlign: "middle",
                      fontSize: "0.95rem",
                      whiteSpace: "nowrap"
                    }}>
                      ₱{Number(p.variations?.[0]?.unit_price || 0).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{
                      padding: "0.55rem",
                      verticalAlign: "middle",
                      fontSize: "0.95rem",
                      whiteSpace: "nowrap"
                    }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.16rem 0.6rem",
                          fontSize: "0.88rem",
                          borderRadius: "9999px",
                          color: style.color,
                          backgroundColor: style.background,
                          border: `1px solid ${style.border}`,
                          whiteSpace: "nowrap"
                        }}
                      >
                        {p.category_name}
                      </span>
                    </td>
                    <td style={{
                      padding: "0.55rem",
                      verticalAlign: "middle",
                      fontSize: "0.95rem",
                      whiteSpace: "nowrap"
                    }}>
                      {p.variations?.[0]?.stock || 0}
                    </td>
                    <td style={{
                      padding: "0.55rem",
                      verticalAlign: "middle",
                      fontSize: "0.95rem",
                      whiteSpace: "nowrap",
                      textAlign: "center"
                    }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.16rem 0.6rem",
                          fontSize: "0.88rem",
                          borderRadius: "9999px",
                          color: statusStyle.color,
                          backgroundColor: statusStyle.background,
                          border: `1px solid ${statusStyle.border}`,
                          whiteSpace: "nowrap"
                        }}
                      >
                        {statusStyle.text}
                      </span>
                    </td>
                    <td style={{
                      padding: "0.55rem",
                      verticalAlign: "middle",
                      textAlign: "left",
                      minWidth: 115,
                      fontSize: "0.95rem",
                      whiteSpace: "nowrap"
                    }}>
                      <div className="group flex items-center gap-3">
                        <div className="relative flex items-center" style={{ cursor: "pointer" }}>
                          <Pencil
                            size={18}
                            stroke="#3B82F6"
                            className="cursor-pointer transition-transform duration-200 group-hover:-translate-x-1"
                            onClick={() => handleEdit(p)}
                          />
                          <span className="absolute left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#3B82F6] text-xs font-medium transition-opacity duration-200 whitespace-nowrap" style={{ minWidth: 33 }}>
                            Edit
                          </span>
                        </div>
                        <Trash2
                          size={18}
                          stroke="#EF4444"
                          className="cursor-pointer transition-transform duration-200 group-hover:translate-x-8"
                          onClick={() => handleDelete(p.id)}
                        />
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
                </tr>
              ))}
              {filteredProducts.length === 0 && !loading && (
                <tr>
                  <td colSpan={11} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center my-6">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
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
                  onClick={() => handlePageChange(page)}
                  className={`btn btn-sm ${page === currentPage ? "bg-gray-300 text-black" : "btn-ghost text-gray-600"}`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="btn btn-sm"
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <AddProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onSaveProduct={handleAddProduct}
      />
      <EditDetailsModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        product={editProduct}
        onConfirm={async (updatedProduct) => {
          try {
            const formData = new FormData();

            // Append product fields
            formData.append('id', updatedProduct.id);
            formData.append('name', updatedProduct.name);
            formData.append('description', updatedProduct.description);
            formData.append('category', updatedProduct.category);
            formData.append('association', updatedProduct.association);
            formData.append('farmer_code', updatedProduct.farmer_code);

            // Handle variations
            const variationsToSerialize = [];
            updatedProduct.variations.forEach((variation, index) => {
              const currentVariationData = { ...variation };
              if (variation.newFile) {
                formData.append(`variations_new_image_${variation.id || index}`, variation.newFile);
                // Remove the blob URL and newFile from the data to be serialized
                delete currentVariationData.image;
                delete currentVariationData.newFile;
                // Add a reference to the new file in the JSON data, e.g., for the backend to map
                currentVariationData.image_file_key = `variations_new_image_${variation.id || index}`;
              } else if (variation.image) {
                // If it's an existing image, keep its URL or ID in the JSON data
                currentVariationData.image = variation.image;
              }
              variationsToSerialize.push(currentVariationData);
            });
            formData.append('variations', JSON.stringify(variationsToSerialize));

            // Handle main product images (if applicable, based on product.images)
            // Assuming updatedProduct has an 'images' array for main product images
            const imagesToSerialize = [];
            if (updatedProduct.images && updatedProduct.images.length > 0) {
              updatedProduct.images.forEach((image, index) => {
                const currentImageData = { ...image };
                if (image.newFile) {
                  formData.append(`images_new_image_${image.id || index}`, image.newFile);
                  delete currentImageData.image;
                  delete currentImageData.newFile;
                  currentImageData.image_file_key = `images_new_image_${image.id || index}`;
                } else if (image.image) {
                  currentImageData.image = image.image;
                }
                imagesToSerialize.push(currentImageData);
              });
            }
            formData.append('images', JSON.stringify(imagesToSerialize));

            const response = await axios.put(
              `${API_BASE_URL}/products/update/${updatedProduct.id}/`,
              formData, // Send FormData
              {
                headers: {
                  'Content-Type': 'multipart/form-data', // Axios will set this automatically, but explicitly
                },
              }
            );
            setProducts((prev) =>
              prev.map((p) =>
                p.id === updatedProduct.id ? response.data : p
              )
            );
            closeEditModal();
          } catch (err) {
            console.error("Error updating product:", err.response ? err.response.data : err.message);
            alert("Failed to update product");
          }
        }}
        mode={editModalMode}
      />
      <DraftProductModal isOpen={showDraftProducts} onClose={() => setShowDraftProducts(false)} />
    </div>
  );
} 