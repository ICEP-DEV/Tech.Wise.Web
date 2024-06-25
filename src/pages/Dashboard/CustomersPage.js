import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminApp from './AdminApp';

const CustomersPage = () => {
    axios.defaults.withCredentials = true;
    const [customers, setCustomers] = useState([]);
    const [editCustomerId, setEditCustomerId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
        address: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8085/viewCustomers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching customer data:', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8085/customers/${id}`)
            .then(response => {
                setCustomers(customers.filter(customer => customer.id !== id));
            })
            .catch(error => {
                console.error('Error deleting customer:', error);
            });
    };

    const handleEditClick = (customer) => {
        setEditCustomerId(customer.id);
        setFormData({
            name: customer.name,
            lastName: customer.lastName,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            // role: customer.role,
            address: customer.address
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
        axios.put(`http://localhost:8085/edit_customer/${editCustomerId}`, formData)
            .then(response => {
                setCustomers(customers.map(customer =>
                    customer.id === editCustomerId ? { ...customer, ...formData } : customer
                ));
                setEditCustomerId(null);
            })
            .catch(error => {
                console.error('Error updating customer:', error);
            });
    };

    const handleCancelEdit = () => {
        setEditCustomerId(null);
    };

    return (
        <AdminApp>
        <div className="container py-4 mb-5 mt-4">
            <h2 className="mb-4 text-dark">All Customers</h2>
            <div className="d-flex justify-content-between mb-3">
                <Link to="/adminapp" className="btn btn-outline-primary float-left mb-1">Back</Link>
                <div className="input-group" style={{ maxWidth: '250px' }}>
                    <input type="text" className="form-control form-control-sm" placeholder="Search..." />
                    <button className="btn btn-outline-primary" type="button">Search</button>
                </div>
            </div>
            <table className="table">
                <thead className='bg-dark'>
                    <tr>
                        <th className='text-white'>#</th>
                        <th className='text-white'>Name</th>
                        <th className='text-white'>Last Name</th>
                        <th className='text-white'>Email</th>
                        {/* <th className='text-white'>Role</th> */}
                        <th className='text-white'>Contact No.</th>
                        <th className='text-white'>Address</th>
                        <th className='text-white'>Other Actions</th>
                        <th className='text-white'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>
                                {editCustomerId === customer.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    customer.name
                                )}
                            </td>
                            <td>
                                {editCustomerId === customer.id ? (
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    customer.lastName
                                )}
                            </td>
                            <td>
                                {editCustomerId === customer.id ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    customer.email
                                )}
                            </td>
                            {/* <td>
                                    {editCustomerId === customer.id ? (
                                        <select
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        >
                                            <option value={customer.role}>{customer.role}</option>
                                            <option value="driver">Driver</option>
                                            <option value="customer">customer</option>
                                        </select>
                                    ) : (
                                        customer.role
                                    )}
                                </td> */}
                            <td>
                                {editCustomerId === customer.id ? (
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    customer.phoneNumber
                                )}
                            </td>
                            <td>
                                {editCustomerId === customer.id ? (
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    customer.address
                                )}
                            </td>
                            <td>
                                <div className="btn-group">
                                    <Link to={`/rideHistory/${customer.id}`} className="btn btn-info me-2">Ride History</Link>
                                </div>
                            </td>
                            <td>
                                {editCustomerId === customer.id ? (
                                    <>
                                        <button className="btn btn-success me-2" onClick={handleFormSubmit}>Save</button>
                                        <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-info me-2" onClick={() => handleEditClick(customer)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(customer.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </AdminApp>
    );
};

export default CustomersPage;
