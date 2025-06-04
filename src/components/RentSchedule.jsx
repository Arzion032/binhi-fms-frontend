import React from "react";
import edtIcon from '../assets/Trash.png';
import Done from '../assets/Done.png';
import Success from '../assets/Success.png';
import { X } from 'lucide-react';
import Disregard from '../assets/Disregard.png';


const RentSchedule = ({ 
    setIsDoneModalOpen, 
    setSelectedRow,
    isDoneModalOpen,
    selectedRow,
    showSuccessDoneModal,
    setShowSuccessDoneModal,
    showConfirmDiscard, 
    setShowConfirmDiscard,
    isDeleteModalOpen,
    setIsDeleteModalOpen,

 }) => {

  const rows = [
    {
      id: 1,
      association: "Pantok Farmers Association",
      location: "Pantok\nBinangonan",
      machinery: "Utility Tractor 1",
      schedule: "9:00 AM\n06-04-25",
      area: "3.0",
      operator: "Buboy Cervantes",
    },
    {
      id: 2,
      association: "Tatala Farmers Association",
      location: "Tatala\nBinangonan",
      machinery: "Combine Harvester",
      schedule: "9:00 AM\n06-04-25",
      area: "27.0",
      operator: "Buboy Cervantes",
    },
    {
      id: 3,
      association: "Macamot Farmers Association",
      location: "Macamot\nBinangonan",
      machinery: "Utility Tractor 1",
      schedule: "9:00 AM\n06-04-25",
      area: "24.0",
      operator: "Buboy Cervantes",
    },
    {
      id: 4,
      association: "Calumpang Farmers Association",
      location: "Calumpang\nBinangonan",
      machinery: "Multi-tiller",
      schedule: "9:00 AM\n06-04-25",
      area: "17.0",
      operator: "Buboy Cervantes",
    },
    {
      id: 5,
      association: "Tagpos Farmers Association",
      location: "Tagpos\nBinangonan",
      machinery: "Utility Tractor 2",
      schedule: "9:00 AM\n06-04-25",
      area: "9.0",
      operator: "Buboy Cervantes",
    },
    {
      id: 6,
      association: "Pila-Pila Farmers Association",
      location: "Pila-Pila\nBinangonan",
      machinery: "Multi-tiller",
      schedule: "9:00 AM\n06-04-25",
      area: "23.3",
      operator: "Buboy Cervantes",
    },
    {
      id: 7,
      association: "Bilibiran Farmers Association",
      location: "Bilibiran\nBinangonan",
      machinery: "Combine Harvester",
      schedule: "9:00 AM\n06-04-25",
      area: "4.5",
      operator: "Buboy Cervantes",
    },
    {
      id: 8,
      association: "Kaysapon Farmers Association",
      location: "Pantok\nBinangonan",
      machinery: "Combine Harvester",
      schedule: "9:00 AM\n06-04-25",
      area: "15.25",
      operator: "Buboy Cervantes",
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <table className="table w-full table-fixed">
        <thead>
          <tr className="text-left bg-[#F4F4F4] text-sm text-black">
            <th className="w-[4%]">
              <input type="checkbox" className="checkbox checkbox-sm rounded" />
            </th>
            <th className="w-[18%] px-3 py-3">Association</th>
            <th className="w-[12%] px-3 py-3">Location</th>
            <th className="w-[14%] px-3 py-3">Machinery</th>
            <th className="w-[14%] px-3 py-3">Schedule</th>
            <th className="w-[10%] px-3 py-3">Area (has.)</th>
            <th className="w-[14%] px-3 py-3">Operator</th>
            <th className="w-[14%] px-3 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="text-left text-sm text-black">
              <td>
                <input type="checkbox" className="checkbox checkbox-sm rounded" />
              </td>
              <td className="px-3 py-3 whitespace-pre-line">{row.association}</td>
              <td className="px-3 py-3 whitespace-pre-line text-gray-500">{row.location}</td>
              <td className="px-3 py-3">{row.machinery}</td>
              <td className="px-3 py-3 whitespace-pre-line text-gray-700">{row.schedule}</td>
              <td className="px-3 py-3">{row.area}</td>
              <td className="px-3 py-3">{row.operator}</td>
              <td className="px-3 py-3">
  <div className="flex justify-center items-center gap-3">
    <div className="group">
      <div
        className="flex items-center w-[20px] group-hover:w-[80px] transition-all duration-200 overflow-hidden cursor-pointer"
        onClick={() => {
          setSelectedRow(row);
          setIsDoneModalOpen(true);
        }}
      >
        <img
          src={Done}
          alt="Done"
          className="w-4 h-4 mr-1"
        />
        <span className="opacity-0 group-hover:opacity-100 text-green-600 text-sm font-medium transition-opacity duration-200 whitespace-nowrap">
          Done?
        </span>
      </div>
    </div>

    <span
      className="w-4 h-4 cursor-pointer hover:brightness-110 inline-block"
      onClick={() => setIsDeleteModalOpen(true)}
    >
      <img src={edtIcon} alt="Trash" className="w-4 h-4" />
    </span>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>

      {isDoneModalOpen && selectedRow && (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
    <div className="bg-white rounded-3xl w-[400px] p-6 border border-gray-300 relative shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Mark as Done</h2>
          <p className="text-sm text-gray-600 mt-1">Here’s the details of this machinery.</p>
        </div>
        <button onClick={() => setIsDoneModalOpen(false)}>
          <span className="text-xl text-gray-500 hover:text-black">&times;</span>
        </button>
      </div>

      <hr className="my-3 border-gray-300" />

      <div className="space-y-3 text-sm text-black">
        <div>
          <p className="font-semibold">Association</p>
          <p>{selectedRow.association}</p>
        </div>
        <div>
          <p className="font-semibold">Location</p>
          <p>{selectedRow.location}</p>
        </div>
        <div>
          <p className="font-semibold">Machinery</p>
          <p>{selectedRow.machinery}</p>
        </div>
        <div>
          <p className="font-semibold">Schedule</p>
          <p>{selectedRow.schedule}</p>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="font-semibold">Rental Price</p>
            <p>₱ {Number(selectedRow.rental_price).toFixed(2)}</p>
          </div>
          <div>
            <p className="font-semibold">Area (has.)</p>
            <p>{selectedRow.area}</p>
          </div>
          <div>
            <p className="font-semibold">Total</p>
            <p>₱ {(Number(selectedRow.rental_price) * Number(selectedRow.area)).toFixed(2)}</p>
          </div>
        </div>

        <div>
          <p className="font-semibold">Operator</p>
          <p>{selectedRow.operator}</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => {setIsDoneModalOpen(false); setShowConfirmDiscard(true); }}
          className="px-10 py-2 rounded-full bg-[#FF3B4E] text-white hover:bg-red-600 text-sm"
        >
          Disregard
        </button>
                    <button
            onClick={() => {
                setIsDoneModalOpen(false);
                setShowSuccessDoneModal(true);
            }}
            className="px-6 py-2 rounded-full bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
            >
            Mark as Done
            </button>

      </div>
    </div>
  </div>
)}

{showSuccessDoneModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
    <div className="bg-white rounded-3xl p-6 w-[400px] text-center shadow-xl relative border border-gray-300">
      <button
        onClick={() => setShowSuccessDoneModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-black"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="mb-4 flex justify-center items-center">
      <div className="mb-4 flex justify-center items-center">
                        <img
                          src={Success}
                          alt="Success.png"
                          className="w-[80px] max-w-full object-contain"
                        />
                      </div>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-black">Marked as done!</h2>
      <p className="text-sm text-gray-600 mb-6">Everything’s set. Feel free to check your machinery!</p>
      <div className="flex justify-center gap-3">
      <button
            onClick={() => {
                setIsDoneModalOpen(true);
                setShowSuccessDoneModal(false);
            }}
            className="px-10 py-2 rounded-full border border-green-600 text-green-600 hover:bg-green-50 text-sm"
            >
            Back
            </button>

        <button
          onClick={() => setShowSuccessDoneModal(false)}
          className="px-10 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 text-sm"
        >
          Done
        </button>
      </div>
    </div>
  </div>
)}

{/* Disregard Confirmation Modal */}
{showConfirmDiscard && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white rounded-3xl w-[400px] h-[310px] p-10 shadow-lg relative border border-black">
            <button onClick={() => setShowConfirmDiscard(false)} className="absolute top-4 right-4 text-gray-400">
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4 flex justify-center items-center">
                    <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
                  </div>
                  <h2 className="text-2xl text-center font-bold mb-2">Disregard?</h2>
                  <p className="text-sm text-center text-gray-600">This action cannot be undone.<br />The changes will be lost.</p>

                  <div className="flex justify-center gap-3 mt-6">
              <button
                 onClick={() => {
                    setIsDoneModalOpen(true);
                    setShowConfirmDiscard(false);
                  }}
                className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                style={{ width: "130px", height: "39px" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmDiscard(false);
                  setIsDoneModalOpen(false);
                }}
                className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
              >
                Disregard
              </button>
            </div>
          </div>
        </div>
        
      )}


{isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-6 w-[400px] border border-black shadow-lg relative text-center">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="absolute top-2 right-3 text-gray-400 hover:text-black"
              >
                &times;
              </button>
            
              <div className="mb-4 flex justify-center items-center">
                    <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
                  </div>
                <h2 className="text-2xl text-center font-bold mb-2">Confirm Deletion?</h2>
                <p className="text-sm text-center text-gray-600">
                  The selected machinery will be permanently removed from your records.
                </p>
                
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-7 py-2 bg-white text-[#E02A3B] border border-[#E02A3B] rounded-full hover:bg-[#E02A3B] hover:text-white text-sm font-medium"
                    style={{ width: "130px", height: "39px" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Add deletion logic here
                      setIsDeleteModalOpen(false);
                    }}
                    className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                    style={{ width: "130px", height: "39px" }}
                  >
                    Delete
                  </button>
                </div>
              
            </div>
          </div>
        )}
      
    </div>
  );
};

export default RentSchedule;
