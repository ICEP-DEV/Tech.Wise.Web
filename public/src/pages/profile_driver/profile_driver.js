import React from 'react'
import { Link } from 'react-router-dom'

const Profile_driver = () => {
  return (
    <div className='container py-5 mb-5 '>

      <div className="container d-flex justify-content-center align-items-center  customReg-margin-top">
        <form className="p-4 shadow-lg rounded bg-light">
          <div className="text-center mb-2">
            <img src="path_to_your_image.jpg" alt="Driver Profile" className="img-fluid" />
          </div>
          <h1 className="text-center mb-3">Profile</h1>
          <div className="row mb-2">
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>First Name:</b></label>
                <p className="form-control-static">David</p>
              </div>
              <div className="form-group">
                <label><b className='text-black'>Last Name:</b></label>
                <p className="form-control-static">Dlamini</p>
              </div>
              <div className="form-group">
                <label><b className='text-black'>Email Address:</b></label>
                <p className="form-control-static">dlamini01@gmail.com</p>
              </div>
              <div className="form-group">
                <label><b className='text-black'>Phone Number:</b></label>
                <p className="form-control-static">087 456 7896</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label><b className='text-black'>Physical Address:</b></label>
                <p className="form-control-static">A32 Area7 Soshanguve Block L 0123</p>
              </div>
              <div className="form-group">
                <label><b className='text-black'>Car Make:</b></label>
                <p className="form-control-static">Toyota</p>
              </div>
              <div className="form-group">
                <label><b className='text-black'>Car Model:</b></label>
                <p className="form-control-static">Corolla</p>
              </div>
              <div className="form-group">
                <label><b className='text-black'>Car Year:</b></label>
                <p className="form-control-static">2020</p>
              </div>
              <div className="form-group">
                <label><b className='text-black'>License Plate:</b></label>
                <p className="form-control-static">ABC123</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link to="/profileUpdate driver">
              <button className="btn btn-primary btn-lg px-5">Edit</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile_driver


