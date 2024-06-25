import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminApp.css';
import AdminApp from './AdminApp';

const RideTable = () => {
    axios.defaults.withCredentials = true;

    const [rides, setRides] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Fetch ride data from the backend API
      axios.get('http://localhost:8085/rides')
        .then(response => {
          setRides(response.data);
          setError(null); // Reset error state
        })
        .catch(error => {
          console.error('Error fetching rides:', error);
          setError('Failed to fetch rides');
        });
    }, []);

    const filteredRides = rides.filter(ride =>
        ride.rideType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
    <AdminApp>
        <div className="container py-5 mb-5 mt-">
            <h2 className="mb-4 text-dark">All Rides</h2>
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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ride Type</th>
                            <th>Rider Name</th>
                            <th>Driver Name</th>
                            <th>Pick Date Time</th>
                            <th>Trip End Time</th>
                            <th>Pick / Drop Address</th>
                            <th>Vehicle Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRides.map(ride => (
                            <tr key={ride.rideId}>
                                <td>{ride.rideId}</td>
                                <td>{ride.rideType}</td>
                                <td>{ride.riderName}</td>
                                <td>{ride.driverName}</td>
                                <td>{ride.pickDateTime}</td>
                                <td>{ride.tripEndTime}</td>
                                <td>{ride.address}</td>
                                <td>{ride.vehicleType}</td>
                                <td>
                                    <p className={`btn btn-${ride.status === 'Completed' ? 'success' : ride.status === 'Cancelled' ? 'danger' : 'primary'}`}>
                                        {ride.status}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </AdminApp>
    );
};

export default RideTable;
