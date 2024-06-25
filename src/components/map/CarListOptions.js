import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../../components/Modal/Modal';
import CarListItem from './CarListItem';
import CancellationReasonModal from '../../components/Modal/CancellationReasonModal';

const CarListOptions = ({ distance, driverPosition, pickup, dropOff, customerId, customerName }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [carListData, setCarListData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [tripRequested, setTripRequested] = useState(false); // Track if trip request has been made

  useEffect(() => {
    const fetchCarListData = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/car-listings');
        setCarListData(response.data);
      } catch (error) {
        console.error('Error fetching car list data:', error);
      }
    };

    fetchCarListData();
  }, []);

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const makePaymentRequest = async () => {
    if (!selectedCar || !pickup || !dropOff || !customerId || !customerName || !distance) {
      console.error('Missing required data for trip request');
      return;
    }

    const currentDate = new Date().toISOString();

    const requestData = {
      customerId: customerId,
      driverId: selectedCar.driverId,
      requestDate: currentDate,
      currentDate: currentDate,
      pickUpLocation: pickup.label,
      dropOffLocation: dropOff.label,
      statuses: 'pending',
      rating: null,
      feedback: null,
      duration_minutes: null,
      vehicle_type: selectedCar.type || selectedCar.name,
      distance_traveled: distance,
      payment_status: 'pending',
      cancellation_reason: null,
      cancel_by: null,
      pickupTime: null,
      dropOffTime: null
    };

    console.log('Request data:', requestData);

    try {
      const response = await axios.post('http://localhost:8085/api/trips', requestData);
      console.log('Trip request sent:', response.data);

      const updatedCar = { ...selectedCar, tripId: response.data.tripId };
      setSelectedCar(updatedCar);
      setTripRequested(true); // Mark trip as requested

      setShowModal(false);
    } catch (error) {
      console.error('Error making payment request:', error);
    }
  };

  const fetchLatestTripId = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/trips/latest/${customerId}`);
      if (response.data && response.data.tripId) {
        return response.data.tripId;
      } else {
        console.error('No trip ID found in response:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching latest trip ID:', error);
      return null;
    }
  };
  
  const cancelTripRequest = async (reason) => {
    if (!customerId || !reason) {
      console.error('Missing required data for trip cancellation');
      return;
    }
  
    const tripId = await fetchLatestTripId();
  
    if (!tripId) {
      console.error('No latest trip ID found for cancellation');
      return;
    }
  
    const currentDate = new Date().toISOString();
  
    const cancelData = {
      customerId: customerId,
      currentDate: currentDate,
      statuses: 'cancelled',
      cancellation_reason: reason,
      cancel_by: customerName,
      distance_travelled: distance

    };
  
    console.log('Cancel data:', cancelData);
  
    try {
      const response = await axios.patch(`http://localhost:8085/api/trips/${tripId}`, cancelData);
      console.log('Trip cancellation sent:', response.data);
  
      setShowCancelModal(false);
      setSelectedCar(null);
      setTripRequested(false); // Reset trip request status
    } catch (error) {
      console.error('Error cancelling trip request:', error);
    }
  };
  

  return (
    <div className='mt-5 overflow-auto h-250'>
      <h2 className='text-lg md:text-xl font-bold mb-3'>Options</h2>
      {carListData.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer p-2 px-4 rounded-md border ${activeIndex === index ? 'border-4' : ''} d-flex items-center justify-content-center `}
          onClick={() => {
            setActiveIndex(index);
            handleCarClick(item);
          }}
        >
          <CarListItem car={item} distance={distance} driverPosition={driverPosition} pickup={pickup} onClick={handleCarClick} />
        </div>
      ))}
      {selectedCar && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} data={selectedCar} />
      )}
      {selectedCar?.name && (
        <div className="fixed bottom-5 left-0 right-0 bg-white p-3 shadow-xl rounded-lg border border-gray-300 items-center flex flex-col md:flex-row justify-center">
          <h2 className="text-sm md:text-base mb-2 md:mb-0 md:mr-3">Make Payment For {selectedCar.name}</h2>
          <div className="flex space-x-3">
            <button className="btn btn-primary rounded-lg text-white text-center px-4 md:px-5 mt-2 md:mt-0" onClick={makePaymentRequest}>
              Request {selectedCar.name}
            </button>
            {tripRequested && (
              <button className="btn btn-secondary rounded-lg text-white text-center px-4 md:px-5 mt-2 md:mt-0" onClick={() => setShowCancelModal(true)}>
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
      {showCancelModal && (
        <CancellationReasonModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onCancel={cancelTripRequest}
        />
      )}
    </div>
  );
};

export default CarListOptions;
