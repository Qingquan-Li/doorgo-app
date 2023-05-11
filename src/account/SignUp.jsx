import React from 'react';
 
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default function SignUpScreen(props) {
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
      props.SetSignUp(true);
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
        <button onClick={signUp}> Sign In </button>

        <br/><br/>
        <button> Sign up</button>

      </div>
    </div>
  );
}