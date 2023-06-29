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
    <div className="mt-10">
      <h1>Sign Up:</h1>
      <form className="mt-3">
        <div>
          <input
            placeholder='Email'
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={value.email}
            onChange={e => setValue({ ...value, email: e.target.value })}
          />
        </div>
        <br/>

        <div>
          <input
            placeholder='Password'
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={value.password}
            onChange={e => setValue({ ...value, password: e.target.value })}
            type="password"
          />
        </div>

        <div className="flex flex-col items-center space-y-4 pt-8">
          <button 
              onClick={handleSignUp}
              className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-4 rounded">
              Sign Up
          </button>
        </div>

      </form>
    </div>
  );
}