import React, { useRef, useState, useCallback, useEffect } from "react";
import ProductManagement from "./ProductManagement";
import CustomerManagement from "./CustomerManagement";
import OrderManagement from "./OrderManagement";
import FarmerPayout from "./FarmerPayout";

export default function Marketplace() {
  const tabs = [
    "Product Management",
    "Customer Management",
    "Order Management",
    "Farmer Payout",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabsRef = useRef();
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    const container = tabsRef.current;
    const idx = tabs.indexOf(activeTab);
    const btn = tabRefs.current[idx];
    if (container && btn) {
      const c = container.getBoundingClientRect();
      const b = btn.getBoundingClientRect();
      setIndicator({
        left: b.left - c.left + container.scrollLeft,
        width: b.width,
      });
    }
  }, [activeTab, tabs]);
  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <div className="p-0">
      {/* Sticky header and tabs */}
      <div className="sticky top-0 z-30 w-full bg-[#f9fbf8] shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="text-sm breadcrumbs font-inter text-base">
            <ul className="flex gap-1">
              <li>
                <a className="text-green-600 underline">Dashboard</a>
              </li>
              <li>
                <a className="text-green-600 underline">Marketplace</a>
              </li>
              <li className="text-gray-400">{activeTab}</li>
            </ul>
          </div>
          <button className="btn btn-square btn-binhi ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 pb-4 h-5 flex items-center">
          <h1 className="text-[40px] font-bold text-gray-800">Marketplace</h1>
        </div>
        <div className="mb-4 border-b border-gray-200 relative">
          <ul
            ref={tabsRef}
            className="flex -mb-px text-sm font-medium text-center"
            role="tablist"
          >
            {tabs.map((t, i) => (
              <li key={t} className="mr-10" role="presentation">
                <button
                  ref={(el) => (tabRefs.current[i] = el)}
                  onClick={() => setActiveTab(t)}
                  className={`inline-block p-4 ${
                    activeTab === t
                      ? "text-green-600"
                      : "text-gray-500 hover:text-gray-600"
                  }`}
                  role="tab"
                  aria-selected={activeTab === t}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
          <div
            className="absolute bottom-0 h-0.5 bg-green-600 transition-all duration-300"
            style={{ left: indicator.left, width: indicator.width }}
          />
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === "Product Management" && <ProductManagement />}
      {activeTab === "Customer Management" && <CustomerManagement />}
      {activeTab === "Order Management" && <OrderManagement />}
      {activeTab === "Farmer Payout" && <FarmerPayout />}
    </div>
  );
}
