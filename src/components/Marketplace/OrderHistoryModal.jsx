import React from "react";

export default function OrderHistoryModal({ isOpen, onClose, customerName, orders }) {
  if (!isOpen) return null;

  // All images point to ./sampleproduct.png
  const normalizedOrders = orders.map(order => ({
    ...order,
    sellerAvatar: "./sampleproduct.png",
    productImage: "./sampleproduct.png",
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div
        className="bg-white rounded-[2rem] shadow-2xl relative flex flex-col"
        style={{
          width: "100%",
          maxWidth: 700,
          maxHeight: "90vh",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-7 text-2xl text-gray-400 hover:text-gray-600"
          aria-label="Close"
          style={{
            fontWeight: 300,
            background: "none",
            border: "none",
            lineHeight: 1,
            zIndex: 10,
          }}
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-10 pt-8 pb-1 flex-shrink-0">
            <h2 className="text-[1.5rem] font-bold text-gray-900 mb-1">
              {customerName}&rsquo;s Order History
            </h2>
            <div className="text-gray-500 text-[1.08rem] mb-2">
              This is all of his/her <b>delivered</b> orders <b>only.</b>
            </div>
            <hr className="my-3" style={{ borderColor: "#bcbcbc" }} />
          </div>

          {/* Order List - Scrollable */}
          <div
            className="flex-1 overflow-y-auto px-7 pb-8"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#bbb #fff",
            }}
          >
            {normalizedOrders.length === 0 && (
              <div className="text-gray-500 text-center py-10">
                No delivered orders.
              </div>
            )}
            <div className="space-y-6">
              {normalizedOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="border rounded-2xl bg-white p-3 pb-4 flex flex-col"
                  style={{
                    borderColor: "#bcbcbc",
                    boxShadow: "0 1.5px 7px 0 rgba(0,0,0,0.02)",
                  }}
                >
                  {/* Top Row: Seller, View Shop, Status */}
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={order.sellerAvatar}
                        alt={order.seller}
                        className="w-9 h-9 rounded-full object-cover border border-[#ededed]"
                      />
                      <div>
                        <div className="font-medium text-gray-900" style={{ fontSize: "1.07rem", marginBottom: "-1px" }}>
                          {order.seller}
                        </div>
                        <div className="text-xs text-gray-400" style={{ fontSize: "0.98rem" }}>
                          Click here to chat
                        </div>
                      </div>
                      <button
                        className="flex items-center gap-1 px-3 py-[0.18rem] text-[.95rem] border border-[#23b46c] bg-[#F3FFF7] text-[#24B96F] font-semibold rounded-lg hover:bg-[#e7f8ef] transition ml-3"
                        style={{ fontWeight: 600, height: "28px" }}
                      >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <path d="M2.05 6.73L3.41 4.09A2 2 0 0 1 5.16 3h9.68a2 2 0 0 1 1.75 1.09l1.36 2.64a1 1 0 0 1-.23 1.22A4.38 4.38 0 0 1 16 8.5a4 4 0 0 1-6 0 4 4 0 0 1-6 0 4.37 4.37 0 0 1-1.41-1.05 1 1 0 0 1-.24-1.22zM3 9.5v5.5A2 2 0 0 0 5 17h10a2 2 0 0 0 2-2V9.5M8 17V13a2 2 0 1 1 4 0v4" stroke="#24B96F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                        View Shop
                      </button>
                    </div>
                    <span
                      className="px-5 py-1 rounded-full text-[1rem] font-semibold"
                      style={{
                        background: order.status === "Delivered"
                          ? "#4CAF50"
                          : "#2196F3",
                        color: "#fff",
                        fontWeight: 600,
                        minWidth: 88,
                        textAlign: "center",
                        marginRight: "2px"
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  {/* Horizontal Line after Top Row */}
                  <hr className="my-2" style={{ borderColor: "#bcbcbc" }} />
                  {/* Product Row */}
                  <div className="flex flex-row items-center gap-4 mt-1 ml-1">
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      className="w-[110px] h-[80px] rounded-xl object-cover border border-[#e4e4e4]"
                    />
                    <div className="flex flex-col flex-1 justify-between py-2 min-w-0">
                      <div className="flex justify-between items-start w-full">
                        <div>
                          <div className="font-semibold text-gray-900 text-[1.11rem] leading-tight">
                            {order.productName}
                          </div>
                          <div className="text-[0.99rem] text-gray-500">
                            Variation: {order.variation}
                          </div>
                        </div>
                        <div className="text-[1.38rem] font-bold text-gray-900 pl-6 pt-1" style={{ whiteSpace: "nowrap" }}>
                          ₱{order.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div className="text-gray-600 text-[1rem] mt-3" style={{ fontWeight: 400 }}>
                        Quantity: <span className="font-medium">{order.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}