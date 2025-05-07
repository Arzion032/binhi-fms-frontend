import React, { useState, useRef, useEffect } from 'react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa6';

const TransactionHistory = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [transactions, setTransactions] = useState([
    {
      name: 'Kaye Lagablab',
      email: 'juandcruz@gmail.com',
      avatar: '/Screenshot_195.png',
      type: 'Income',
      source: 'Marketplace',
      category: '-',
      amount: '12,999',
      date: 'Apr 17, 2025',
      relativeDate: '5 days ago',
    },
    {
      name: 'Carlo Imnida',
      email: 'juandcruz@gmail.com',
      avatar: '/Screenshot_195.png',
      type: 'Expense',
      source: '-',
      category: 'Farm Supply',
      amount: '5,400',
      date: 'Apr 16, 2025',
      relativeDate: '6 days ago',
    },
    {
      name: 'Yna Boomboom',
      email: 'juandcruz@gmail.com',
      avatar: '/Screenshot_195.png',
      type: 'Expense',
      source: '-',
      category: 'Farm Supply',
      amount: '7,000',
      date: 'Apr 15, 2025',
      relativeDate: '7 days ago',
    },
    {
      name: 'Fred Ko Pal',
      email: 'juandcruz@gmail.com',
      avatar: '/Screenshot_195.png',
      type: 'Expense',
      source: '-',
      category: 'Farm Supply',
      amount: '1,500',
      date: 'Apr 14, 2025',
      relativeDate: '8 days ago',
    },
    {
      name: 'Ry Ban Tot',
      email: 'juandcruz@gmail.com',
      avatar: '/Screenshot_195.png',
      type: 'Income',
      source: 'Marketplace',
      category: '-',
      amount: '2,500',
      date: 'Apr 13, 2025',
      relativeDate: '9 days ago',
    },
    {
      name: 'Nisi B. Ding',
      email: 'juandcruz@gmail.com',
      avatar: '/Screenshot_195.png',
      type: 'Income',
      source: 'Marketplace',
      category: '-',
      amount: '999',
      date: 'Apr 12, 2025',
      relativeDate: '10 days ago',
    },
  ]);

  const dropdownDownloadRef = useRef();
  const itemsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const currentData = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDownload = (type) => {
    console.log(`Downloading ${type}`);
    setDownloadDropdownOpen(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedRows([]);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete the selected transactions?')) {
      const updated = [...transactions];
      currentData.forEach((_, idx) => {
        if (selectedRows.includes(idx)) {
          const globalIndex = (currentPage - 1) * itemsPerPage + idx;
          updated.splice(globalIndex, 1);
        }
      });
      setTransactions(updated);
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownDownloadRef.current && !dropdownDownloadRef.current.contains(event.target)) {
        setDownloadDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-8 bg-[#f9fbf8] min-h-screen text-sm">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#f9fbf8] pt-4 pb-3">
        <div className="text-sm breadcrumbs font-inter text-base mb-2">
          <ul className="flex gap-1">
            <li><a className="text-binhigreen underline">Dashboard</a></li>
            <li><a className="text-binhigreen underline">Financial Tracker</a></li>
            <li className="text-gray-400">Transaction History</li>
          </ul>
        </div>
        <h1 className="text-4xl font-bold text-black mb-1">Financial Tracker</h1>
        <div className="flex items-center gap-4 border-b border-gray-200">
          <a href="/financial" className="text-gray-400 font-semibold pb-1 px-2 hover:bg-[#e6f0ea] rounded transition-colors">
            Financial Overview
          </a>
          <button className="text-green-600 font-semibold border-b-4 border-green-500 pb-1 px-2">
            Transaction History
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <div className="flex flex-col">
          {selectedRows.length > 0 ? (
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-red-50 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="#dc2626" viewBox="0 0 24 24">
                  <path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 1H8l1-1zm1 4v10h2V8h-2zm4 0v10h2V8h-2z" />
                </svg>
                <span style={{ color: '#dc2626' }}>Delete</span>
                <span className="text-gray-500 ml-1">{selectedRows.length} Member{selectedRows.length > 1 && 's'} Selected</span>
              </button>

              <button
                onClick={() => setSelectedRows([])}
                className="flex items-center gap-1 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100 transition"
              >
                <span className="text-gray-500">✕</span>
                <span className="text-gray-500">Clear</span>
              </button>
            </div>
          ) : showFilters ? (
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 bg-blue-50 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Active Filters
              </button>
              
              <div className="dropdown dropdown-end">
                <label className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 cursor-pointer">
                  Role
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </label>
              </div>
              
              <div className="dropdown dropdown-end">
                <label className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 cursor-pointer">
                  Type
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </label>
              </div>
              
              <div className="dropdown dropdown-end">
                <label className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 cursor-pointer">
                  Source
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </label>
              </div>
              
              <button
                onClick={() => setShowFilters(false)}
                className="flex items-center gap-1 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-base font-medium">
              <span style={{ color: '#4da6ff' }} className="text-lg">🔄 Current Federation Balance:</span>
              <span className="text-blue-700 font-bold text-lg">₱52,438</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="text" className="input input-bordered rounded-full w-64 pl-10 pr-4" placeholder="Search Member" />
            <div className="absolute left-0 top-0 h-full flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5 7.5 7.5 0 0016.65 16.65z" />
              </svg>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-0 top-0 h-full flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>

          <div className="dropdown dropdown-end" ref={dropdownDownloadRef}>
            <label
              tabIndex={0}
              onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
              className="btn btn-outline btn-success rounded-full"
            >
              Download
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </label>
            {downloadDropdownOpen && (
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 border w-52 rounded-box">
                <li><a onClick={() => handleDownload('PDF')}><FaFilePdf className="text-red-500" /> PDF</a></li>
                <li><a onClick={() => handleDownload('Excel')}><FaFileExcel className="text-green-600" /> Excel</a></li>
                <li><a onClick={() => handleDownload('Custom Range')}>Custom Range</a></li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Table - Moved upward */}
      <div className="w-full overflow-hidden rounded-xl mt-2">
        <h2 className="text-xl font-bold mb-4 px-4 pt-2">Transaction History</h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-[#f7f7fb] text-sm text-gray-600 font-semibold">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm rounded"
                    checked={selectedRows.length === currentData.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(currentData.map((_, i) => i));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
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
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded"
                      checked={selectedRows.includes(idx)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows([...selectedRows, idx]);
                        } else {
                          setSelectedRows(selectedRows.filter(i => i !== idx));
                        }
                      }}
                    />
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
                    <span 
                      className="px-4 py-1 rounded-full text-xs font-medium" 
                      style={{
                        color: '#0066FF', 
                        border: '2px solid #0066FF', 
                        backgroundColor: '#E0F0FF', 
                        display: 'inline-block',
                        minWidth: '80px',
                        textAlign: 'center'
                      }}
                    >
                      Member
                    </span>
                  </td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
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
                  <td><div>{item.date}</div><div className="text-xs text-gray-500">{item.relativeDate}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-6">
          <div className="flex items-center gap-1">
            <button onClick={() => handlePageChange(currentPage - 1)} className="btn btn-sm" disabled={currentPage === 1}>«</button>
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button key={page} onClick={() => handlePageChange(page)} className={`btn btn-sm ${page === currentPage ? 'bg-gray-300 text-black' : 'btn-ghost text-gray-600'}`}>{page}</button>
              );
            })}
            <button onClick={() => handlePageChange(currentPage + 1)} className="btn btn-sm" disabled={currentPage === totalPages}>»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;