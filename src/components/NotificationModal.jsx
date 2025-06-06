import React, { useState, useRef, useEffect } from "react";

const initialNotifications = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      message: "applied as a member for federation!",
      time: "1h ago",
    },
    {
      id: 2,
      name: "Jin Cristopher",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      message: "placed an order! Click here to check it!",
      time: "1h ago",
    },
    {
      id: 3,
      name: "Jinky Valdez",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      message: "uploaded a new product. Check it out!",
      time: "1h ago",
    },
    {
      id: 4,
      name: "Nisi Viloria",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      message: "placed an order! Click here to check it!",
      time: "1h ago",
    },
    {
      id: 5,
      name: "Emmanuel Sol",
      avatar: "https://randomuser.me/api/portraits/men/90.jpg",
      message: "placed an order! Click here to check it!",
      time: "1h ago",
    },
    {
      id: 6,
      name: "Melvin Sarabia",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      message: "uploaded a new product. Check it out!",
      time: "1h ago",
    },
    {
      id: 7,
      name: "Kaye Arroyo",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg",
      message: "placed an order! Click here to check it!",
      time: "1h ago",
    },
  ];

const NotificationModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const markAllAsRead = () => {
    setShowDropdown(false);
    // You can implement a read flag per item if needed
  };

  const deleteAll = () => {
    setNotifications([]);
    setShowDropdown(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[998] bg-black bg-opacity-40 transition-opacity duration-200" onClick={onClose} />

      <div
        className="fixed top-0 right-0 h-full w-[400px] bg-white border border-gray rounded-tl-3xl rounded-bl-3xl flex flex-col z-[999] animate-slide-in"
        style={{ minWidth: 340, maxWidth: 420, scrollbarWidth: "none" }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-3 border-b border-gray flex justify-between items-start relative">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            <div className="flex items-center gap-2 mt-1 text-sm font-medium text-gray-700">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>{notifications.length} New</span>
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setShowDropdown(!showDropdown)} className="text-gray-500 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-gray-200 shadow-md z-10">
                <button
                  onClick={markAllAsRead}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                >
                  Mark all as read
                </button>
                <button
                  onClick={deleteAll}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                >
                  Delete all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto pt-2 pb-4 px-4" style={{ scrollbarWidth: "none" }}>
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-xl font-medium py-10">
              No notifications.
            </div>
          ) : (
            notifications.map((notif) => {
              const showActions =
                notif.message.includes("applied as a member") ||
                notif.message.includes("uploaded a new product");

              return (
                <div
                  key={notif.id}
                  className="flex gap-3 items-start bg-white rounded-xl border border-gray px-4 py-3 mb-3"
                >
                  {/* Avatar with Icon */}
                  <div className="relative w-12 h-12">
                    <img
                      src={notif.avatar}
                      alt={notif.name}
                      className="rounded-full w-12 h-12 object-cover border-2 border-green-100"
                    />

                    {/* Order Icon */}
                    {notif.message.includes("placed an order") && (
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h14l-1.35 6.7a1 1 0 01-.98.8H7a1 1 0 01-1-1V6h2l.4 2H21M16 17a2 2 0 100-4 2 2 0 000 4z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Review/Reject Icon */}
                    {showActions && (
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5.121 17.804A13.937 13.937 0 0112 15c2.136 0 4.165.5 5.879 1.39M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-gray-900">{notif.name}</span>{" "}
                    <span className="text-gray-700">{notif.message}</span>

                    {showActions && (
                      <div className="mt-3 flex gap-2">
                        <button className="bg-[#4CAE4F] text-white font-semibold text-sm px-4 py-1 rounded-full hover:bg-green-600">
                          Review
                        </button>
                        <button className="bg-red text-white text-sm font-semibold px-5 py-1 rounded-full hover:bg-red-600">
                          Reject
                        </button>
                      </div>
                    )}

                    <div className="flex items-center mt-2 text-sm text-gray-400 gap-2">
                      <span>{notif.time}</span>
                      <span className="inline-flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <rect x="4" y="4" width="16" height="16" rx="8" stroke="currentColor" fill="#E7FAE7" />
                          <path
                            d="M9.5 12.5l2 2 3-3"
                            stroke="#16A34A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
