import React from "react";
import { useState, useEffect } from "react";
import { X, SlidersHorizontal, Check } from "lucide-react";
import Pencil2 from '../../assets/PencilBlack.png';
import Time from '../../assets/Time.png';

const MachineryModal = ({
  showModal,
  setShowModal,
  setSelectedDoc,
  uploadedFile,
  setUploadedFile,
  Upload,
  Uploadfiles,
  isEditOpen,
  setIsEditOpen,
  setShowSuccess,
  setShowConfirmDiscard,
  showEditModal,
  setShowEditModal,
  selectedItem,
  isModalOpen,
  setIsModalOpen,
  showAddedModal,
  setShowAddedModal,
  showDisregardModal,
  setShowDisregardModal,
  handleConfirm,
  handleCloseAll,
  Success,
  Disregard,
  onStatusChange,
  isHistoryOpen,
  setIsHistoryOpen,
  historyData,
  setHistoryData,
  selectedMachineryName,
  setSelectedMachineryName,
}) => {
  if (
    !showModal &&
    !isEditOpen &&
    !isModalOpen &&
    !showAddedModal &&
    !showDisregardModal &&
    !isHistoryOpen &&
    !historyData &&
    !selectedMachineryName &&
    (!showEditModal || !selectedItem)
  )
    return null;

    const [status, setStatus] = useState(selectedItem?.status || "Operational");
    const [viewingRecord, setViewingRecord] = useState(null); // null or a specific date record

   
    useEffect(() => {
      if (isEditOpen && typeof onStatusChange === 'function') {
        onStatusChange(status);
      }
    }, [status, isEditOpen, onStatusChange]);
    
    

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] relative shadow-lg transition-all duration-300">
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedDoc("");
                setUploadedFile(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 border rounded-full flex items-center justify-center">
                <img src={Uploadfiles} alt="Uploadfiles" className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-left">Upload Files</h2>
                <p className="text-gray-500 text-sm">Select and upload the file do you need</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center w-full mb-4">
              <div className="flex justify-center mb-3">
                <img src={Upload} alt="Upload Icon" className="w-6 h-6" />
              </div>
              <p className="font-semibold text-sm mb-1">
                Choose a file or <span className="text-green-600">drag & drop it here</span>
              </p>
              <p className="text-gray-500 text-xs mb-4">
                JPEG, PNG, PDF, and XLXS formats, up to 5 MB
              </p>
              <label className="inline-block bg-green-600 text-white text-sm font-medium px-6 py-2 rounded-full cursor-pointer hover:bg-green-700">
                Browse File
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                />
              </label>
            </div>

            {uploadedFile && (
              <div className="bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/pdf-icon.png" alt="PDF" className="w-8 h-8" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(0)} KB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-semibold text-sm">100%</span>
                  <Check className="text-green-600 w-4 h-4" />
                  <button onClick={() => setUploadedFile(null)} className="text-gray-500 hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

        {/* Details */}

            {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white rounded-3xl p-6 w-[380px] max-w-full border border-gray-300 shadow-lg relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-left">
              <h2 className="text-lg font-bold mb-1">Machinery Details</h2>
              <p className="text-sm text-gray-600 mb-4">Here’s the details of this machinery.</p>
            </div>

            <div className="border-b border-gray-300 mb-4"></div>

            <div className="text-sm space-y-4 text-left">
              <div>
                <strong className="block text-gray-800">Machinery</strong>
                <span>{selectedItem?.name || 'N/A'}</span>
              </div>
              <div>
                <strong className="block text-gray-800">Model</strong>
                <span>{selectedItem?.model || 'N/A'}</span>
              </div>
              <div>
                <strong className="block text-gray-800">Rental Price</strong>
                <span>{selectedItem?.price || '₱1,500'}</span>
              </div>
              <div>
                <strong className="block text-gray-800">Unit</strong>
                <span>{selectedItem?.unit || 'Per Hectares'}</span>
              </div>
              <div>
                <strong className="block text-gray-800">Status</strong>
                <span>{selectedItem?.status || 'Available'}</span>
              </div>
            </div>

            <div className="flex justify-center gap-0 items-center mt-8">
                <button
                    onClick={() => {
                    setShowEditModal(false);
                    setIsEditOpen(true);
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-black px-4 py-2 rounded-full border border-transparent hover:border-blue focus:border-blue hover:text-blue focus:text-blue transition-all"
                >
                    <img src={Pencil2} alt="Edit" className="w-4 h-4" />
                    Edit Details
                </button>

                <button
  onClick={() => {
    setIsHistoryOpen(true);
    setSelectedMachineryName(selectedItem?.name || ""); // optional
    setHistoryData([
      {
        date: "06-04-25",
        entries: [
          { association: "Pantok Farmers Association", location: "Pantok" },
          { association: "Macamot Farmers Association", location: "Macamot" },
          { association: "Pila-Pila Farmers Association", location: "Pila-Pila" },
          { association: "Tatala Farmers Association", location: "Tatala" },
        ],
      },
      {
        date: "06-03-25",
        entries: [
          { association: "Pantok Farmers Association", location: "Pantok" },
          { association: "Pila-Pila Farmers Association", location: "Pila-Pila" },
          { association: "Bilibiran Farmers Association", location: "Bilibiran" },
        ],
      },
      {
        date: "06-01-25",
        entries: [
          { association: "Pantok Farmers Association", location: "Pantok" },
          { association: "Pila-Pila Farmers Association", location: "Pila-Pila" },
          { association: "Bilibiran Farmers Association", location: "Bilibiran" },
        ],
      },
    ]);
  }}
  className="flex items-center gap-2 text-sm font-medium text-black px-4 py-2 rounded-full border border-transparent hover:border-blue focus:border-blue hover:text-blue focus:text-blue transition-all"
>
  <img src={Time} alt="Time" className="w-4 h-4" />
  View History
</button>


                </div>

            <button
              onClick={() => setShowEditModal(false)}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-full"
            >
              Back
            </button>
          </div>
        </div>
      )}



{isEditOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
    <div className="bg-white rounded-3xl p-6 w-[400px] max-w-full border border-black shadow-lg relative">
      <button
        onClick={() => setIsEditOpen(false)}
        className="absolute top-4 right-4 text-gray-400"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-lg font-bold mb-1 text-left">Edit Machinery</h2>
      <p className="text-sm text-gray-500 mb-4 text-left">Please edit the machinery.</p>
      <div className="border-b border-gray-300 my-4"></div>

      <form
  onSubmit={(e) => {
    e.preventDefault();
    if (onStatusChange && selectedItem?.id) {
      onStatusChange(selectedItem.id, status); // ✅ send ID + new status to parent
    }
    setIsEditOpen(false);
    setShowSuccess(true);
  }}
  className="space-y-4"
>

        {/* Machinery */}
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">
            Machinery <span className="text-red">*</span>
          </label>
          <input
            type="text"
            defaultValue={selectedItem?.name || ''}
            className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">
            Model <span className="text-red">*</span>
          </label>
          <input
            type="text"
            defaultValue={selectedItem?.model || ''}
            className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Rental Price and Unit */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 text-left">
              Rental Price <span className="text-red">*</span>
            </label>
            <div className="flex items-center px-4 py-2 border rounded-full">
              <span className="text-gray-500 pr-1">₱</span>
              <input
                type="text"
                defaultValue={selectedItem?.price?.replace('₱', '') || ''}
                className="w-full outline-none text-sm"
                required
              />
            </div>
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 text-left">
              Unit <span className="text-red">*</span>
            </label>
            <input
              type="text"
              defaultValue={selectedItem?.unit || 'Per Hectares'}
              className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

       {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 text-left">
            Status <span className="text-red-500">*</span>
          </label>
          <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option>Operational</option>
                <option>Non-operational</option>
                <option>Need Maintenance</option>
          </select>

        </div>


        {/* Buttons */}
        <div className="flex justify-between gap-3 pt-20">
          <button
            type="button"
            onClick={() => setShowConfirmDiscard(true)}
            className="w-full py-2 rounded-full bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
          >
            Disregard
          </button>
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{isHistoryOpen && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-5 flex items-center justify-center">
    <div className="bg-white rounded-3xl w-[450px] p-6 shadow-lg border border-black max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">
          {selectedMachineryName} Rent History
        </h2>
        <button onClick={() => setIsHistoryOpen(false)}>
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-4 text-left">
        Here’s the rent history of this machinery.
      </p>
      <div className="border-b border-gray-300 mb-4"></div>
      {/* Search */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search Member"
          className="w-full px-4 py-2 rounded-full border"
        />
        <SlidersHorizontal className="absolute right-4 top-2.5 w-5 h-5 text-gray-400" />
      </div>

      {/* Rent History List */}
      <div
  className="flex flex-col gap-4 max-h-[360px] overflow-y-auto pr-1"
  style={{ scrollbarWidth: "none" }}
>          {historyData.map((record, index) => (
            <div key={index} className="border rounded-xl p-4 shadow">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>{record.date}</span>
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setViewingRecord(record)}
                >
                  📄 View
                </span>
              </div>
              <div className="border-b border-gray-300 mb-4"></div>
              <div className="text-sm">
                <div className="flex justify-between font-semibold mb-1">
                  <span>Association</span>
                  <span>Location</span>
                </div>
                <div className="flex flex-col gap-1">
                  {record.entries.map((entry, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-left">{entry.association}</span>
                      <span className="text-right">{entry.location}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsHistoryOpen(false)}
          className="w-full h-[50px] mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-full"
        >
          Back
        </button>
      </div>
    </div>
  </div>
)}

{viewingRecord && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-5 flex items-center justify-center">
    <div className="bg-white rounded-3xl w-[1050px] p-6 shadow-lg border border-black max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-left">{viewingRecord.date}</h2>
          <p className="text-sm text-gray-500">Here’s the rent history of this date.</p>
        </div>
        <button onClick={() => setViewingRecord(null)}>
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-separate border-spacing-y-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 rounded-lg">
          <tr className="bg-[#F4F4F4] text-left text-sm text-black">
              <th className="px-4 py-2">Association</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Machinery</th>
              <th className="px-4 py-2">Schedule</th>
              <th className="px-4 py-2">Completed</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Area (has.)</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Operator</th>
            </tr>
          </thead>
          <tbody>
            {viewingRecord.entries.map((entry, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-2">{entry.association}</td>
                <td className="px-4 py-2">
                  <div>{entry.location}</div>
                  <div className="text-xs text-blue-600">Binangonan</div>
                </td>
                <td className="px-1 py-2">Utility Tractor 1</td>
                <td className="px-4 py-2">9:00 AM</td>
                <td className="px-4 py-2">10:30 PM</td>
                <td className="px-1 py-2">₱ 25.50</td>
                <td className="px-4 py-2">3.0</td>
                <td className="px-1 py-2">₱ 75.00</td>
                <td className="px-1 py-2">Buboy Cervantes</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}


      {/*Add Machinery Modal */}
      {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black  bg-opacity-40 z-50">
                      <div className="bg-white rounded-2xl w-[400px] p-6 border border-black relative shadow-xl">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h2 className="text-lg font-bold text-gray-800">Add Machinery</h2>
                            <p className="text-sm text-gray-500">Please enter the new machinery.</p>
                          </div>
                          
                          <button onClick={() => setIsModalOpen(false)}>
                            <X className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                        <div className="border-b border-gray-300 my-4"></div>
                        <form className="space-y-4 mt-4" onSubmit={handleConfirm}>
                          <div>
                            <label className="block text-sm font-semibold">
                              Machinery <span className="text-red">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter the Machinery"
                              className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold">
                              Model <span className="text-red">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter the Model"
                              className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold">Rental Price <span className="text-red">*</span> </label>
                            <div className="flex items-center border border-gray-300 rounded-full px-3">
                              <span className="text-gray-500 text-sm">₱</span>
                              <input
                                type="number"
                                placeholder="Enter the Rental Price"
                                className="w-full px-2 py-2 bg-transparent focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold">
                              Unit <span className="text-red">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter the Model"
                              className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none"
                            />
                          </div>

                          <div className="flex justify-center gap-3 pt-20">
                            <button
                              type="button"
                              onClick={() => setShowDisregardModal(true)}
                              className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                              style={{ width: "160px", height: "39px" }}
                            >
                              Disregard
                            </button>
                            <button
                              type="submit"
                            
                              className="px-14 py-2 bg-[#4CAE4F] text-white border border-[#4CAE4F] rounded-full hover:bg-[dark green] hover:text-white"
                            >
                              Confirm
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

      

      {/* ✅ SUCCESS MODAL */}
      {showAddedModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 w-[500px] h-[300px] rounded-3xl shadow-md w-96 text-center relative border border-black">
            <div className="flex justify-end">
              <button onClick={handleCloseAll}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col items-center">
            <div className="mb-4 flex justify-center items-center">
              <img
                src={Success}
                alt="Success.png"
                className="w-[80px] max-w-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2">Machinery added successfully!</h2>
            <p className="text-sm text-gray-600 mb-6">
                Everything’s set. Feel free to check your machinery!
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowAddedModal(false)}
                  className="px-4 py-2 bg-white text-[#4CAE4F] border border-[#4CAE4F] rounded-full hover:bg-[#4CAE4F] hover:text-white text-sm font-medium"
                style={{ width: "130px", height: "39px" }}
                >
                  Back
                </button>
                <button
                  onClick={handleCloseAll}
                  className="px-4 py-2 rounded-3xl bg-[#4CAE4F] text-white hover:bg-green-600 text-sm"
                style={{ width: "130px", height: "39px" }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

          {showDisregardModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex  items-center justify-center">
              <div className="bg-white rounded-3xl w-[400px] p-6 shadow-lg border border-black text-center">
              <div className="flex justify-end">
                        <button onClick={handleCloseAll}>
                          <X className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
              <div className="mb-4 flex justify-center items-center">
                  <img src={Disregard} alt="Disregard.png" className="w-[80px] max-w-full object-contain" />
              </div>
                  <h2 className="text-2xl text-center font-bold mb-2">Disregard editing?</h2>
                  <p className="text-sm text-center text-gray-600">This action cannot be undone.<br />The changes will be lost.</p>

                <div className="flex justify-center gap-3 mt-6 ">
                  <button
                    onClick={() => setShowDisregardModal(false)}
                    className="px-4 py-2 rounded-3xl bg-[#FF3B4E] text-white hover:bg-[#E02A3B] text-sm"
                          style={{ width: "130px", height: "39px" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowDisregardModal(false); // no success modal here
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

    </>
  );
};

export default MachineryModal;
