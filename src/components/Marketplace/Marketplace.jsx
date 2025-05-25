import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search,
  SlidersHorizontal,
  RefreshCw,
  Plus,
  BookOpen,
  Pencil,
  Copy,
  Trash2
} from 'lucide-react';
import AddCategoryModal from './AddCategoryModal';
import EditDetailsModal from './EditDetailsModal';
import OrderHistoryModal from './OrderHistoryModal';
import OrderManagementModal from './OrderManagementModal';
import PayoutModal from './PayoutModal';

// --- Customer Management Data (7 customers) ---
const CUSTOMER_DATA = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    email: "juandcruz@gmail.com",
    address: "Masinag",
    province: "Bulacan",
    birthdate: "20 Aug 1999",
    age: 78,
    avatar: "/Screenshot_195.png",
    contact: "(+63) 948 122 9142",
  },
  {
    id: 2,
    name: "Maria Reyes",
    email: "mariareyes@gmail.com",
    address: "Poblacion",
    province: "Bulacan",
    birthdate: "15 Feb 1987",
    age: 37,
    avatar: "/Screenshot_195.png",
    contact: "(+63) 912 345 6789",
  },
  {
    id: 3,
    name: "Pedro Santos",
    email: "pedrosantos@gmail.com",
    address: "San Roque",
    province: "Bulacan",
    birthdate: "04 Nov 1965",
    age: 58,
    avatar: "/Screenshot_195.png",
    contact: "(+63) 999 888 7777",
  },
  {
    id: 4,
    name: "Anna Flores",
    email: "annaflores@gmail.com",
    address: "Sta. Maria",
    province: "Bulacan",
    birthdate: "30 Sep 1973",
    age: 50,
    avatar: "/Screenshot_195.png",
    contact: "(+63) 922 222 4444",
  },
  {
    id: 5,
    name: "Josefa Diaz",
    email: "josefadiaz@gmail.com",
    address: "Muzon",
    province: "Bulacan",
    birthdate: "12 May 1980",
    age: 44,
    avatar: "/Screenshot_195.png",
    contact: "(+63) 901 222 3333",
  },
  {
    id: 6,
    name: "Enrique Villanueva",
    email: "enriquevillanueva@gmail.com",
    address: "Marilao",
    province: "Bulacan",
    birthdate: "10 Dec 1958",
    age: 65,
    avatar: "/Screenshot_195.png",
    contact: "(+63) 977 123 4567",
  },
  {
    id: 7,
    name: "Paula Martinez",
    email: "paulamartinez@gmail.com",
    address: "San Jose",
    province: "Bulacan",
    birthdate: "03 Mar 1970",
    age: 54,
    avatar: "/Screenshot_195.png",
    contact: "(+63) 934 567 8910",
  }
];

// --- Order History Data ---
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

// --- Product Management Data ---
const CATEGORIES_SUMMARY = [
  { name: 'Grains', count: 28 },
  { name: 'Vegetable', count: 35 },
  { name: 'Root Crops', count: 41 },
  { name: 'Milks & Dairy', count: 51 },
  { name: 'Meats', count: 60 },
  { name: 'Fruits', count: 75 },
];

const BADGE_STYLES = {
  Fruits: { color: '#7C3AED', background: '#F3E8FF', border: '#7C3AED' },
  'Milks & Dairy': { color: '#3B82F6', background: '#EFF6FF', border: '#3B82F6' },
  Vegetable: { color: '#16A34A', background: '#D1FAE5', border: '#16A34A' },
  Grains: { color: '#FACC15', background: '#FEF9C3', border: '#FACC15' },
  'Root Crops': { color: '#F97316', background: '#FFEDD5', border: '#F97316' },
  Meats: { color: '#DC2626', background: '#FEE2E2', border: '#DC2626' },
};

