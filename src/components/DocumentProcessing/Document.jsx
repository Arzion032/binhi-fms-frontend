// src/components/Document.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search,
  SlidersHorizontal,
  RefreshCw,
  ChevronDown,
  Copy,
  Trash2,
  X,
} from 'lucide-react';
import ApproveModal, { RejectModal } from './ApproveModal';

export default function Document() {
  const [activeTab, setActiveTab] = useState('pending');
  const pendingRef = useRef();
  const historyRef = useRef();
  const tabsRef = useRef();
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    const container = tabsRef.current;
    const btn = activeTab === 'pending' ? pendingRef.current : historyRef.current;
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

  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocumentRequest, setSelectedDocumentRequest] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [requests, setRequests] = useState([
    { id: 1, name: 'Juan Dela Cruz', email: 'juandelacruz@gmail.com', avatar: '/Screenshot_195.png', listDate: 'Apr 9, 2025, 11:34 AM', role: 'Member', document: 'Rental Form', status: 'Pending', requestedOn: 'April 9, 2025, 11:34 AM' },
    { id: 2, name: 'Carlo Imnida', email: 'carloimnida@gmail.com', avatar: '/Screenshot_195.png', listDate: 'Apr 8, 2025, 10:00 AM', role: 'Member', document: 'Land Title', status: 'Approved', requestedOn: 'April 8, 2025, 10:00 AM' },
    { id: 3, name: 'Yna Boomboom', email: 'ynab@example.com', avatar: '/Screenshot_195.png', listDate: 'Apr 7, 2025, 09:20 AM', role: 'Member', document: 'Tax Document', status: 'Rejected', requestedOn: 'April 7, 2025, 09:20 AM' },
    { id: 4, name: 'Mike Johnson', email: 'mike.j@example.com', avatar: '/Screenshot_195.png', listDate: 'Apr 6, 2025, 08:45 AM', role: 'Member', document: 'Application Form', status: 'Pending', requestedOn: 'April 6, 2025, 08:45 AM' },
    { id: 5, name: 'Sarah Lee', email: 'sarah.lee@example.com', avatar: '/Screenshot_195.png', listDate: 'Apr 5, 2025, 02:30 PM', role: 'Member', document: 'ID Verification', status: 'Approved', requestedOn: 'April 5, 2025, 02:30 PM' },
    { id: 6, name: 'David Lee', email: 'david.lee@example.com', avatar: '/Screenshot_195.png', listDate: 'Apr 4, 2025, 11:15 AM', role: 'Member', document: 'Passport Copy', status: 'Rejected', requestedOn: 'April 4, 2025, 11:15 AM' },
    { id: 7, name: 'Emily Clark', email: 'emily.clark@example.com', avatar: '/Screenshot_195.png', listDate: 'Apr 3, 2025, 09:05 AM', role: 'Member', document: 'Certificate', status: 'Pending', requestedOn: 'April 3, 2025, 09:05 AM' },
    { id: 8, name: 'Robert Brown', email: 'robert.brown@example.com', avatar: '/Screenshot_195.png', listDate: 'Apr 2, 2025, 04:20 PM', role: 'Member', document: 'Tax Form', status: 'Approved', requestedOn: 'April 2, 2025, 04:20 PM' },
    { id: 9, name: 'Linda White', email: 'linda.white@example.com', avatar: '/Screenshot_195.png', listDate: 'Apr 1, 2025, 12:00 PM', role: 'Member', document: 'Lease Agreement', status: 'Rejected', requestedOn: 'April 1, 2025, 12:00 PM' },
    { id: 10, name: 'Steven Garcia', email: 'steven.garcia@example.com', avatar: '/Screenshot_195.png', listDate: 'Mar 31, 2025, 03:40 PM', role: 'Member', document: 'Employment Letter', status: 'Pending', requestedOn: 'March 31, 2025, 03:40 PM' },
    { id: 11, name: 'Karen Martinez', email: 'karen.martinez@example.com', avatar: '/Screenshot_195.png', listDate: 'Mar 30, 2025, 10:10 AM', role: 'Member', document: 'Insurance Document', status: 'Approved', requestedOn: 'March 30, 2025, 10:10 AM' },
    { id: 12, name: 'Brian Rodriguez', email: 'brian.rodriguez@example.com', avatar: '/Screenshot_195.png', listDate: 'Mar 29, 2025, 05:50 PM', role: 'Member', document: 'Bank Statement', status: 'Rejected', requestedOn: 'March 29, 2025, 05:50 PM' },
    { id: 13, name: 'Michelle Nguyen', email: 'michelle.nguyen@example.com', avatar: '/Screenshot_195.png', listDate: 'Mar 28, 2025, 07:25 AM', role: 'Member', document: 'Utility Bill', status: 'Pending', requestedOn: 'March 28, 2025, 07:25 AM' },
    { id: 14, name: 'Chris Patel', email: 'chris.patel@example.com', avatar: '/Screenshot_195.png', listDate: 'Mar 27, 2025, 06:15 PM', role: 'Member', document: 'Mortgage Contract', status: 'Approved', requestedOn: 'March 27, 2025, 06:15 PM' },
    { id: 15, name: 'Jessica Kim', email: 'jessica.kim@example.com', avatar: '/Screenshot_195.png', listDate: 'Mar 26, 2025, 01:05 PM', role: 'Member', document: 'Vehicle Registration', status: 'Rejected', requestedOn: 'March 26, 2025, 01:05 PM' }
  ]);

  const [sortOrder, setSortOrder] = useState('recent');
  const [recentDropdownOpen, setRecentDropdownOpen] = useState(false);
  const recentDropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (recentDropdownRef.current && !recentDropdownRef.current.contains(event.target)) {
        setRecentDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function parseDateString(dateStr) {
    return new Date(dateStr);
  }

  const filteredSortedRequests = React.useMemo(() => {
    let filtered = requests.filter(r => {
      return (
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedDocumentRequest ? r.document === selectedDocumentRequest : true) &&
        (selectedStatus ? r.status === selectedStatus : true)
      );
    });

    switch (sortOrder) {
      case 'atoz':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'ztoa':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'old':
        filtered.sort((a, b) => parseDateString(a.listDate) - parseDateString(b.listDate));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => parseDateString(b.listDate) - parseDateString(a.listDate));
        break;
    }
    return filtered;
  }, [requests, searchQuery, selectedDocumentRequest, selectedStatus, sortOrder]);

  const historyData = requests.map(r => ({ ...r, reason: 'Duplicate Request' }));
  const [historyPage, setHistoryPage] = useState(1);
  const itemsPerPageHistory = 7;
  const totalHistoryPages = Math.ceil(historyData.length / itemsPerPageHistory);
  const visibleHistoryData = historyData.slice(
    (historyPage - 1) * itemsPerPageHistory,
    historyPage * itemsPerPageHistory
  );
  const [selectedRowsHistory, setSelectedRowsHistory] = useState([]);
  const handleDeleteHistory = () => {
    if (!window.confirm('Delete selected history requests?')) return;
    setSelectedRowsHistory([]);
  };

  const [selectedRequest, setSelectedRequest] = useState(requests[0]);

  const [showApproveModal, setShowApproveModal] = useState(false);
  const handleApproveClick = () => setShowApproveModal(true);
  const handleDoApprove = () => {
    setRequests(rs =>
      rs.map(r => (r.id === selectedRequest.id ? { ...r, status: 'Approved' } : r))
    );
  };

  const [showRejectModal, setShowRejectModal] = useState(false);
  const handleRejectClick = () => setShowRejectModal(true);
  const handleDoReject = (reason) => {
    setRequests(rs =>
      rs.map(r => (r.id === selectedRequest.id ? { ...r, status: 'Rejected' } : r))
    );
  };

  const clearFilters = () => {
    setSelectedDocumentRequest('');
    setSelectedStatus('');
    setShowFilters(false);
  };

  const uniqueDocuments = React.useMemo(() => {
    const docs = new Set(requests.map(r => r.document));
    return Array.from(docs).sort();
  }, [requests]);

  return (
    <div className="p-0">
      {/* Sticky Header & Tabs */}
      <div className="sticky top-0 z-30 w-full bg-[#f9fbf8] shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="text-sm breadcrumbs font-inter text-base">
            <ul className="flex gap-1">
              <li><a className="text-green-600 underline">Dashboard</a></li>
              <li><a className="text-green-600 underline">Document Management</a></li>
              <li className="text-gray-400">
                {activeTab === 'pending' ? 'Pending Requests' : 'Request History'}
              </li>
            </ul>
          </div>
          <button className="btn btn-square btn-binhi ml-4" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01" />
            </svg>
          </button>
        </div>
        <div className="px-6 pb-3 h-5 flex items-center">
          <h1 className="text-[40px] font-bold text-gray-800">Document Management</h1>
        </div>
        <div className="mb-2 border-b border-gray-200 relative">
          <ul ref={tabsRef} className="flex -mb-px text-sm font-medium text-center" role="tablist">
            <li className="mr-10" role="presentation">
              <button
                ref={pendingRef}
                onClick={() => setActiveTab('pending')}
                className={`inline-block p-4 ${activeTab === 'pending' ? 'text-green-600' : 'text-gray-500 hover:text-gray-600'}`}
                role="tab"
                aria-selected={activeTab === 'pending'}
              >Pending Requests</button>
            </li>
            <li className="mr-10" role="presentation">
              <button
                ref={historyRef}
                onClick={() => setActiveTab('history')}
                className={`inline-block p-4 ${activeTab === 'history' ? 'text-green-600' : 'text-gray-500 hover:text-gray-600'}`}
                role="tab"
                aria-selected={activeTab === 'history'}
              >Request History</button>
            </li>
          </ul>
          <div
            className="absolute bottom-0 h-0.5 bg-green-600 transition-all duration-300"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </div>
      </div>

      <div className="px-6 py-2 pb-4">
        {activeTab === 'pending' ? (
          <>
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 pt-2 mb-1">
              <div className="flex items-center gap-2">
                {showFilters ? (
                  <div className="flex items-center space-x-1 p-2 rounded-lg w-fit">
                    <div className="flex items-center space-x-1 border rounded-l-3xl px-3 py-1 cursor-pointer bg-white border-[#858585] h-[35px]">
                      <SlidersHorizontal className="w-4 h-4 text-[#3b82f6]" />
                      <span className="mr-2 p-2 text-sm text-[#3b82f6] font-medium">Active Filters</span>
                    </div>
                    <select
                      value={selectedDocumentRequest}
                      onChange={e => setSelectedDocumentRequest(e.target.value)}
                      className="border border-[#858585] h-[35px] text-sm bg-white text-[#858585] pl-2 pr-6"
                    >
                      <option value="">Document Request</option>
                      {uniqueDocuments.map(doc => (
                        <option key={doc} value={doc}>{doc}</option>
                      ))}
                    </select>
                    <select
                      value={selectedStatus}
                      onChange={e => setSelectedStatus(e.target.value)}
                      className="border border-[#858585] h-[35px] text-sm bg-white text-[#858585] pl-2 pr-6"
                    >
                      <option value="">Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button
                      onClick={clearFilters}
                      className="flex items-center space-x-1 border rounded-r-3xl px-3 py-1 text-sm border-[#858585] h-[35px] bg-white text-[#858585]"
                      aria-label="Clear filters"
                    >
                      <X className="w-4 h-4 text-[#858585]" />
                      <span>Clear</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <RefreshCw size={20} stroke="#16A34A" />
                    <span className="font-medium text-base" style={{ color: '#111827' }}>
                      Pending Requests {requests.length}
                    </span>
                  </>
                )}
              </div>
              {/* ----------- UPDATED SEARCH BAR DESIGN START ----------- */}
              <div className="ml-auto flex items-center gap-4">
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
                    placeholder="Search Document"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem 2.5rem 0.5rem 2.5rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "9999px",
                      outline: "none",
                      color: "#374151",
                      background: "white"
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
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              {/* ----------- UPDATED SEARCH BAR DESIGN END ----------- */}
            </div>
            {/* Heading */}
            <h2 className="text-xl font-bold mb-2 px-4 pt-2">Pending Requests</h2>
            <div className="flex gap-4">
              {/* Left list */}
              <div
                className="border border-[#E5E7EB] shadow-sm overflow-hidden w-[300px] role=list"
                role="list"
              >
                <div className="px-4 py-4 relative" ref={recentDropdownRef}>
                  <button
                    className="w-full flex items-center justify-between px-4 py-2 rounded-full border border-[#D1D5DB] focus:outline-none"
                    onClick={() => setRecentDropdownOpen(!recentDropdownOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={recentDropdownOpen}
                    aria-label="Sort options"
                  >
                    <span className="flex items-center gap-1">
                      {sortOrder === 'recent' && '⇅ Recent'}
                      {sortOrder === 'atoz' && 'A → Z'}
                      {sortOrder === 'ztoa' && 'Z → A'}
                      {sortOrder === 'old' && '⇅ Old'}
                    </span>
                    <ChevronDown size={16} />
                  </button>
                  {recentDropdownOpen && (
                    <ul
                      role="listbox"
                      tabIndex={-1}
                      className="absolute z-50 bg-white border border-gray-300 rounded-md mt-1 w-full shadow-lg max-h-60 overflow-auto"
                      aria-label="Sort options"
                    >
                      <li
                        role="option"
                        tabIndex={0}
                        onClick={() => {
                          setSortOrder('recent');
                          setRecentDropdownOpen(false);
                        }}
                        onKeyDown={e => { if (e.key === 'Enter') { setSortOrder('recent'); setRecentDropdownOpen(false); } }}
                        className={`px-4 py-2 cursor-pointer hover:bg-green-50 ${
                          sortOrder === 'recent' ? 'font-semibold bg-green-100' : ''
                        }`}
                      >
                        ⇅ Recent
                      </li>
                      <li
                        role="option"
                        tabIndex={0}
                        onClick={() => {
                          setSortOrder('old');
                          setRecentDropdownOpen(false);
                        }}
                        onKeyDown={e => { if (e.key === 'Enter') { setSortOrder('old'); setRecentDropdownOpen(false); } }}
                        className={`px-4 py-2 cursor-pointer hover:bg-green-50 ${
                          sortOrder === 'old' ? 'font-semibold bg-green-100' : ''
                        }`}
                      >
                        ⇅ Old
                      </li>
                      <li
                        role="option"
                        tabIndex={0}
                        onClick={() => {
                          setSortOrder('atoz');
                          setRecentDropdownOpen(false);
                        }}
                        onKeyDown={e => { if (e.key === 'Enter') { setSortOrder('atoz'); setRecentDropdownOpen(false); } }}
                        className={`px-4 py-2 cursor-pointer hover:bg-green-50 ${
                          sortOrder === 'atoz' ? 'font-semibold bg-green-100' : ''
                        }`}
                      >
                        A → Z
                      </li>
                      <li
                        role="option"
                        tabIndex={0}
                        onClick={() => {
                          setSortOrder('ztoa');
                          setRecentDropdownOpen(false);
                        }}
                        onKeyDown={e => { if (e.key === 'Enter') { setSortOrder('ztoa'); setRecentDropdownOpen(false); } }}
                        className={`px-4 py-2 cursor-pointer hover:bg-green-50 ${
                          sortOrder === 'ztoa' ? 'font-semibold bg-green-100' : ''
                        }`}
                      >
                        Z → A
                      </li>
                    </ul>
                  )}
                </div>
                <div className="max-h-[550px] overflow-y-auto px-4 pb-4" role="list">
                  {filteredSortedRequests.length === 0 ? (
                    <p className="text-center text-gray-500">No requests found.</p>
                  ) : (
                    filteredSortedRequests.map((req) => (
                      <div
                        key={req.id}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                          selectedRequest.id === req.id ? 'bg-[#F3F4F6]' : 'hover:bg-green-50'
                        }`}
                        onClick={() => setSelectedRequest(req)}
                        role="listitem"
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter') setSelectedRequest(req); }}
                      >
                        <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-semibold text-[#111827]">{req.name}</div>
                          <div className="text-sm text-[#6B7280]">{req.listDate}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="flex-1 bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <img src={selectedRequest.avatar} alt={selectedRequest.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="text-2xl font-bold text-[#111827]">{selectedRequest.name}</div>
                    <div className="text-sm text-[#6B7280]">{selectedRequest.email}</div>
                  </div>
                </div>
                <hr className="border-t border-[#E5E7EB] mb-6" />
                <div className="space-y-4 flex-1">
                  <div>
                    <div className="text-sm text-[#6B7280] font-medium">Role</div>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        color: '#0066FF',
                        backgroundColor: '#E0F0FF',
                        border: '2px solid #0066FF',
                      }}
                    >
                      {selectedRequest.role}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-[#6B7280] font-medium">Document Request</div>
                    <div className="text-base text-[#111827]">{selectedRequest.document}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6B7280] font-medium">Status</div>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        color:
                          selectedRequest.status === 'Pending'
                            ? '#92400E'
                            : selectedRequest.status === 'Approved'
                            ? '#15803D'
                            : '#DC2626',
                        backgroundColor:
                          selectedRequest.status === 'Pending'
                            ? '#FEF3C7'
                            : selectedRequest.status === 'Approved'
                            ? '#D1FAE5'
                            : '#FEE2E2',
                        border: `1px solid ${
                          selectedRequest.status === 'Pending'
                            ? '#92400E'
                            : selectedRequest.status === 'Approved'
                            ? '#15803D'
                            : '#DC2626'
                        }`,
                      }}
                    >
                      {selectedRequest.status}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-[#6B7280] font-medium">Requested on</div>
                    <div className="text-base text-[#111827]">{selectedRequest.requestedOn}</div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={handleRejectClick}
                    className="px-6 py-2 rounded-full font-semibold bg-[#EF4444] text-white hover:bg-[#DC2626] transition"
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleApproveClick}
                    className="px-6 py-2 rounded-full font-semibold bg-[#16A34A] text-white hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* History Toolbar */}
            <div className="flex items-center justify-between mb-4 px-4 pt-2">
              {selectedRowsHistory.length > 0 ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDeleteHistory}
                    className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-red-50"
                  >
                    <Trash2 size={18} stroke="#dc2626" />
                    <span style={{ color: '#dc2626' }}>Delete</span>
                    <span className="text-gray-500 ml-1">
                      {selectedRowsHistory.length} Selected
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedRowsHistory([])}
                    className="flex items-center gap-1 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100"
                  >✕ Clear</button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <RefreshCw size={20} stroke="#16A34A" />
                  <span className="font-medium text-base" style={{ color: '#111827' }}>
                    Request History {requests.length}
                  </span>
                </div>
              )}
              {/* ----------- UPDATED SEARCH BAR DESIGN START ----------- */}
              <div className="ml-auto flex items-center gap-4">
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
                    placeholder="Search Document"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem 2.5rem 0.5rem 2.5rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "9999px",
                      outline: "none",
                      color: "#374151",
                      background: "white"
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
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              {/* ----------- UPDATED SEARCH BAR DESIGN END ----------- */}
            </div>
            <h2 className="text-xl font-bold mb-4 px-4 pt-2">Request History</h2>
            <div className="w-full rounded-xl overflow-visible">
              <table className="table w-full">
                <thead className="bg-[#f7f7fb] text-sm text-gray-600 font-semibold">
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm rounded"
                        checked={selectedRowsHistory.length === historyData.length}
                        onChange={e =>
                          e.target.checked
                            ? setSelectedRowsHistory(historyData.map((_, i) => i))
                            : setSelectedRowsHistory([])
                        }
                      />
                    </th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Document</th>
                    <th>Status</th>
                    <th>Reason</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleHistoryData.map((row, idx) => {
                    const globalIndex = (historyPage - 1) * itemsPerPageHistory + idx;
                    return (
                      <tr
                        key={row.id}
                        style={{ height: '49px' }}
                        className={selectedRowsHistory.includes(globalIndex) ? 'bg-[#f0fdfa]' : ''}
                      >
                        <td>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm rounded"
                            checked={selectedRowsHistory.includes(globalIndex)}
                            onChange={e => {
                              setSelectedRowsHistory(prev =>
                                e.target.checked
                                  ? [...prev, globalIndex]
                                  : prev.filter(i => i !== globalIndex)
                              );
                            }}
                          />
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 mask mask-squircle">
                              <img src={row.avatar} alt={row.name} />
                            </div>
                            <div>
                              <div className="font-semibold">{row.name}</div>
                              <div className="text-sm text-gray-500">{row.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className="px-4 py-1 rounded-full text-xs font-medium inline-block"
                            style={{
                              color: '#0066FF',
                              border: '2px solid #0066FF',
                              backgroundColor: '#E0F0FF',
                            }}
                          >
                            {row.role}
                          </span>
                        </td>
                        <td>{row.document}</td>
                        <td>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium inline-block"
                            style={{
                              color:
                                row.status === 'Pending'
                                  ? '#92400E'
                                  : row.status === 'Approved'
                                  ? '#15803D'
                                  : '#DC2626',
                              border: `1px solid ${
                                row.status === 'Pending'
                                  ? '#92400E'
                                  : row.status === 'Approved'
                                  ? '#15803D'
                                  : '#DC2626'
                              }`,
                              backgroundColor:
                                row.status === 'Pending'
                                  ? '#FEF3C7'
                                  : row.status === 'Approved'
                                  ? '#D1FAE5'
                                  : '#FEE2E2',
                            }}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td>{row.reason}</td>
                        <td style={{ minWidth: 160 }}>
                          <div className="group flex items-center gap-4 justify-end cursor-pointer relative">
                            <div className="relative flex items-center">
                              <Copy
                                size={20}
                                stroke="#16A34A"
                                className="transition-transform duration-200 group-hover:-translate-x-2"
                              />
                              <span
                                className="absolute left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#16A34A] text-sm font-medium transition-opacity duration-200 whitespace-nowrap"
                                style={{ minWidth: 50 }}
                              >
                                Review
                              </span>
                            </div>
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
              <div className="flex justify-center my-6">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setHistoryPage(h => Math.max(1, h - 1))}
                    className="btn btn-sm"
                    disabled={historyPage === 1}
                  >
                    «
                  </button>
                  {[...Array(totalHistoryPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setHistoryPage(page)}
                        className={`btn btn-sm ${page === historyPage ? 'bg-gray-300 text-black' : 'btn-ghost text-gray-600'}`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setHistoryPage(h => Math.min(totalHistoryPages, h + 1))}
                    className="btn btn-sm"
                    disabled={historyPage === totalHistoryPages}
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ApproveModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onApprove={handleDoApprove}
      />
      <RejectModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleDoReject}
        request={selectedRequest}
      />
    </div>
  );
}
