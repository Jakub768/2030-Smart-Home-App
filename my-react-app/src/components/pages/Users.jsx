import React, { useState, useEffect } from 'react';
import './Users.css'; 
import userIcon from '../images/User.png';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null); // Track open dropdown by user ID
  const [roleSelectArrow, setRoleSelectArrow] = useState({}); // Track individual arrow states

  // State to store the data
  const [data, setData] = useState(null);

  // State to handle loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const username = sessionStorage.getItem('username');  // Retrieve username from sessionStorage

    if (username) {
      fetch(`http://127.0.0.1:5000/users?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch data');
          setLoading(false);
        });
    } else {
      setError('No username found');
      setLoading(false);
    }
  }, []);

  // Render the component
  if (loading) {
    const LoadingSpinner = () => {
      return (
        <main className="mainHome">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
        </main>
      );
    };
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Flatten the userList into an array of users
  const usersArray = data.users.map(usersData => {
    return {
      username: usersData[0],  // Assuming the username is at index 0
      role: usersData[1],      // Assuming the role is at index 1
    };
  });

  // Filter users based on search term
  const filteredUsers = usersArray.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateUserRole = (username, newRole) => {
    setData(prevData => {
      const updatedRooms = prevData.users.map((usersData) => {
        if (usersData[0] === username) { // Use username to identify the user
          return [usersData[0], newRole]; // Update role
        }
        return usersData;
      });
      return { ...prevData, users: updatedRooms }; // Return updated data object
    });
  };

  // Handle option selection for the custom dropdown
  const handleOptionClick = (role, username) => {
    updateUserRole(username, role);
    setOpenDropdownId(null); // Close dropdown after selection
    setRoleSelectArrow(prev => ({ ...prev, [username]: false })); // Reset arrow state after selection
  };

  const toggleArrow = (username) => {
    // Close previously opened dropdown and reset the arrow for it
    if (openDropdownId && openDropdownId !== username) {
      setRoleSelectArrow(prev => ({ ...prev, [openDropdownId]: false }));
    }
    
    setRoleSelectArrow(prev => ({
      ...prev,
      [username]: !prev[username], // Toggle the arrow state for the specific user
    }));
    
    setOpenDropdownId(prevOpen => (prevOpen === username ? null : username)); // Toggle open/close of dropdown
  };

  return (
    <main className="mainUsers">
      <div className="headerUsers">
        <button className="navButtonUsers" onClick={() => navigate(-1)}>{"<"}</button>
        <h1>Users</h1>
        <button className="navButtonUsers" onClick={() => navigate("/profile")}>
          <img src={userIcon} alt="User Icon" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />
      <div className="separatorLine"></div>
      <div className="usersList">
        {/* Map through the filtered users */}
        {filteredUsers.map((user, index) => (
          <div
            key={user.username} // Unique key for each user
            className={`userItem ${index == 0 ? 'topBlockUser' : ''} ${filteredUsers.length > 1 && index == filteredUsers.length - 1 ? 'bottomBlockUser' : ''}`}
            >
            <span className="username">{user.username}</span>

            {/* Custom dropdown */}
            <div className="roleSelectWrapper">
              <div
                className="roleSelect"
                onClick={() => {
                  toggleArrow(user.username); // Toggle arrow for this user
                }}
              >
                <span>{user.role}</span> {/* Display the role */}
                <span className="arrow">
                  {roleSelectArrow[user.username] ? '▼' : '►'} {/* Arrow based on the state of the dropdown */}
                </span>
              </div>

              {openDropdownId == user.username && (
                <ul className="customDropdown">
                  {['Homeowner', 'Admin', 'User'].map((role) => (
                    <li
                      key={role}
                      onClick={() => handleOptionClick(role, user.username)} // Pass username to handle role change
                      className="dropdownOption"
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Users;
