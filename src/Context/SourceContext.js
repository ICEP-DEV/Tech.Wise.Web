import { createContext, useState, useContext } from "react";

export const SourceContext = createContext(null);

export const SourceProvider = ({ children }) => {
  // The source context stores both coordinates and role
  const [source, setSource] = useState({ 
    lat: null, 
    lng: null, 
    role: null  // 'driver' or 'customer'
  });

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      {children}
    </SourceContext.Provider>
  );
};
