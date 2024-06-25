import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import axios from 'axios';

const ProfileUpdate = () => {
  axios.defaults.withCredentials = true;
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    // Fetch customer information from the backend API
    axios.get(`http://localhost:8085/userInfo/${id}`)
      .then(res => {
        console.log(res);
        const { name, lastName, email, phoneNumber, address } = res.data[0];
        setFormData({ name, lastName, email, phoneNumber, address });
      })
      .catch(error => {
        console.error('Error fetching customer information:', error);
      });
  }, [id]); // Include id in the dependency array

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Data to be sent:", formData); // Log the data to be sent
      const response = await axios.put(`http://localhost:8085/edit_customer/${id}`, formData);
      // console.log(response.data); // Log the response data
      window.location.href = '/profile-customer'; // Redirect to the profile page
    } catch (error) {
      console.log(error);
    }
  };
  

  
  return (
    <div className='container py-5 mb-5 '>
      <div className="container-fluid d-flex flex-column justify-content-between align-items-center customReg-margin-top">
        <form onSubmit={handleSubmit} className="p-5 shadow-lg rounded bg-light">
          <div className="text-center mb-4">
            <img src={assets.profile2} alt="customer update Profile" className=" rounded-circle w-50" />
          </div>
          <h1 className="text-center mb-4">Profile</h1>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>First Name:</b></label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Last Name:</b></label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Email Address:</b></label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Phone Number:</b></label>
                <input
                  type="tel"
                  className="form-control"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>Physical Address:</b></label>
                <textarea
                  className="form-control"
                  name="address"
                  rows="3"
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  value={formData.address}>
                </textarea>
              </div>
            </div>
          </div>
          <div className="text-center">
            {/* <Link to="/profile-customer"> */}
              <button type="submit" className="btn btn-primary btn-lg px-5">Update</button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
