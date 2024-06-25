import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'; // Assuming you have an assets module
import axios from 'axios';
// import './Navbar.css'

const Navbar = ({ userName, roles, userId }) => {
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:8085/logout')
      .then(res => {
        // If logout is successful, you can redirect the user to the login page
        window.location.href = '/login'; // Redirect to the home page
      })
      .catch(error => {
        console.error('Error logging out:', error);
        // Handle error if logout fails
      });
  };

  const handleRideWithUs = () => {
    if (!userName || !roles || !userId) {
      window.location.href = '/login'; // Use navigate for redirection
    } else {
      // Handle logic for "Ride with us" button action
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm" id="mainNav">
      <div className="container px-5">
        <a className="navbar-brand fw-bold " href="/">
          <img src={assets.logoNthome} alt="Logo" className="img-fluid w-5 me-2" />
          Nthome Ridez
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
            <li className="nav-item"><Link to="/" className="nav-link me-lg-3"  >Home</Link></li>
            <li className="nav-item"><Link to="/about" className="nav-link me-lg-3"  >About</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link me-lg-3"  >Contact</Link></li>
            <li className="nav-item"><Link to="/drivers" className="nav-link me-lg-3"  >Driving</Link></li>
            <li className="nav-item"><Link to="/customers" className="nav-link me-lg-3"  >Requesting</Link></li>
            <li className="nav-item">
              {roles === "admin" ?
                <Link to="/adminapp" className="nav-link me-lg-3"  >Dashboard</Link>
                : null
              }
            </li>
            <li className="nav-item">
              {roles === "customer" || roles === "admin" || roles === "driver" ?
                <Link to="/logout" onClick={handleLogout} className="nav-link me-lg-3"  >Logout</Link>
                :
                <Link to="/login" className="nav-link me-lg-3"  >Login</Link>
              }
            </li>
          </ul>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
            {roles === "driver" && (
              <Link to="/search">
                <button onClick={handleRideWithUs} className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0">
                  <span className="small">Drive with us</span>
                </button>
              </Link>
            )}
            {roles === "customer" && (
              <Link to="/search">
                <button onClick={handleRideWithUs} className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0">
                  <span className="small">Ride with us</span>
                </button>
              </Link>
            )}
            {(roles === "customer" || roles === "driver") && userName && ( // Render profile icon only if userName exists and not admin
              <>
                <Link to="/profile-customer" className="mt-2 mt-lg-0">
                  <button className="btn btn-light d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px', padding: '0', marginLeft: '10px' }}>
                    <img src={assets.profile1} alt="Profile" className="rounded-circle" style={{ width: '100%', height: '100%' }} />
                  </button>
                </Link>
                <span>{userName}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
