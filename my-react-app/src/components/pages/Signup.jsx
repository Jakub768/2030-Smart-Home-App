import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate(); // Get the navigate function from React Router
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == 'username') setUsername(value);
    if (name == 'firstName') setFirstName(value);
    if (name == 'lastName') setLastName(value);
    if (name == 'email') setEmail(value);
    if (name == 'password') setPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    // Prepare the data to send in the POST request
    const requestData = {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      role: 'user', // You can adjust the role if needed
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        // If registration is successful, display success message
        setSuccessMessage(data.message);
      } else {
        // If there's an error, display the error message
        setErrorMessage(data.error);
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="signupHeader">Sign Up</div>
      </div>

      {/* Show success or error messages */}
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      <div className="inputs">
        <div className="input">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="submitContainer">
        <div className="submit" onClick={handleSubmit}>
          Sign Up
        </div>
        <div className="submit" onClick={() => navigate("/")}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Signup;
