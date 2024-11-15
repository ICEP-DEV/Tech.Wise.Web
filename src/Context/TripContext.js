import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import axios from 'axios';

// Create the TripContext
export const TripContext = createContext();

export const TripProvider = ({ children, customerId }) => {
  const [isRideAccepted, setIsRideAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pickup, setPickup] = useState(null); // State for storing pickup location

  // Initialize socket connection
  const socket = io('http://localhost:8085');



 
  // Function to fetch pickup location from the database
  // const fetchPickupLocation = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8085/api/trip/pickup/${tripId}`);
  //     setPickup(response.data.pickup); // Set pickup location in state
  //   } catch (error) {
  //     console.error('Error fetching pickup location:', error);
  //     toast.error('Failed to fetch pickup location.');
  //   }
  // };

  useEffect(() => {
    // Event listener for trip acceptance
    socket.on('tripAccepted', () => {
      console.log('tripAccepted event received');
      toast.success('Your ride is being accepted!', {
        duration: 5000, // Toast will stay for 5 seconds
      });
      setIsRideAccepted(true);
      setLoading(false);

    });

    // Event listener for trip cancellation
    socket.on('tripCancelled', () => {
      console.log('tripCancelled event received');
      toast.success(`Trip has been cancelled.`, {
        duration: 5000, // Toast will stay for 5 seconds
      });
      setIsRideAccepted(false);  // Update the state or perform any additional actions
    });

    // Event listener for customer trip cancellation
    socket.on('customerCancelTrip', () => {
      console.log('customerCancelTrip event received');
      toast.success(`Trip has been cancelled by customer.`, {
        duration: 5000, // Toast will stay for 5 seconds
      });
      setIsRideAccepted(false);  // Update the state or perform any additional actions
    });

    // Clean up listeners on unmount
    return () => {
      socket.off('tripAccepted');
      socket.off('tripCancelled');
      socket.off('customerCancelTrip');
    };
  }, []);

  return (
    <TripContext.Provider value={{ socket, isRideAccepted, setIsRideAccepted, loading, setLoading, pickup }}>
      {children}
    </TripContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useTrip = () => useContext(TripContext);
