import React, { useEffect, useState } from 'react';
import CarListOptions from './CarListOptions';

const DriverLocation = () => {
  const [driverPosition, setDriverPosition] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setDriverPosition({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting driver position:', error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (driverPosition) {
      console.log('Driver Position:', driverPosition.lat, driverPosition.lon);
    }
  }, [driverPosition]);

  return (
    <div>
      <h1>Driver Location Watcher</h1>
      <CarListOptions driverPosition={driverPosition} />
    </div>
  );
};

export default DriverLocation;
