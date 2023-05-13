import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default function SignUpScreen() {
  // state to hold user email and password for signing up. Initally empty strings
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  })

  async function signUp() {
    // If we have any empty values
    if (value.email === '' || value.password === '' ) {
      setValue( {
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    // Else, 
    /* setValue( {
      ...value,
      error: ''
    }) */
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      alert("Registered!");
    } catch (error) {
      setValue( {
        ...value,
        //error: error.message,
        error: error.message
      })
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
          onClick={signUp}
          className="px-4 py-2 text-white bg-indigo-400 rounded">
          Sign Up
      </button>

    </div>
  );
}