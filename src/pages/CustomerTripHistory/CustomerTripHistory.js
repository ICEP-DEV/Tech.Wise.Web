import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaClock, FaRoad, FaCalendarAlt, FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './CustomerTripHistory.css';

const CustomerTripHistory = ({ userId }) => {
    axios.defaults.withCredentials = true;
    const [allTrips, setAllTrips] = useState([]);
    const [onGoingTrips, setOnGoingTrips] = useState([]);
    const [completedTrips, setCompletedTrips] = useState([]);
    const [cancelledTrips, setCancelledTrips] = useState([]);
    const [driverDetails, setDriverDetails] = useState({});
    const [error, setError] = useState(null);
    const [expandedTripIndex, setExpandedTripIndex] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8085/customerTripHistory/${userId}`)
            .then(response => {
                if (response.data) {
                    setAllTrips(response.data);
                    setError(null);
                    const ongoing = response.data.filter(trip => trip.statuses === 'on-going');
                    const completed = response.data.filter(trip => trip.statuses === 'completed');
                    const cancelled = response.data.filter(trip => trip.statuses === 'cancelled');
                    setOnGoingTrips(ongoing);
                    setCompletedTrips(completed);
                    setCancelledTrips(cancelled);

                    // Fetch driver details for each trip
                    response.data.forEach(trip => {
                        if (trip.driverId) {
                            axios.get(`http://localhost:8085/driverDetails/${trip.driverId}`)
                                .then(driverResponse => {
                                    setDriverDetails(prevDetails => ({
                                        ...prevDetails,
                                        [trip.driverId]: driverResponse.data,
                                    }));
                                })
                                .catch(error => {
                                    console.error(`Error fetching driver details for driver ${trip.driverId}:`, error);
                                });
                        }
                    });
                } else {
                    setError('No trips found');
                }
            })
            .catch(error => {
                console.error('Error fetching trips:', error);
                setError('Failed to fetch trips');
            });
    }, [userId]);

    const handleExpandClick = (index) => {
        setExpandedTripIndex(expandedTripIndex === index ? null : index);
    };

    return (
        <div className='customer-trip-container py-5 mt-5'>
            <div className="p-4 rounded bg-white">
                <h1 className="customer-trip-heading-large text-dark mb-4">Trip History</h1>

                {/* On-Going Trips Section */}
                {onGoingTrips.length > 0 && (
                    <div>
                        <h3 className="text-start mb-4">Present</h3>
                        {onGoingTrips.map((trip, index) => (
                            <div key={index} className="customer-trip-card mb-4 p-3 shadow-sm rounded d-flex align-items-center">
                                <div className="trip-details flex-grow-1">
                                    <div className="d-flex align-items-center mb-2">
                                        <FaHourglassHalf style={{ color: '#ffc107', marginRight: '8px' }} />
                                        <b className='text-dark'>Status:</b> On-Going
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaCalendarAlt style={{ color: '#007bff', marginRight: '8px' }} />
                                        <b className='text-dark'>Request Date:</b> {new Date(trip.requestDate).toLocaleDateString()}
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaMapMarkerAlt style={{ color: '#28a745', marginRight: '8px' }} />
                                        <b className='text-dark'>Drop-Off Location:</b> {trip.dropOffLocation}
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaRoad style={{ color: '#dc3545', marginRight: '8px' }} />
                                        <b className='text-dark'>Distance Traveled:</b> {trip.distance_traveled} km
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <b className='text-dark'>Amount:</b> {trip.amount} ZAR
                                    </div>
                                </div>

                                {/* Driver Details */}
                                {driverDetails[trip.driverId] && (
                                    <div className="driver-details d-flex align-items-center ms-3">
                                        <img src={driverDetails[trip.driverId].photo} alt={driverDetails[trip.driverId].name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                        <div className="ms-2">
                                            <p><strong>Driver:</strong> {driverDetails[trip.driverId].name}</p>
                                            <p><strong>Rating:</strong> {driverDetails[trip.driverId].rating || 'N/A'}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Completed Trips Section */}
                {completedTrips.length > 0 ? (
                    <div>
                        <h3 className="text-start mb-4">Past</h3>
                        {completedTrips.map((trip, index) => (
                            <div key={index} className="customer-trip-card mb-4 p-3 shadow-sm rounded d-flex align-items-center" onClick={() => handleExpandClick(index)}>
                                <div className="trip-details flex-grow-1">
                                    <div className="d-flex align-items-center mb-2">
                                        <FaCheckCircle style={{ color: '#28a745', marginRight: '8px' }} />
                                        <b className='text-dark'>Status:</b> Completed
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaCalendarAlt style={{ color: '#007bff', marginRight: '8px' }} />
                                        <b className='text-dark'>Request Date:</b> {new Date(trip.requestDate).toLocaleDateString()}
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaMapMarkerAlt style={{ color: '#28a745', marginRight: '8px' }} />
                                        <b className='text-dark'>Drop-Off Location:</b> {trip.dropOffLocation}
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaRoad style={{ color: '#dc3545', marginRight: '8px' }} />
                                        <b className='text-dark'>Distance Traveled:</b> {trip.distance_traveled} km
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <b className='text-dark'>Amount:</b> {trip.amount} ZAR
                                    </div>
                                </div>

                                {/* Driver Details */}
                                {driverDetails[trip.driverId] && (
                                    <div className="driver-details d-flex align-items-center ms-3">
                                        <img src={driverDetails[trip.driverId].photo} alt={driverDetails[trip.driverId].name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                        <div className="ms-2">
                                            <p><strong>Driver:</strong> {driverDetails[trip.driverId].name}</p>
                                            <p><strong>Rating:</strong> {driverDetails[trip.driverId].rating || 'N/A'}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No completed trips found.</p>
                )}

                {/* Cancelled Trips Section */}
                {cancelledTrips.length > 0 && (
                    <div>
                        <h3 className="text-start mb-4">Cancelled</h3>
                        {cancelledTrips.map((trip, index) => (
                            <div key={index} className="customer-trip-card mb-4 p-3 shadow-sm rounded d-flex align-items-center">
                                <div className="trip-details flex-grow-1">
                                    <div className="d-flex align-items-center mb-2">
                                        <FaTimesCircle style={{ color: '#dc3545', marginRight: '8px' }} />
                                        <b className='text-dark'>Status:</b> Cancelled
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaCalendarAlt style={{ color: '#007bff', marginRight: '8px' }} />
                                        <b className='text-dark'>Request Date:</b> {new Date(trip.requestDate).toLocaleDateString()}
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaMapMarkerAlt style={{ color: '#28a745', marginRight: '8px' }} />
                                        <b className='text-dark'>Drop-Off Location:</b> {trip.dropOffLocation}
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <FaRoad style={{ color: '#dc3545', marginRight: '8px' }} />
                                        <b className='text-dark'>Distance Traveled:</b> {trip.distance_traveled} km
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                        <b className='text-dark'>Amount:</b> {trip.amount} ZAR
                                    </div>
                                </div>

                                {driverDetails[trip.driverId] && (
                                    <div className="driver-car-details ms-3">
                                        {/* Driver Info (Row 1) */}
                                        <div className="driver-info d-flex align-items-center mb-3">
                                            <img
                                                src={`http://localhost:8085/documents/${driverDetails[trip.driverId].photo}`}
                                                alt="Driver"
                                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                            />
                                            <div className="ms-2">
                                                <p><strong>Driver:</strong> {driverDetails[trip.driverId].name}</p>
                                                <p><strong>Rating:</strong> {driverDetails[trip.driverId].rating || 'N/A'}</p>
                                            </div>
                                        </div>

                                        {/* Car Info (Row 2) */}
                                        <div className="car-info d-flex align-items-center">
                                            <img
                                                src={`http://localhost:8085/documents/${driverDetails[trip.driverId].car_image}`}
                                                alt="Car"
                                                style={{ width: '50px', height: '50px', borderRadius: '8px' }}
                                            />
                                            <div className="ms-2">
                                                <p><strong>Car Model:</strong> {driverDetails[trip.driverId].car_model}</p>
                                                <p><strong>License Plate:</strong> {driverDetails[trip.driverId].license_plate}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Error Handling */}
            {error && (
                <p className="text-danger">{error}</p>
            )}
        </div>
    );
};

export default CustomerTripHistory;