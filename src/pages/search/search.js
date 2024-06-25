import React, { useState, useEffect } from 'react';
import GoogleMapSection from "../../components/map/GoogleMapSection";
import SearchSection from "../../components/map/SearchSection";
import CustomerDetails from "../../components/Drivermap/CustomerDetails"; // Import the CustomerDetails component
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import '../../index.css';

const Search = ({ roles, userId, userName }) => {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  useEffect(() => {
    console.log('Roles:', roles); // Log the roles prop to the console for testing
  }, [roles]);

  // Check if the user has the 'driver' role
  const isDriver = roles && roles.includes('driver');

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <div className='container-fluid mt-5 p-5'>
          <div className='row row-map'>
            <div className='col-md-4 full-width-on-tablet'>
              <div className='py-4 shadow-lg rounded bg-light'>
                {isDriver ? <CustomerDetails /> : <SearchSection userId={userId} customerName={userName} />}
              </div>
            </div>
            <div className="col-md-8 mt-4 p-4">
              <GoogleMapSection />
            </div>
          </div>
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}

export default Search;
