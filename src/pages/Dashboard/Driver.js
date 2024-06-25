import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminApp.css';
import AdminApp from './AdminApp';

const DriversTable = () => {
    axios.defaults.withCredentials = true;

    const [drivers, setDrivers] = useState([]);
    const [editDriverId, setEditDriverId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        state: '',
        status: '',
        role: ''
    });

    useEffect(() => {
        // Fetch drivers when the component mounts
        axios.get('http://localhost:8085/viewDrivers')
            .then(response => {
                console.log('Response:', response);
                console.log('Fetched drivers:', response.data);
                setDrivers(response.data); // Update state with fetched data
            })
            .catch(error => {
                console.error('Error fetching drivers data:', error);
            });
    }, []);

    const handleEditClick = (driver) => {
        setEditDriverId(driver.id);
        setFormData({
            name: driver.name,
            lastName: driver.lastName,
            email: driver.email,
            phoneNumber: driver.phoneNumber,
            address: driver.address,
            state: driver.state,
            role: driver.role,
            status: driver.status
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form Edited Driver Data:', formData); // Log formData before sending
        axios.put(`http://localhost:8085/edit_driver/${editDriverId}`, formData)
            .then(response => {
                setDrivers(drivers.map(driver =>
                    driver.id === editDriverId ? { ...driver, ...formData } : driver
                ));
                setEditDriverId(null);
            })
            .catch(error => {
                console.error('Error updating driver:', error);
            });
    };


    const handleCancelEdit = () => {
        setEditDriverId(null);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8085/delete_driver/${id}`)
            .then(response => {
                setDrivers(drivers.filter(driver => driver.id !== id));
            })
            .catch(error => {
                console.error('Error deleting driver:', error);
            });
    };

    return (
        <AdminApp>
        <div className="container py-4 mb-5 mt-4">
            <h2 className="mb-4 text-dark">All Drivers</h2>
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <Link to="/adminapp" className="btn btn-outline-primary float-left py- mb-">Back</Link>
                </div>
                <div className="input-group" style={{ maxWidth: '250px' }}>
                    <input type="text" className="form-control form-control-sm" placeholder="Search..." />
                    <button className="btn btn-outline-primary" type="button">Search</button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table">
                    <thead className='bg-dark'>
                        <tr>
                            <th className='text-white'>#</th>
                            <th className='text-white'>Name</th>
                            <th className='text-white'>Last Name</th>
                            <th className='text-white'>Email</th>
                            <th className='text-white'>Contact</th>
                            <th className='text-white'>Address</th>
                            <th className='text-white'>Role</th>
                            <th className='text-white'>State</th>
                            <th className='text-white'>Status</th>
                            <th className='text-white'>More details</th>
                            <th className='text-white'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map(driver => (
                            <tr key={driver.id}>
                                <td>{driver.id}</td>
                                <td>
                                    {editDriverId === driver.id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        driver.name
                                    )}
                                </td>
                                <td>
                                    {editDriverId === driver.id ? (
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        driver.lastName
                                    )}
                                </td>
                                <td>
                                    {editDriverId === driver.id ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        driver.email
                                    )}
                                </td>
                                <td>
                                    {editDriverId === driver.id ? (
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        driver.phoneNumber
                                    )}
                                </td>
                                <td>
                                    {editDriverId === driver.id ? (
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        driver.address
                                    )}
                                </td>
                                <td>
                                    {editDriverId === driver.id ? (
                                        <select
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        >
                                            <option value={driver.role}>{driver.role}</option>
                                            <option value="customer">Customer</option>
                                            <option value="driver">Driver</option>
                                        </select>
                                    ) : (
                                        driver.role
                                    )}
                                </td>
                                <td>
                                    {editDriverId === driver.id ? (
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        >
                                            <option value={driver.state}>{driver.state}</option>
                                            <option value="Online">Online</option>
                                            <option value="Offline">Offline</option>
                                        </select>
                                    ) : (
                                        driver.state
                                    )}
                                </td>
                                <td>
                                    {editDriverId === driver.id ? (
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        >
                                            <option value={driver.status}>{driver.status}</option>
                                            <option value="approved">Approved</option>
                                            <option value="declined">Declined</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    ) : (
                                        driver.status
                                    )}
                                </td>

                                <td>
                                    <Link to={`/viewDriver/${driver.id}`} className="btn btn-info me-2">Ride History</Link>
                                    <Link to={`/driverDocuments/${driver.id}`} className="btn btn-info me-2">Documents</Link>
                                    {/* <button className="btn btn-info me-2">Document List</button> */}
                                </td>
                                <td>
                                    {editDriverId === driver.id ? (
                                        <>
                                            <button className="btn btn-success me-2" onClick={handleFormSubmit}>Save</button>
                                            <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-info me-2" onClick={() => handleEditClick(driver)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(driver.id)}>Delete</button>
                                        </>
                                    )}
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

export default DriversTable;
