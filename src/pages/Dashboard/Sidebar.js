import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminApp.css';
import {
    BsFillArchiveFill, BsFillGearFill, BsFillGrid3X3GapFill,
    BsFillMenuButtonWideFill, BsGrid1X2Fill, BsListCheck, BsPeopleFill
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, toggleSidebar }) {
    const [ridesDropdownOpen, setRidesDropdownOpen] = useState(false);

    const toggleRidesDropdown = () => {
        setRidesDropdownOpen(!ridesDropdownOpen);
    };

    // console.log("Sidebar state:", openSidebarToggle); // Debug log

    return (
        
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            {/* <div className='sidebar-title'>
                <span className='icon close_icon d-flex justify-content-between' onClick={toggleSidebar}>X</span>
            </div> */}
            <ul className='sidebar-list mt-5'>
            <div className='sidebar-title'>
            <span className='icon close_icon   d-flex justify-content-end  mb-2 mt-3  ' onClick={toggleSidebar}>X</span>
            </div>
                <li className='sidebar-list-item'>
                    <Link to="/adminapp">
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </Link>
                </li>
                {/* <li className='sidebar-list-item'>
                    <Link to="/driver">
                        <BsFillArchiveFill className='icon' /> Driver list
                    </Link>
                </li> */}
                <li className='sidebar-list-item'>
                    <Link to="/customerRide">
                        <BsFillGrid3X3GapFill className='icon' /> Customers
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/driver">
                        <BsPeopleFill className='icon' /> Driver
                    </Link>
                </li>
                <li className={`sidebar-list-item ${ridesDropdownOpen ? 'open' : ''}`} onClick={toggleRidesDropdown}>
                    <div className='dropdown-toggle'>
                        <BsListCheck className='icon' />
                        <span className=" text-dark"> Rides</span>
                    </div>

                    <ul className='dropdown-menu'>
                        <li className='dropdown-item'>
                            <Link to="/trip">All Rides</Link>
                        </li>
                        <li className='dropdown-item'>
                            <Link to="/schedule">Scheduled Rides</Link>
                        </li>
                        <li className='dropdown-item'>
                            <Link to="/completedRides">Completed Rides </Link>
                        </li>
                        <li className='dropdown-item'>
                            <Link to="/cancelled">Cancelled Rides</Link>
                        </li>
                    </ul>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/vehicle">
                        <BsFillMenuButtonWideFill className='icon' /> Vehicle Type
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/riderRatings">
                        <BsFillMenuButtonWideFill className='icon' /> Rider Ratings
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/driverRatings">
                        <BsFillMenuButtonWideFill className='icon' /> Driver Ratings
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/earnings">
                        <BsFillMenuButtonWideFill className='icon' /> Earning Report
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/push">
                        <BsFillMenuButtonWideFill className='icon' /> Push Notification
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/setting">
                        <BsFillGearFill className='icon' /> Setting
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
