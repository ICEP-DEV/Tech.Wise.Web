import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from '../Home/Home';
import About from '../About/About';
import Contact from '../Contact/Contact';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/Registration';
import Profile_driver from '../profile_driver/profile_driver';
import ProfileUpdate_driver from '../profile_driver/ProfileUpdate_driver';
import Profile_customer from '../profile_customer/profile_customer';
import ProfileUpdate_customer from '../profile_customer/ProfileUpdate_customer';
import Search from '../search/search';
import DriverLocation from '../../components/map/DriverLocation';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/signup' element={<RegistrationForm />} />
      <Route path='/profile driver' element={<Profile_driver />} />
      <Route path='/profileUpdate driver' element={<ProfileUpdate_driver />} />
      <Route path='/profile driver' element={<Profile_customer />} />
      <Route path='/profileUpdate driver' element={<ProfileUpdate_customer />} />
      <Route path='/search' element={<Search />} />
      <Route path='/DriverLocation' element={<DriverLocation />} />

    </Routes>
  );
}

export default AppRoutes;
