import { useState } from "react";

export default function Account() {
  const [showPopup, setShowPopup] = useState(false);

  const handleLoginClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <button
        onClick={handleLoginClick}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Login
      </button>

      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center z-10 px-8"
          onClick={handleClosePopup}
        >
          <div className="bg-white shadow-lg p-8 rounded max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Notice</h2>
            <p className="text-gray-700">
              The login function is currently under development.
            </p>
            <button
              onClick={handleClosePopup}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