// --- Order Management Data ---
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
  {
    id: "#01234",
    customer: {
      name: "Juan Dela Cruz",
      email: "juandcruz@gmail.com",
      avatar: "/Screenshot_195.png",
      address: "Purok 3 Zone 6 Penafrancia Cupang Antipolo City",
      contact: "(+63) 948 122 9142",
    },
    product: {
      name: "Premium Farm Fresh Sweet Corn",
      variation: "Yellow, White",
    },
    date: "20 Aug 1999",
    time: "01:23:42 PM",
    status: "Pending",
    transaction: "Pending",
  },
  {
    id: "#01235",
    customer: {
      name: "Maria Reyes",
      email: "mariareyes@gmail.com",
      avatar: "/Screenshot_195.png",
      address: "Purok 1, Poblacion, Bulacan",
      contact: "(+63) 912 345 6789",
    },
    product: {
      name: "Premium Angus Beef Strips",
      variation: "Tenderloin, Ribeye",
    },
    date: "23 Mar 2001",
    time: "10:30:10 AM",
    status: "Delivered",
    transaction: "Paid",
  },
  {
    id: "#01236",
    customer: {
      name: "Pedro Santos",
      email: "pedrosantos@gmail.com",
      avatar: "/Screenshot_195.png",
      address: "San Roque, Bulacan",
      contact: "(+63) 999 888 7777",
    },
    product: {
      name: "Organic Rainbow Carrots",
      variation: "Orange, Purple, White",
    },
    date: "05 Jul 2020",
    time: "09:01:22 AM",
    status: "Processing",
    transaction: "Pending",
  },
  {
    id: "#01237",
    customer: {
      name: "Anna Flores",
      email: "annaflores@gmail.com",
      avatar: "/Screenshot_195.png",
      address: "Sta. Maria, Bulacan",
      contact: "(+63) 922 222 4444",
    },
    product: {
      name: "Artisan Wheat Flour",
      variation: "All-purpose, Bread",
    },
    date: "09 Nov 2021",
    time: "04:45:12 PM",
    status: "Shipped",
    transaction: "Pending",
  },
];

// --- Farmer Payout Data Example ---
const FARMER_PAYOUT_SUMMARY = [
  { name: 'Complete', count: 15, color: '#16A34A', bg: '#E6F9EC', border: '#16A34A' },
  { name: 'Pending', count: 15, color: '#92400E', bg: '#FFF7E6', border: '#D1A157' },
  { name: 'Failed', count: 15, color: '#DC2626', bg: '#FEE2E2', border: '#DC2626' },
];

