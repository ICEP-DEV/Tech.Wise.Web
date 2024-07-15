import React, { useState } from 'react';
import "../../components/FormStyle/FormStyles.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!values.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!values.email.trim() || !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      await axios.post('http://localhost:8085/signup', values);
      navigate('/Login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };


  return (
    <div className='container py-5 mt-5 mb-5'>
      <div className="py-5 px-4  rounded-lg shadow-lg bg-white"> {/* Center the form */}
        <form onSubmit={handleSubmit} className="py-5 px-4 mt-0 rounded-lg shadow-lg bg-white">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name "
              className={`border ${errors.name ? 'border-danger ' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}

              onChange={handleInput}

            />
            {errors.name && <p className="text-danger  text-xs italic">Please enter the name</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email "
              className={`border ${errors.email ? 'border-danger ' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}

              onChange={handleInput}

            />
            {errors.email && <p className="text-danger  text-xs italic">Please enter a valid Email</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password "
              className={`border ${errors.password ? 'border-danger ' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}

              onChange={handleInput}

            />
            {errors.password && <p className="text-danger  text-xs italic">Please enter a valid Password</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="Password" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password "
              className={`border ${errors.confirmPassword ? 'border-danger ' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}

              onChange={handleInput}

            />
            {errors.confirmPassword && <p className="text-danger font-italic">Please enter the same Password</p>}
          </div>
          <button type='submit' className='btn btn-primary btn-lg btn-block rounded-pill'>Sign Up</button>
          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account?</span>
            <Link to="/login" className="text-primary  font-semibold ml-1">Login</Link>
          </div>
        </form>
      </div>

    </div>

  );
}

export default Registration;
