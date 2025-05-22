import React, { useState, useRef, useEffect } from 'react';
import { Search, PlusCircle, SlidersHorizontal, X } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faFileAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import loop from '../assets/loop.png';
import { faUndo, faListUl } from '@fortawesome/free-solid-svg-icons';
import edtIcon from '../assets/Trash.png';
import Pencil from '../assets/Pencil.png';

export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState('equipment');
  const [searchCurrent, setSearchCurrent] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);
  const containerRef = useRef();

  const tabs = ['equipment', 'rentHistory'];

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const currentTab = tabsRef.current[activeIndex];
    if (currentTab && containerRef.current) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const tabLeft = currentTab.getBoundingClientRect().left;
      const offsetLeft = tabLeft - containerLeft;
      setIndicatorStyle({
        left: offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeTab]);

  const clearFilters = () => {
    setSelectedRole('');
  };

  const rows = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    equipment: 'Utility Tractor',
    quantity: 2,
    statusNow: index < 3 ? 'Rented' : 'Returned',
    rentRate: '₱1,500',
    dateRented: 'March 21, 2025',
    rentedAgo: '4 days ago',
    dueDate: 'March 21, 2025',
    dueIn: index === 2 ? '5 days left' : index < 3 ? '4 days left' : '6 days ago',
    renter: 'Kaye Arroyo'
  }));

  return (
    <div className="p-0">
      <div className="w-full bg-binhi-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex-1">
            <div className="text-sm breadcrumbs font-inter text-base">
              <ul>
                <li><a className="text-binhigreen underline">Dashboard</a></li>
                <li><a className="text-binhigreen underline">Inventory Management</a></li>
                <li><a className="text-binhigreen underline">Equipment</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="px-6 pb-4 h-5 flex items-center">
          <h1 className="text-[40px] font-bold text-gray-800">Inventory Management</h1>
        </div>
      </div>



      <div className="p-6 bg-gray-50 min-h-screen text-sm font-sans">
      <div
        className="relative flex gap-20 border-b pb-2 mb-4"
        ref={containerRef}
      >
        {/* Sliding Indicator */}
        <span
          className="absolute bottom-0 h-1 bg-green-500 transition-all duration-300 rounded-full"
          style={{ ...indicatorStyle }}
        />

        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={el => (tabsRef.current[index] = el)}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 transition-colors duration-200 ${
              activeTab === tab
                ? 'text-green-600 font-semibold'
                : 'text-gray-500'
            }`}
          >
            {tab === 'equipment' ? 'Equipment' : 'Rent History'}
          </button>
        ))}
      </div>

        {activeTab === "equipment" && (
          <>
            <div className="flex justify-end mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-[280px] h-[35px] flex items-center border rounded-full px-3 py-1 bg-white">
                  <Search className="text-gray-500 w-5 h-5 mr-2" />
                  <input type="text" placeholder="Search Member" className="flex-1 outline-none bg-white" value={searchCurrent} onChange={(e) => setSearchCurrent(e.target.value)} />
                  <button onClick={() => setShowFilters(!showFilters)}>
                    <SlidersHorizontal className="text-gray-600 w-5 h-5" />
                  </button>
                </div>

                {showFilters && (
                  <div className="flex items-center space-x-1 p-2 rounded-lg w-fit">
                    <div className="flex items-center space-x-1 border rounded-l-3xl px-3 py-1 cursor-pointer bg-white border border-[#858585] h-[35px]">
                      <SlidersHorizontal className="text-blue w-4 h-4" />
                      <span className="mr-2 p-2 text-sm text-blue font-medium">Active Filters</span>
                    </div>
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="border border-[#858585] h-[35px] w-[60px] text-center text-sm bg-white text-[#858585]">
                      <option value="">Role</option>
                      <option value="admin">Farmer</option>
                      <option value="member">Member</option>
                    </select>
                    <button onClick={clearFilters} className="flex items-center space-x-1 border rounded-r-3xl px-3 py-1 text-sm border border-[#858585] h-[35px] bg-white text-[#858585]">
                      <X className="w-4 h-4 text-[#858585]" />
                      <span>Clear</span>
                    </button>
                  </div>
                )}

                <button className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2">
                  <FaPlus className="w-5 h-5" />
                  <span className="font-semibold text-[16px]">Add Equipment</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              {["#4caf50", "#FF3B4E", "#D1A157"].map((color, index) => (
                <div key={index} className="relative bg-white rounded-2xl border border-gray-300 flex flex-col justify-between h-[60px] w-[350px] shadow-sm">
                  <div className={`absolute left-0 top-0 h-full w-3 rounded-tl-2xl rounded-bl-2xl`} style={{ backgroundColor: color }} />
                  <div className="absolute top-2 right-2 z-20">
                    <button onClick={() => setIncomeModalOpen(true)} className="flex items-center justify-center w-[32px] h-[32px] text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-all">
                      <PlusCircle className="w-[20px] h-[20px]" />
                    </button>
                  </div>
                  <div className="flex flex-col justify-center px-6 h-full">
                    <span className="text-sm text-gray-500">Available</span>
                    <span className="text-xl font-bold text-black leading-tight">15</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full overflow-x-auto rounded-xl">
              <table className="table w-full">
                <thead>
                  <tr className="text-left" style={{ backgroundColor: "#F4F4F4" }}>
                    <th><input type="checkbox" className="checkbox checkbox-sm rounded" /></th>
                    <th>Equipment</th>
                    <th>Quantity</th>
                    <th>Available</th>
                    <th>Rented</th>
                    <th>Repair Needed</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <tr key={index} className="bg-gray-100">
                      <td><input type="checkbox" className="checkbox checkbox-sm rounded" /></td>
                      <td>Utility Tractor</td>
                      <td>6</td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td className="flex gap-2">
                        <button className="text-green-600">⬇️</button>
                        <span>
                          <img src={Pencil} alt="Pencil" className="w-4 h-4" />
                        </span>
                        <span className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block">
                          <img src={edtIcon} alt="Trash" className="w-4 h-4" />
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center items-center p-4 space-x-2 text-gray-500 text-sm">
                <button className="px-2">&lt;</button>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button key={num} className={`w-8 h-8 rounded ${num === 1 ? 'bg-gray-300' : 'hover:bg-gray-200'}`}>{num}</button>
                ))}
                <span>...</span>
                <button className="px-2">&gt;</button>
              </div>
            </div>
          </>
        )}

        {activeTab === "rentHistory" && (
          <>
            <div className="bg-[#F9FCF7] min-h-screen flex justify-center px-4">
              <div className="max-w-7xl w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  {/* Left side: All Requests */}
                  <div className="flex items-center">
                                <img
                                  src={loop}
                                  alt="loop"
                                  className="ml-5 mr-5 w-[20px] max-w-full object-contain"
                                />
                    <span className="text-[15.5px] text-lg font-semibold mr-2">All Requests</span>
                    <span className="text-gray-400 font-normal">24</span>
                  </div>

            {/* Right side: Search + Filters + Button */}
            <div className="flex items-center space-x-4">
              <div className="relative w-[280px] h-[35px] flex items-center border rounded-full px-3 py-1 bg-white">
                <Search className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Search Member"
                  className="flex-1 outline-none bg-white"
                  value={searchCurrent}
                  onChange={(e) => setSearchCurrent(e.target.value)}
                />
                <button onClick={() => setShowFilters(!showFilters)}>
                  <SlidersHorizontal className="text-gray-600 w-5 h-5" />
                </button>
              </div>

              {showFilters && (
                <div className="flex items-center space-x-1 p-2 rounded-lg w-fit">
                  <div className="flex items-center space-x-1 border rounded-l-3xl px-3 py-1 cursor-pointer bg-white border border-[#858585] h-[35px]">
                    <SlidersHorizontal className="text-blue w-4 h-4" />
                    <span className="mr-2 p-2 text-sm text-blue font-medium">Active Filters</span>
                  </div>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border border-[#858585] h-[35px] w-[60px] text-center text-sm bg-white text-[#858585]"
                  >
                    <option value="">Role</option>
                    <option value="admin">Farmer</option>
                    <option value="member">Member</option>
                  </select>
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-1 border rounded-r-3xl px-3 py-1 text-sm border border-[#858585] h-[35px] bg-white text-[#858585]"
                  >
                    <X className="w-4 h-4 text-[#858585]" />
                    <span>Clear</span>
                  </button>
                </div>
              )}

              <button className="flex items-center justify-center gap-2 bg-app-primary hover:bg-app-primary/90 text-white rounded-full px-6 py-2">
                <FaPlus className="w-5 h-5" />
                <span className="font-semibold text-[16px]">Add Equipment</span>
              </button>
            </div>
          </div>
 
     
      
        <table className="table w-full">
          <thead>
            <tr className="text-left" style={{ backgroundColor: "#F4F4F4" }}>
              <th className="pl-6 pr-3 py-3 w-12">
                <input type="checkbox" className="checkbox checkbox-sm rounded" />
              </th>
              <th className="px-3 py-3">Equipment</th>
              <th className="px-3 py-3">Quantity</th>
              <th className="px-3 py-3">Status Now</th>
              <th className="px-3 py-3">Rent Rate</th>
              <th className="px-3 py-3">Date Rented <span className="inline-block">↓</span></th>
              <th className="px-3 py-3">Due/Date Returned</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3 pr-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="bg-[#F8FCF8] border-b border-gray-200">
                <td className="pl-6 pr-3 py-4 align-middle">
                  <input type="checkbox" className="checkbox checkbox-sm rounded" />
                </td>
                <td className="px-3 py-4 text-black align-middle">{row.equipment}</td>
                <td className="px-3 py-4 text-black align-middle">{row.quantity}</td>
                <td className="px-3 py-4 text-black align-middle">{row.statusNow}</td>
                <td className="px-3 py-4 align-middle">
                  <div className="font-bold text-black">{row.rentRate}</div>
                  <div className="text-xs text-gray-500 -mt-1">per day</div>
                </td>
                <td className="px-3 py-4 align-middle">
                  <div className=" text-black">{row.dateRented}</div>
                  <div className="text-xs text-gray-500 -mt-1">{row.rentedAgo}</div>
                </td>
                <td className="px-3 py-4 align-middle">
                  <div className="text-black">{row.dueDate}</div>
                  <div className="text-xs text-gray-500 -mt-1">{row.dueIn}</div>
                </td>
                <td className="px-3 py-4 text-black align-middle">{row.renter}</td>
                <td className="px-3 py-4 pr-6 flex items-center space-x-4 align-middle">
                  <button aria-label="Return" className="text-green-600 hover:text-green-700 text-lg">
                    <FontAwesomeIcon icon={faUndo} />
                  </button>
                  <button aria-label="Details" className="text-blue hover:text-blue text-lg">
                    <FontAwesomeIcon icon={faListUl} />
                  </button>
                  <span className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block">
                                          <img src={edtIcon} alt="Trash" className="w-4 h-4" />
                                      </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      

      <nav className="flex justify-center bg-[#F8FCF8] items-center space-x-3 py-6 text-gray-500 text-sm select-none" aria-label="Pagination">
        <button aria-label="Previous page" className="p-2 hover:text-gray-700">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button aria-current="page" className="bg-gray-300 rounded-md px-4 py-2 font-semibold text-black cursor-default">
          1
        </button>
        {[2, 3, 4, 5].map((page) => (
          <button key={page} className="px-4 py-2 rounded-md hover:bg-gray-200">{page}</button>
        ))}
        <span className="px-2 py-2">...</span>
        <button aria-label="Next page" className="p-2 hover:text-gray-700">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </nav>
    </div>
    </div>
    

          </>
        )}
      </div>
    </div>
  );
}
