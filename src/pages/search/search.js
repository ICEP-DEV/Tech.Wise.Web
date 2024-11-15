import React, { useState, useEffect } from 'react';
import GoogleMapSection1 from '../../components/map/GoogleMapSection1';
import SearchSection1 from '../../components/map/SearchSection1';
import CustomerDetails from '../../components/Drivermap/CustomerDetails';
import DriverDetails from '../../components/CustomerMap/DriverDetails';
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import '../../index.css';
import { LoadScript } from '@react-google-maps/api';
import { DriverProvider } from '../../Context/DriverContext';
import { useTrip } from '../../Context/TripContext';

const Search = ({ roles, userId, userName, emails }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const { socket, isRideAccepted, setIsRideAccepted, loading, setLoading } = useTrip();

  // State to handle the delayed component rendering
  const [showComponent, setShowComponent] = useState(null);

  useEffect(() => {
    console.log('Roles:', roles);
  }, [roles]);

  useEffect(() => {
    // Delay the component change for 3 seconds
    const timer = setTimeout(() => {
      setShowComponent(isRideAccepted ? 'driver' : 'search');
    }, 3000); // 3-second delay

    return () => clearTimeout(timer); // Cleanup the timeout on unmount or role change
  }, [isRideAccepted]);

  const isDriver = roles && roles.includes('driver');

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript 
          libraries={['places']} 
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        >
          <div className='container-fluid mt-5 p-5'>
            <div className='row row-map'>
              <div className='col-md-4 full-width-on-tablet'>
                <div className='py-4 mt-5 shadow-lg rounded bg-light'>
                  {isDriver ? (
                    <CustomerDetails driverId={userId} driverName={userName} role={roles} />
                  ) : showComponent === 'driver' ? (
                    <DriverDetails userId={userId} customerName={userName} emails={emails} role={roles} />
                  ) : showComponent === 'search' ? (
                    <SearchSection1 userId={userId} customerName={userName} emails={emails} />
                  ) : null}
                </div>
              </div>

              <div className="col-md-8 mt-4 p-4">
                <GoogleMapSection1 roles={roles} userId={userId} />
              </div>
            </div>
          </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
};

export default Search;
