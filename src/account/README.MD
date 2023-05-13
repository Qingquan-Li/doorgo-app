# Integrating Firebase Authentication into DoorGo (notes by Marcos)

The following are notes for implementing a `signIn` feature into doorgo. These changes focus on user authentication with Firebase. The majority of changes relate to 'account' screen/page.

### Firebase config and `useAuthentication`

- I hardcoded the Firebase configuration (given by Firebase console) into the app. Deleted `firebaseConfig` object, meant to be replaced by user.
- `useAuthentication.jsx` file initializes Firebase, initializes an Auth instance, and exports a `useAuthentication` Hook to add an observer to check for changes to a user's sign-in state. Could be used for conditional rendering a `signOut` button

### Added to `./account` folder

- I've added `signIn.jsx` and `signUp.jsx` files. These are meant to be rendered to `index.jsx`. Will use React's `useState` to render either a sign-in or sign-up form.

### Changes to `./account/index`

- Changed file name to `index.jsx`.
- Tried conditional rendering to render either sign-in or sign-up form. Uses `handleLoginClick` for conditional rendering.
- call `useAuthentication()` in `App.js` to initialize, get Auth instance, and set an observer with Firebase for user sign-in state.

## ERROR: Dev Issues

### Firebase options

- I kept getting an error like `Firebase: Need to provide options, when not being deployed to hosting via source.` Not sure why this happens. I already called `useAuthentication` in `App.js` to initialized for Firebase.

---

# Sign-in feature is functional (notes, 5/12/2023)

After collaborating with Jake, I've made relevant changes to my code. Alson, I managed to implement Firebase into DoorGo. It is functional, with changes within the "account" folder.

### Moved `useAuthentication` file to "account" folder

- Jake recommended moving `useAuthentication` Hook to "account" folder. This does make sense, considering that "account" folder focuses on user information and user authentication. Moved file to said folder.

### 'Firebase options' issue resolved !

- Instead of importing `useAuthentication` to `App.js`, I imported it to `account/index.js`. I also made some changes to `index` file. Will discuss changes in following section^\*^.

### Changes to `index` in "account" folder

- I imported custom `useAuthentication` Hook, `getAuth` and `signOut` from Firebase, and custom `signUpScreen`.
- To discuss more on "Firebase options" issue resolved ^\*^:
  - Added `{user} = useAuthentication()` to file. We can use `user`'s sign-in state to conditionally render either: the login and sign-up options **or** a welcome for user and a `signOut` button.
  - Added `auth = getAuth()` to index file.
  - This resolved the Firebase issue.
- I deleted the former `showPopup` state and created two other states: `showLogin` and `showRegister` states. This is useful to be able to render a login screen and a register screen with the click of a button. Both states are initially false---they will not render until their respective button is clicked.
- I changed the `handleClick` functions to `handleRegisterClick` and `handleLoginClick` to change states of `showRegister` and `showLogin`, respectively. This is used to conditionally render a screen. For example, `handleLoginClick` will render to (`true`) and from(`false`) screen with the login button. Also, if `showRegister` state is true, `handleLoginClick` will switch `showRegister`'s state to false,
- Added `alert` for user when they sign out.

### Changes to `signInScreen`, adding `signUpScreen`

- I imported `signUpScreen` to `index`.
- I added `alert` messages to both components, to alert user when they signed-in or signed-out.
- Removed `signUp` button and `signIn` button from `signInScreen` and `signUpScreen`, respectively. These buttons were redundent since `index` already has these buttons.
- I used styles from other files in the app (i.e., `Camera.jsx`, `Search.jsx`). Used the `classes` from these files. This helps show uniformity in app design.

## ERROR:Dev Issues

Nothing major. Pushed to GitHub and Jake left some comments. Resolved said comments.

- Made some changes in `package.json` since I work in a Windows environment. Change in 'scripts': (`"start": "set HTTPS=true && set SSL_CRT_FILE=./ssl-certificates/localhost.pem && set SSL_KEY_FILE=./ssl-certificates/localhost-key.pem && react-scripts start"`)
