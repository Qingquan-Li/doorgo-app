export default function NavigateToThere() {
  const openGoogleMaps = () => {
    const url = "https://www.google.com/maps/search/?api=1&query=40.7141056,-74.0113790";
    window.open(url, "_blank");
  };
  return (
    <div className="p-4">
      <button
        onClick={openGoogleMaps}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-3 px-4 rounded"
      >
        Navigate to There with Google Maps
      </button>
    </div>
  );
}
