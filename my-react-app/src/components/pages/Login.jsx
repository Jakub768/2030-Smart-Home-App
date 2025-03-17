import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // Get the navigate function from React Router
  const [username, setUsername] = useState(''); // State to store username
  const [password, setPassword] = useState(''); // State to store password
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == 'username') setUsername(value);
    if (name == 'password') setPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    // Prepare request data
    const requestData = { username, password };

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, navigate to the dashboard or another page
        // You can store the session token here or handle it as needed
        navigate('/dashboard'); // Change '/dashboard' to wherever you want to go
      } else {
        // If login fails, show the error message
        setErrorMessage(data.error || 'An error occurred');
      }
    } catch (error) {
      // Handle network or other errors
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className="signupHeader">Login</div>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}

      <div className='inputs'>
        <div className='input'>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className='input'>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='submitContainer'>
        <button className="submit" onClick={handleSubmit}>Login</button>
        <button className="submit" onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
