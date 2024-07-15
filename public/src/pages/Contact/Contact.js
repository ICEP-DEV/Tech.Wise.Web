import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
const Contact = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'visitor'
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!values.subject) {
      errors.subject = 'subject is required';
      isValid = false;
    }

   if (!values.message) {
      errors.message = 'message is required';
      isValid = false;
    }
  //   if (!values.email.trim() || !/\S+@\S+\.\S+/.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //     isValid = false;
  //   }

  //   if (values.password.length < 8) {
  //     errors.password = 'Password must be at least 8 characters long';
  //     isValid = false;
  //   }

  //   if (values.password !== values.confirmPassword) {
  //     errors.confirmPassword = 'Passwords do not match';
  //     isValid = false;
  //   }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post('http://localhost:8001/signup', values);
      navigate('/Login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='container py-5'>
      <div className='row'>
        <div className='col'>
          <header>
            {/* { <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <div className='container-fluid'>
                <span className='navbar-brand'>Home</span>
                <span className='navbar-brand'>About</span>
                <span className='navbar-brand'>Contact</span>
                <span className='navbar-brand'>SignUp</span>
              </div>
            </nav> } */}
          </header>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 py-5 mt-5 bg-light'>
          <div className='container'>
            <h1 className='display-4'>Nthome Courier</h1>
            <h2>Contact Us</h2>
            <p className='h5'>Address: 4652 N Mamabolo street, Pretoria West, South Africa</p>
            <p>Numbers: +27 84 234 6914, +27 84 234 6918</p>
            <p>Email: info@nthome.com</p>
            <p>Facebook: Nthome Express Couriers</p>
            <p>X: @Nthomekp</p>
            <p>Instagram: @Nthomekp</p>
          </div>
        </div>
        <div className='col-md-6'> 
          <div className='container'>
            <form onSubmit={handleSubmit} className="py-5 px-4 rounded-lg shadow-lg bg-white">
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 text-sm font-semibold mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject of Enquiry"
                className={`border ${errors.subject ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
                // value={formData.subject}
                onChange={handleInput}
                // onBlur={handleBlur}
              />
              {errors.subject && <p className="text-danger text-xs italic">Please enter the subject</p>}
            </div>
              <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows='3'
                placeholder="Write us a message"
                className={`border ${errors.message ? 'border-danger' : 'border-gray-300'} form-control rounded-lg py-2 px-3 text-sm md:text-base lg:text-lg focus:outline-none focus:border-blue-500`}
                // value={formData.message}
                onChange={handleInput}
                // onBlur={handleBlur}
              />
              {errors.message && <p className="text-danger text-xs italic">Please enter your message</p>}
            </div>
              <button type='submit' className='btn btn-primary btn-lg btn-block rounded-pill'>Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col'>
          <div className='container'>
            {/* Placeholder for the map */}
            <p>Map goes here</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d230025.97999465867!2d28.089436582161955!3d-25.732356294416075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s4652%20N%20Mamabolo%20street%2C%20Pretoria%20West%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1715240210321!5m2!1sen!2sza" 
              width="100%"
              height="450"
              style={{ border: '0' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      {/* <div className='row mt-5'>
        <div className='col text-center'>
          <p className='h5'>Address: 4652 N Mamabolo street, Pretoria West, South Africa</p>
          <p>Numbers: +27 84 234 6914, +27 84 234 6918</p>
          <p>Email: info@nthome.com</p>
          <p>Facebook: Nthome Express Couriers</p>
          <p>X: @Nthomekp</p>
          <p>Instagram: @Nthomekp</p>
        </div>
      </div> */}
    </div>
  );
};

export default Contact;

