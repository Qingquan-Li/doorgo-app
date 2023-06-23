import { useState } from "react";
import { useAuthentication } from "./useAuthentication";
import { getAuth, signOut } from "firebase/auth";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

// We import "useAuthentication" here initialized Firebase services
// and import our useAuthentication function.

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

  // Conditional rendering: if user state is signed in, will render a greeting
  // and a signOut button. Else, will render big sign-in/sign-up buttons and
  // relevant signIn/signOut input fields.
  return (
    <div className="min-h-scree mx-4 mt-48 items-center justify-center">

      {/* NONAUTHENTICATED USER RENDERING
       * Rendered when we have a nonauthenticated user.
       * We can sign in or sign up.
      */}
      
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
            Sign In
          </button>
        </div>
      </div>
      )}

      {/* NONAUTHENTICATED USER RENDERING
       * Rendered input for signing in our signing up, but not both at same time.
      */}
      <div>
        { !user && (showLogin && <SignIn/>) }
        { !user && (showRegister && <SignUp/>) }
      </div>
      
      {/* AUTHENTICATED USER RENDERING
       * Rendered when we have a signed-in user
       * WIll render a greeting and a sign-out button.
      */}
      {user && (
        <div className="text-4xl font-bold mb-4">
          <h1>Welcome {user.email}</h1> <br/>
          <h3>You are signed in.</h3>
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
