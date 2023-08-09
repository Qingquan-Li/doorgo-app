import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RootAPIURL } from '../common/RootAPIURL'
import ShareButton from "./ShareButton";

export default function StorefrontData() {
  const [storefrontData, setStorefrontData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the params object from the useParams hook so that we can access the URL parameters later
  const params = useParams();

  useEffect(() => {
    const fetchStorefront = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(RootAPIURL + `/${params.id}`);

        if (!response.ok) {
          setError(`Error: ${response.status}`);
          return; // exit the function
        }

        const data = await response.json();
        setStorefrontData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the fetchStorefront function when the component first loads
    fetchStorefront();
    // Re-call the fetchStorefront function whenever the params.id value changes
  }, [params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const readStorefrontData = () => {
    const textToRead = `
        Name: ${storefrontData.nameOfStoreOrBuilding},
        Door type: ${storefrontData.doorType},
        Door handle type: ${storefrontData.doorHandleType},
        Stairs: ${storefrontData.hasStairs ? 'yes' : 'no'},
        Ramps: ${storefrontData.hasRamps ? 'yes' : 'no'},
        ${storefrontData.notes ? `Notes: ${storefrontData.notes}` : ''}
        `;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4">
      <div className="pb-4">
        <strong>Name:</strong> {storefrontData.nameOfStoreOrBuilding}
      </div>
      <div className="pb-4">
        <strong>Door Type:</strong> {storefrontData.doorType}
      </div>
      <div className="pb-4">
        <strong>Door Handle Type:</strong> {storefrontData.doorHandleType}
      </div>
      <div className="pb-4">
        <strong>Stairs:</strong> {storefrontData.hasStairs ? 'yes' : 'no'}
      </div>
      <div className="pb-4">
        <strong>Ramps:</strong> {storefrontData.hasRamps ? 'yes' : 'no'}
      </div>
      {/* If there has notes, display notes field */}
      {storefrontData.notes && (
        <div className="pb-4">
          <strong>Notes:</strong> {storefrontData.notes}
        </div>
      )}
      <div className="mt-6">
        <button
          onClick={readStorefrontData}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-3 px-4 rounded"
        >
          Read Storefront Data
        </button>
        <ShareButton title={storefrontData.nameOfStoreOrBuilding} />
      </div>
    </div>
  );
}
