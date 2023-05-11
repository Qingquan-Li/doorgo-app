import { useState } from "react";
//import { useAuthentication } from "../common/useAuthentication";
import SignInScreen from "./SignIn";
//import SignUpScreen from "./SignUp";


export default function Account() {
  const [showPopup, setShowPopup] = useState(false);

  const handleLoginClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-scree mx-4 mt-48 items-center justify-center">
      <div className="text-4xl font-bold mb-4">
        <button
          onClick={handleLoginClick}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-3 px-4 rounded"
        >
          Sign Up
        </button>
      </div>
      <div className="text-4xl font-bold mb-4">
        <button
          onClick={handleLoginClick}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-3 px-4 rounded"
        >
          Log In
        </button>
      </div >

      <div>
        { showPopup && <SignInScreen/> }
      </div>
    </div>
    
  );
}
