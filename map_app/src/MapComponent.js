import React, { useEffect, useRef } from 'react';
import AWS from 'aws-sdk';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  // Configuration
  const identityPoolId = "eu-west-1:4ee9dc55-67b2-41de-a497-6ee7d921b239"; // Cognito Identity Pool ID
  const mapName = "Nthome_Mapping"; // Amazon Location Service Map Name
  const region = "eu-west-1";

  // Initialize AWS SDK v2 with Cognito credentials
  AWS.config.region = region;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
  });

  // Sign the request using SigV4
  const signRequest = (url, method = 'GET') => {
    const endpoint = new AWS.Endpoint(url);
    const request = new AWS.HttpRequest(endpoint, region);
    
    request.method = method;
    request.headers['host'] = endpoint.host;
    request.headers['X-Amz-Date'] = new Date().toISOString();

    // Sign the request with AWS credentials
    const signer = new AWS.Signers.V4(request, 'geo');
    signer.addAuthorization(AWS.config.credentials, new Date());

    return {
      url: request.endpoint.href + request.path,
      headers: request.headers,
    };
  };

  // Function to initialize the map
  const initializeMap = async () => {
    try {
      // Ensure the credentials are resolved before using them
      await AWS.config.credentials.getPromise();

      // Initialize the map with AWS credentials for map requests
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        center: [-123.115898, 49.295868],
        zoom: 10,
        style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor`,
        transformRequest: (url, resourceType) => {
          if (resourceType === 'Style' || resourceType === 'Source') {
            const signedRequest = signRequest(url);
            return {
              url: signedRequest.url,
              headers: signedRequest.headers,
            };
          }
          return { url };
        },
      });

      map.addControl(new maplibregl.NavigationControl(), 'top-left');

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: '100vh', width: '100%' }}
    />
  );
};

export default MapComponent;
