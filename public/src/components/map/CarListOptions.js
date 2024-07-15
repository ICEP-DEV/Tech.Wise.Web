import React, { useState } from 'react';
import { CarListData } from '../../utils/CarListData';
import CarListItem from './CarListItem';

const CarListOptions = ({ distance, driverPosition, pickup }) => {
    const [activeIndex, setActiveIndex] = useState();
    const [selectedCar, setSelectedCar] = useState([]);

    // console.log('Driver Position:', driverPosition); // Log the driverPosition
    // console.log('Driver pickup:', pickup); // Log the driverPosition

    return (
        <div className='mt-5 p-3 overflow-auto h-250'>
            <h2 className='text-lg md:text-xl font-bold mb-3'>Options</h2>
            {CarListData.map((item, index) => (
                <div
                    key={index}
                    className={`cursor-pointer p-2 px-4 rounded-md border ${activeIndex === index ? 'border-4' : ''}`}
                    onClick={() => {
                        setActiveIndex(index);
                        setSelectedCar(item);
                    }}
                >
                    <CarListItem car={item} distance={distance} driverPosition={driverPosition} pickup={pickup} />
                </div>
            ))}
            {selectedCar?.name && (
                <div className="fixed bottom-5 left-0 right-0 bg-white p-3 shadow-xl rounded-lg border border-gray-300 items-center flex flex-col md:flex-row justify-center">
                    <h2 className="text-sm md:text-base mb-2 md:mb-0 md:mr-3">Make Payment For {selectedCar.name}</h2>
                    <button className="btn btn-primary bg-black rounded-lg text-white text-center px-4 md:px-5 mt-2 md:mt-0">Request  {selectedCar.name}</button>
                </div>

            )}
        </div>
    );
};

export default CarListOptions;
