import React, { useState } from "react";
import Map from "./Map";

export default function Location() {
  const [position, setPosition] = useState(null);

  // Gets the user's current location and updates
  // the state with the latitude and longitude.
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setPosition(newPosition);
        },
        (error) => {
          console.error(error);
        },
        // enableHighAccuracy: default: false.
        // If true and if the device is able to provide a more accurate
        // position, it will do so. Note that this can result in slower
        // response times or increased power consumption (with a GPS chip
        // on a mobile device for example).
        {enableHighAccuracy: true}
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleMapClick = (event) => {
    setPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  };

  return (
    <div className="space-y-4">
      <button
        className="px-2 py-1 rounded border-gray-300 border hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={getLocation}
      >
        Get Location (Latitude & Longitude)
      </button>

      <Map location={position} onMapClick={handleMapClick}/>

      {position && (
        <div className="space-y-4">
          Latitude: {position.lat}<br/>
          Longitude: {position.lng}<br/>
        </div>
      )}
    </div>
  );
}
