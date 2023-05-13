import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your app's Firebase configuration (HARDCODED. NEEDS REVISION)
// Left below as a placeholder.
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

// Initialize Firebase App instance; connect to Firebase services.
const app = initializeApp(firebaseConfig);

// Initializes an Auth instance with Firebase App instance. To be used for authentication.
const auth = getAuth(app); // Syntax - getAuth(app?: FirebaseApp): Auth;


// Export this function; to be used for signing in and out with Firebase authentication.
export  function useAuthentication() {
    // state to hold is user is signed in or undefined.
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        // onAuthStateChanged - adds an observer for changes to the user's sign-in state.
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user)=> {
            if (user) {
                // User signed in.
                setUser(user);
            } else {
                // User signed out.
                setUser(undefined);
            }
        });
        
        return unsubscribeFromAuthStateChanged;
    }, []); // Dependency: empty array, i.e., runs once after initial render.

    return {
        // Return a state holding Firebase-authenticated user or return undefined.
        user
    };
}