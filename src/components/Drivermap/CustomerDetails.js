import React, { useState } from 'react';
import { assets } from '../../assets/assets';


const CustomerDetails = () => {
  // Sample data for demonstration
  const customersData = [
    {
      id: 1,
      name: 'David Dlamini',
      phoneNumber: '0715066988',
      rating: 4.73,
      distance: '3 kms away | 12 mins',
      fromLocation: '2020 Block L Soshanguve Pretoria, South Africa',
      toLocation: '2020 Block L Soshanguve Pretoria, South Africa',
      price: 'R120.00'
    },
    {
      id: 2,
      name: 'Over DeMoon',
      phoneNumber: '0712345678',
      rating: 4.89,
      distance: '5 kms away | 15 mins',
      fromLocation: '123 Main St, Cityville, USA',
      toLocation: '456 Oak Ave, Townsville, USA',
      price: 'R150.00'
   },
    {
      id: 3,
      name: 'Donald',
      phoneNumber: '0712345678',
      rating: 4.89,
      distance: '5 kms away | 15 mins',
      fromLocation: '123 Main St, Cityville, USA',
      toLocation: '456 Oak Ave, Townsville, USA',
      price: 'R150.00'
   },
    {
      id: 4,
      name: 'Adel',
      phoneNumber: '0712345678',
      rating: 4.89,
      distance: '5 kms away | 15 mins',
      fromLocation: '123 Main St, Cityville, USA',
      toLocation: '456 Oak Ave, Townsville, USA',
      price: 'R150.00'
   },
    // Add more customers as needed
  ];

  const [expandedCustomerId, setExpandedCustomerId] = useState(customersData[0].id); // Initialize with the ID of the first customer

  const toggleDetails = (customerId) => {
    if (expandedCustomerId === customerId) {
      setExpandedCustomerId(null);
    } else {
      setExpandedCustomerId(customerId);
    }
  };

  return (
    <div className="customer-details-container">
                  <h1 className="text-center mb-3">Trip Requsts</h1>
      {customersData.map((customer) => (
        <div key={customer.id} className="card mb-4">
          
          <div
            className={`card-header d-flex justify-content-between align-items-center ${expandedCustomerId === customer.id ? 'bg-dark text-white' : 'bg-light'}`}
            onClick={() => toggleDetails(customer.id)}
            style={{ cursor: 'pointer' }}
          >
            <h5 className="mb-0">{customer.name}</h5>
            <span>{expandedCustomerId === customer.id ? '-' : '+'}</span>
          </div>
          {expandedCustomerId === customer.id && (
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                  <h1 className="text-center mb-3">New Ride</h1>
                  <div className="mb-3 d-flex justify-content-center align-items-center">
                    <img
                      src={assets.profile}
                      alt="profile-picture"
                      className="img-fluid rounded-circle border border-dark"
                      style={{ width: '150px', height: '150px' }}
                    />
                  </div>
                  <div className="customer-details-price rounded-lg p-2 mb-4 text-center">
                    <p className="mb-0 mt-2" style={{ fontSize: '1.8rem' }}>{customer.price}</p>
                  </div>
                </div>
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                  <div className="customer-info mb-4">
                    <div className="d-flex justify-content-center align-items-center mb-1">
                      <p className="mb-0 me-4">{customer.distance}</p>
                      <p className="rating mb-0">Rating: {customer.rating}</p>
                    </div>
                    <h4 className="mb-1">From</h4>
                    <p className="customer-location mb-2">{customer.fromLocation}</p>
                    <h4 className="mb-1">To</h4>
                    <p className="customer-location mb-3">{customer.toLocation}</p>
                    <p className="mb-0">{customer.phoneNumber}</p>
                    <div className="mt-3">
                      <p className="mb-0">{customer.additionalDetails}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="Buttons d-inline-flex gap-2 ">
                      <button className="btn btn-success px-3 py-2">Accept</button>
                      <button className="btn btn-danger px-4 py-2">Decline</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CustomerDetails;
