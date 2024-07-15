import React, { useState } from 'react';
import GoogleMapSection from "../../components/map/GoogleMapSection";
import SearchSection from "../../components/map/SearchSection";
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import '../../index.css';

const Search = () => {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <div className='container-fluid mt-5 p-5'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='py-4 shadow-lg rounded bg-light'>
                <SearchSection />
              </div>
            </div>
            <div className='col-md-8'>
              <GoogleMapSection />
            </div>
          </div>
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}

export default Search;
