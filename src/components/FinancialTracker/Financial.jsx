import React from 'react';
import StatisticsChart from './StatisticsChart';

const Financial = () => {
  return (
    <div className="p-8 bg-[#f9fbf8] min-h-screen text-sm">
      {/* ✅ Sticky: Breadcrumb + Title + Tabs */}
      <div className="sticky top-0 z-30 bg-[#f9fbf8] pt-4 pb-3">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs font-inter text-base mb-2">
          <ul className="flex gap-1">
            <li><a className="text-binhigreen underline">Dashboard</a></li>
            <li><a className="text-binhigreen underline">Financial Tracker</a></li>
            <li className="text-gray-400">Financial Overview</li>
          </ul>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-black mb-1">Financial Tracker</h1>

        {/* Tabs with underline */}
        <div className="relative">
          <div className="flex items-center gap-4 border-b border-gray-200">
            <button className="text-green-600 font-semibold border-b-4 border-green-500 pb-1 px-2 bg-transparent">
              Financial Overview
            </button>
            <button className="text-gray-400 font-semibold pb-1 px-2 bg-[#e6f0ea] rounded">
              Transaction History
            </button>
          </div>
        </div>
      </div>

      {/* Federation Balance and Actions */}
      <div className="flex flex-wrap items-center justify-between my-4 gap-2">
        <div className="flex items-center gap-2 text-base font-medium">
          <span className="text-blue-700 text-lg">🔄 Current Federation Balance:</span>
          <span className="text-blue-700 font-bold text-lg">₱52,438</span>
          <span className="text-gray-400 text-lg ml-2 opacity-60">Last Updated Apr 30</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white rounded-full px-4 py-2 font-semibold flex items-center gap-1">
            + Add Transaction <span className="ml-1">▼</span>
          </button>
          <button className="bg-white border border-green-600 text-green-600 rounded-full px-9 py-2 font-semibold flex items-center gap-1">
            Download <span className="ml-1">▼</span>
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch mt-2">
        {/* LEFT: Cards + Statistics */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Summary Cards */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Income Card */}
            <div className="relative flex-1 bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[170px] shadow-sm">
              <div className="absolute left-0 top-0 h-full w-3 bg-green-500 rounded-tl-2xl rounded-bl-2xl z-10"></div>
              <div className="absolute top-4 right-4 z-20">
                <button className="w-8 h-8 rounded-full border border-green-400 text-green-500 bg-white hover:bg-green-50 flex items-center justify-center shadow-sm">
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>
              <div className="flex flex-col justify-between h-full p-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-700">Total Income</span>
                    <span className="text-gray-400 text-base">🔔</span>
                  </div>
                  <div className="text-3xl font-bold text-black mb-1">₱12,999</div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    from last week <span className="text-xs">▼</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 17h16M6 13l4-4 4 4M6 9l4-4 4 4" />
                    </svg>
                    <span className="text-green-600 text-base font-semibold">↑ 8.69%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expenses Card */}
            <div className="relative flex-1 bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[170px] shadow-sm">
              <div className="absolute left-0 top-0 h-full w-3 bg-red-600 rounded-tl-2xl rounded-bl-2xl z-10"></div>
              <div className="absolute top-4 right-4 z-20">
                <button className="w-8 h-8 rounded-full border border-red-400 text-red-500 bg-white hover:bg-red-50 flex items-center justify-center shadow-sm">
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>
              <div className="flex flex-col justify-between h-full p-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-700">Total Expenses</span>
                    <span className="text-gray-400 text-base">🔔</span>
                  </div>
                  <div className="text-3xl font-bold text-black mb-1">₱12,999</div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    from last week <span className="text-xs">▼</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3c-3.866 0-7 1.343-7 3s3.134 3 7 3 7-1.343 7-3-3.134-3-7-3zM10 9c-2.386 0-4.467-.527-5.656-1.326-.001.02-.001.04-.001.06 0 1.657 3.134 3 7 3s7-1.343 7-3c0-.02 0-.04-.001-.06C14.467 8.473 12.386 9 10 9zM10 12c-2.386 0-4.467-.527-5.656-1.326-.001.02-.001.04-.001.06 0 1.657 3.134 3 7 3s7-1.343 7-3c0-.02 0-.04-.001-.06C14.467 11.473 12.386 12 10 12zM10 15c-2.386 0-4.467-.527-5.656-1.326-.001.02-.001.04-.001.06 0 1.657 3.134 3 7 3s7-1.343 7-3c0-.02 0-.04-.001-.06C14.467 14.473 12.386 15 10 15z" />
                    </svg>
                    <span className="text-red-500 text-base font-semibold">↑ 8.69%</span>
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

        {/* RIGHT: History */}
        <div className="w-full lg:max-w-[340px] min-w-[300px] bg-white rounded-2xl border border-gray-300 p-6 shadow-sm flex flex-col h-full min-h-[750px]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-black">History</h3>
            <a className="text-sm text-gray-500 hover:underline flex items-center gap-1">View All <span className="ml-1">→</span></a>
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
                  // Add more entries if needed
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="py-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full bg-${item.color}-500`}></span>
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