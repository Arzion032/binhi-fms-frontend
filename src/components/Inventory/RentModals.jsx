import React from 'react';
import ReturnModal from '../modals/ReturnModal';
import SuccessModal from '../modals/SuccessModal';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import DisregardModal from '../modals/DisregardModal';

export default function RentModals({
  isReturnOpen,
  setIsReturnOpen,
  isSuccessOpen,
  setIsSuccessOpen,
  isDeleteOpen,
  setIsDeleteOpen,
  isDisregardOpen,
  setIsDisregardOpen
}) {
  const handleReturnConfirm = () => {
    setIsReturnOpen(false);
    setIsSuccessOpen(true);
  };

  const handleDisregard = () => {
    setIsDisregardOpen(false);
  };

  return (
    <>
      <ReturnModal
        isOpen={isReturnOpen}
        onClose={() => setIsReturnOpen(false)}
        onConfirm={handleReturnConfirm}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Equipment returned successfully!"
      />

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={() => setIsDeleteOpen(false)}
      />

      <DisregardModal
        isOpen={isDisregardOpen}
        onCancel={handleDisregard}
        onConfirm={handleDisregard}
        message="return process"
      />
    </>
  );
}