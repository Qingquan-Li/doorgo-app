import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

// Export component with signUp functions and rendering.
export default function SignUp() {
  // state to hold user email and password for signing up. Initally empty strings
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  })

  // Function to handle sign up button. 
  async function handleSignUp() {
    
    if (value.email === '' || value.password === '' ) {
      setValue( {
        ...value,
        error: 'Email and password are mandatory.'
      })
      alert('Please enter a valid email or password');
      return;
    }

    // Create a new user with the given email and password. Will alert if email
    // already in use, invalid, etc.
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      alert("Signed up successfully");
    } catch (error) {
      setValue( {
        ...value,
        error: error.message
      })
      alert(error);
    }
  }

  return (
    <div>
      <h1>Sign Up Screen!</h1>
      <br/>
      <div className="bg-white flex items-center rounded-full shadow-xl">
        <input
          placeholder='Enter Email'
          className="rounded-l-full w-full py-2 px-6 text-gray-700 text-lg leading-tight focus:outline-none"
          value={value.email}
          onChange={e => setValue({ ...value, email: e.target.value })}
        />
      </div>
      <br/>

      <div className="bg-white flex items-center rounded-full shadow-xl">
        <input
          placeholder='Enter Password'
          className="rounded-l-full w-full py-2 px-6 text-gray-700 text-lg leading-tight focus:outline-none"
          value={value.password}
          onChange={e => setValue({ ...value, password: e.target.value })}
          type="password"
        />
      </div>

      <br/>
      <button 
          onClick={handleSignUp}
          className="px-4 py-2 text-white bg-indigo-400 rounded">
          Sign Up
      </button>

    </div>
  );
}