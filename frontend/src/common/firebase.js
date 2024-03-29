import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

/**
 * Your web app's Firebase configuration
 *
 * Reference: https://create-react-app.dev/docs/adding-custom-environment-variables/
 * In the root directory of the project, create a file called `.env` to store the environment
 * variables. You can access these variables anywhere in the application through `process.env`.
 * Inside this file, define the variables like so:
 *
 * REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
 * REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
 * ...
 * (No Comma!)
 *
 * The prefix `REACT_APP_` is important when you are defining environment variables for a
 * create-react-app project. Only environment variables that start with REACT_APP_ will be
 * embedded into the build, so it's mandatory to start your variable names with `REACT_APP_`.
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase App instance; connect to Firebase services.
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage instance; connect to Firebase Storage service.
const storage = getStorage(app);
// Export this function to be used for uploading images to Firebase Storage.
// export function useStorage() {
//   return storage;
// }
// Another way to export
export { storage };

// Initializes an Auth instance with Firebase App instance. To be used for authentication.
const auth = getAuth(app);
// Export this function; to be used for signing in and out with Firebase authentication.
export { auth };

