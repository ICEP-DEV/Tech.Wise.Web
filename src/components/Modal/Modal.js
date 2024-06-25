import React from 'react';
import { X } from 'lucide-react';
import './Modal.css'; // Ensure you create this CSS file

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-dark text-light">
            <h5 className="modal-title">Driver Details</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body bg-light">
            <div className="row">
              <div className="col-md-6 text-center">
                <div className="profile-pic-wrapper">
                  <img src={`http://localhost:8085/documents/${data.driverPhoto}`} alt={data.name} className="profile-pic mb-3 shadow-sm" />
                </div>
                {/* <h3 className="h5 font-weight-bold">{data.name}</h3> */}
              </div>
              <div className="col-md-6 text-center">
                <img src={`http://localhost:8085/documents/${data.carImage}`} alt={`${data.carMake} ${data.carModel}`} className="img-fluid profile-car rounded-lg mb-3 shadow-sm" />
                {/* <h3 className="h5 font-weight-bold">{`${data.carMake} ${data.carModel} (${data.carYear})`}</h3> */}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <h3 className="h5 font-weight-bold">Driver Information</h3>
                <p className="mb-1"><strong>Name:</strong> {data.driverName}</p>
                <p className="mb-1"><strong>Phone Number:</strong> {data.driverPhoneNumber}</p>
                <p className="mb-1"><strong>Gender:</strong> {data.driverGender}</p>
              </div>
              <div className="col-md-6">
                <h3 className="h5 font-weight-bold">Car Details</h3>
                <p className="mb-1"><strong>Make:</strong> {data.carMake}</p>
                <p className="mb-1"><strong>Model:</strong> {data.carModel}</p>
                <p className="mb-1"><strong>Year:</strong> {data.carYear}</p>
                <p className="mb-1"><strong>License Plate:</strong> {data.licensePlate}</p>

              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
