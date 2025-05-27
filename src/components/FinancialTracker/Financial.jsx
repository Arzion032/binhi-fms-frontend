// Financial.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa6';
import { Search, SlidersHorizontal, X, RefreshCw } from 'lucide-react';
import StatisticsChart from './StatisticsChart';
import IncomeModal from './IncomeModal';
import ExpensesModal from './ExpensesModal';

{/* is it anything that makes the world and everyone around the earth is happy */}

export default function Financial() {
  // ─── TAB STATE & INDICATOR ───────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('overview');
  const overviewRef = useRef();
  const historyRef = useRef();
  const tabsRef = useRef();
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const updateIndicator = useCallback(() => {
    const container = tabsRef.current;
    const btn = activeTab === 'overview' ? overviewRef.current : historyRef.current;
    if (container && btn) {
      const c = container.getBoundingClientRect();
      const b = btn.getBoundingClientRect();
      setIndicator({
        left: b.left - c.left + container.scrollLeft,
        width: b.width,
      });
    }
  }, [activeTab]);
  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  // ─── OVERVIEW MODALS & ACTIONS ───────────────────────────────────────────────
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const dropdownRef = useRef();
  const downloadRef = useRef();
  const handleAddTransaction = (type) => {
    setDropdownOpen(false);
    if (type === 'income') setIncomeModalOpen(true);
    else setExpenseModalOpen(true);
  };
  const handleOverviewDownload = (type) => {
    console.log(`Downloading ${type}`);
    setDownloadDropdownOpen(false);
  };

  // ─── HISTORY DATA & HANDLERS ────────────────────────────────────────────────
  const [transactions, setTransactions] = useState([
    { name: 'Kaye Lagablab', email: 'juandcruz@gmail.com', avatar: '/Screenshot_195.png', type: 'Income', source: 'Marketplace', category: '-', amount: '12,999', date: 'Apr 17, 2025', relativeDate: '5 days ago' },
    { name: 'Carlo Imnida',   email: 'juandcruz@gmail.com', avatar: '/Screenshot_195.png', type: 'Expense', source: '-', category: 'Farm Supply', amount: '5,400', date: 'Apr 16, 2025', relativeDate: '6 days ago' },
    { name: 'Yna Boomboom',   email: 'juandcruz@gmail.com', avatar: '/Screenshot_195.png', type: 'Expense', source: '-', category: 'Farm Supply', amount: '7,000', date: 'Apr 15, 2025', relativeDate: '7 days ago' },
    { name: 'Fred Ko Pal',    email: 'juandcruz@gmail.com', avatar: '/Screenshot_195.png', type: 'Expense', source: '-', category: 'Farm Supply', amount: '1,500', date: 'Apr 14, 2025', relativeDate: '8 days ago' },
    { name: 'Ry Ban Tot',     email: 'juandcruz@gmail.com', avatar: '/Screenshot_195.png', type: 'Income', source: 'Marketplace', category: '-', amount: '2,500', date: 'Apr 13, 2025', relativeDate: '9 days ago' },
    { name: 'Nisi B. Ding',   email: 'juandcruz@gmail.com', avatar: '/Screenshot_195.png', type: 'Income', source: 'Marketplace', category: '-', amount: '999',   date: 'Apr 12, 2025', relativeDate: '10 days ago' }
  ]);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const currentData = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete the selected transactions?')) return;
    const updated = [...transactions];
    currentData.forEach((_, idx) => {
      if (selectedRows.includes(idx)) {
        updated.splice((currentPage - 1) * itemsPerPage + idx, 1);
      }
    });
    setTransactions(updated);
    setSelectedRows([]);
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedRows([]);
    }
  };
  const [historyDownloadOpen, setHistoryDownloadOpen] = useState(false);
  const historyDownloadRef = useRef();
  const handleHistoryDownload = (type) => {
    console.log(`Downloading ${type}`);
    setHistoryDownloadOpen(false);
  };

  // ─── FILTER STATE ───────────────────────────────────────────────────────────
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const clearFilters = () => {
    setSelectedRole('');
    setSelectedType('');
    setSelectedSource('');
    setShowFilters(false);
  };

  // ─── CLICK‐OUTSIDE DROPDOWNS ─────────────────────────────────────────────────
  useEffect(() => {
    function onClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (downloadRef.current && !downloadRef.current.contains(e.target)) setDownloadDropdownOpen(false);
      if (historyDownloadRef.current && !historyDownloadRef.current.contains(e.target)) setHistoryDownloadOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // ─── STATIC HISTORY PREVIEW LIST ────────────────────────────────────────────
  const previewList = [
    { date: 'Apr 12, 2024', name: 'Juan',  amount: '₱800',  color: 'green' },
    { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red'   },
    { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500',  color: 'green' },
    { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500',  color: 'green' },
    { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500',  color: 'green' },
    { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500',  color: 'green' },
    { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red'   },
    { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500',  color: 'green' },
    { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red'   },
    { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500',  color: 'green' },
    { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red'   },
    { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500',  color: 'green' },
    { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500',  color: 'green' },
    { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red'   },
    { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500',  color: 'green' }
  ];

  return (
    <div className="p-0">
      {/* Sticky Header & Tabs */}
      <div className="sticky top-0 z-30 w-full bg-[#f9fbf8] shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="text-sm breadcrumbs font-inter text-base">
            <ul className="flex gap-1">
              <li><a className="text-green-600 underline">Dashboard</a></li>
              <li><a className="text-green-600 underline">Financial Tracker</a></li>
              <li className="text-gray-400">
                {activeTab === 'overview' ? 'Financial Overview' : 'Transaction History'}
              </li>
            </ul>
          </div>
          <button className="btn btn-square btn-binhi ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01" />
            </svg>
          </button>
        </div>
        <div className="px-6 pb-4 h-5 flex items-center">
          <h1 className="text-[40px] font-bold text-gray-800">
            Financial Tracker
          </h1>
        </div>
        <div className="mb-4 border-b border-gray-200 relative">
          <ul
            ref={tabsRef}
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            role="tablist"
          >
            <li className="mr-10" role="presentation">
              <button
                ref={overviewRef}
                className={`inline-block p-4 ${activeTab === 'overview' ? 'text-green-600' : 'text-gray-500 hover:text-gray-600'}`}
                onClick={() => setActiveTab('overview')}
                role="tabpanel"
                aria-selected={activeTab === 'overview'}
              >
                Financial Overview
              </button>
            </li>
            <li className="mr-10" role="presentation">
              <button
                ref={historyRef}
                className={`inline-block p-4 ${activeTab === 'history' ? 'text-green-600' : 'text-gray-500 hover:text-gray-600'}`}
                onClick={() => setActiveTab('history')}
                role="tabpanel"
                aria-selected={activeTab === 'history'}
              >
                Transaction History
              </button>
            </li>
          </ul>
          <div
            className="absolute bottom-0 h-0.5 bg-green-600 transition-all duration-300"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' ? (
        <>
          {/* Balance & Actions */}
          <div className="flex flex-wrap items-center justify-between my-4 gap-2">
            <div className="flex items-center gap-2 text-base font-medium">
              <RefreshCw size={20} stroke="#3b82f6" />
              <span className="font-medium text-lg" style={{ color: '#3b82f6' }}>Current Federation Balance:</span>
              <span className="text-blue-700 font-bold text-lg">₱52,438</span>
              <span className="text-gray-400 text-lg ml-2 opacity-60">Last Updated Apr 30</span>
            </div>
            <div className="flex gap-2">
              <div className="relative z-20" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)} className="btn bg-green-600 text-white rounded-full px-4 py-2 font-semibold flex items-center gap-1 hover:bg-green-700"
                >
                  + Add Transaction
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ml-1 ${dropdownOpen ? 'rotate-180' : ''} transition-transform duration-200`}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 menu p-2 shadow bg-white border border-black rounded-box w-52">
                    <li><a onClick={() => handleAddTransaction('income')}>Income</a></li>
                    <li><a onClick={() => handleAddTransaction('expense')}>Expense</a></li>
                  </ul>
                )}
              </div>
              <div className="relative z-20" ref={downloadRef}>
                <button
                  onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)} className="btn bg-white border border-green-600 text-green-600 rounded-full px-6 py-2 font-semibold flex items-center gap-2 hover:bg-green-50"
                >
                  Download
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ml-1 ${downloadDropdownOpen ? 'rotate-180' : ''} transition-transform duration-200`}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {downloadDropdownOpen && (
                  <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 menu p-2 shadow bg-white border border-black rounded-box w-60">
                    <li>
                      <a onClick={() => handleOverviewDownload('PDF')} className="flex items-center gap-2">
                        <FaFilePdf className="text-red-500" /> Download PDF
                      </a>
                    </li>
                    <li>
                      <a onClick={() => handleOverviewDownload('Excel')} className="flex items-center gap-2">
                        <FaFileExcel className="text-green-600" /> Download Excel
                      </a>
                    </li>
                    <div className="border-t my-2" />
                    <li><a onClick={() => handleOverviewDownload('Custom Range')}>Custom Date Range</a></li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300 my-2" />

          {/* Overview Charts & Cards */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch mt-2">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Income Card */}
                <div className="relative flex-1 bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[170px] shadow-sm group">
                  <div className="absolute left-0 top-0 h-full w-3 rounded-tl-2xl rounded-bl-2xl bg-[#4caf50]" />
                  <div className="absolute top-4 right-4 z-20 group">
                    <button
                      onClick={() => setIncomeModalOpen(true)} className="flex items-center gap-2 px-3 py-1 text-green-600 border border-green-600 rounded-full transition-all duration-200 group-hover:px-4 hover:bg-green-600 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                      <span className="text-sm font-semibold">Add Income</span>
                    </button>
                  </div>
                  <div className="flex flex-col justify-between h-full p-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-700">Total Income</span>
                        <span className="text-yellow-400 text-base">🔔</span>
                      </div>
                      <div className="text-3xl font-bold text-black mb-1">₱12,999</div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        from last week <span className="text-xs">▼</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 text-green-500">
                          <path d="M2 17h16M6 13l4-4 4 4M6 9l4-4 4 4" />
                        </svg>
                        <span className="text-green-600 text-base font-semibold">↑ 8.69%</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Expense Card */}
                <div className="relative flex-1 bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[170px] shadow-sm group">
                  <div className="absolute left-0 top-0 h-full w-3 rounded-tl-2xl rounded-bl-2xl bg-[#ff4d4f]" />
                  <div className="absolute top-4 right-4 z-20 group">
                    <button
                      onClick={() => setExpenseModalOpen(true)} className="flex items-center gap-2 px-3 py-1 text-[#ff4d4f] border border-[#ff4d4f] rounded-full transition-all duration-200 group-hover:px-4 hover:bg-[#ff4d4f] hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                      <span className="text-sm font-semibold">Add Expense</span>
                    </button>
                  </div>
                  <div className="flex flex-col justify-between h-full p-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-700">Total Expenses</span>
                        <span className="text-yellow-400 text-base">🔔</span>
                      </div>
                      <div className="text-3xl font-bold text-black mb-1">₱12,999</div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        from last week <span className="text-xs">▼</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5" style={{ color: '#ff4d4f' }}>
                          <path d="M10 3c-3.866 0-7 1.343-7 3s3.134 3 7 3 7-1.343 7-3-3.134-3-7-3z" />
                        </svg>
                        <span className="text-base font-semibold" style={{ color: '#ff4d4f' }}>↑ 8.69%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Chart */}
              <div className="flex-1 bg-white rounded-2xl border border-gray-300 p-6 shadow-sm w-full h-full min-h-[550px] overflow-visible relative">
                <StatisticsChart />
              </div>
            </div>
            {/* History Preview aside */}
            <div className="w-full lg:max-w-[340px] min-w-[300px] bg-white rounded-2xl border border-gray-300 p-6 shadow-sm flex flex-col h-full min-h-[750px]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-black">History</h3>
                <button
                  onClick={() => setActiveTab('history')}
                  className="text-sm text-gray-500 hover:underline flex items-center gap-1"
                >
                  View All <span className="ml-1">→</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-500 text-xs border-b">
                    <tr>
                      <th className="py-1 text-left">Date</th>
                      <th className="py-1 text-left">Name</th>
                      <th className="py-1 text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewList.map((item, i) => (
                      <tr key={i}>
                        <td className="py-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color === 'green' ? '#4caf50' : '#ff4d4f' }} />
                            {item.date}
                          </div>
                        </td>
                        <td className="py-1">{item.name}</td>
                        <td className="py-1">{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Transaction History Tab Controls and Table */}
          <div className="flex flex-wrap items-center justify-between mb-2 gap-2 pt-4">
            <div className="flex flex-col">
              {selectedRows.length > 0 ? (
                <div className="flex gap-2">
                  <button onClick={handleDelete} className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-red-50 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="#dc2626" viewBox="0 0 24 24">
                      <path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 1H8l1-1zm1 4v10h2V8h-2zm4 0v10h2V8h-2z" />
                    </svg>
                    <span style={{ color: '#dc2626' }}>Delete</span>
                    <span className="text-gray-500 ml-1">
                      {selectedRows.length} Transaction{selectedRows.length > 1 && 's'} Selected
                    </span>
                  </button>
                  <button onClick={() => setSelectedRows([])} className="flex items-center gap-1 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100 transition">
                    ✕ Clear
                  </button>
                </div>
              ) : showFilters ? (
                <div className="flex items-center space-x-1 p-2 rounded-lg w-fit">
                  <div className="flex items-center space-x-1 border rounded-l-3xl px-3 py-1 cursor-pointer bg-white border-[#858585] h-[35px]">
                    <SlidersHorizontal className="w-4 h-4 text-[#3b82f6]" />
                    <span className="mr-2 p-2 text-sm text-[#3b82f6] font-medium">Active Filters</span>
                  </div>
                  <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)} className="border border-[#858585] h-[35px] text-sm bg-white text-[#858585] pl-2 pr-6">
                    <option value="">Role</option>
                    <option value="Income">Member</option>
                  </select>
                  <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="border border-[#858585] h-[35px] text-sm bg-white text-[#858585] pl-2 pr-6">
                    <option value="">Type</option>
                    <option value="Marketplace">Income</option>
                    <option value="Farm Supply">Expense</option>
                  </select>
                  <select value={selectedSource} onChange={e => setSelectedSource(e.target.value)} className="border border-[#858585] h-[35px] text-sm	bg-white text-[#858585] pl-2 pr-6">
                    <option value="">Source</option>
                    <option value="Marketplace">Marketplace</option>
                    <option value="-">-</option>
                  </select>
                  <button onClick={clearFilters} className="flex items-center space-x-1 border rounded-r-3xl px-3 py-1 text-sm border-[#858585] h-[35px] bg-white text-[#858585]">
                    <X className="w-4 h-4 text-[#858585]" />
                    <span>Clear</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-base font-medium">
                  <RefreshCw size={20} stroke="#3b82f6" />
                  <span className="font-medium text-lg" style={{ color: '#3b82f6' }}>Current Federation Balance:</span>
                  <span className="text-blue-700 font-bold text-lg">₱52,438</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              {/* Search + Filter */}
              <div className="relative w-[280px] flex items-center border rounded-full px-3 py-1 bg-white">
                <Search className="text-gray-500 w-5 h-5 mr-2" />
                <input type="text" placeholder="Search Transaction" className="flex-1 outline-none bg-white" />
                <button onClick={() => setShowFilters(!showFilters)}>
                  <SlidersHorizontal className="text-gray-600 w-5 h-5" />
                </button>
              </div>
              {/* Download */}
              <div className="dropdown dropdown-end" ref={historyDownloadRef}>
                <label tabIndex={0} onClick={() => setHistoryDownloadOpen(!historyDownloadOpen)} className="btn btn-outline btn-success rounded-full">
                  Download
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </label>
                {historyDownloadOpen && (
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 border w-52 rounded-box">
                    <li><a onClick={() => handleHistoryDownload('PDF')}><FaFilePdf className="text-red-500" /> PDF</a></li>
                    <li><a onClick={() => handleHistoryDownload('Excel')}><FaFileExcel className="text-green-600" /> Excel</a></li>
                    <li><a onClick={() => handleHistoryDownload('Custom Range')}>Custom Range</a></li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300 mt-2 mb-2" />

          {/* Transaction Table */}
          <div className="w-full overflow-x-auto rounded-xl">
            <h2 className="text-xl font-bold mb-4 px-4 pt-2">Transaction History</h2>
            <table className="table w-full">
              <thead className="bg-[#f7f7fb] text-sm text-gray-600 font-semibold">
                <tr>
                  <th>
                    <input type="checkbox" className="checkbox checkbox-sm rounded" checked={selectedRows.length === currentData.length} onChange={e => {
                      if (e.target.checked) setSelectedRows(currentData.map((_, i) => i));
                      else setSelectedRows([]);
                    }} />
                  </th>
                  <th>User Name</th>
                  <th>Role</th>
                  <th>Type</th>
                  <th>Source</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date Added</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, idx) => (
                  <tr key={idx} className={selectedRows.includes(idx) ? 'bg-[#f0fdfa]' : ''}>
                    <td>
                      <input type="checkbox" className="checkbox checkbox-sm rounded" checked={selectedRows.includes(idx)} onChange={e => {
                        if (e.target.checked) setSelectedRows([...selectedRows, idx]);
                        else setSelectedRows(selectedRows.filter(i => i !== idx));
                      }} />
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-8 h-8 mask mask-squircle">
                            <img src={item.avatar} alt={item.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="px-4 py-1 rounded-full text-xs font-medium" style={{
                        color: '#0066FF',
                        border: '2px solid #0066FF',
                        backgroundColor: '#E0F0FF',
                        display: 'inline-block',
                        minWidth: '80px',
                        textAlign: 'center'
                      }}>
                        Member
                      </span>
                    </td>
                    <td>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{
                        color: item.type === 'Income' ? '#15803d' : '#dc2626',
                        backgroundColor: item.type === 'Income' ? '#d1fae5' : '#fee2e2',
                        border: `1px solid ${item.type === 'Income' ? '#15803d' : '#dc2626'}`,
                        display: 'inline-block'
                      }}>
                        {item.type}
                      </span>
                    </td>
                    <td>{item.source}</td>
                    <td>{item.category}</td>
                    <td className="font-medium text-right">₱{item.amount}</td>
                    <td>
                      <div>{item.date}</div>
                      <div className="text-xs text-gray-500">{item.relativeDate}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center my-6">
              <div className="flex items-center gap-1">
                <button onClick={() => handlePageChange(currentPage - 1)} className="btn btn-sm" disabled={currentPage === 1}>«</button>
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button key={page} onClick={() => handlePageChange(page)} className={`btn btn-sm ${page === currentPage ? 'bg-gray-300 text-black' : 'btn-ghost text-gray-600'}`}>
                      {page}
                    </button>
                  );
                })}
                <button onClick={() => handlePageChange(currentPage + 1)} className="btn btn-sm" disabled={currentPage === totalPages}>»</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <IncomeModal isOpen={incomeModalOpen} onClose={() => setIncomeModalOpen(false)} />
      <ExpensesModal isOpen={expenseModalOpen} onClose={() => setExpenseModalOpen(false)} />
    </div>
  );
}