const FARMER_PAYOUT_ROWS = [
  {
    id: 1,
    farmer: {
      name: "Juan Dela Cruz",
      email: "juandcruz@gmail.com",
      avatar: "/Screenshot_195.png",
    },
    product: {
      name: "Farm Fresh Sweet Corn",
      variation: "Yellow, White",
      image: "/Screenshot_195.png",
      quantity: 1
    },
    status: "Pending",
    paymentMethod: "GCash",
    gcashNumber: "0938-100-4277",
    gcashName: "J*** D*** C***"
  },
  {
    id: 2,
    farmer: {
      name: "Juan Dela Cruz",
      email: "juandcruz@gmail.com",
      avatar: "/Screenshot_195.png",
    },
    product: {
      name: "Farm Fresh Sweet Corn",
      variation: "Yellow, White",
      image: "/Screenshot_195.png",
      quantity: 1
    },
    status: "Pending",
    paymentMethod: "GCash",
    gcashNumber: "0938-100-4277",
    gcashName: "J*** D*** C***"
  },
  {
    id: 3,
    farmer: {
      name: "Juan Dela Cruz",
      email: "juandcruz@gmail.com",
      avatar: "/Screenshot_195.png",
    },
    product: {
      name: "Farm Fresh Sweet Corn",
      variation: "Yellow, White",
      image: "/Screenshot_195.png",
      quantity: 1
    },
    status: "Pending",
    paymentMethod: "GCash",
    gcashNumber: "0938-100-4277",
    gcashName: "J*** D*** C***"
  },
  {
    id: 4,
    farmer: {
      name: "Juan Dela Cruz",
      email: "juandcruz@gmail.com",
      avatar: "/Screenshot_195.png",
    },
    product: {
      name: "Farm Fresh Sweet Corn",
      variation: "Yellow, White",
      image: "/Screenshot_195.png",
      quantity: 1
    },
    status: "Pending",
    paymentMethod: "GCash",
    gcashNumber: "0938-100-4277",
    gcashName: "J*** D*** C***"
  },
  {
    id: 5,
    farmer: {
      name: "Juan Dela Cruz",
      email: "juandcruz@gmail.com",
      avatar: "/Screenshot_195.png",
    },
    product: {
      name: "Farm Fresh Sweet Corn",
      variation: "Yellow, White",
      image: "/Screenshot_195.png",
      quantity: 1
    },
    status: "Pending",
    paymentMethod: "GCash",
    gcashNumber: "0938-100-4277",
    gcashName: "J*** D*** C***"
  },
  {
    id: 6,
    farmer: {
      name: "Juan Dela Cruz",
      email: "juandcruz@gmail.com",
      avatar: "/Screenshot_195.png",
    },
    product: {
      name: "Farm Fresh Sweet Corn",
      variation: "Yellow, White",
      image: "/Screenshot_195.png",
      quantity: 1
    },
    status: "Pending",
    paymentMethod: "GCash",
    gcashNumber: "0938-100-4277",
    gcashName: "J*** D*** C***"
  },
];

