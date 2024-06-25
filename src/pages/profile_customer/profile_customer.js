import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Profile_customer = ({ userId }) => {
  axios.defaults.withCredentials = true;

  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch customer information from the backend API
    axios.get(`http://localhost:8085/userInfo/${userId}`)
      .then(response => {
        // Check if the response contains data
        if (response.data && response.data.length > 0) {
          setCustomerInfo(response.data[0]);
          setError(null); // Reset error state
        } else {
          setError('No customer information found');
        }
      })
      .catch(error => {
        console.error('Error fetching customer information:', error);
        setError('Failed to fetch customer information');
      });
  }, [userId]); // Include userId in the dependency array

  return (
    <div className='container py-5 mb-5'>
      <div className="container d-flex justify-content-center align-items-center customReg-margin-top">
        <form className="p-4 shadow-lg rounded bg-light">
          <div className="text-center mb-2">
            <img src={assets.profile2} alt="Driver Profile" className="rounded-circle w-50" />
          </div>
          <h1 className="text-center mb-3">Profile</h1>
          {error && <p className="text-danger">{error}</p>}
          {customerInfo && (
            <div className="row mb-2">
              <div className="col-md-6">
                <div className="form-group">
                  <label><b className='text-black'>First Name:</b></label>
                  <p className="form-control-static">{customerInfo.name}</p>
                </div>
                <div className="form-group">
                  <label><b className='text-black'>Last Name:</b></label>
                  <p className="form-control-static">{customerInfo.lastName}</p>
                </div>
                <div className="form-group">
                  <label><b className='text-black'>Email Address:</b></label>
                  <p className="form-control-static">{customerInfo.email}</p>
                </div>
                <div className="form-group">
                  <label><b className='text-black'>Phone Number:</b></label>
                  <p className="form-control-static">{customerInfo.phoneNumber}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label><b className='text-black'>Physical Address:</b></label>
                  <p className="form-control-static">{customerInfo.address}</p>
                </div>
              </div>
            </div>
          )}
          <div className="text-center">
            <Link to={`/profileUpdate-customer/${userId}`}>
              <button className="btn btn-primary btn-lg px-5">Edit</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile_customer;
