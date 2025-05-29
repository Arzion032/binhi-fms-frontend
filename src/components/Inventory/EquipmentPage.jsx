import React, { useState, useRef, useEffect } from 'react';
import EquipmentTab from './EquipmentTab';
import RentHistoryTab from './RentHistoryTab';

export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState('equipment');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabs = ['equipment', 'rentHistory'];
  const tabsRef = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const currentTab = tabsRef.current[activeIndex];
    if (currentTab && containerRef.current) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const tabRect = currentTab.getBoundingClientRect();
      const offsetLeft = tabRect.left - containerLeft;
      const extraLength = 50;
      setIndicatorStyle({
        left: offsetLeft - extraLength / 2,
        width: tabRect.width + extraLength,
      });
    }
  }, [activeTab]);

  return (
    <div className="p-0">
      {/* Header */}
      <div className="w-full bg-binhi-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="text-sm breadcrumbs font-inter text-base">
            <ul>
              <li><a className="text-binhigreen underline">Dashboard</a></li>
              <li><a className="text-binhigreen underline">Inventory Management</a></li>
              <li className="text-gray-400">{activeTab === 'equipment' ? 'Equipment' : 'Rent History'}</li>
            </ul>
          </div>
        </div>
        <div className="px-6 pb-4 h-5 flex items-center">
          <h1 className="text-[40px] font-bold text-gray-800">Inventory Management</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-6 bg-gray-50 min-h-screen text-sm font-sans">
        <div className="relative flex gap-20 border-b pb-2 mb-4" ref={containerRef}>
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

        {/* Tab Content */}
        {activeTab === 'equipment' && <EquipmentTab />}
        {activeTab === 'rentHistory' && <RentHistoryTab />}
      </div>
    </div>
  );
}
