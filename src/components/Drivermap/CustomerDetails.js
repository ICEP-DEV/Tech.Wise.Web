import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import './CustomerDetails.css';
import { FaStar, FaStarHalfAlt, FaRegStar, FaPhoneAlt, FaMapMarkerAlt, FaRoute, FaUser, FaClock } from 'react-icons/fa';
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import UpdatePayment from '../Modal/UpdatePayment';
import CancellationReasonModal from '../../components/Modal/CancellationReasonModal';
import { io } from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';
import { useTrip } from '../../Context/TripContext';
import { useDriver } from '../../Context/DriverContext'; // Import the custom hook

const socket = io.connect('http://localhost:8085');

const CustomerDetails = ({ driverId, driverName, role }) => {
  const [customersData, setCustomersData] = useState([]);
  const [expandedTripId, setExpandedTripId] = useState(null);
  // const [driverPosition, setDriverPosition] = useState(null);
  const [acceptedTrips, setAcceptedTrips] = useState([]);
  const { setSource } = useContext(SourceContext);
  const { setDestination } = useContext(DestinationContext);
  const [showUpdatePaymentModal, setShowUpdatePaymentModal] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [declinedTrips, setDeclinedTrips] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reason, setReason] = useState('');
  const [pickupCoords, setPickupLocation] = useState(null); // State to store the pickup location


  const { driverPosition } = useDriver(); // Access driver position from the custom hook
  const { socket, isRideAccepted, setIsRideAccepted, loading, setLoading } = useTrip(); // Access context values

  // // Function to validate if lat and lng are valid numbers
  // const isValidCoordinate = (lat, lng) => {
  //   return !isNaN(lat) && !isNaN(lng) && isFinite(lat) && isFinite(lng);
  // };
  // Fetch user trip details
  // Fetch user trip details and pickup location
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/user-trip-details-pending?driverId=${driverId}`);
        console.log("API response  trip details and pickup location:", response.data);

        const sortedTrips = Array.isArray(response.data.results)
          ? response.data.results.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
          : [];

        const latestTrips = sortedTrips.slice(0, 5);
        setCustomersData(latestTrips);

        const ongoingTrips = latestTrips.filter((trip) => trip.statuses === 'on-going');
        setAcceptedTrips(ongoingTrips.map((trip) => trip.trip_id));

        if (latestTrips.length > 0) {
          setExpandedTripId(latestTrips[0].trip_id);

          let pickUpCoordinates = latestTrips[0].pickUpCoordinates;
          // Convert to JSON if it's a string
          if (typeof pickUpCoordinates === 'string') {
            try {
              pickUpCoordinates = JSON.parse(pickUpCoordinates);
            } catch (error) {
              console.error("Error parsing pickUpCoordinates:", error);
              return;
            }
          }

          const { lat, lng } = pickUpCoordinates;

          // Ensure both lat and lng are valid numbers
          if (typeof lat === 'number' && !isNaN(lat) && typeof lng === 'number' && !isNaN(lng)) {
            console.log("Valid pickup coordinates:", { lat, lng });
            setPickupLocation(pickUpCoordinates);
            // setSource({ lat, lng });  // This will match the expected structure in map.panTo
          } else {
            console.error("Invalid coordinates detected:", { lat, lng });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [driverId]);

  useEffect(() => {
    console.log("Effect triggered:", { driverPosition, role, pickupCoords });

    if (driverPosition && role === 'driver') {
        const { lat, lng } = driverPosition;
        console.log("Driver position:", driverPosition); // Log driver position

        if (!isNaN(lat) && !isNaN(lng)) {
            // Valid coordinates, set them in the SourceContext with role 'driver'
            console.log("Setting source with driver position:", { lat, lng });
            setSource({ lat, lng, role: 'driver' });
        } else {
            console.error("Invalid driver position:", driverPosition);
        }
    }

    if (pickupCoords && role === 'driver') {
        const { lat, lng } = pickupCoords;
        console.log("Pickup coordinates%%%%%%%%%%%%%%%:", pickupCoords); // Log pickup coordinates

        if (!isNaN(lat) && !isNaN(lng)) {
            // Set the destination coordinates in the DestinationContext
            console.log("Setting destination with pickup coordinates:", { lat, lng });
            setDestination({ lat, lng, role: 'driver' });
        } else {
            console.error("Invalid destination coordinates:", pickupCoords);
        }
    }

}, [driverPosition, role, pickupCoords, setSource, setDestination]);


  const toggleDetails = (tripId) => {
    if (expandedTripId === tripId) {
      setExpandedTripId(null);
    } else {
      setExpandedTripId(tripId);
    }
  };

  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => x * Math.PI / 180;

    const lat1 = coords1.lat;
    const lon1 = coords1.lng;

    const lat2 = coords2.lat;
    const lon2 = coords2.lng;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const calculateDistanceToPickUp = (pickupCoords) => {
    if (driverPosition && pickupCoords) {
      return haversineDistance(driverPosition, pickupCoords).toFixed(2);
    }
    return 'N/A';
  };

  const calculateArrivalTime = (distance) => {
    if (distance !== 'N/A') {
      const speed = 120; // Average speed in km/h
      const timeInHours = distance / speed;
      const timeInMinutes = timeInHours * 60;

      if (timeInMinutes < 60) {
        return `${timeInMinutes.toFixed(0)} min`;
      } else {
        const hours = Math.floor(timeInMinutes / 60);
        const minutes = Math.round(timeInMinutes % 60);
        return `${hours} hr ${minutes} min`;
      }
    }
    return 'N/A';
  };

  const renderStars = (rating) => {
    const starColor = '#FFD700'; // Yellow color

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => <FaStar key={`full-${index}`} style={{ color: starColor }} />)}
        {halfStar === 1 && <FaStarHalfAlt style={{ color: starColor }} />}
        {[...Array(emptyStars)].map((_, index) => <FaRegStar key={`empty-${index}`} style={{ color: starColor }} />)}
      </>
    );
  };

  useEffect(() => {
    if (expandedTripId !== null && customersData.length > 0) {
      const trip = customersData.find(trip => trip.trip_id === expandedTripId);
      if (trip) {
        const { pickupCoords, dropOffCoordinates } = trip;

        setSource(pickupCoords);
        setDestination(dropOffCoordinates);
      }
    }
  }, [expandedTripId, customersData, setSource, setDestination]);

  const handleCustomerTripAccept = async (driverId, tripId) => {
    try {
      const response = await axios.post('http://localhost:8085/api/update-trip-status', { driverId, tripId });
      console.log(response.data.message);
      setAcceptedTrips([...acceptedTrips, tripId]);
      socket.emit('acceptTrip', tripId);
    } catch (error) {
      console.error('Error updating trip status:', error);
    }
  };

  const handleDeclineClick = (trip) => {
    setCurrentTrip(trip);
    setShowCancelModal(true);
  };

  const handleCustomerTripCancel = async (tripId, reason) => {
    if (!currentTrip) return;

    const { driverId, distance_traveled } = currentTrip;
    const currentDate = new Date().toISOString();
    const distance = distance_traveled;

    const cancelData = {
      driverId: driverId,
      currentDate,
      statuses: 'cancelled',
      cancellation_reason: reason,
      cancel_by: driverName,
      distance_travelled: distance
    };

    try {
      const response = await axios.patch(`http://localhost:8085/api/tripsDriver/${tripId}`, cancelData);
      console.log('Trip cancellation sent:', response.data);

      setDeclinedTrips(prevState => ({
        ...prevState,
        [tripId]: true
      }));
      setShowCancelModal(false);
      setReason('');
      socket.emit('tripCancelled', { tripId, driverId });
      window.location.reload();
    } catch (error) {
      console.error('Error cancelling trip:', error);
    }
  };

  const handlePaymentClick = (trip) => {
    setCurrentTrip(trip);
    setShowUpdatePaymentModal(true);
  };

  const updatePaymentStatus = async (tripId, status) => {
    try {
      const response = await axios.post('http://localhost:8085/api/update-payment-status', { tripId, payment_status: status ? 'Yes' : 'No' });
      console.log(response.data.message);
      const updatedData = customersData.map(trip =>
        trip.id === tripId ? { ...trip, payment_status: status ? 'Yes' : 'No' } : trip
      );
      setCustomersData(updatedData);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };
  //   useEffect(() => {
  //     if (socket) {
  //         socket.on('customerCancelTrip', ({ tripId }) => {
  //             console.log(`Trip ${tripId} was cancelled by the customer`);
  //             toast.error('The customer has cancelled the trip.', {
  //                 duration: 5000,
  //             });
  //         });

  //         // Clean up the event listener on unmount
  //         return () => {
  //             socket.off('customerCancelTrip');
  //         };
  //     }
  // }, [socket]);



  return (
    <div className="customer-details-container">
      <Toaster />
      <h1 className="text-center text-dark mb-3">Trip Requests</h1>
      {customersData.length === 0 ? (
        <div className="text-center mt-5">
          <p className="lead">No trip requests available.</p>
        </div>
      ) : (
        customersData.map((customer) => (
          <div key={customer.trip_id} className="card mb-4 shadow-sm">
            <div
              className={`card-header d-flex justify-content-between align-items-center ${expandedTripId === customer.trip_id ? 'bg-dark text-white' : 'bg-light'}`}
              onClick={() => toggleDetails(customer.trip_id)}
              style={{ cursor: 'pointer' }}
            >
              <h5 className="mb-0"><FaUser className="me-2" />{customer.customer_name} {customer.customer_lastName}</h5>
              <span>{expandedTripId === customer.trip_id ? '-' : '+'}</span>
            </div>
            {expandedTripId === customer.trip_id && (
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-center mb-3">Customer Details</h3>
                    <div className="mb-3 d-flex justify-content-center align-items-center">
                      <img
                        src={`http://localhost:8085/profile_pictures/${customer?.profile_picture}`}
                        alt="profile-picture"
                        className="img-fluid rounded-circle border border-dark"
                        style={{ width: '145px', height: '140px' }}
                      />
                    </div>
                    <div className="rating mb-2 d-flex align-items-center">
                      {renderStars(customer.driver_ratings)}
                    </div>
                    <div className="mb-2 d-flex align-items-center">
                      <FaPhoneAlt className="me-2 text-primary" /><span>{customer.customer_phoneNumber}</span>
                    </div>
                    <div className="customer-details-price rounded-lg p-2 mb-4 text-center bg-light shadow-sm">
                      <p className="mb-0 mt-2" style={{ fontSize: '1.8rem' }}>  R: {customer.amount ? customer.amount.toFixed(2) : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="mb-3">Trip Details</h3>

                    <div className="customer-info mb-4">
                      <h6 className="mb-2 d-flex align-items-center">To Pick Up</h6>
                      <div className="d-flex gap-2 justify-content-between align-items-center mb-2">
                        <p className="mb-0"><FaMapMarkerAlt className="me-2 text-info" />{calculateDistanceToPickUp(customer.pickUpLocation)} km</p>
                        <p className="rating mb-0"><FaClock className="me-2 text-warning" />{calculateArrivalTime(calculateDistanceToPickUp(customer.pickUpLocation))} away</p>
                      </div>
                      <h6 className="mb-2 d-flex align-items-center"><FaMapMarkerAlt className="me-2 text-success" />From</h6>
                      <p className="customer-location mb-2">{customer.pickUpLocation}</p>
                      <h6 className="mb-2 d-flex align-items-center"><FaMapMarkerAlt className="me-2 text-danger" />To</h6>
                      <p className="customer-location mb-3">{customer.dropOffLocation}</p>

                      <h6 className="mb-2 d-flex align-items-center"><FaRoute className="me-2 text-info" />Trip distance</h6>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <p className="mb-0">{customer.distance_traveled} km</p>
                        <p className="rating mb-0">ETA: {calculateArrivalTime(customer.distance_traveled)}</p>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <div className="d-flex mb-2">
                        {acceptedTrips.includes(customer.trip_id) ? (
                          <button
                            className="btn btn-primary rounded-pill px-3 me-2"
                            disabled
                          >
                            <span className="small">On-Going</span>
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary rounded-pill px-3 me-2"
                            onClick={() => handleCustomerTripAccept(driverId, customer.trip_id)}
                          >
                            <span className="small">{customer.statuses === 'On-Going' ? 'On-Going' : 'Accept'}</span>
                          </button>
                        )}
                        <button
                          className={`btn ${declinedTrips[customer.trip_id] ? 'btn-secondary' : 'btn-decline'} rounded-pill px-3 me-2`}
                          onClick={() => handleDeclineClick(customer)}
                          disabled={declinedTrips[customer.trip_id]}
                        >
                          <span className="small">{declinedTrips[customer.trip_id] ? 'Declined' : 'Decline'}</span>
                        </button>


                      </div>
                      {acceptedTrips.includes(customer.trip_id) ? (
                        <button
                          className="btn btn-secondary rounded-pill px-3"
                          style={{ marginTop: '10px' }} // Adjust the margin as needed
                          onClick={() => handlePaymentClick(customer)}
                        >
                          <span className="small">Got paid?</span>
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                    {showUpdatePaymentModal && (
                      <UpdatePayment
                        isOpen={showUpdatePaymentModal}
                        onClose={() => setShowUpdatePaymentModal(false)}
                        onConfirm={updatePaymentStatus}
                        trip={currentTrip}
                      />
                    )}

                    {showCancelModal && (
                      <CancellationReasonModal
                        isOpen={showCancelModal}
                        onClose={() => setShowCancelModal(false)}
                        onCancel={(reason) => {
                          if (currentTrip) {
                            handleCustomerTripCancel(currentTrip.trip_id, reason);
                          }
                        }}
                      />
                    )}

                  </div>

                </div>
              </div>
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default CustomerDetails;
