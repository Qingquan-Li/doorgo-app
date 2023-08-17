export default function NavigateToThereButton({ latitude, longitude }) {
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, "_blank");
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
