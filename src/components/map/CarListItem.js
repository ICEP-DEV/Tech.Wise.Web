import React, { useEffect, useState } from 'react';
import { HiUser, HiOutlineClock } from 'react-icons/hi';
import '../../index.css';

const CarListItem = ({ car, distance, pickup, onClick }) => {
  const [driverPosition, setDriverPosition] = useState(null);
  const [distanceFromDriverToPickup, setDistance] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setDriverPosition({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
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

    const hours = Math.floor(timeDifferenceInMinutes / 60);
    const minutes = timeDifferenceInMinutes % 60;

    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    } else {
      return `${minutes} min`;
    }
  };

  const estimatedTimeDifference = calculateArrivalTime();

  if (car.status !== 'Active') {
    return null;
  }

  return (
    <div className="car-info-container" onClick={() => onClick(car)}>
      <div className="car-details gap-4 ">
        <img src={`http://localhost:8085/documents/${car.image}`} alt={car.name} className="car-image " style={{ width: '50px', height: 'auto' }} />
        <div className="car-description">
          <div className="car-name-seat">
            <h5 className="car-name ">{car.name}</h5>
            <span className="car-seat ">{car.numberOfSeats}</span>
            <span><HiUser className='seat-icon' /></span>
          </div>
          <div className="car-desc text-white">
            <p className="text-gray-600">{car.description}</p>
          </div>
        </div>
      </div>
      <div className="car-price p-2">
        <h6 className="font-semibold">R{(car.costPerKm * distance).toFixed(2)}</h6>
        <h6 className="font-semibold"><HiOutlineClock className='car-clock' />{estimatedTimeDifference}</h6>
      </div>
    </div>
  );
};

export default CarListItem;
