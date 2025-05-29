import React, { useState, useRef, useEffect } from 'react';
import TabsHeader from './TabsHeader';
import EquipmentTab from './EquipmentTab';
import RentHistoryTab from './RentHistoryTab';

export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState('equipment');
  const [searchCurrent, setSearchCurrent] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const tabs = ['equipment', 'rentHistory'];
  const tabsRef = useRef([]);
  const containerRef = useRef();
  const [indicatorStyle, setIndicatorStyle] = useState({});

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

  const clearFilters = () => {
    setSelectedRole('');
  };

  return (
    <div className="p-0">
      <TabsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        tabsRef={tabsRef}
        containerRef={containerRef}
        indicatorStyle={indicatorStyle}
      />

      <div className="p-6 bg-gray-50 min-h-screen text-sm font-sans">
        {activeTab === 'equipment' && (
          <EquipmentTab
            searchCurrent={searchCurrent}
            setSearchCurrent={setSearchCurrent}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            clearFilters={clearFilters}
          />
        )}

        {activeTab === 'rentHistory' && (
          <RentHistoryTab
            searchCurrent={searchCurrent}
            setSearchCurrent={setSearchCurrent}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            clearFilters={clearFilters}
          />
        )}
      </div>
    </div>
  );
}
