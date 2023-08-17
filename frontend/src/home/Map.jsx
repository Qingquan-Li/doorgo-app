import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from "../common/GoogleMapsAPIKey";

const containerStyle = {
  width: '100%',
  height: '300px'
};

const defaultLocation = {
  // Default to New York City
  lat: 40.7128,
  lng: -74.0060
};

export default function Map({location, onMapClick, zoomLevel}) {

  // handleMapLoad is a function that will be called when the map is loaded.
  const handleMapLoad = (map) => {
    // Default: "Use two fingers to move the map"
    // Change to use one finger to move the map
    map.setOptions({gestureHandling: "greedy"});
  }

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      loadingElement={<div>Loading...</div>} // Displayed during the loading process
      // onLoad={() => console.log("Scripts loaded successfully")}
      onError={(err) => {
        // Log any errors that occur during loading or authentication
        console.error("Failed to load Google Maps script:", err);
        // Display an error message on the page
        alert("Failed to load Google Maps. Please refresh the page.");
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location || defaultLocation}
        zoom={zoomLevel}
        onClick={onMapClick}
        onLoad={handleMapLoad}
      >
        {/*Explain the code below: `location &&` is a short-circuit operator.*/}
        {/*If location is null or undefined, then the Marker component will not be rendered.*/}
        {location &&
          <Marker
            position={location}
            draggable={true}
            onDragEnd={(event) => {
              onMapClick(event)
            }}
          />
        }
      </GoogleMap>
    </LoadScript>
  );
}
