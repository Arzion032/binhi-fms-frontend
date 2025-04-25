import React, { useState } from "react";

const Tabs = () => {
  // State to track the active tab (starts with 0, which corresponds to the first tab)
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab changes
  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" role="tablist">
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 0
                  ? "text-green-600 border-green-600"
                  : "text-gray-500 hover:text-gray-600 border-gray-100"
              }`}
              onClick={() => handleTabChange(0)}
              role="tab"
            >
              Current Members
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 1
                  ? "text-green-600 border-green-600"
                  : "text-gray-500 hover:text-gray-600 border-gray-100"
              }`}
              onClick={() => handleTabChange(1)}
              role="tab"
            >
              Pending Members
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 2
                  ? "text-green-600 border-green-600"
                  : "text-gray-500 hover:text-gray-600 border-gray-100"
              }`}
              onClick={() => handleTabChange(2)}
              role="tab"
            >
              Rejected Members
            </button>
          </li>
        </ul>
      </div>
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
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next.
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
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next.
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
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
