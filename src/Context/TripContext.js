import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

// Create the TripContext
export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [isRideAccepted, setIsRideAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize socket connection
  const socket = io('http://localhost:8085');

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
      console.log('tripCancelled event received33333333333');
      toast.success(`Trip has been cancelled.`, {
        duration: 5000, // Toast will stay for 5 seconds
      });
      setIsRideAccepted(false);  // Update the state or perform any additional actions
    });
    // Event listener for trip cancellation
    socket.on('customerCancelTrip', () => {
      console.log('customerCancelTrip event received4444444444444444');
      toast.success(`Trip has been cancelled by customer.`, {
        duration: 5000, // Toast will stay for 5 seconds
      });
      setIsRideAccepted(false);  // Update the state or perform any additional actions
    });


    // Clean up listeners on unmount
    return () => {
      socket.off('tripAccepted');
      socket.off('customerCancelTrip');
      socket.off('tripCancelled');
    };
  }, []);

  return (
    <TripContext.Provider value={{ socket, isRideAccepted, setIsRideAccepted, loading, setLoading }}>
      {children}
    </TripContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useTrip = () => useContext(TripContext);
