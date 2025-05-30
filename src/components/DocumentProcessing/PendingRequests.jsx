// src/components/ProductRequests.jsx
import React, { useRef, useState } from 'react';
import { Search, SlidersHorizontal, RefreshCw, ChevronDown } from 'lucide-react';

export default function PendingRequests({
  showFilters,
  setShowFilters,
  searchQuery,
  setSearchQuery,
  selectedDocumentRequest,
  setSelectedDocumentRequest,
  selectedStatus,
  setSelectedStatus,
  requests,
  setRequests,
  selectedRequest,
  setSelectedRequest,
  handleApproveClick,
  handleRejectClick,
  clearFilters,
  uniqueDocuments,
}) {
  const [sortOrder, setSortOrder] = useState('recent');
  const [recentDropdownOpen, setRecentDropdownOpen] = useState(false);
  const recentDropdownRef = useRef();

  function parseDateString(dateStr) {
    return new Date(dateStr);
  }

  // Filter + sort requests based on filter state and sortOrder
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

  // Dropdown outside click
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (recentDropdownRef.current && !recentDropdownRef.current.contains(event.target)) {
        setRecentDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Pending Toolbar */}
      <div className="flex items-center justify-between mb-2 px-4 pt-2">
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
                <span className="w-4 h-4">
                  {/* X icon, can be replaced with Lucide X if imported */}
                  <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                    <path d="M4 4L12 12M12 4L4 12" stroke="#858585" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
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

        <div className="ml-auto flex items-center gap-3">
          <div className="relative w-[280px] flex items-center border rounded-full px-3 py-1 bg-white">
            <Search className="text-gray-500 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search Document"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 outline-none bg-transparent"
              style={{ color: '#374151' }}
            />
            <button
              onClick={() => setShowFilters(f => !f)}
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="text-gray-600 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Pending List & Detail */}
      <div className="flex gap-4">
        {/* Left list */}
        <div className="border border-[#E5E7EB] shadow-sm overflow-hidden w-[300px] role=list" role="list">
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
                  onClick={() => { setSortOrder('recent'); setRecentDropdownOpen(false); }}
                  onKeyDown={e => { if (e.key === 'Enter') { setSortOrder('recent'); setRecentDropdownOpen(false); } }}
                  className={`px-4 py-2 cursor-pointer hover:bg-green-50 ${sortOrder === 'recent' ? 'font-semibold bg-green-100' : ''}`}
                >
                  ⇅ Recent
                </li>
                <li
                  role="option"
                  tabIndex={0}
                  onClick={() => { setSortOrder('old'); setRecentDropdownOpen(false); }}
                  onKeyDown={e => { if (e.key === 'Enter') { setSortOrder('old'); setRecentDropdownOpen(false); } }}
                  className={`px-4 py-2 cursor-pointer hover:bg-green-50 ${sortOrder === 'old' ? 'font-semibold bg-green-100' : ''}`}
                >
                  ⇅ Old
                </li>
                <li
                  role="option"
                  tabIndex={0}
                  onClick={() => { setSortOrder('atoz'); setRecentDropdownOpen(false); }}
                  onKeyDown={e => { if (e.key === 'Enter') { setSortOrder('atoz'); setRecentDropdownOpen(false); } }}
                  className={`px-4 py-2 cursor-pointer hover:bg-green-50 ${sortOrder === 'atoz' ? 'font-semibold bg-green-100' : ''}`}
                >
                  A → Z
                </li>
                <li
                  role="option"
                  tabIndex={0}
                  onClick={() => { setSortOrder('ztoa'); setRecentDropdownOpen(false); }}
                  onKeyDown={e => { if (e.key === 'Enter') { setSortOrder('ztoa'); setRecentDropdownOpen(false); } }}
                  className={`px-4 py-2 cursor-pointer hover:bg-green-50 ${sortOrder === 'ztoa' ? 'font-semibold bg-green-100' : ''}`}
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

        {/* Right detail */}
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
  );
}
