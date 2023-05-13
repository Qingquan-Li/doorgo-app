import { useState } from "react";
import { useAuthentication } from "./useAuthentication";
import { getAuth, signOut } from "firebase/auth";
import SignInScreen from "./SignIn";
import SignUpScreen from "./SignUp";

export default function Account() {

  // Use "user" for conditional rendering; render certain components
  // based on if user is sign-in.
  const {user} = useAuthentication();
  // An "Auth" instance, to be used for user to sign out.
  const auth = getAuth();

  // Two states to render a login or sign-up screen.
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Functions so we can render a login or sign-up screen but not
  // both at the same time.
  const handleLoginClick = () => {
    if (showRegister)
      setShowRegister(false);
    setShowLogin(!showLogin);
  };

  const handleRegisterClick = () => {
    if (showLogin)
      setShowLogin(false);
    setShowRegister(!showRegister);
  };

  // Conditional rendering: if user is signed in, will render only 'h1' 
  // element and a sign out button. Else, will render big buttons and
  // relevant signIn/signOut screen.
  return (
    <div className="min-h-scree mx-4 mt-48 items-center justify-center">

      {!user && (
      <div>
        <div className="text-4xl font-bold mb-4">
          <button
            onClick={handleRegisterClick}
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
        </div>
      </div>
      )}

      <div>
        { !user && (showLogin && <SignInScreen/>) }
        { !user && (showRegister && <SignUpScreen/>) }
      </div>
      
      {user && (
        <div className="text-4xl font-bold mb-4">
          <h1>Welcome {user.email}</h1>
          <br/>
          <button 
          onClick={()=> {
            signOut(auth);
            alert("Signed out")}}
          className="px-4 py-2 text-white bg-red-500 rounded">
            Sign Out!
          </button>
        </div>
      )}
      
    </div>
    
  );
}
