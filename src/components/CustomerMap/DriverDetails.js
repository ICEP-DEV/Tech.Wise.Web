import React, { useState, useEffect, useContext } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import { useTrip } from '../../Context/TripContext';
import '../Drivermap/CustomerDetails.css';

const DriverDetails = ({ driverId = 23 }) => {
  const [driverData, setDriverData] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);
  const { setSource } = useContext(SourceContext);
  const { setDestination } = useContext(DestinationContext);
  const { socket } = useTrip();

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/driver-details/${driverId}`);
        console.log("Driver data received:", response.data); // Log the response data
        setDriverData(response.data); // Expecting response to be { driver: {...}, carDetails: {...} }
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    };
  
    fetchDriverDetails();
  }, [driverId]);
  
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setDriverPosition({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => console.error('Error getting driver position:', error)
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    const starColor = '#FFD700';

    return (
      <>
        {[...Array(fullStars)].map((_, index) => <FaStar key={`full-${index}`} style={{ color: starColor }} />)}
        {halfStar === 1 && <FaStarHalfAlt style={{ color: starColor }} />}
        {[...Array(emptyStars)].map((_, index) => <FaRegStar key={`empty-${index}`} style={{ color: starColor }} />)}
      </>
    );
  };

  const calculateArrivalTime = (distance) => {
    const speed = 60;
    const timeInMinutes = (distance / speed) * 60;

    if (timeInMinutes < 60) {
      return `${Math.round(timeInMinutes)} min`;
    } else {
      const hours = Math.floor(timeInMinutes / 60);
      const minutes = Math.round(timeInMinutes % 60);
      return `${hours} hr ${minutes} min`;
    }
  };

  const handleDriverTripCancel = () => {
    if (socket) {
      socket.emit('customerCancelTrip', driverData.tripId, driverId);
    }
  };

  if (!driverData) {
    return <div>Loading driver details...</div>;
  }

  const { driver, carDetails } = driverData;

  return (
    <div className="driver-details-container">
      <h1 className="text-center text-dark mb-3">Driver Details</h1>
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0"><FaPhoneAlt className="me-2 text-primary" />{driver.name} {driver.lastName}</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
              <img src={`http://localhost:8085/documents/${driver.photo}`} alt="Driver Profile" className="img-fluid rounded-circle border border-dark" style={{ width: '145px', height: '140px' }} />
              <div className="rating mb-2 d-flex align-items-center">
                {renderStars(driver.rating || 4.5)}
              </div>
              <div className="mb-2 d-flex align-items-center">
                <FaPhoneAlt className="me-2 text-primary" /><span>{driver.phoneNumber}</span>
              </div>
              <div className="driver-details-price rounded-lg p-2 mb-4 text-center bg-light shadow-sm">
                <p className="mb-0 mt-2" style={{ fontSize: '1.8rem' }}>R: {driver.amount || 150.00}</p>
              </div>
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
              <h3 className="mb-3">Car Details</h3>
              <h6 className="mb-2">License Plate</h6>
              <p>{carDetails.license_plate}</p>
              <h6 className="mb-2">Car Model</h6>
              <p>{carDetails.car_model}</p>
              <h6 className="mb-2">Car Color</h6>
              <p>{carDetails.car_colour}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-primary" style={{ width: '48%' }}>Chat</button>
        <button className="btn btn-danger" style={{ width: '48%' }} onClick={handleDriverTripCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DriverDetails;
