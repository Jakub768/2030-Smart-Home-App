import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function SignUp() {
  return (
    <div className='container'>
     <div className='header'>
      <div className="signupHeader">Sign Up</div>
     </div>
     <div className='inputs'>
      <div className='input'>
       <input type="text" placeholder="Username"></input>
      </div>
      <div className='input'>
       <input type="password" placeholder="Password"></input>
      </div>
     </div>
    <div className='submitContainer'>
      <div className="submit">Sign Up</div>
      <div className="submit">Login</div>
    </div>
    </div>
  );
}
export default SignUp