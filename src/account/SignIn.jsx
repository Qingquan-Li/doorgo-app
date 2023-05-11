
import React from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const auth = getAuth();

export default function SignInScreen(){


  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  // 
  async function signIn() {
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
    } catch (error) {
      setValue({
        ...value,
        error:error.message,
      })
      alert(error);
    }
  }
  
  // Render
  return (
    <div>
      <h1>Sign In Screen!</h1>
      <div>
        <input
          placeholder='Enter Email'
          value={value.email}
          onChange={e => setValue({ ...value, email: e.target.value })}
        />

        <br/><br/>

        <input
          placeholder='Enter Password'
          value={value.password}
          onChange={e => setValue({ ...value, password: e.target.value })}
          type="password"
          
        />

        <br/><br/>
        <button onClick={signIn}> Sign In </button>

        <br/><br/>
        <button> Sign up</button>

      </div>
    </div>
  );
}