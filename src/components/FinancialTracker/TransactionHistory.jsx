import React, { useState, useRef, useEffect } from 'react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa6';

const TransactionHistory = () => {
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownDownloadRef = useRef();

  const itemsPerPage = 5;
  const transactions = [
    {
      name: 'Kaye Lagablab',
      email: 'juandcruz@gmail.com',
      avatar: '/Screenshot_195.png', // ✅ Avatar path
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
      type: 'Income',
      source: 'Marketplace',
      category: '-',
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
      type: 'Expense',
      source: '-',
      category: 'Farm Supply',
      amount: '999',
      date: 'Apr 12, 2025',
      relativeDate: '10 days ago',
    },
  ];

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const currentData = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDownload = (type) => {
    console.log(`Downloading ${type}`);
    setDownloadDropdownOpen(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
          <a href="/financial" className="text-gray-400 font-semibold pb-1 px-2 bg-transparent hover:bg-[#e6f0ea] rounded transition-colors">
            Financial Overview
          </a>
          <button className="text-green-600 font-semibold border-b-4 border-green-500 pb-1 px-2 bg-transparent">
            Transaction History
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between my-4 gap-2">
        <div className="flex items-center gap-2 text-base font-medium">
          <span style={{ color: '#4da6ff' }} className="text-lg">🔄 Current Federation Balance:</span>
          <span className="text-blue-700 font-bold text-lg">₱52,438</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="input input-bordered flex items-center gap-2 rounded-full w-64">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5 7.5 7.5 0 0016.65 16.65z" /></svg>
            <input type="text" className="grow" placeholder="Search Member" />
          </label>

          <div className="dropdown dropdown-end" ref={dropdownDownloadRef}>
            <label tabIndex={0} className="btn btn-outline btn-success rounded-full">
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

      {/* Table */}
      <div className="w-full overflow-hidden rounded-xl">
        <h2 className="text-xl font-bold mb-4 px-4 pt-4">Transaction History</h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-[#f7f7fb] text-sm text-gray-600 font-semibold">
              <tr className="rounded-t-xl overflow-hidden">
                <th className="rounded-tl-xl"><input type="checkbox" className="checkbox checkbox-sm rounded" /></th>
                <th>User Name</th>
                <th>Role</th>
                <th>Type</th>
                <th>Source</th>
                <th>Category</th>
                <th>Amount</th>
                <th className="rounded-tr-xl">Date Added</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, idx) => (
                <tr key={idx}>
                  <td><input type="checkbox" className="checkbox checkbox-sm rounded" /></td>
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
                    <span className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        color: '#2563eb',
                        backgroundColor: '#e0edff',
                        border: '1px solid #2563eb',
                        display: 'inline-block'
                      }}>
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
                  <td>
                    <div>{item.date}</div>
                    <div className="text-xs text-gray-500">{item.relativeDate}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`btn btn-sm ${isActive ? 'bg-gray-300 text-black' : 'btn-ghost text-gray-600'}`}
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
    </div>
  );
};

export default TransactionHistory;
