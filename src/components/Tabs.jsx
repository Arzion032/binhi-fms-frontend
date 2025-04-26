import React, { useState, useRef, useEffect } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const tabRefs = [useRef(null), useRef(null), useRef(null)];

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    const currentTab = tabRefs[activeTab].current;
    if (currentTab) {
      setUnderlineStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 relative">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" role="tablist">
          <li className="mr-[1cm]" role="presentation"> {/* Applied 1 cm margin to li */}
            <button
              ref={tabRefs[0]}
              className={`inline-block p-4 ${
                activeTab === 0 ? "text-green-600" : "text-gray-500 hover:text-gray-600"
              }`}
              onClick={() => handleTabChange(0)}
              role="tab"
            >
              Current Members
            </button>
          </li>
          <li className="mr-[1cm]" role="presentation"> {/* Applied 1 cm margin to li */}
            <button
              ref={tabRefs[1]}
              className={`inline-block p-4 ${
                activeTab === 1 ? "text-green-600" : "text-gray-500 hover:text-gray-600"
              }`}
              onClick={() => handleTabChange(1)}
              role="tab"
            >
              Pending Members
            </button>
          </li>
          <li className="mr-[1cm]" role="presentation"> {/* Applied 1 cm margin to li */}
            <button
              ref={tabRefs[2]}
              className={`inline-block p-4 ${
                activeTab === 2 ? "text-green-600" : "text-gray-500 hover:text-gray-600"
              }`}
              onClick={() => handleTabChange(2)}
              role="tab"
            >
              Rejected Members
            </button>
          </li>
        </ul>

        {/* Sliding underline */}
        <div
          className="absolute bottom-0 h-0.5 bg-green-600 transition-all duration-300"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        />
      </div>

      {/* Tab Panels */}
      <div id="default-styled-tab-content">
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === 0 ? "block" : "hidden"
          }`}
          role="tabpanel"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content for the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Current Members tab's associated content
            </strong>.
          </p>
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === 1 ? "block" : "hidden"
          }`}
          role="tabpanel"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content for the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Pending Members tab's associated content
            </strong>.
          </p>
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === 2 ? "block" : "hidden"
          }`}
          role="tabpanel"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content for the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Rejected Members tab's associated content
            </strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
