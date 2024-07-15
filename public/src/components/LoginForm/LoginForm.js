import React, { useState } from 'react';
import "../../components/FormStyle/FormStyles.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};


    if (!values.email.trim() || !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
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
      await axios.post('http://localhost:8085/login', values);
      navigate('/');
    } catch (error) {
      console.error('Error login:', error);
    }
  };


    return (
      <div className='container py-5  mt-5 mb-5 '>

<div className="py-5 px-4  rounded-lg shadow-lg bg-white "> {/* Center the form */}
          <form onSubmit={handleSubmit} className="py-5 px-4 mt-0 rounded-lg shadow-lg bg-white">
            <div className="mb-4">
              <label htmlFor="Email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email "
                className={`border ${errors.email ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
                // value={formData.Email}
                onChange={handleInput}
              />
              {errors.email && <p className="text-danger text-xs italic">Please enter a valid Email</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="Password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password "
                className={`border ${errors.password ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
                onChange={handleInput}
              />
              {errors.password && <p className="text-danger text-xs italic">Please enter the Password</p>}
            </div>
            
              <button type='submit' className='btn btn-primary btn-lg btn-block rounded-pill'>Login</button>
              <div className="text-center mt-4">
            <span className="text-gray-600">No account yet?</span>
            <Link to="/signup" className="text-primary font-semibold ml-1">Signup</Link>
          </div>
            </form>
</div>
</div>



    );
}

export default LoginForm;
