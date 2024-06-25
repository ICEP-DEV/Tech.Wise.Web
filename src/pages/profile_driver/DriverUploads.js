import React, { useState, useEffect } from 'react';
import "../../components/FormStyle/FormStyles.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { IoIosArrowBack } from 'react-icons/io';

const DriverUploads = ({ userId }) => {
    axios.defaults.withCredentials = true;
    const [formData, setFormData] = useState({
        photo: null,
        id_copy: null,
        police_clearance: null,
        pdp: null,
        gender: '',
        userId: userId
    });
    console.log("User IDsss:", userId);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const handleInput = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileInput = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, [name]: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation checks
        let errors = {};
        let formIsValid = true;
    
        if (!formData.photo) {
            formIsValid = false;
            errors["photo"] = "Please upload a photo";
        }
    
        if (!formData.id_copy) {
            formIsValid = false;
            errors["id_copy"] = "Please upload an ID copy";
        }
    
        if (!formData.police_clearance) {
            formIsValid = false;
            errors["police_clearance"] = "Please upload a police clearance";
        }
    
        if (!formData.pdp) {
            formIsValid = false;
            errors["pdp"] = "Please upload a PDP";
        }
    
        setErrors(errors);
    
        // Configuring headers
        const config = { 
            headers: { 'Content-Type': 'multipart/form-data' } 
        }
    
        // If form is valid, proceed with submission
        if (formIsValid) {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append('photo', formData.photo);
                formDataToSend.append('id_copy', formData.id_copy);
                formDataToSend.append('police_clearance', formData.police_clearance);
                formDataToSend.append('pdp', formData.pdp);
                formDataToSend.append('gender', formData.gender);
                formDataToSend.append('userId', userId);
    
                const response = await axios.post('http://localhost:8085/driver_details', formDataToSend, config);
                // Redirect or do something else after successful submission
                navigate('/car_details');
            } catch (error) {
                console.error('Error uploading personal details:', error);
            }
        }
    };
    
    return (
        <div className='container py-5 mb-5 '>
            <div className="container-fluid d-flex flex-column justify-content-between align-items-center customReg-margin-top">
                <form onSubmit={handleSubmit} className="p-5 shadow-lg rounded bg-light" encType={'multipart/form-data'}>
                    <Link to="/drivers">
                        <button type="button" className="btn btn-outline-primary btn-lg px-3 mb-3 ml-3">
                            <IoIosArrowBack className="mr-2" />
                        </button>
                    </Link>
                    {/* <h1 className="text-center mb-4">{name}</h1> */}
                    <div className="text-center mb-4">
                        <img src={assets.profile2} alt="customer update Profile" className=" rounded-circle w-50" />
                    </div>
                    <h1 className="text-center mb-4">Personal Details</h1>
                    <div className="row mb-3">

                        <div className="col-md-6">
                            <div className="form-group">
                                <label><b className='text-black'>Photo:</b></label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="photo"
                                    onChange={handleFileInput}
                                    required
                                />
                                <span className="text-danger">{errors["photo"]}</span>
                            </div>
                            <div className="form-group">
                                <label><b className='text-black'>ID Copy:</b></label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="id_copy"
                                    onChange={handleFileInput}
                                    required
                                />
                                <span className="text-danger">{errors["id_copy"]}</span>
                            </div>
                            <div className="form-group">
                                <label><b className='text-black'>Gender:</b></label>
                                <select
                                    className="form-control"
                                    name="gender"
                                    onChange={handleInput}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label><b className='text-black'>Police Clearance:</b></label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="police_clearance"
                                    onChange={handleFileInput}
                                    required
                                />
                                <span className="text-danger">{errors["police_clearance"]}</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label><b className='text-black'>PDP:</b></label>
                                <input
                                    className="form-control"
                                    type="file"
                                    name="pdp"
                                    onChange={handleFileInput}
                                    required
                                />
                                <span className="text-danger">{errors["pdp"]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center ">
                        <button type="submit" className="btn btn-primary btn-lg px-5">Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default DriverUploads
