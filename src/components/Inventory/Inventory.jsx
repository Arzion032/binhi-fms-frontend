// Inventory.jsx

import React, { useState } from 'react';
import InventoryHeader from './InventoryHeader';
import InventoryTabs from './InventoryTabs';
import EquipmentCards from './EquipmentCards';
import EquipmentTable from './EquipmentTable';
import AddEquipmentModal from './Modals/AddEquipmentModal';
import EditEquipmentModal from './Modals/EditEquipmentModal';
import RentEquipmentModal from './Modals/RentEquipmentModal';
import ReturnEquipmentModal from './Modals/ReturnEquipmentModal';

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('equipment');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRentOpen, setIsRentOpen] = useState(false);
  const [isReturnEquipmentOpen, setIsReturnEquipmentOpen] = useState(false);
  const [isSuccessRentOpe, setIsSuccessRentOpe] = useState(false);
  const [isSuccessRentOpen, setIsSuccessRentOpen] = useState(false);
  const [isDeleteModalOpe, setIsDeleteModalOpe] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showConfirmDiscard, setShowConfirmDiscard] = useState(false);
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // UI control
  const [showRepairButton, setShowRepairButton] = useState(false);
  const [repaired, setRepaired] = useState(false);

  // Actions
  const handleConfirm = (e) => {
    e.preventDefault();
    setIsRentOpen(false);
    setShowAddedModal(true);
    setIsSuccessRentOpe(true);
  };

  const handleCloseAll = () => {
    setShowDiscardModal(false);
    setShowAddedModal(false);
    setIsModalOpen(false);
    setIsReturnEquipmentOpen(false);
    setIsSuccessRentOpe(false);
    setIsSuccessRentOpen(false);
    setIsDeleteModalOpe(false);
    setIsEditOpen(false);
    setShowSuccess(false);
    setShowConfirmDiscard(false);
  };

  return (
    <div className="p-0">
      <InventoryHeader activeTab={activeTab} />
      <InventoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'equipment' && (
        <>
          <EquipmentCards
            setShowRepairButton={setShowRepairButton}
            setRepaired={setRepaired}
            setIsModalOpen={setIsModalOpen}
            setIsRentOpen={setIsRentOpen}
            setShowFixModal={() => {}}
          />
          <EquipmentTable
            setIsRentOpen={setIsRentOpen}
            setIsEditOpen={setIsEditOpen}
            setIsDeleteModalOpe={setIsDeleteModalOpe}
          />
        </>
      )}

{activeTab === 'rentHistory' && (
  <RentHistoryTable
    setIsReturnEquipmentOpen={setIsReturnEquipmentOpen}
    setIsDetailsOpen={setIsDetailsOpen}
    setIsDeleteModalOpen={setIsDeleteModalOpe}
  />
)}

      {/* Modals */}
      <AddEquipmentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        showDiscardModal={showDiscardModal}
        setShowDiscardModal={setShowDiscardModal}
        showAddedModal={showAddedModal}
        setShowAddedModal={setShowAddedModal}
        handleConfirm={handleConfirm}
        handleCloseAll={handleCloseAll}
      />

      <EditEquipmentModal
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        showConfirmDiscard={showConfirmDiscard}
        setShowConfirmDiscard={setShowConfirmDiscard}
      />

      <RentEquipmentModal
        isRentOpen={isRentOpen}
        setIsRentOpen={setIsRentOpen}
        isSuccessRentOpe={isSuccessRentOpe}
        setIsSuccessRentOpe={setIsSuccessRentOpe}
        showConfirmDiscard={showConfirmDiscard}
        setShowConfirmDiscard={setShowConfirmDiscard}
        handleConfirm={handleConfirm}
      />

      <ReturnEquipmentModal
        isReturnEquipmentOpen={isReturnEquipmentOpen}
        setIsReturnEquipmentOpen={setIsReturnEquipmentOpen}
        isSuccessRentOpen={isSuccessRentOpen}
        setIsSuccessRentOpen={setIsSuccessRentOpen}
        setShowDiscardModal={setShowDiscardModal}
        handleCloseAll={handleCloseAll}
      />
    </div>
  );
}
