import { useEffect } from 'react';
import { RootAPIURL } from "./RootAPIURL";

export default function WarmUpGoogleCloudRun() {

  useEffect(() => {
    // Warm up if the APIs is hosted on Google Cloud Run
    if (RootAPIURL === 'https://doorgo-backend-ajnzntatoq-uc.a.run.app/api/doorfronts') {
      // Send a warm-up request to the backend
      fetch(RootAPIURL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            console.error('Failed to warm up Cloud Run:', response.statusText);
          } else {
            console.log('Successfully warmed up Cloud Run');
          }
        })
        .catch(error => {
          console.error('Error during warming up Cloud Run:', error);
        });
    }
  }, []);  // The empty dependency array ensures this runs once when the component mounts

  return null;  // Render nothing
}
