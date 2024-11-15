import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppRoutes from "./pages/Routers/AppRoutes";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
// import { DriverProvider } from './contexts/DriverContext';
import { DriverProvider } from './Context/DriverContext'; // Import DriverProvider
import { TripProvider } from "./Context/TripContext";
import { useDriver } from './Context/DriverContext'; // Import the custom hook

function App() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [driverId, setDriverId] = useState(null);  // State to store driverId
  const [role, setRole] = useState(null);  // State to store role
  const [customerId, setCustomerId] = useState(null);  // State to store role
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8085/user')
      .then(res => {
        const { valid, username, role, userId, email } = res.data;
        if (valid) {
          setUserData({ username, role, userId, email });
        } else {
          navigate('/');
        }
      })
      .catch(err => console.error("Error fetching user data:", err));
  }, []);

  // Logging userData inside useEffect to ensure it's up-to-date
  useEffect(() => {
    if (userData) {
      console.log("Username:", userData.username);
      console.log("Role:", userData.role);
      console.log("User ID:", userData.userId);
      console.log("User email:", userData.email); 
    }
    if (userData && userData.role === 'driver') {
      setDriverId(userData.userId);  // Set driverId when the user is a driver
      setRole(userData.role);  // Set the role as 'driver'
      console.log('logged in as a driver*******');
    }
    if (userData && userData.role === 'customer') {
      setCustomerId(userData.userId); 
    }
  }, [userData]);
  // console.log('customerId5555555555', customerId);

  // Access the device position via DriverContext
  const { driverPosition } = useDriver(); // Destructure devicePosition safely

  // Log the device position whenever it changes
  useEffect(() => {
    if (driverPosition) {
      console.log("Driver position updated:", driverPosition);
    } else {
      console.log("Waiting for driver position...");
    }
  }, [driverPosition]); // Only run when devicePosition changes



  return (
    <TripProvider customerId={customerId}>
      <DriverProvider driverId={driverId} role={role}>  {/* Wrap the entire app with DriverProvider */}
        <div className="mx-w-4 mx-auto">
          <Navbar userName={userData ? userData.username : ''} roles={userData ? userData.role : ''} userId={userData ? userData.userId : ''} />
          <div className="max-w-7xl mx-auto mt-6">
            {userData && userData.role === 'admin' ? (
              <AppRoutes isAdmin={true} userId={userData.userId} AdminRole={userData.role} emails={userData ? userData.email : ''} />
            ) : (
              <AppRoutes isAdmin={false} userId={userData ? userData.userId : ''} roles={userData ? userData.role : ''} userName={userData ? userData.username : ''} emails={userData ? userData.email : ''} />
            )}
          </div>
          <Footer />
        </div>
      </DriverProvider> 
    </TripProvider>
  );
}

export default App;
