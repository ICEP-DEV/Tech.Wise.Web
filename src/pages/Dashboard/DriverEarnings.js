import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './AdminApp.css';

const DriverEarnings = () => {
    const { id } = useParams(); // Get driver ID from URL parameters
    const [rides, setRides] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch rides data from the backend API
        axios.get(`http://localhost:8085/driverEarnings/${id}`)
            .then(response => {
                setRides(response.data);
                if (response.data.length > 0) {
                    setSelectedDriver(response.data[0].driverName);
                }
                setError(null); // Reset error state
            })
            .catch(error => {
                console.error('Error fetching rides:', error);
                setError('Failed to fetch rides');
            });
    }, [id]);

    const filteredRides = rides;

    const totalAmount = filteredRides.reduce((sum, ride) => sum + ride.totalAmount, 0);
    const totalRides = filteredRides.length;

    return (
        <div className="container py- mb-5 mt-">
            <h2 className="mb-4 text-dark">Rides for {selectedDriver}</h2>
            <div className="d-flex justify-content-between mb-3">
                <div> 
                    <Link to="/earnings" className="btn btn-outline-primary">Back</Link>
                </div>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {/* <th>Ride Id</th> */}
                            <th>Driver Name</th>
                            <th>Customer Name</th>
                            <th>Vehicle Type</th>
                            <th>Trip Date</th>
                            <th>Total Trip (Minutes)</th>
                            <th>Payment Method</th>
                            <th>Amount (R)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRides.map(ride => (
                            <tr key={ride.rideId}>
                                {/* <td>{ride.rideId}</td> */}
                                <td>{ride.driverName}</td>
                                <td>{ride.riderName}</td>
                                <td>{ride.rideType}</td>
                                <td>{ride.rideDate}</td>
                                <td>{ride.totalRide}</td>
                                <td>{ride.paymentType}</td>
                                <td>{ride.totalAmount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-3">
                <h4>Total Rides: {totalRides}</h4>
                <h4>Total Amount: R{totalAmount.toFixed(2)}</h4>
            </div>
        </div>
    );
};

export default DriverEarnings;
