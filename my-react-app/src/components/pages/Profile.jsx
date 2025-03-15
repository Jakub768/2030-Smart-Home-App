import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'; // Import the CSS file
import userIcon from '../images/User.png';
import bcrypt from "bcryptjs"; // Import bcryptjs

const Profile = () => {
  const navigate = useNavigate();

  // State to store the data
  const [data, setData] = useState(null);

  // State to handle loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    // Fetch the data from the Flask API
    fetch('http://127.0.0.1:5000/my_profiles')
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        setData(data); // Set data to state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  // Mask the password with asterisks
  const maskPassword = (password) => {
    return '*'.repeat(password.length); // Repeat '*' for the length of the password
  };

  // Render the component
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="mainProfile">
      {/* Top section with Back button, Title, and Profile button */}
      <div className="profileHeader">
        <button className="navButtonProfile" onClick={() => navigate(-1)}>{"<"}</button>
        <h1>My Profile</h1>
        <button className="navButtonProfile" onClick={() => navigate("/profile")}>
          <img src={userIcon} alt="User Icon" />
        </button>
      </div>
      <div className="profileColumns">
        <div className="blockPro topBlockProfile"><p>First Name</p><p className="userDetails">{data.my_profile.user_info["first name"]}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p></div>
        <div className="blockPro"><p>Last Name</p><p className="userDetails">{data.my_profile.user_info["last name"]}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p></div>
        <div className="blockPro"><p>Username</p><p className="userDetails">{data.my_profile.user_info.username}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p></div>
        <div className="blockPro"><p>Email</p><p className="userDetails">{data.my_profile.user_info.e_mail}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p></div>
        <div className="blockPro bottomBlockProfile"><p>Password</p><p className="userDetails">{maskPassword(data.my_profile.user_info.password)}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p></div> {/* Display masked password */}
      </div>

      <div className="profileColumns">
        <h2 className="headingsProfile">Residence</h2>
        <div className="blockPro topBlockProfile"><p>Nickname</p><p className="userDetails">{data.my_profile.residence["nick name"]}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p></div>
        <div className="blockPro"><p>Address</p><p className="userDetails">{data.my_profile.residence.address}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p></div>
        <div className="blockPro bottomBlockProfile"><p>Uploaded Documents</p><p className="userDetails">{'>'}</p></div>
      </div>

      {/* Bottom Section with Two Buttons */}
      <div className="bottomSectionProfile">
        <button className="actionButtonProfile">
          Sign Out
        </button>
        <button className="actionButtonProfile">
          Change User
        </button>
      </div>
    </main>
  );
};

export default Profile;
