import React, { useState, useEffect } from 'react';
import { HiUser, HiOutlineClock } from 'react-icons/hi';
// import { SourceContext } from '../../Context/SourceContext'

const CarListItem = ({ car, distance, pickup }) => {
  const [driverPosition, setDriverPosition] = useState(null);
  const [distanceFromDriverToPickup, setDistance] = useState(null);

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
    // Calculate distance between driver position and pickup location
    if (driverPosition && pickup) {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(pickup.lat - driverPosition.lat);
      const dLon = deg2rad(pickup.lon - driverPosition.lon);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(driverPosition.lat)) * Math.cos(deg2rad(pickup.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceFromDriverToPickup = R * c; // Distance in km
      setDistance(distanceFromDriverToPickup);
    }
  }, [driverPosition, pickup]);

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const calculateArrivalTime = () => {
    const averageSpeed = 120; // Average driving speed in km/h (adjust as needed)
    const estimatedTimeInHours = distanceFromDriverToPickup / averageSpeed;
    const currentTime = new Date();
    const estimatedArrivalTime = new Date(currentTime.getTime() + estimatedTimeInHours * 60 * 60 * 1000);
    const timeDifferenceInMinutes = Math.floor((estimatedArrivalTime - currentTime) / (1000 * 60));

    // Calculate hours and minutes
    const hours = Math.floor(timeDifferenceInMinutes / 60);
    const minutes = timeDifferenceInMinutes % 60;

    // Return the time in hours and minutes format
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    } else {
      return `${minutes} min`;
    }
  };

  const calculateArrivalTimeToDrop = () => {
    const averageSpeed = 120; // Average driving speed in km/h (adjust as needed)
    const estimatedTimeInHours = distance / averageSpeed;
    const currentTime = new Date();
    const estimatedArrivalTime = new Date(currentTime.getTime() + estimatedTimeInHours * 60 * 60 * 1000);
    const timeDifferenceInMinutes2 = Math.floor((estimatedArrivalTime - currentTime) / (1000 * 60));

    // Calculate hours and minutes
    const hours = Math.floor(timeDifferenceInMinutes2 / 60);
    const minutes = timeDifferenceInMinutes2 % 60;

    // Return the time in hours and minutes format
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    } else {
      return `${minutes} min`;
    }
  };

  const estimatedTimeDifference = calculateArrivalTime();
  const estimatedTimeDifference2 = calculateArrivalTimeToDrop();

  console.log('Distance:', distance);
  console.log('time from drop of to Pickup:', estimatedTimeDifference2);
  console.log('Distance from Driver to Pickup:', distanceFromDriverToPickup);

  if (car.status !== 'available') {
    return null; // If the status of the car is not available, don't render the component
  }

  return (
    <div className="flex flex-col md:flex-col lg:flex-row items-center justify-between mt-5 md:mt-0">
      <div className="flex items-center gap-3 md:gap-5">
        <img src={car.image} alt={car.name} className="w-2 h-2 md:w-8 md:h-8" />
        <div>
          <h5 className="font-semibold text-sm md:text-base lg:text-lg flex gap-1 items-center">
            {car.name}
            <span className="flex gap-1 font-normal items-center text-xs md:text-sm">
              <HiUser /> {car.seat}
            </span>
          </h5>
          <p className="text-xs md:text-sm lg:text-base text-gray-600">{car.desc}</p>
        </div>
      </div>
      <h5 className="font-semibold text-sm md:text-l ">
        R{(car.amount * distance).toFixed(2)}
      </h5>
      <h5 className="font-semibold text-sm md:text-l">
        <HiOutlineClock className="inline-block mr-1" /> {estimatedTimeDifference}
      </h5>
    </div>
  );
};

export default CarListItem;
