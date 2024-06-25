import React, { useContext, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri'; // Import the close icon from react-icons
import locationData from '../../utils/locationsData/southafrica_data.json';
import { DestinationContext } from '../../Context/DestinationContext';
import { SourceContext } from '../../Context/SourceContext';
import CarListOptions from './CarListOptions';

const InputItem = ({ type }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSuggestionsVisible(value.length >= 3);
    setSearchResults(
      value.length >= 3
        ? locationData.filter((location) => location.name.toLowerCase().startsWith(value.toLowerCase()))
        : []
    );
  };

  const handleSelect = (location) => {
    setSearchTerm(location.name);
    setSuggestionsVisible(false);
    getLatAndLng(location, type);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestionsVisible(false);
  };

  const getLatAndLng = (place, type) => {
    const { coord } = place;
    const { lat, lon } = coord;
    if (type === 'source') {
      setSource({
        lat: lat,
        lon: lon,
        label: place.name
      });
    } else {
      setDestination({
        lat: lat,
        lon: lon,
        label: place.name
      });
    }
  };

  return (
    <div className='position-relative'>
      <div className='d-flex align-items-center'>
        <input
          type='text'
          placeholder={type === 'source' ? 'Pickup Location' : 'DropOff Location'}
          className='form-control rounded-lg shadow-sm border border-gray-300 placeholder-gray-400 focus-outline-none focus-border-blue-400 '
          value={searchTerm}
          onChange={handleChange}
        />

        {searchTerm && (
          <button className="btn contacts btn-sm  shadow-sm" onClick={handleClear}>
          <RiCloseFill className="text-danger" />
        </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {suggestionsVisible && (
        <div className='position-sticky top-full bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto shadow-lg rounded z-1'>
          {searchResults.map((location) => (
            <div
              key={location.id}
              className='p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200'
              onClick={() => handleSelect(location)}
            >
              {location.name}
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputItem;
