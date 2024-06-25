import React, { useState } from 'react';
import './Modal.css'; // Ensure you have appropriate styles for the modal

const CancellationReasonModal = ({ isOpen, onClose, onCancel }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleCancel = () => {
    onCancel(reason);
    setReason(''); // Reset reason after cancellation
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Cancellation Reason</h2>
        <textarea
          placeholder="Enter cancellation reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border rounded-lg p-2 w-full mb-3"
        ></textarea>
        <button className="btn btn-danger" onClick={handleCancel}>
          Confirm Cancellation
        </button>
      </div>
    </div>
  );
};

export default CancellationReasonModal;
