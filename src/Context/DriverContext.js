// src/Context/DriverContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create context to share driver position
const DriverContext = createContext();

// Custom hook to access the driver position
export const useDriver = () => {
  return useContext(DriverContext);
};

// Provider component
export const DriverProvider = ({ children, driverId }) => {
  const [driverPosition, setDriverPosition] = useState(null);

  useEffect(() => {
    console.log('Driver ID:', driverId);  // Log driverId to see its value
    if (!driverId) {
        console.error('Driver ID is missing, cannot update location.');
        return;
    }

    // Continue with the position watching logic...
  }, [driverId]);

  useEffect(() => {
    if (!driverId) {
        console.error('Driver ID is missing, cannot update location.');
        return; // Don't start watching position until driverId is available
    }

    // Watch the driver's position using the Geolocation API
    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            const newPosition = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            };
            setDriverPosition(newPosition);

            // Only update location if driverId is provided
            updateDriverLocation(driverId, newPosition.lat, newPosition.lon);
        },
        (error) => {
            console.error('Error getting driver position:', error);
        },
        { enableHighAccuracy: true } // optional: for better accuracy
    );

    // Cleanup: Stop watching the position when the component unmounts
    return () => {
        navigator.geolocation.clearWatch(watchId);
    };
  }, [driverId]); // Ensure the effect runs again if driverId changes

  // Function to update the driver location in the database
  const updateDriverLocation = async (driverId, current_lat, current_lng) => {
    if (!driverId) {
      console.error('Driver ID is missing');
      return; // Prevent update if no driverId
    }

    console.log('Updating location for driverId:', driverId); // Debugging: Check driverId value
    
    // try {
    //   const response = await axios.put(`http://localhost:8085/api/driver/update-location/${driverId}`, {
    //     current_lat,
    //     current_lng,
    //   });

    //   if (response.status === 200) {
    //     console.log('Driver location updated in the database');
    //   } else {
    //     console.error('Failed to update driver location:', response);
    //   }
    // } catch (error) {
    //   console.error('Error updating driver location in the database:', error);
    // }
  };

  return (
    <DriverContext.Provider value={{ driverPosition }}>
      {children}
    </DriverContext.Provider>
  );
};
