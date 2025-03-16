import React from 'react';
import './Signup.css';

const Signup = () => {
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
       <input type="text" placeholder="First Name"></input>
      </div>
      <div className='input'>
       <input type="text" placeholder="Last Name"></input>
      </div>
      <div className='input'>
       <input type="text" placeholder="Email"></input>
      </div>
      <div className='input'>
       <input type="password" placeholder="Password"></input>
      </div>
     </div>
    <div className='submitContainer'>
      <div className="submit">Sign Up</div>

    </div>
    </div>
  );
}

export default Signup;
