import React from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth} from "../common/firebase";

// Export this function; to be used for signing in and out with Firebase authentication.
export function useAuthentication() {
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
