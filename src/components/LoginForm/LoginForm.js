import React, { useState } from 'react';
import "../../components/FormStyle/FormStyles.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({isAdmin, admin}) => {
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
      errors.passwordLength = 'Password must be at least 8 characters long';
      isValid = false;
    } else {
      // Check for lowercase letters
      if (!/[a-z]/.test(values.password)) {
        errors.passwordLowerCase = 'Password must contain at least one lowercase letter';
        isValid = false;
      }
      // Check for uppercase letters
      if (!/[A-Z]/.test(values.password)) {
        errors.passwordUpperCase = 'Password must contain at least one uppercase letter';
        isValid = false;
      }
      // Check for numbers
      if (!/\d/.test(values.password)) {
        errors.passwordNumber = 'Password must contain at least one number';
        isValid = false;
      }
      // Check for unique characters
      if (!/[^a-zA-Z0-9]/.test(values.password)) {
        errors.passwordUnique = 'Password must contain at least one unique character';
        isValid = false;
      }
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
console.log(admin)
    try {
      const response = await axios.post('http://localhost:8085/login', values);
      const { login, message, roles } = response.data;

      if (login) {
        if (admin) {
          navigate('/adminapp'); // Redirect to admin dashboard
        } else {
          navigate('/'); // Redirect to home page for other roles
        }
        window.location.reload();
      } else {
        // If login fails due to invalid credentials, set error message
        setErrors({ loginError: "Invalid email or password. Please try again." });
      }
    } catch (error) {
      console.error('Error login:', error);
      // Handle other errors (e.g., network errors)
      setErrors({ loginError: " Please enter valid email or password." });
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
            {errors.password && <p className="text-danger text-xs italic">{errors.password}</p>}
            {errors.passwordLength && <p className="text-danger text-xs italic">{errors.passwordLength}</p>}
            {errors.passwordLowerCase && <p className="text-danger text-xs italic">{errors.passwordLowerCase}</p>}
            {errors.passwordUpperCase && <p className="text-danger text-xs italic">{errors.passwordUpperCase}</p>}
            {errors.passwordNumber && <p className="text-danger text-xs italic">{errors.passwordNumber}</p>}
            {errors.passwordUnique && <p className="text-danger text-xs italic">{errors.passwordUnique}</p>}
          </div>
          {errors.loginError && <p className="text-danger text-xs italic">{errors.loginError}</p>}
          <button type='submit' className='btn btn-primary btn-lg btn-block rounded-pill'>Login</button>
          <div className="text-center mt-4">
            <span className="text-gray-600">No account yet?&nbsp;</span>
            <Link to="/signup" className="text-primary font-semibold ml-1">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
