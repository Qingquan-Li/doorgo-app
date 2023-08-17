import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { storage} from "../common/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { RootAPIURL } from '../common/RootAPIURL'
import Camera from "./Camera";
import Location from './Location';

export default function StorefrontDataForm() {
  // State to keep track of the form values
  const [formData, setFormData] = useState({
    nameOfStoreOrBuilding: '',
    doorType: '',
    doorHandleType: '',
    hasStairs: false,
    hasRamps: false,
    notes: '',
  });
  const [photoData, setPhotoData] = useState(null);
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Get the navigate function from the useNavigate hook
  // so that we can navigate the user to a new page later
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (event) => {
    const {name, value, type, checked} = event.target;
    setFormData((prevData) => ({
      // copy over all the existing key-value pairs from the previous state,
      // otherwise they will be overwritten!
      ...prevData,
      // [name]: value,
      // 1. If the input name matches the property being updated, update that property's value
      // 2. Otherwise, leave the property unchanged:
      // if the input field is a checkbox, use the 'checked' property instead of 'value'
      // because checkboxes don't have a 'value' property, but a 'checked' property instead
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle photo capture
  const handlePhotoCapture = (photoBlob) => {
    setPhotoData(photoBlob);
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    // Prevent the default form submit behavior
    event.preventDefault();

    // Show the spinner (Tailwind CSS Animation) while the form is submitting
    setIsLoading(true);

    let photoURL = '';
    if (photoData) {
      // Upload the photo to Firebase Storage and get the download URL
      // const storageRef = ref(storage, `storefront-photos/${Date.now()}`);
      const storageRef = ref(storage, 'storefront-photos/' + new Date().toISOString() + '.png');
      const uploadTask = uploadBytesResumable(storageRef, photoData);

      try {
        await uploadTask;
        photoURL = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Failed to upload photo to Firebase:', error);
        alert(`Failed to upload photo: ${error.message}`)
      }
    }

    // Construct the complete form data
    // Include location data in the request body (only if location is defined)
    const completeFormData = {
      // Construct a new object that combines all the properties of formData
      // with potentially new latitude and longitude values if location is defined.
      // Spread the form data object into individual properties (key-value pairs):
      ...formData,
      // add the photo URL to the form data
      photo: photoURL,
      // Try to access the `lat` and `lng` properties of the `location` object.
      // But if `location` happens to be null or undefined, trying to access
      // `location.lat` directly would throw an error. The `?.` prevents this
      // error by returning undefined if `location` is null or undefined.
      // If `location` is defined, then `location?.lat` is equivalent to `location.lat`.
      // If `location` is null or undefined, then `location?.lat` is equivalent to `undefined`.
      latitude: location?.lat,
      longitude: location?.lng
    }

    // Set up the options for the fetch request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // The body of the request, with the form data in JSON format
      // body: JSON.stringify(formData),
      body: JSON.stringify(completeFormData),
    };
    try {
      // Make the request
      const response = await fetch(RootAPIURL, requestOptions);

      // Check if the request was successful
      if (response.ok) {
        // Get the response body (API returns JSON with the ID of the new storefront)
        const data = await response.json();
        console.log(response);
        setMessage('Successfully submitted!');
        // Navigate the user to the new {storefrontId} page
        navigate(`/storefronts/${data.id}`);
      } else {
        console.error('Error:', response.status, response.statusText);
        setMessage(`Failed to submit: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessage(`Failed to submit: ${error.message}`);
    } finally {
      // Hide the spinner (Tailwind CSS Animation) after the form is submitted
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4 pt-4">

      <Camera onCapture={ handlePhotoCapture } />

      {/* nameOfStoreOrBuilding */}
      <div>
        <label htmlFor="nameOfStoreOrBuilding"
               className="block mb-1 text-sm font-semibold">
          Name of Store or Building
        </label>
        <input
          type="text"
          id="nameOfStoreOrBuilding"
          name="nameOfStoreOrBuilding"
          value={formData.nameOfStoreOrBuilding}
          onChange={handleChange}
          className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter the name of the store or building"
          required
        />
      </div>

      {/* doorType */}
      <div>
        <label htmlFor="doorType"
               className="block mb-1 text-sm font-semibold">
          Door Type
        </label>
        <select
          id="doorType"
          name="doorType"
          value={formData.doorType}
          onChange={handleChange}
          className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Door Type</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="automatic">Automatic</option>
          <option value="revolving">Revolving</option>
          <option value="open">Open</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* doorHandleType */}
      <div>
        <label htmlFor="doorKnob"
               className="block mb-1 text-sm font-semibold">
          Door Handle Type
        </label>
        <select
          id="doorHandleType"
          name="doorHandleType"
          value={formData.doorHandleType}
          onChange={handleChange}
          className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Door Handle Type</option>
          <option value="vertical bar">Vertical Bar</option>
          <option value="pull">Pull</option>
          <option value="round">Round</option>
          <option value="horizontal bar">Horizontal Bar</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* hasStairs */}
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="hasStairs"
            checked={formData.hasStairs}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm">Are there stairs?</span>
        </label>
      </div>

      {/* hasRamps */}
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="hasRamps"
            checked={formData.hasRamps}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm">Are there ramps?</span>
        </label>
      </div>

      {/* notes */}
      <div>
        <label htmlFor="notes" className="block mb-1 text-sm font-semibold">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter any additional notes here (optional)"
          className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Use the onLocationChange prop of the Location component to update the location state */}
      <Location onLocationChange={(newLocation) => setLocation(newLocation)} />

      {/* Submit Button */}
      <div className="flex flex-col items-center space-y-4 pt-4">
        <button
          className="flex items-center px-8 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 text-white"
                   viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor"
                  strokeWidth="4">
                </circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Processing...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
      {message && <div>{message}</div>}
    </form>
  );
};
