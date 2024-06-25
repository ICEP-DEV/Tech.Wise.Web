import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminApp.css';
import Trip from './Trip';
import AdminApp from './AdminApp';

const CancelledRides = () => {
    const [rides, setRides] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch canceled rides data from the backend
        axios.get('http://localhost:8085/trips')
            .then(response => {
                setRides(response.data);
            })
            .catch(error => {
                console.error('Error fetching canceled rides:', error);
            });
    }, []);

    const filteredRides = rides.filter(ride =>
        (ride.rideType && ride.rideType.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.customerName && ride.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.driverName && ride.driverName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.pickUpLocation && ride.pickUpLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.dropOffLocation && ride.dropOffLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.vehicle_type && ride.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ride.statuses && ride.statuses.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const CancelledRides = filteredRides.filter(ride => ride.statuses === 'cancelled');

    return (
        <AdminApp>
        <div className="container py-4 mb-5 mt-4">
            <h2 className="mb-4 text-dark">Cancelled Rides</h2>
            <div className="d-flex justify-content-between mb-3">
                <div><Link to="/adminapp" className="btn btn-outline-primary">Back</Link></div>
                <div className="input-group" style={{ maxWidth: '250px' }}>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-primary" type="button">Search</button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped ">
                <thead className="bg-dark">
                        <tr>
                            <th className='text-white'>#</th>
                            {/* <th className='text-white'>Ride Type</th> */}
                            <th className='text-white'>Rider Name</th>
                            <th className='text-white'>Driver Name</th>
                            <th className='text-white'>Pick Date Time</th>
                            <th className='text-white'>Trip End Time</th>
                            <th className='text-white'>Pick Address</th>
                            <th className='text-white'>Drop Address</th>
                            <th className='text-white'>Vehicle Type</th>
                            <th className='text-white'>Reason</th>
                            <th className='text-white'>Cancel By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CancelledRides.map(ride => (
                        <tr key={ride.id}>
                        <td>{ride.id}</td>
                        {/* <td>{ride.rideType}</td> */}
                        <td>{ride.customerName}</td>
                        <td>{ride.driverName}</td>
                        <td>{ride.requestDate}</td>
                        <td>{ride.dropOffTime}</td>
                        <td>{ride.pickUpLocation}</td>
                        <td>{ride.dropOffLocation}</td>
                        <td>{ride.vehicle_type}</td>
                        <td>{ride.cancellation_reason}</td>
                        <td>{ride.cancel_by}</td>
                        
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </AdminApp>
    );
};

export default CancelledRides;