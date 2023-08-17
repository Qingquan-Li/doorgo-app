import React from 'react';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';

// Return Auth instance associated with Firebase App
const auth = getAuth();

// Export component with signIn functions and rendering.
export default function SignIn(){
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  // Function to handle signing in. 
  async function handleSignIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory'
      })
      alert('Please enter a valid email or password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      alert('Signed in successfully');
    } catch (error) {
      setValue({
        ...value,
        error:error.message,
      })
      alert(error);
    }
  }
  
  // Render input for signing in.
  return (
    <div className="mt-10">
      <h1 className="mb-3">Sign In:</h1>
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
          onClick={handleSignIn}
          className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-5 rounded"
        > 
          Sign In 
        </button>
      </div>

    </div>
  );
}