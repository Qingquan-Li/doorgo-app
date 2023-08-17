import { useState } from "react";
import Map from "./Map";

export default function Location({ onLocationChange }) {
  const [position, setPosition] = useState(null);
  // set the default zoom level of Google Map is 15
  // https://developers.google.com/maps/documentation/javascript/overview#zoom-levels
  // 1: World, 5: Landmass/continent, 10: City, 15: Streets, 20: Buildings
  const [zoomLevel, setZoomLevel] = useState(10);
  // After the user clicks the "Get Location" button, change the zoom level to 20
  const zoomLevelAfterGetLocation = 20

  // Gets the user's current location and updates
  // the state with the latitude and longitude.
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setPosition(newPosition);
          // Change the zoom level after getting the location
          setZoomLevel(zoomLevelAfterGetLocation);
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
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setPosition(newPosition);

    // Notify parent component of the new location
    if (onLocationChange) {
      onLocationChange(newPosition);
    }
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        className="px-2 py-1 rounded border-gray-300 border hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={getLocation}
      >
        Get Location (Latitude & Longitude)
      </button>

      <Map
        location={position}
        onMapClick={handleMapClick}
        zoomLevel={zoomLevel}
      />

      {position && (
        <div className="space-y-4">
          Latitude: {position.lat}<br/>
          Longitude: {position.lng}<br/>
        </div>
      )}
    </div>
  );
}
