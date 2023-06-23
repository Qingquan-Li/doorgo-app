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
    <div>
      <h1>Sign In Screen!</h1>
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
          onClick={handleSignIn}
          className="px-4 py-2 text-white bg-indigo-400 rounded"> 
        Sign In 
        </button>
        
    </div>
  );
}