const FARMER_PAYOUT_BADGE_STYLES = {
  Complete: { color: '#16A34A', background: '#E6F9EC', border: '#16A34A' },
  Pending: { color: '#92400E', background: '#FEF3C7', border: '#FACC15' },
  Failed: { color: '#DC2626', background: '#FEE2E2', border: '#DC2626' },
  default: { color: '#757575', background: '#E5E7EB', border: '#D4D4D8' },
};

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Farm Fresh Sweet Corn',
    variation: 'Yellow, White',
    avatar: '/Screenshot_195.png',
    price: 12999,
    category: 'Fruits',
    stock: 25,
    status: 'Approved'
  },
  {
    id: 2,
    name: "Train Your Dragon's Treasure Exotic Fruit",
    variation: 'Yellow, White',
    avatar: '/Screenshot_195.png',
    price: 12999,
    category: 'Milks & Dairy',
    stock: 25,
    status: 'Pending'
  },
  {
    id: 3,
    name: 'Ultra-Green Superfood Broccoli Hulk Flavored',
    variation: 'Yellow, White',
    avatar: '/Screenshot_195.png',
    price: 12999,
    category: 'Vegetable',
    stock: 25,
    status: 'Approved'
  },
  {
    id: 4,
    name: 'HAAHAHA PANG SAMGYUP',
    variation: 'Yellow, White',
    avatar: '/Screenshot_195.png',
    price: 12999,
    category: 'Grains',
    stock: 25,
    status: 'Pending'
  },
  {
    id: 5,
    name: 'Creamy Black Gold Avocado with Balut',
    variation: 'Yellow, White',
    avatar: '/Screenshot_195.png',
    price: 12999,
    category: 'Fruits',
    stock: 25,
    status: 'Approved'
  },
  {
    id: 6,
    name: 'Organic Rainbow Carrots',
    variation: 'Orange, Purple, White',
    avatar: '/Screenshot_195.png',
    price: 8999,
    category: 'Root Crops',
    stock: 40,
    status: 'Approved'
  },
  {
    id: 7,
    name: 'Premium Angus Beef Strips',
    variation: 'Tenderloin, Ribeye',
    avatar: '/Screenshot_195.png',
    price: 35999,
    category: 'Meats',
    stock: 15,
    status: 'Approved'
  },
  {
    id: 8,
    name: 'Fresh Farm Milk Bottles',
    variation: 'Whole, Low-fat',
    avatar: '/Screenshot_195.png',
    price: 4599,
    category: 'Milks & Dairy',
    stock: 60,
    status: 'Pending'
  },
  {
    id: 9,
    name: 'Heirloom Tomatoes Mix',
    variation: 'Red, Green, Yellow',
    avatar: '/Screenshot_195.png',
    price: 15999,
    category: 'Vegetable',
    stock: 30,
    status: 'Approved'
  },
  {
    id: 10,
    name: 'Artisan Wheat Flour',
    variation: 'All-purpose, Bread',
    avatar: '/Screenshot_195.png',
    price: 6999,
    category: 'Grains',
    stock: 50,
    status: 'Approved'
  },
  {
    id: 11,
    name: 'Tropical Mango Paradise',
    variation: 'Manila, Carabao',
    avatar: '/Screenshot_195.png',
    price: 18999,
    category: 'Fruits',
    stock: 20,
    status: 'Pending'
  },
  {
    id: 12,
    name: 'Sweet Purple Yam',
    variation: 'Large, Medium',
    avatar: '/Screenshot_195.png',
    price: 11999,
    category: 'Root Crops',
    stock: 35,
    status: 'Approved'
  },
  {
    id: 13,
    name: 'Farm Fresh Chicken Breast',
    variation: 'Boneless, Bone-in',
    avatar: '/Screenshot_195.png',
    price: 24999,
    category: 'Meats',
    stock: 25,
    status: 'Approved'
  },
  {
    id: 14,
    name: 'Artisan Cheese Collection',
    variation: 'Cheddar, Mozzarella',
    avatar: '/Screenshot_195.png',
    price: 28999,
    category: 'Milks & Dairy',
    stock: 18,
    status: 'Pending'
  },
  {
    id: 15,
    name: 'Crispy Lettuce Heads',
    variation: 'Iceberg, Romaine',
    avatar: '/Screenshot_195.png',
    price: 7999,
    category: 'Vegetable',
    stock: 45,
    status: 'Approved'
  }
];
export default function Marketplace() {
  // Tab and indicator state
  const tabs = [
    'Product Management',
    'Customer Management',
    'Order Management',
    'Farmer Payout'
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabsRef = useRef();
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [orderManagementModalOpen, setOrderManagementModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const updateIndicator = useCallback(() => {
    const container = tabsRef.current;
    const idx = tabs.indexOf(activeTab);
    const btn = tabRefs.current[idx];
    if (container && btn) {
      const c = container.getBoundingClientRect();
      const b = btn.getBoundingClientRect();
      setIndicator({
        left: b.left - c.left + container.scrollLeft,
        width: b.width
      });
    }
  }, [activeTab]);
  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  // Shared search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // --- Product Management State ---
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  useEffect(() => { setCurrentPage(1); }, [searchQuery]);
  const handleDeleteSelected = () => {
    if (!window.confirm('Delete selected products?')) return;
    setProducts(prev => prev.filter(p => !selectedRows.includes(p.id)));
    setSelectedRows([]);
  };

  // --- Customer Management State ---
  const [selectedCustomerRows, setSelectedCustomerRows] = useState([]);
  const [customerPage, setCustomerPage] = useState(1);
  const customersPerPage = 7;
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

  // --- Order Management State ---
  const [orderRows, setOrderRows] = useState(SAMPLE_ORDER_ROWS);
  const [selectedOrderRows, setSelectedOrderRows] = useState([]);
  const [orderPage, setOrderPage] = useState(1);
  const ordersPerPage = 7;
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

  // --- Farmer Payout State ---
  const [selectedFarmerRows, setSelectedFarmerRows] = useState([]);
  const [farmerPayoutPage, setFarmerPayoutPage] = useState(1);
  const farmerRowsPerPage = 6;
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

  // Order history modal
  const [orderHistoryOpen, setOrderHistoryOpen] = useState(false);
  const [orderHistoryCustomer, setOrderHistoryCustomer] = useState(null);

  // Add/Edit modals
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryModalMode, setCategoryModalMode] = useState('add');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editModalMode, setEditModalMode] = useState('edit');

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProduct(null);
  };

  // Handlers for Details/Edit
  const handleDetails = (product) => {
    setEditProduct(product);
    setEditModalMode('details');
    setShowEditModal(true);
  };
  const handleEdit = (product) => {
    setEditProduct(product);
    setEditModalMode('edit');
    setShowEditModal(true);
  };

  // --- Order Management Modal State ---
  const [showOrderManagementModal, setShowOrderManagementModal] = useState(false);
  const [orderModalData, setOrderModalData] = useState(null);
  const openOrderModal = (row) => {
    setOrderModalData(row);
    setShowOrderManagementModal(true);
  };
  const closeOrderModal = () => {
    setOrderModalData(null);
    setShowOrderManagementModal(false);
  };

  // --- Farmer Payout Modal State ---
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [currentPayout, setCurrentPayout] = useState(null);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  const handlePayNow = (row) => {
    setCurrentPayout(row);
    setShowPayoutModal(true);
    setPayoutSuccess(false);
  };
  const handleProceedPayout = () => {
    setPayoutSuccess(true);
    // Optionally update payout status here!
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
  // ---- Render ----
  return (
    <div className="p-0">
      {/* Sticky header and tabs */}
      <div className="sticky top-0 z-30 w-full bg-[#f9fbf8] shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="text-sm breadcrumbs font-inter text-base">
            <ul className="flex gap-1">
              <li>
                <a className="text-green-600 underline">Dashboard</a>
              </li>
              <li>
                <a className="text-green-600 underline">Marketplace</a>
              </li>
              <li className="text-gray-400">{activeTab}</li>
            </ul>
          </div>
          <button className="btn btn-square btn-binhi ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 pb-4 h-5 flex items-center">
          <h1 className="text-[40px] font-bold text-gray-800">Marketplace</h1>
        </div>
        <div className="mb-4 border-b border-gray-200 relative">
          <ul
            ref={tabsRef}
            className="flex -mb-px text-sm font-medium text-center"
            role="tablist"
          >
            {tabs.map((t, i) => (
              <li key={t} className="mr-10" role="presentation">
                <button
                  ref={el => (tabRefs.current[i] = el)}
                  onClick={() => setActiveTab(t)}
                  className={`inline-block p-4 ${
                    activeTab === t
                      ? 'text-green-600'
                      : 'text-gray-500 hover:text-gray-600'
                  }`}
                  role="tab"
                  aria-selected={activeTab === t}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
          <div
            className="absolute bottom-0 h-0.5 bg-green-600 transition-all duration-300"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </div>
      </div>
      {/* Toolbar (search, actions) */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* LEFT: Selection actions */}
        {(activeTab === "Product Management"
          ? selectedRows.length
          : activeTab === "Customer Management"
          ? selectedCustomerRows.length
          : activeTab === "Order Management"
          ? selectedOrderRows.length
          : activeTab === "Farmer Payout"
          ? selectedFarmerRows.length
          : 0) > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={
                activeTab === "Product Management"
                  ? handleDeleteSelected
                  : activeTab === "Customer Management"
                  ? () => setSelectedCustomerRows([])
                  : activeTab === "Order Management"
                  ? handleDeleteOrderRows
                  : activeTab === "Farmer Payout"
                  ? () => setSelectedFarmerRows([])
                  : undefined
              }
              className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-red-50"
              style={{ color: "#dc2626" }}
            >
              <Trash2 size={18} stroke="#dc2626" />
              Delete
              <span className="text-gray-500 ml-1">
                {activeTab === "Product Management"
                  ? selectedRows.length
                  : activeTab === "Customer Management"
                  ? selectedCustomerRows.length
                  : activeTab === "Order Management"
                  ? selectedOrderRows.length
                  : activeTab === "Farmer Payout"
                  ? selectedFarmerRows.length
                  : 0}{" "}
                Selected
              </span>
            </button>
            <button
              onClick={() =>
                activeTab === "Product Management"
                  ? setSelectedRows([])
                  : activeTab === "Customer Management"
                  ? setSelectedCustomerRows([])
                  : activeTab === "Order Management"
                  ? setSelectedOrderRows([])
                  : activeTab === "Farmer Payout"
                  ? setSelectedFarmerRows([])
                  : undefined
              }
              className="flex items-center gap-1 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100"
            >
              ✕ Clear
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2" style={{ color: "#374151" }}>
            <RefreshCw size={20} style={{ color: "#16A34A" }} />
            <span style={{ fontWeight: 500 }}>
              {activeTab === "Product Management"
                ? `All Products ${products.length}`
                : activeTab === "Customer Management"
                ? `Total Customers ${CUSTOMER_DATA.length}`
                : activeTab === "Order Management"
                ? `All Orders ${orderRows.length}`
                : activeTab === "Farmer Payout"
                ? `All Payouts ${FARMER_PAYOUT_ROWS.length}`
                : ""}
            </span>
          </div>
        )}

        {/* RIGHT: Search, filter, add/manage categories */}
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
              placeholder={
                activeTab === "Product Management"
                  ? "Search Product"
                  : activeTab === "Customer Management"
                  ? "Search Customer"
                  : activeTab === "Order Management"
                  ? "Search Order"
                  : "Search Farmer"
              }
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
              onClick={() => setShowFilters(f => !f)}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6B7280",
              }}
            />
          </div>
          {activeTab === "Product Management" && (
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
          )}
        </div>
      </div>
      {/* CATEGORY SUMMARY (Product Management only) */}
      {activeTab === "Product Management" && (
        <div className="px-6 pb-4">
          <div className="flex gap-4 overflow-x-auto">
            {CATEGORIES_SUMMARY.map(cat => {
              const style = BADGE_STYLES[cat.name] || BADGE_STYLES['Grains'];
              return (
                <div
                  key={cat.name}
                  style={{
                    position: 'relative',
                    border: '1px solid #858585',
                    borderRadius: '1.6rem',
                    minWidth: '150px',
                    height: '80px',
                    padding: '0 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    flex: '1',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      bottom: '0',
                      width: '20px',
                      backgroundColor: style.background,
                      borderRadius: '1.6rem 0 0 1.6rem'
                    }}
                  />
                  <span style={{ fontSize: '0.875rem', color: '#9CA3AF', fontWeight: 500, marginLeft: '8px' }}>{cat.name}</span>
                  <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#000000', marginLeft: '8px' }}>{cat.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ORDER STATUS CARDS (Order Management only) */}
      {activeTab === "Order Management" && (
        <div className="px-6 pb-4">
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
      )}

      {/* FARMER PAYOUT STATUS CARDS (Farmer Payout only) */}
      {activeTab === "Farmer Payout" && (
        <div className="px-6 pb-4">
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
      )}
      {/* MAIN TABLE AREA */}
      <div className="px-6 pb-6">
        <div style={{ borderRadius: '1rem', overflow: 'hidden', minHeight: 420 }}>
          <h2 className="px-4 pt-4 text-xl font-bold text-gray-900">
            {activeTab === "Product Management"
              ? "Product List"
              : activeTab === "Customer Management"
              ? "Customer List"
              : activeTab === "Order Management"
              ? "Orders List"
              : activeTab === "Farmer Payout"
              ? "Farmer Payouts"
              : ""}
          </h2>
          {/* --- PRODUCT MANAGEMENT TABLE --- */}
          {activeTab === "Product Management" && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#F7F7FB' }}>
                <tr style={{ color: '#4B5563', fontSize: '0.875rem', fontWeight: 600 }}>
                  <th style={{ padding: '0.75rem' }}>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded"
                      checked={selectedRows.length === visibleProducts.length && visibleProducts.length > 0}
                      onChange={e =>
                        setSelectedRows(e.target.checked
                          ? visibleProducts.map(p => p.id)
                          : [])
                      }
                    />
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Product</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Stock</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.map(p => {
                  const style = BADGE_STYLES[p.category] || BADGE_STYLES['Grains'];
                  const isSelected = selectedRows.includes(p.id);
                  return (
                    <tr
                      key={p.id}
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
                              setSelectedRows([...selectedRows, p.id]);
                            } else {
                              setSelectedRows(selectedRows.filter(id => id !== p.id));
                            }
                          }}
                        />
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={p.avatar}
                            alt={p.name}
                            style={{ width: 32, height: 32, borderRadius: '50%' }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, color: '#111827' }}>{p.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                              Variation: {p.variation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem' }}>₱{Number(p.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderRadius: '9999px',
                            color: style.color,
                            backgroundColor: style.background,
                            border: `1px solid ${style.border}`
                          }}
                        >
                          {p.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>{p.stock}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderRadius: '9999px',
                            color:
                              p.status === 'Pending'
                                ? '#92400E'
                                : p.status === 'Approved'
                                ? '#15803D'
                                : '#DC2626',
                            backgroundColor:
                              p.status === 'Pending'
                                ? '#FEF3C7'
                                : p.status === 'Approved'
                                ? '#D1FAE5'
                                : '#FEE2E2',
                            border: `1px solid ${
                              p.status === 'Pending'
                                ? '#92400E'
                                : p.status === 'Approved'
                                ? '#15803D'
                                : '#DC2626'
                            }`
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '0.75rem',
                          textAlign: 'left',
                          minWidth: 160
                        }}
                      >
                        <div className="group flex items-center gap-4">
                          {p.status === 'Pending' ? (
                            <div className="relative flex items-center" style={{ cursor: 'pointer' }} onClick={() => handleDetails(p)}>
                              <Copy
                                size={20}
                                stroke="#16A34A"
                                className="transition-transform duration-200 group-hover:-translate-x-2"
                              />
                              <span
                                className="absolute left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#16A34A] text-sm font-medium transition-opacity duration-200 whitespace-nowrap"
                                style={{ minWidth: 50 }}
                              >
                                Details
                              </span>
                            </div>
                          ) : (
                            <div className="relative flex items-center" style={{ cursor: 'pointer' }}>
                              <Pencil
                                size={20}
                                stroke="#3B82F6"
                                className="cursor-pointer transition-transform duration-200 group-hover:-translate-x-1"
                                onClick={() => handleEdit(p)}
                              />
                              <span
                                className="absolute left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#3B82F6] text-sm font-medium transition-opacity duration-200 whitespace-nowrap"
                                style={{ minWidth: 40 }}
                              >
                                Edit
                              </span>
                            </div>
                          )}
                          <Trash2
                            size={20}
                            stroke="#EF4444"
                            className="cursor-pointer transition-transform duration-200 group-hover:translate-x-8"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* --- CUSTOMER MANAGEMENT TABLE --- */}
          {activeTab === "Customer Management" && (
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
          )}
          {/* --- ORDER MANAGEMENT TABLE --- */}
          {activeTab === "Order Management" && (
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
                          setSelectedOrder(o);         // Pass the order object to modal
                          setOrderManagementModalOpen(true); // Open modal
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
          )}
          {/* --- FARMER PAYOUT TABLE --- */}
          {activeTab === "Farmer Payout" && (
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
          )}

          {/* --- PAGINATION (Shared style) --- */}
          <div className="flex justify-center my-6">
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  activeTab === "Product Management"
                    ? setCurrentPage(p => Math.max(1, p - 1))
                    : activeTab === "Customer Management"
                    ? setCustomerPage(p => Math.max(1, p - 1))
                    : activeTab === "Order Management"
                    ? setOrderPage(p => Math.max(1, p - 1))
                    : activeTab === "Farmer Payout"
                    ? setFarmerPayoutPage(p => Math.max(1, p - 1))
                    : undefined
                }
                className="btn btn-sm"
                disabled={
                  activeTab === "Product Management"
                    ? currentPage === 1
                    : activeTab === "Customer Management"
                    ? customerPage === 1
                    : activeTab === "Order Management"
                    ? orderPage === 1
                    : activeTab === "Farmer Payout"
                    ? farmerPayoutPage === 1
                    : true
                }
              >«</button>
              {[
                ...(activeTab === "Product Management"
                  ? [...Array(totalPages)]
                  : activeTab === "Customer Management"
                  ? [...Array(customerTotalPages)]
                  : activeTab === "Order Management"
                  ? [...Array(orderTotalPages)]
                  : activeTab === "Farmer Payout"
                  ? [...Array(farmerPayoutTotalPages)]
                  : [])
              ].map((_, i) => {
                const page = i + 1;
                const isCurrent =
                  activeTab === "Product Management"
                    ? page === currentPage
                    : activeTab === "Customer Management"
                    ? page === customerPage
                    : activeTab === "Order Management"
                    ? page === orderPage
                    : activeTab === "Farmer Payout"
                    ? page === farmerPayoutPage
                    : false;
                return (
                  <button
                    key={page}
                    onClick={() =>
                      activeTab === "Product Management"
                        ? setCurrentPage(page)
                        : activeTab === "Customer Management"
                        ? setCustomerPage(page)
                        : activeTab === "Order Management"
                        ? setOrderPage(page)
                        : activeTab === "Farmer Payout"
                        ? setFarmerPayoutPage(page)
                        : undefined
                    }
                    className={`btn btn-sm ${isCurrent ? 'bg-gray-300 text-black' : 'btn-ghost text-gray-600'}`}
                  >{page}</button>
                );
              })}
              <button
                onClick={() =>
                  activeTab === "Product Management"
                    ? setCurrentPage(p => Math.min(totalPages, p + 1))
                    : activeTab === "Customer Management"
                    ? setCustomerPage(p => Math.min(customerTotalPages, p + 1))
                    : activeTab === "Order Management"
                    ? setOrderPage(p => Math.min(orderTotalPages, p + 1))
                    : activeTab === "Farmer Payout"
                    ? setFarmerPayoutPage(p => Math.min(farmerPayoutTotalPages, p + 1))
                    : undefined
                }
                className="btn btn-sm"
                disabled={
                  activeTab === "Product Management"
                    ? currentPage === totalPages
                    : activeTab === "Customer Management"
                    ? customerPage === customerTotalPages
                    : activeTab === "Order Management"
                    ? orderPage === orderTotalPages
                    : activeTab === "Farmer Payout"
                    ? farmerPayoutPage === farmerPayoutTotalPages
                    : true
                }
              >»</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      <AddCategoryModal
        isOpen={showAddCategory}
        mode={categoryModalMode}
        onClose={() => setShowAddCategory(false)}
        onSwitchMode={mode => setCategoryModalMode(mode)}
      />
      <EditDetailsModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        product={editProduct}
        onConfirm={updatedProduct => {
          setProducts(prev =>
            prev.map(p =>
              p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
            )
          );
        }}
        mode={editModalMode} // Passes "details" or "edit"
      />
      <OrderHistoryModal
        isOpen={orderHistoryOpen}
        onClose={() => setOrderHistoryOpen(false)}
        customerName={orderHistoryCustomer?.name || ""}
        orders={SAMPLE_ORDERS}
      />
      <OrderManagementModal
        isOpen={orderManagementModalOpen}
        onClose={() => setOrderManagementModalOpen(false)}
        order={selectedOrder}
      />
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
