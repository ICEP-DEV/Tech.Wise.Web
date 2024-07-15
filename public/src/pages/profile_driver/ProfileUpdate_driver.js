import React from 'react';
import { Link } from 'react-router-dom';

const ProfileUpdate_driver = () => {
  return (
    <div className='container py-5 mb-5 '>

      <div className="container-fluid d-flex flex-column justify-content-between align-items-center customReg-margin-top">
        <form className="p-5 shadow-lg rounded bg-light">
          <div className="text-center mb-4">
            <img src="path_to_your_image.jpg" alt="Driver Profile" className="img-fluid" />
          </div>
          <h1 className="text-center mb-4">Profile</h1>
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>First Name:</b></label>
                <input type="text" className="form-control" name="firstName" defaultValue="David" />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Last Name:</b></label>
                <input type="text" className="form-control" name="lastName" defaultValue="Dlamini" />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Email Address:</b></label>
                <input type="email" className="form-control" name="email" defaultValue="dlamini01@gmail.com" />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Phone Number:</b></label>
                <input type="tel" className="form-control" name="phoneNumber" defaultValue="087 456 7896" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>Physical Address:</b></label>
                <textarea className="form-control" name="address" rows="3" defaultValue="A32 Area7 Soshanguve Block L 0123"></textarea>
              </div>
              <div className="form-group">
                <label><b className='text-black'>Car Make:</b></label>
                <input type="text" className="form-control" name="carMake" defaultValue="Toyota" />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Car Model:</b></label>
                <input type="text" className="form-control" name="carModel" defaultValue="Corolla" />
              </div>
              <div className="form-group">
                <label><b className='text-black'>Car Year:</b></label>
                <input type="number" className="form-control" name="carYear" defaultValue="2020" />
              </div>
              <div className="form-group">
                <label><b className='text-black'>License Plate:</b></label>
                <input type="text" className="form-control" name="licensePlate" defaultValue="ABC123" />
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link to="/profile driver">
              <button type="submit" className="btn btn-primary btn-lg px-5">Update</button>
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ProfileUpdate_driver;






