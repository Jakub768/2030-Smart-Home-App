import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'; // Import the CSS file
import userIcon from '../images/User.png';

const Profile = () => {
  const navigate = useNavigate();

  // State to store the data
  const [data, setData] = useState(null);

  // State to handle loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for editable fields and popUp visibility
  const [editing, setEditing] = useState(null); // Field being edited
  const [newValue, setNewValue] = useState(''); // New value for the field
  const [oldPassword, setOldPassword] = useState(''); // Old password for validation
  const [newPassword, setNewPassword] = useState(''); // New password for updating
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); // Confirm new password
  const [isPopUpOpen, setisPopUpOpen] = useState(false); // popUp visibility
  const [editSection, setEditSection] = useState(''); // To track whether it's user_info or residence

  // State to track if old password has been validated
  const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);
  const [isOldPasswordChecked, setIsOldPasswordChecked] = useState(false); // Track if old password check is done

  // Mapping field names to user-friendly labels
  const fieldLabels = {
    "first name": "First Name",
    "last name": "Last Name",
    "username": "Username",
    "e_mail": "Email",
    "password": "Password",
    "nick name": "Nickname",
    "address": "Address"
  };

  // Fetch data when component mounts
  useEffect(() => {
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

  // Handle clicking on a block to start editing
  const editClick = (field, section) => {
    setEditing(field);
    setEditSection(section); // Track whether it's from user_info or residence
    const fieldValue = section == 'user_info' ? data.my_profile.user_info[field] : data.my_profile.residence[field];
    setNewValue(fieldValue); // Pre-fill the input with the current value
    setisPopUpOpen(true); // Open the popUp when the block is clicked
  };

  // Handle saving the updated value
  const handleSave = () => {
    // Case where we are updating password
    if (editing === 'password') {
      // Password validation logic
      if (newPassword !== confirmNewPassword) {
        alert("New passwords do not match.");
        return;
      }
  
      // Correctly structure updated_info with field name as the key (password is the field name here)
      const formattedData = `{ 
        "username": "${data.my_profile.user_info.username}",
        "updated_info": { 
            "${editing}": "${newPassword}"
        }
    }`; 
      
      // Log the data with quotes added manually
      console.log(formattedData);
  
      // Send password update to backend using POST
      fetch('http://127.0.0.1:5000/update_profile', {
        method: 'POST',  // POST method
        headers: {
          'Content-Type': 'application/json',
        },
        body: formattedData
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Profile updated successfully') {
            alert('Password updated successfully');
            const updatedData = { ...data };
            updatedData.my_profile.user_info.password = newPassword;
            setData(updatedData);  // Update the state with the new password
          } else {
            alert('Failed to update password');
          }
        })
        .catch((error) => {
          console.error('Error updating password:', error);
          alert('Failed to update password');
        });
    } else {
      // For other fields (e.g., first name, last name)
      // Dynamically set the field name using "editing" as the field name
      const formattedData = `{ 
        "username": "${data.my_profile.user_info.username}",
        "updated_info": { 
            "${editing}": "${newValue}"
        }
    }`;  
      
      // Log the data with quotes added manually
      console.log(formattedData);
  
      // Send the updated field to the backend using POST
      fetch('http://127.0.0.1:5000/update_profile', {
        method: 'POST',  // POST method
        headers: {
          'Content-Type': 'application/json',
        },
        body: formattedData
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Profile updated successfully') {
            console.log("yeye");
            alert(`${fieldLabels[editing]} updated successfully`);
            const updatedData = { ...data };
            if (editSection === 'user_info') {
              updatedData.my_profile.user_info[editing] = newValue;
            } else if (editSection === 'residence') {
              updatedData.my_profile.residence[editing] = newValue;
            }
            setData(updatedData);  // Update the state with the new data
          } else {
            alert(`Failed to update ${fieldLabels[editing]}`);
          }
        })
        .catch((error) => {
          console.error(`Error updating ${fieldLabels[editing]}:`, error);
          alert(`Failed to update ${fieldLabels[editing]}`);
        });
    }
  
    // Close the popup and reset states
    setisPopUpOpen(false);
    setEditing(null);
    setEditSection('');
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsOldPasswordValid(false);
    setIsOldPasswordChecked(false);
  };
  
  

  // Handle closing the popUp without saving
  const handleClosepopUp = () => {
    setisPopUpOpen(false); // Close the popUp
    setEditing(null); // Reset editing state
    setEditSection(''); // Reset section state
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsOldPasswordValid(false); // Reset old password validity
    setIsOldPasswordChecked(false); // Reset old password checked state
  };

  // Handle old password input change
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  // Handle the "Continue" button click for old password validation
  const handleContinueClick = () => {
    if (oldPassword == data.my_profile.user_info.password) {
      setIsOldPasswordValid(true); // Mark as valid if old password is correct
      setIsOldPasswordChecked(true); // Mark the old password check as done
    } else {
      alert("Old password is incorrect.");
      setIsOldPasswordValid(false); // Set as invalid if incorrect
    }
  };

  // Render the component
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleSignOut = () => {
    localStorage.clear(); // Clear all items in localStorage
    navigate("/");
  };

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
        <div className="blockPro topBlockProfile" onClick={() => editClick('first name', 'user_info')}>
          <p>First Name</p>
          <p className="userDetails">{data.my_profile.user_info["first name"]}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p>
        </div>

        <div className="blockPro" onClick={() => editClick('last name', 'user_info')}>
          <p>Last Name</p>
          <p className="userDetails">{data.my_profile.user_info["last name"]}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p>
        </div>

        <div className="blockPro" onClick={() => editClick('username', 'user_info')}>
          <p>Username</p>
          <p className="userDetails">{data.my_profile.user_info.username}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p>
        </div>

        <div className="blockPro" onClick={() => editClick('e_mail', 'user_info')}>
          <p>Email</p>
          <p className="userDetails">{data.my_profile.user_info.e_mail}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p>
        </div>

        <div className="blockPro bottomBlockProfile" onClick={() => editClick('password', 'user_info')}>
          <p>Password</p>
          <p className="userDetails">{maskPassword(data.my_profile.user_info.password)}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p>
        </div>
      </div>

      {/* Residence section */}
      <div className="profileColumns">
        <h2 className="headingsProfile">Residence</h2>
        <div className="blockPro topBlockProfile" onClick={() => editClick('nick name', 'residence')}>
          <p>Nickname</p>
          <p className="userDetails">{data.my_profile.residence["nick name"]}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p>
        </div>

        <div className="blockPro" onClick={() => editClick('address', 'residence')}>
          <p>Address</p>
          <p className="userDetails">{data.my_profile.residence.address}&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p>
        </div>

        <div className="blockPro bottomBlockProfile" onClick={() => navigate("/uploaded_docs")}>
          <p>Uploaded Documents</p>
          <p className="userDetails">&nbsp;&nbsp;&nbsp;&nbsp;{'>'}</p>
        </div>
      </div>

      {/* Bottom Section with Two Buttons */}
      <div className="bottomSectionProfile">
        <button className="actionButtonProfile" onClick={handleSignOut}>Sign Out</button>
        <button className="actionButtonProfile">Change User</button>
      </div>

      {/* Pop-up Edit Box */}
      {isPopUpOpen && (
        <div className="popUpOverlay">
          <div className="popUpContent">
            <h2>Edit {fieldLabels[editing] || editing}</h2>

            {editing == 'password' ? (
              <>
                {!isOldPasswordChecked ? 
                  // Ask for old password first
                  <div>
                    <p className="popUpPara">Old Password:</p>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={handleOldPasswordChange}
                      className="popUpInput"
                    />
                    <div className="popUpButtons">
                      <button className="popUpButton" onClick={handleContinueClick}>
                        Continue
                      </button>
                      <button className="popUpButton" onClick={handleClosepopUp}>
                        Cancel
                      </button>
                    </div>
                  </div>
                  : 
                  // Once old password is correct, ask for new password and confirm password
                  <>
                    <div>
                      <p className="popUpPara">New Password:</p>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="popUpInput"
                      />
                    </div>

                    <div>
                      <p className="popUpPara">Confirm New Password:</p>
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="popUpInput"
                      />
                    </div>

                    {/* Save and Cancel buttons only after the old password is validated */}
                    <div className="popUpButtons">
                      <button className="popUpButton" onClick={handleSave}>Save</button>
                      <button className="popUpButton" onClick={handleClosepopUp}>Cancel</button>
                    </div>
                  </>
                }
              </>
            ) : (
              <div>
                <input
                  type='text'
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="popUpInput"
                />

                {/* Save and Cancel buttons for non-password fields */}
                <div className="popUpButtons">
                  <button className="popUpButton" onClick={handleSave}>Save</button>
                  <button className="popUpButton" onClick={handleClosepopUp}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;
