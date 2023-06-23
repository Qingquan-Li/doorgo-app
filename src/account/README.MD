# Integrating Firebase Authentication into DoorGo (notes by Marcos)

Changed the format of README for clarity.

# User login state

- When user is successfully logged in, you will get an alert and a message indicating you are signed in. The only option on the account page is to sign out.

# Firebase config

- Create a local `.env` file and store it in root of project, and add to `.gitignore` to avoid pushing the file accidently. I used `.env` file to store private Firebase configurations. For now, it works. Here is a template. Replace "templateValue" with your Firebase configuration values.

# Windows environment

- Inside `package.json` file, `"scripts"` needs a change to one of its key-value pairs to include `set` and `&&` operator. Inside `scripts`, in `"start"` to `"set HTTPS=true && set SSL_CRT_FILE=./ssl-certificates/localhost.pem && set SSL_KEY_FILE=./ssl-certificates/localhost-key.pem && react-scripts start",`

```
const firebaseConfig = {
    apiKey: "your_apiKey_value",
    authDomain: "your_authDomain_value",
    projectId: "your_projectId_value",
    storageBucket: "your_storageBucket_value",
    messagingSenderId: "your_msgSenderId_value",
    appId: "your_appId_value"
  };
```

---

# The **changelog**

> The following are notes for implementing a `signIn` feature into Doorgo. These changes focus on user authentication with Firebase. The majority of changes relate to 'account' screen/page.

## ( 10 May 2023 )

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

## ( 12 May 2023 )

## Sign-in feature is functional

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

## ( 13 May 2023 )

## Sign-up feature

- Added alerts to `signUp` component to notify new user of bad or used email/credentials.
- Changed component names `signUpScreen` and `signInScreen` to `signUp` and `signIn`, respectively.
- Created a local `.env` file, to store my Firebase configuration values. Added `.env` to `.gitignore` to avoid committing/pushing it.
- Delete `react-native` from `package.json`'s dependencies, since we don't use React Native in this project. I may have installed React Native packages by accident.

## ERROR:Dev Issues

- Changed wording in files to keep terms in app consistent (i.e., "Signed up" instead of "Registered").
- There seemed to be an issue with signing up new users but I could not recreate it. Will keep an eye out, though.
- There was an issue with Cloudflare pages build. Could not recreate it either. Will keep looking.
- Form validation. Luckily, Firebase provides messages for different types of errors, so I send these messages to user through `alerts`.
- Needs a workaround to use `env` variables instead of hardcoding Firebase configuration values. Will put a place holder, tho.
