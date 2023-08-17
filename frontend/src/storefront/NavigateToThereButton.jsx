// export default function NavigateToThereButton({ latitude, longitude }) {
//   const openGoogleMaps = () => {
//     const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
//     window.open(url, "_blank");
//   };
//   return (
//     <button
//       onClick={openGoogleMaps}
//       className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-3 px-4 rounded"
//     >
//       Navigate to There with Google Maps
//     </button>
//   );
// }


export default function NavigateToThereButton({ latitude, longitude }) {
  const openGoogleMaps = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const fallbackToGoogleMapsWebsite = () => {
      // Using the regular URL for desktop and as a fallback
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(url, "_blank");
    };

    if (isMobile) {
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Open the Apple Maps app on iOS
        // const mapsUrl = `maps://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`;
        // Open the Google Maps app on iOS
        const mapsUrl = `comgooglemaps://?q=${latitude},${longitude}`;

        // Create an iframe element that is used to open the Google Maps app
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = mapsUrl;
        // Add the iframe to the DOM
        document.body.appendChild(iframe);
        // Remove the iframe from the DOM after 0.1 seconds
        // (so that the Google Maps app has enough time to open)
        // (otherwise, the Google Maps website will be opened instead)
        setTimeout(() => {
          document.body.removeChild(iframe);
          // If the Google Maps app is not installed, open the Google Maps website instead
          setTimeout(fallbackToGoogleMapsWebsite, 600);
        }, 100);
      } else {
        const geoUrl = `geo:${latitude},${longitude}?q=${latitude},${longitude}(Label+Name)`;
        window.open(geoUrl, "_blank");

        setTimeout(() => {
          if (!document.hidden) {
            fallbackToGoogleMapsWebsite();
          }
        }, 1000); // Waiting for 1 second to check if the app is opened or not
      }
    } else {
      fallbackToGoogleMapsWebsite();
    }
  };

  return (
    <button
      onClick={openGoogleMaps}
      className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-3 px-4 rounded"
    >
      Navigate to There with Google Maps
    </button>
  );
}
