import React, { useContext, useEffect, useState } from 'react';
import InputItem from './InputItem';
import { DestinationContext } from '../../Context/DestinationContext'
import { SourceContext } from '../../Context/SourceContext'
import CarListOptions from './CarListOptions';

const SearchSection = () => {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [distance, setDistance] = useState(null); // Declare distance using useState hook

  useEffect(() => {
    if (source) {
      console.log(source);
    }
    if (destination) {
      console.log(destination);
    }
  }, [source, destination]);

  // Function to calculate the distance between two points using the Haversine formula
  const computeDistanceBetween = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  // Function to convert degrees to radians
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Function to ensure the values are valid numbers
  const isValidNumber = (value) => {
    return typeof value === 'number' && !isNaN(value);
  };

  const calculateDistance = () => {
    // Check if all required values are valid numbers
    if (
      isValidNumber(source.lat) &&
      isValidNumber(source.lon) &&
      isValidNumber(destination.lat) &&
      isValidNumber(destination.lon)
    ) {
      const dist = computeDistanceBetween(
        source.lat,
        source.lon,
        destination.lat,
        destination.lon
      );
      setDistance(dist);
    } else {
      console.error('Invalid latitude or longitude values');
    }
  };

  return (
<div className='container mt-5'>
<h1 className='text-lg md:text-2xl font-bold'>Get a ride</h1>
  <div className='p-3 md:p-5 border border-1 rounded-xl'>
  
    <InputItem type='source' />
    <InputItem type='destination' />
    <button className='btn btn-primary bg-black btn-lg w-full md:w-auto mt-4 md:mt-5' onClick={calculateDistance}>
      Search
    </button>
  </div>
  {distance !== null && <CarListOptions distance={distance} pickup={source} />}
  
</div>

  );
};

export default SearchSection;
