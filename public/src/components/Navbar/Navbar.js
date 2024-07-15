import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'; // Assuming you have an assets module
// import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm" id="mainNav">
            <div className="container px-5">
                <a className="navbar-brand fw-bold" href="/">Nthome Ridez</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
                        <li className="nav-item"><Link to="/" className="nav-link me-lg-3"  >Home</Link></li>
                        <li className="nav-item"><Link to="/about" className="nav-link me-lg-3"  >About</Link></li>
                        <li className="nav-item"><Link to="/contact" className="nav-link me-lg-3"  >Contact</Link></li>
                        <li className="nav-item"><Link to="/login" className="nav-link me-lg-3"  >Login</Link></li>
                    </ul>
                    <div className="d-flex align-items-center">
                        {/* Assuming the user profile picture is available in your assets */}
                        <Link to="/search">
                        <button className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
                            <span className="small">Ride with us</span>
                        </button>
                        </Link>
                        <Link to="/profile driver">
                        <button className="btn btn-light   d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', padding: '0', marginLeft: '10px'}}>
                        <img src={assets.profile1} alt="Profile" className="rounded-circle" style={{ width: '100%', height: '100%' }} />
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
