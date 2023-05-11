// Left as TypeScript. Can be refactored into JavaScript but this is fine for demo purposes.
// Added for Firebase Authorization. Decided to leave config in for refactoring(Mark)

import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User} from "firebase/auth";

// import Constants from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your app's Firebase configuration (HARDCODED. NEEDS Revision)
const firebaseConfig = {
  // PLACEHOLDER
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initializes an Auth instance with platform specific default dependencies.
// Syntax - getAuth(app?: FirebaseApp): Auth;
const auth = getAuth(app);
// Auth is an interface representing Firebase Auth service

export  function useAuthentication() {
    // User interface - extends UserInfo.
    // UserInfo interface- User profile information, visible only to the Firebase project's apps.
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        // onAuthStateChanged - adds an observer for changes to the users sign-in state.
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
        user
    };
}