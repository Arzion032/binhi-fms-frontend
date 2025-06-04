import React, { useState, useRef, useEffect } from "react";

// Notification demo data
const initialNotifications = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    avatar: "/Screenshot_195.png",
    message: "applied as a member for federation!",
    time: "1h ago",
  },
  {
    id: 2,
    name: "Jin Cristopher",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
  {
    id: 3,
    name: "Jinky Valdez",
    avatar: "/Screenshot_195.png",
    message: "uploaded a new product. Check it out!",
    time: "1h ago",
  },
  {
    id: 4,
    name: "Nisi Viloria",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
  {
    id: 5,
    name: "Emmanuel Sol",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
  {
    id: 6,
    name: "Melvin Sarabia",
    avatar: "/Screenshot_195.png",
    message: "uploaded a new product. Check it out!",
    time: "1h ago",
  },
  {
    id: 7,
    name: "Kaye Arroyo",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
];

const NotificationModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 z-[998]"
        onClick={onClose}
        style={{ background: "transparent" }}
      ></div>

      {/* Modal Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[400px] bg-white
          border border-gray-300
          rounded-tl-3xl rounded-bl-3xl
          flex flex-col z-[999]
          animate-slide-in
        `}
        style={{ minWidth: 340, maxWidth: 420 }}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            className="p-1 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg width="27" height="27" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto pt-1 pb-4 px-3 custom-scrollbar">
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
                  className="flex gap-3 items-start bg-white rounded-xl border border-gray-200 px-4 py-3 mb-3"
                >
                  <img
                    src={notif.avatar}
                    alt={notif.name}
                    className="rounded-full w-12 h-12 object-cover border-2 border-green-100"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-gray-900">{notif.name}</span>{" "}
                    <span className="text-gray-700">{notif.message}</span>

                    {showActions && (
                      <div className="mt-3 flex gap-2">
                        <button className="bg-green-500 text-white text-sm px-4 py-1 rounded-full hover:bg-green-600">
                          Review
                        </button>
                        <button className="bg-red-500 text-white text-sm px-4 py-1 rounded-full hover:bg-red-600">
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

      {/* Slide-in animation & custom scrollbar */}
      <style>
        {`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.22s cubic-bezier(.27,.46,.49,1) both; }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 6px;
        }
        `}
      </style>
    </>
  );
};

export default NotificationModal;
