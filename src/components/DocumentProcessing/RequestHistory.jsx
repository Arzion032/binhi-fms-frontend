// src/components/RequestHistory.jsx
import React from 'react';
import { Search, SlidersHorizontal, RefreshCw, Trash2, Copy } from 'lucide-react';

export default function RequestHistory({
  searchQuery,
  setSearchQuery,
  requests,
  historyData,
  historyPage,
  setHistoryPage,
  itemsPerPageHistory,
  selectedRowsHistory,
  setSelectedRowsHistory,
  handleDeleteHistory,
}) {
  const totalHistoryPages = Math.ceil(historyData.length / itemsPerPageHistory);
  const visibleHistoryData = historyData.slice(
    (historyPage - 1) * itemsPerPageHistory,
    historyPage * itemsPerPageHistory
  );

  return (
    <div className="px-6 pb-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between my-1 gap-2 px-4 pt-0">
        <div className="flex items-center gap-2 text-base font-medium">
          <RefreshCw size={20} stroke="#16A34A" />
          <span className="font-medium text-lg" style={{ color: '#111827' }}>
            Request History {requests.length}
          </span>
        </div>
        <div className="flex items-center gap-3 relative">
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
            <button onClick={() => {}}>
              <SlidersHorizontal className="text-gray-600 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Heading */}
      <h2 className="text-xl font-bold mb-2 px-4 pt-2">Request History</h2>
      {/* History Table */}
      <div className="w-full rounded-xl overflow-visible">
        <table className="table w-full">
          <thead>
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
        {/* Pagination */}
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
    </div>
  );
}
