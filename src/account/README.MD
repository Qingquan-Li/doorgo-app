# Integrating Firebase Authentication into DoorGo (notes by Marcos)

The following are notes for implementing a `signIn` feature. These changes focus on user authentication with Firebase. The majority of changes relate to 'account' screen/page.

## Firebase config and `useAuthentication`

- I hardcoded the Firebase configuration (given by Firebase console) into the app. Deleted `firebaseConfig` object, meant to be replaced by user.
- `useAuthentication.jsx` file initializes Firebase, initializes an Auth instance, and exports a `useAuthentication` Hook to add an observer to check for changes to a user's sign-in state. Could be used for conditional rendering a `signOut` button

## Added to `./account` folder

- I've added `signIn.jsx` and `signUp.jsx` files. These are meant to be rendered to `index.jsx`. Will use React's `useState` to render either a sign-in or sign-up form.

## Changes to `./account/index`

- Changed file name to `index.jsx`.
- Tried conditional rendering to render either sign-in or sign-up form. Uses `handleLoginClick` for conditional rendering.
- call `useAuthentication()` in `App.js` to initialize, get Auth instance, and set an observer with Firebase for user sign-in state.

---

# Dev Issues

## Firebase options

- I kept getting an error like `Firebase: Need to provide options, when not being deployed to hosting via source.` Not sure why this happens. I already called `useAuthentication` in `App.js` to initialized for Firebase.
