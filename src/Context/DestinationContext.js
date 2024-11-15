import { createContext, useState, useContext } from "react";

export const DestinationContext = createContext(null);

export const DestinationProvider = ({ children }) => {
  // The destination context stores both coordinates and role
  const [destination, setDestination] = useState({ 
    lat: null, 
    lng: null, 
    role: null  // 'driver' or 'customer'
  });

  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      {children}
    </DestinationContext.Provider>
  );
};
