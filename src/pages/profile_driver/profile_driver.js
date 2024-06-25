import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import axios from 'axios'

const Profile_driver = ({ userId }) => {
  axios.defaults.withCredentials = true;

  const [driverInfo, setDriverInfo] = useState(null);
  const [carListings, setCarListings] = useState([]);
  const [driver, setDriverMoreInfo] = useState([]);
  
  const [error, setError] = useState(null);
  //fetch driver personal details
  useEffect(() => {
    // Fetch customer information from the backend API
    axios.get(`http://localhost:8085/userInfo/${userId}`)
      .then(response => {
        // Check if the response contains data
        if (response.data && response.data.length > 0) {
          setDriverInfo(response.data[0]);
          setError(null); // Reset error state
        } else {
          setError('No driver information found');
        }
      })
      .catch(error => {
        console.error('Error fetching driver information:', error);
        setError('Failed to fetch driver information');
      });

    // Fetch car listings by userId from the backend API
    axios.get(`http://localhost:8085/car_listing/user`, { params: { userId } })
      .then(response => {
        if (response.data && response.data.carListings) {
          setCarListings(response.data.carListings);
          setError(null);
        } else {
          setError('No car listings found');
        }
      })
      .catch(error => {
        console.error('Error fetching car listings:', error);
        setError('Failed to fetch car listings');
      });

         // Fetch car listings by userId from the backend API
         axios.get(`http://localhost:8085/more_details/user`, { params: { userId } })
         .then(response => {
           if (response.data && response.data.driver) { // <-- Check for 'driver' key
             setDriverMoreInfo(response.data.driver); // <-- Correct key used here
             setError(null);
           } else {
             setError('No extra driver details found');
           }
         })
         .catch(error => {
           console.error('Error fetching more driver details:', error);
           setError('Failed to fetch more driver details');
         });
     
  }, [userId]);
  // Include userId in the dependency array



  return (
    <div className='container py-5 mb-5 '>

      <div className="container d-flex justify-content-center align-items-center  customReg-margin-top">
        <form className="p-4 shadow-lg rounded bg-light">
          <h1 className="text-center mb-3">Profile</h1>
          <div className="text-center mb-2">
            <img src={assets.profile2} alt="Driver Profile" className=" rounded-circle w-50" />
          </div>
          <div>------------------------------------------------------------------------------</div>
          {error && <p className="text-danger">{error}</p>}
          {driverInfo && (
            <div className="row mb-2">
              <div className="col-md-6">
                <h2>Driver details</h2>
                <div className="form-group">
                  <label><b className='text-black'>First Name:</b></label>
                  <p className="form-control-static">{driverInfo.name}</p>
                </div>
                <div className="form-group">
                  <label><b className='text-black'>Last Name:</b></label>
                  <p className="form-control-static">{driverInfo.lastName}</p>
                </div>
                <div className="form-group">
                  <label><b className='text-black'>Email Address:</b></label>
                  <p className="form-control-static">{driverInfo.email}</p>
                </div>
                <div className="form-group">
                  <label><b className='text-black'>Phone Number:</b></label>
                  <p className="form-control-static">{driverInfo.phoneNumber}</p>
                </div>
                <div className="form-group">
                  <label><b className='text-black'>Physical Address:</b></label>
                  <p className="form-control-static">{driverInfo.address}</p>
                </div>
                <h2>Other details</h2>
                {driver.map(moreInfo=> (
                  <div key={moreInfo.id}>
                 <div className="form-group">
                 <label><b className='text-black'>Police clearance:</b></label>
                 <p className="form-control-static">{moreInfo.police_clearance ? 'Uploaded' : 'Not Uploaded'}</p>
               </div>
               <div className="form-group">
                 <label><b className='text-black'>PDP:</b></label>
                 <p className="form-control-static">{moreInfo.pdp ? 'Uploaded' : 'Not Uploaded'}</p>
               </div>
               </div>
                ))}
              </div>
              <div className="col-md-6">
                <h2>Car details</h2>
                {carListings.map(car => (
                  <div key={car.id}>
                    <div className="form-group">
                      <label><b className='text-black'>Car Make:</b></label>
                      <p className="form-control-static">{car.car_make}</p>
                    </div>
                    <div className="form-group">
                      <label><b className='text-black'>Car Model:</b></label>
                      <p className="form-control-static">{car.car_model}</p>
                    </div>
                    <div className="form-group">
                      <label><b className='text-black'>Car Year:</b></label>
                      <p className="form-control-static">{car.car_year}</p>
                    </div>
                    <div className="form-group">
                      <label><b className='text-black'>Number of seats:</b></label>
                      <p className="form-control-static">{car.number_of_seats}</p>
                    </div>
                    <div className="form-group">
                      <label><b className='text-black'>Car colour:</b></label>
                      <p className="form-control-static">{car.car_colour}</p>
                    </div>
                    <div className="form-group">
                      <label><b className='text-black'>Car image:</b></label>
                      <img src={`http://localhost:8085/documents/${car.car_image.substring(car.car_image.lastIndexOf('\\') + 1)}`} alt={car.car_image} className="img-fluid" />

                    </div>

                    <div className="form-group">
                      <label><b className='text-black'>License Plate:</b></label>
                      <p className="form-control-static">{car.license_plate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-center">
            <Link to="/profileUpdate-driver">
              <button className="btn btn-primary btn-lg px-5">Edit</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile_driver


