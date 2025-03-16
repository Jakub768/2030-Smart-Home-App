import React from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const navigate = useNavigate(); // Get the navigate function

  return (
    <div className='container'>
     <div className='header'>
      <div className="signupHeader">Login</div>
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
      <button className="submit">Login</button>
      <button className="submit" onClick={() => navigate("/signup")}>Signup</button>
    </div>
    </div>
  );
}

export default Login;
