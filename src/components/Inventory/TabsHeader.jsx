import React from 'react';

export default function TabsHeader({ activeTab, setActiveTab, tabs, tabsRef, containerRef, indicatorStyle }) {
  return (
    <div className="w-full bg-binhi-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex-1">
          <div className="text-sm breadcrumbs font-inter text-base">
            <ul>
              <li><a className="text-binhigreen underline">Dashboard</a></li>
              <li><a className="text-binhigreen underline">Inventory Management</a></li>
              <li className="text-gray-400">
                {activeTab === 'equipment' ? 'Equipment' : 'Rent History'}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-6 pb-4 h-5 flex items-center">
        <h1 className="text-[40px] font-bold text-gray-800">Inventory Management</h1>
      </div>
      <div className="relative flex gap-20 border-b pb-2 mb-4 px-6" ref={containerRef}>
        <span
          className="absolute bottom-0 h-1 bg-[#4CAE4F] transition-all duration-300 rounded-full"
          style={{ ...indicatorStyle }}
        />
        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={el => (tabsRef.current[index] = el)}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 transition-colors duration-200 ${
              activeTab === tab ? 'text-green-600 font-semibold' : 'text-gray-500 font-semibold'
            } ${index === 0 ? 'ml-7' : ''}`}
          >
            {tab === 'equipment' ? 'Equipment' : 'Rent History'}
          </button>
        ))}
      </div>
    </div>
  );
}
