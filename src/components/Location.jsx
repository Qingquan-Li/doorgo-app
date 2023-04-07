import React, { useState } from "react";

export default function Location() {
  const [position, setPosition] = useState(null);

  // Gets the user's current location and updates
  // the state with the latitude and longitude.
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error(error);
        },
        // enableHighAccuracy: default: false.
        // If true and if the device is able to provide a more accurate
        // position, it will do so. Note that this can result in slower
        // response times or increased power consumption (with a GPS chip
        // on a mobile device for example).
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <button onClick={getLocation}>
        Get Location (Latitude & Longitude)
      </button>
      {position && (
        <div>
          Latitude: {position.latitude}<br />
          Longitude: {position.longitude}
        </div>
      )}
    </div>
  );
}
