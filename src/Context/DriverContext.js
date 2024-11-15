import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Creating context to share device position
const DriverContext = createContext({
  driverPosition: null,
  driverId: null,
  role: null,
}); 

// Custom hook to access device position
export const useDriver = () => {
  return useContext(DriverContext);
};

// Provider component to share state
export const DriverProvider = ({ children, driverId, role }) => {
  const [driverPosition, setDriverPosition] = useState(null);

  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     console.error('Geolocation is not supported by this browser.');
  //     return;
  //   }
  
  //   console.log('Watching device position...');
  
  //   const watchId = navigator.geolocation.watchPosition(
  //     (position) => {
  //       const newPosition = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };
  //       console.log('New device position:', newPosition);
  //       setDriverPosition(newPosition);
  
  //       // Send position to backend if driverId and newPosition are available
  //       // if (driverId && newPosition) {
  //       //   axios.put('http://localhost:8085/api/driverPosition', {
  //       //     driverId, // Pass the driverId to identify which driver to update
  //       //     location: newPosition, // Send the position (lat, lng)
  //       //   })
  //       //   .then((response) => {
  //       //     console.log('Driver position updated:', response.data);
  //       //   })
  //       //   .catch((error) => {
  //       //     console.error('Error updating driver position:', error);
  //       //   });
  //       // }
  //     },
  //     (error) => console.error('Error getting device position:', error),
  //     { enableHighAccuracy: true }
  //   );
  
  //   // Cleanup: stop watching the position when the component is unmounted
  //   return () => navigator.geolocation.clearWatch(watchId);
  // }, [driverId]); // Runs the effect whenever the driverId changes
  //get location from database
  useEffect(() => {
    if (driverId) {
      // Fetch driver details from the API
      axios.get(`http://localhost:8085/api/driver/${driverId}`)
        .then((response) => {
          console.log('Driver details fetched:', response.data);
  
          // Extract coordinates from the response (assuming the response structure is { location: { lat, lng } })
          const { lat, lng } = response.data.location || {};
  
          if (lat && lng) {
            // Create a new position object with the fetched coordinates
            const newPosition = {
              lat: parseFloat(lat),  // Ensure it's a valid number
              lng: parseFloat(lng),
            };
  
            // Update the driver's position with the new coordinates
            setDriverPosition(newPosition);
          } else {
            console.error('Invalid location data:', response.data.location);
          }
        })
        .catch((error) => {
          console.error('Error fetching driver details:', error);
        });
    }
  }, [driverId]);   //Runs the effect whenever the driverId changes
  return (
    <DriverContext.Provider value={{ driverPosition, driverId, role }}>
      {children}
    </DriverContext.Provider>
  );
};
