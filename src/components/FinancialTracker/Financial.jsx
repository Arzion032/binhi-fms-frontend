import React, { useState } from 'react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa6';
import StatisticsChart from './StatisticsChart';
import IncomeModal from './IncomeModal';
import ExpensesModal from './ExpensesModal';

const Financial = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const dropdownRef = React.useRef();
  const dropdownDownloadRef = React.useRef();

  const handleAddTransaction = (type) => {
    console.log(`Adding a new ${type} transaction`);
    setDropdownOpen(false);
    if (type === 'income') {
      setIncomeModalOpen(true);
    } else if (type === 'expense'){
      setExpenseModalOpen(true);
    }
  };

  const handleDownload = (type) => {
    console.log(`Downloading ${type}`);
    setDownloadDropdownOpen(false);
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (dropdownDownloadRef.current && !dropdownDownloadRef.current.contains(event.target)) {
        setDownloadDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-8 bg-[#f9fbf8] min-h-screen text-sm">
      {/* Income Modal */}
      <IncomeModal isOpen={incomeModalOpen} onClose={() => setIncomeModalOpen(false)} />
      
      {/* Expenses Modal */}
      <ExpensesModal isOpen={expenseModalOpen} onClose={() => setExpenseModalOpen(false)} />
      
      {/* Only this part will be sticky */}
      <div className="sticky top-0 z-30 bg-[#f9fbf8] pt-4 pb-3">
        <div className="text-sm breadcrumbs font-inter text-base mb-2">
          <ul className="flex gap-1">
            <li><a className="text-green-600 underline">Dashboard</a></li>
            <li><a className="text-green-600 underline">Financial Tracker</a></li>
            <li className="text-gray-400">Financial Overview</li>
          </ul>
        </div>
        <h1 className="text-4xl font-bold text-black mb-1">Financial Tracker</h1>
        <div className="flex items-center gap-4 border-b border-gray-200">
          <button className="text-green-600 font-semibold border-b-4 border-green-500 pb-1 px-2 bg-transparent">
            Financial Overview
          </button>
          <a href="/transaction-history" className="text-gray-400 font-semibold pb-1 px-2 bg-transparent hover:bg-green-50 rounded transition-colors">
            Transaction History
          </a>
        </div>
      </div>
      {/* NON-STICKY CONTENT STARTS HERE */}
      
      {/* Balance */}
      <div className="flex flex-wrap items-center justify-between my-4 gap-2">
        <div className="flex items-center gap-2 text-base font-medium">
          <span className="text-blue-500 text-lg">🔄 Current Federation Balance:</span>
          <span className="text-blue-700 font-bold text-lg">₱52,438</span>
          <span className="text-gray-400 text-lg ml-2 opacity-60">Last Updated Apr 30</span>
        </div>
        
        {/* Add Transaction and Download buttons - these will scroll away */}
        <div className="flex gap-2">
          {/* Add Transaction Dropdown */}
          <div className="relative z-20" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="btn bg-green-600 text-white rounded-full px-4 py-2 font-semibold flex items-center gap-1 hover:bg-green-700"
            >
              + Add Transaction
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              >
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
          {/* Download Dropdown */}
          <div className="relative z-20" ref={dropdownDownloadRef}>
            <button
              onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
              className="btn bg-white border border-green-600 text-green-600 rounded-full px-6 py-2 font-semibold flex items-center gap-2 hover:bg-green-50"
            >
              Download
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-4 h-4 transition-transform duration-200 ${downloadDropdownOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {downloadDropdownOpen && (
              <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 menu p-2 shadow bg-white border border-black rounded-box w-60">
                <li>
                  <a onClick={() => handleDownload('PDF')} className="flex items-center gap-2">
                    <FaFilePdf className="text-red-500" />
                    Download PDF
                  </a>
                </li>
                <li>
                  <a onClick={() => handleDownload('Excel')} className="flex items-center gap-2">
                    <FaFileExcel className="text-green-600" />
                    Download Excel
                  </a>
                </li>
                <div className="border-t my-2" />
                <li>
                  <a onClick={() => handleDownload('Custom Range')}>Custom Date Range</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 items-stretch mt-2">
        <div className="flex-1 flex flex-col gap-4">
          {/* Income & Expense Cards */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Income Card */}
            <div className="relative flex-1 bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[170px] shadow-sm group">
              <div className="absolute left-0 top-0 h-full w-3 rounded-tl-2xl rounded-bl-2xl bg-[#4caf50]" />
              <div className="absolute top-4 right-4 z-20 group">
                <button 
                  onClick={() => setIncomeModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1 text-green-600 border border-green-600 rounded-full transition-all duration-200 group-hover:px-4 hover:bg-green-600 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18" height="18">
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
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
                  onClick={() => setExpenseModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1 text-[#ff4d4f] border border-[#ff4d4f] rounded-full transition-all duration-200 group-hover:px-4 hover:bg-[#ff4d4f] hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18" height="18">
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: '#ff4d4f' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3c-3.866 0-7 1.343-7 3s3.134 3 7 3 7-1.343 7-3-3.134-3-7-3z" />
                    </svg>
                    <span className="text-base font-semibold" style={{ color: '#ff4d4f' }}>↑ 8.69%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Statistics Chart */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-300 p-6 shadow-sm w-full h-full min-h-[550px] overflow-visible relative">
            <StatisticsChart />
          </div>
        </div>
        {/* History */}
        <div className="w-full lg:max-w-[340px] min-w-[300px] bg-white rounded-2xl border border-gray-300 p-6 shadow-sm flex flex-col h-full min-h-[750px]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-black">History</h3>
            <a href="/transaction-history" className="text-sm text-gray-500 hover:underline flex items-center gap-1">View All <span className="ml-1">→</span></a>
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
                {[
                  { date: 'Apr 12, 2024', name: 'Juan', amount: '₱800', color: 'green' },
                  { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                  { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                  { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                  { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                  { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                  { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                  { date: 'Apr 13, 2024', name: 'Emman', amount: '₱1,203', color: 'red' },
                  { date: 'Apr 14, 2024', name: 'Grace', amount: '₱500', color: 'green' },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="py-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.color === 'green' ? '#4caf50' : '#ff4d4f' }}
                        ></span>
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
    </div>
  );
};

export default Financial;