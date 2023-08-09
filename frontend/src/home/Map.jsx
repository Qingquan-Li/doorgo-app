import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '300px'
};

const defaultLocation = {
  // Default to New York City
  lat: 40.730610,
  lng: -73.935242
};

export default function Map({location, onMapClick}) {

  // handleMapLoad is a function that will be called when the map is loaded.
  const handleMapLoad = (map) => {
    // Default: "Use two fingers to move the map"
    // Change to use one finger to move the map
    map.setOptions({gestureHandling: "greedy"});
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location || defaultLocation}
        zoom={15}
        onClick={onMapClick}
        onLoad={handleMapLoad}
      >
        {location &&
          <Marker position={location} draggable={true} onDragEnd={(event) => {
            onMapClick(event);
          }}/>}
      </GoogleMap>
    </LoadScript>
  );
}
