import React, { useState } from 'react';
import './Users.css'; 
import userIcon from '../images/User.png';
import { useNavigate } from 'react-router-dom';

const initialUsers = [
  { id: 1, username: 'username1', role: 'Homeowner' },
  { id: 2, username: 'username2', role: 'Admin' },
  { id: 3, username: 'username3', role: 'User' },
  { id: 4, username: 'username4', role: 'User' },
  { id: 5, username: 'username5', role: 'User' },
  { id: 6, username: 'username6', role: 'User' },
  { id: 7, username: 'username7', role: 'User' },
  { id: 8, username: 'username8', role: 'User' },
  { id: 9, username: 'username9', role: 'User' },
  { id: 10, username: 'username10', role: 'User' },
  { id: 11, username: 'username11', role: 'User' },
  { id: 12, username: 'username12', role: 'User' },
  { id: 13, username: 'username13', role: 'User' },
];

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null); // Track open dropdown by user ID
  const [roleSelectArrow, setRoleSelectArrow] = useState({}); // Track individual arrow states

  const updateUserRole = (id, newRole) => {
    setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle option selection for the custom dropdown
  const handleOptionClick = (role, userId) => {
    updateUserRole(userId, role);
    setOpenDropdownId(null); // Close dropdown after selection
    setRoleSelectArrow(prev => ({ ...prev, [userId]: false })); // Reset arrow state after selection
  };

  const toggleArrow = (userId) => {
    setRoleSelectArrow(prev => ({
      ...prev,
      [userId]: !prev[userId], // Toggle the arrow state for the specific user
    }));
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
        {filteredUsers.map((user, index) => (
          <div
            key={user.id}
            className={`userItem ${index === 0 ? 'topBlockUser' : ''} ${index === filteredUsers.length - 1 ? 'bottomBlockUser' : ''}`}
          >
            <span className="username">{user.username}</span>

            {/* Custom dropdown */}
            <div className="roleSelectWrapper">
              <div
                className="roleSelect"
                onClick={() => {
                  setOpenDropdownId(openDropdownId === user.id ? null : user.id);
                  toggleArrow(user.id); // Toggle arrow for this user
                }}
              >
                <span>{user.role}</span>
                <span className="arrow">
                  {roleSelectArrow[user.id] ? '▼' : '►'}
                </span>
              </div>

              {openDropdownId === user.id && (
                <ul className="customDropdown">
                  {['Homeowner', 'Admin', 'User'].map((role) => (
                    <li
                      key={role}
                      onClick={() => handleOptionClick(role, user.id)}
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
