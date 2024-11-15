// src/components/GoogleMapSection1.js

import React, { useContext, useEffect, useState, useCallback } from 'react';
import { DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
import { useDriver } from '../../Context/DriverContext'; // Assuming DriverContext is correctly set up
import { useTrip } from '../../Context/TripContext'; // Assuming TripContext is correctly set up for trip details
import { assets } from '../../assets/assets';

const containerStyle = {
    width: '100%',
    height: window.innerHeight * 0.9,
};

const libraries = ['places'];

const GoogleMapSection1 = ({ roles, userId }) => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries,
    });
    console.log("rrrrrrrrrrrrrr", roles, userId);
    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContext);
    const { driverPosition } = useDriver();
    const { isRideAccepted, pickup } = useTrip();

    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(null);
    const [directions, setDirections] = useState(null);
    const [nearbyDrivers, setNearbyDrivers] = useState([]);
    const [validatedDriverPostion, setValidateddDriver] = useState([]);
    // console.log("rrrrrrrrrrrrrr",driverPosition);

    // Set source to driver's position and destination to pickup location if ride is accepted
    // useEffect(() => {
    //     if (isRideAccepted===false) {
    //         console.log("99999999999999999999pickup", pickup);
    //         setSource(driverPosition);
    //         setDestination(pickup);
    //     }
    // }, [isRideAccepted, driverPosition, pickup, setSource, setDestination]);

    // Set initial map center to user's current geolocation
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => console.error('Error fetching current location:', error),
            { enableHighAccuracy: true }
        );
    }, []);

    // Update center when source or destination is changed
    useEffect(() => {
        if (source && map) {
            const lat = parseFloat(source.lat);
            const lng = parseFloat(source.lng);
            // console.log("coordinatessssss====s---s-s--s", source.lat, source.lng);
            if (!isNaN(lat) && !isNaN(lng)) {
                const validCoordinates = { lat, lng };
                map.panTo(validCoordinates);
                setCenter(validCoordinates);
                console.log('Correct coordinates passed to panTo:', validCoordinates);
            } else {
                console.error("Invalid source coordinates detected:", source);
            }
        }
    }, [source, map]);



    useEffect(() => {
        if (destination && map) {
            setCenter({ lat: destination.lat, lng: destination.lng });
            fetchDirections();
        }
    }, [destination, map]);

    const fetchDirections = useCallback(() => {
        if (!source || !destination || !window.google) return;

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: { lat: source.lat, lng: source.lng },
                destination: { lat: destination.lat, lng: destination.lng },
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    console.error('Error fetching directions:', status);
                }
            }
        );
    }, [source, destination]);

    // const fetchNearbyDrivers = useCallback(async () => {
    //     if (!source) return;

    //     try {
    //         const response = await fetch(`http://localhost:8085/api/drivers/nearby?lat=${source.lat}&lng=${source.lng}`);
    //         if (!response.ok) throw new Error('Failed to fetch nearby drivers');

    //         const data = await response.json();

    //         const driverDetails = await Promise.all(
    //             data.drivers.map(async (driver) => {
    //                 try {
    //                     const userResponse = await fetch(`http://localhost:8085/userInfo/${driver.users_id}`);
    //                     if (!userResponse.ok) throw new Error(`Failed to fetch user details for driver ${driver.id}`);

    //                     const userInfo = await userResponse.json();
    //                     return { ...driver, userInfo };
    //                 } catch (userError) {
    //                     console.error('Error fetching user details:', userError);
    //                     return driver;
    //                 }
    //             })
    //         );
    //         setNearbyDrivers(driverDetails);
    //     } catch (error) {
    //         console.error('Error fetching nearby drivers:', error);
    //     }
    // }, [source]);

    // useEffect(() => {
    //     fetchNearbyDrivers();
    // }, [source, fetchNearbyDrivers]);

    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    // Log and validate driver position if role is 'driver' and driverPosition is available
    useEffect(() => {
        if (roles === 'driver' && driverPosition) {
            setValidateddDriver(driverPosition);
            console.log("@@@@@@@@@@@", destination);

            // Ensure lat and lng are numbers
            const lat = parseFloat(driverPosition.lat);
            const lng = parseFloat(driverPosition.lng);

            if (!isNaN(lat) && !isNaN(lng)) {
                console.log('Valid driver position:', driverPosition);
            } else {
                console.error('Invalid driver position:', driverPosition);
            }
        }

        if (roles === 'driver' && destination) {
            console.log("@@@@@@@@@@@ Destination:", destination);
            const lat = parseFloat(destination.lat);
            const lng = parseFloat(destination.lng);

            // Check if the coordinates are valid numbers
            if (!isNaN(lat) && !isNaN(lng)) {
                console.log('Valid destination position:', destination);
            } else {
                console.error('Invalid destination position:', destination);
            }
        }
    }, [roles, driverPosition, destination]);




    return isLoaded && center ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ mapId: 'a0b537a549595d0d' }}
        >
            {source && (
                // Check if lat and lng are valid numbers
                <Marker
                    position={{
                        lat: !isNaN(parseFloat(source.lat)) ? parseFloat(source.lat) : 0,
                        lng: !isNaN(parseFloat(source.lng)) ? parseFloat(source.lng) : 0,
                    }}
                    title={source.label || 'Source Location'}
                />
            )}

            {destination && (
                // Check if lat and lng are valid numbers
                <Marker
                    position={{
                        lat: !isNaN(parseFloat(destination.lat)) ? parseFloat(destination.lat) : 0,
                        lng: !isNaN(parseFloat(destination.lng)) ? parseFloat(destination.lng) : 0,
                    }}
                    title={destination.label || 'Destination Location'}
                />
            )}

            {/* Conditionally render driver position marker if role is driver */}
            {roles === 'driver' && validatedDriverPostion &&
                !isNaN(parseFloat(validatedDriverPostion.lat)) &&
                !isNaN(parseFloat(validatedDriverPostion.lng)) && (
                    <Marker
                        position={{
                            lat: parseFloat(validatedDriverPostion.lat),
                            lng: parseFloat(validatedDriverPostion.lng),
                        }}
                        title={`Driver Position (UserId: ${userId})`}
                        icon={{
                            url: assets.carDriver,
                            scaledSize: new window.google.maps.Size(60, 50),
                        }}
                    />
                )
            }


            {nearbyDrivers.map((driver) => (
                <Marker
                    key={driver.id}
                    position={{ lat: driver.current_lat, lng: driver.current_lng }}
                    title={`Driver: ${driver.userInfo[0]?.name || 'Unknown'}`}
                    icon={{
                        url: assets.carDriver,
                        scaledSize: new window.google.maps.Size(60, 50),
                    }}
                />
            ))}

            {directions && (
                <DirectionsRenderer
                    directions={directions}
                    options={{
                        polylineOptions: {
                            strokeColor: '#000',
                            strokeWeight: 5,
                        },
                        suppressMarkers: true, // Suppresses default markers from DirectionsRenderer
                    }}
                />
            )}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default GoogleMapSection1;
