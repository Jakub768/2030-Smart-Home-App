import React from 'react';
import { useState } from "react";
import './Users.css'; 
import userIcon from '../images/User.png';
import { useNavigate } from "react-router-dom";

const initialUsers = [
  { id: 1, username: 'username1', role: 'Homeowner'},
  { id: 2, username: 'username2', role: 'Admin'},
  { id: 3, username: 'username3', role: 'User'},
  { id: 4, username: 'username4', role: 'User'},
  { id: 5, username: 'username5', role: 'User'},
  { id: 6, username: 'username6', role: 'User'},
  { id: 7, username: 'username7', role: 'User'},
  { id: 8, username: 'username8', role: 'User'},
];

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const updateUserRole = (id, newRole) => {
    setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        type='text' 
        placeholder='Search'
        value={searchTerm} 
        onChange={(x) => setSearchTerm(x.target.value)}
        className='searchInput' 
      />
      <div className='usersList'>
        {filteredUsers.map(user => (
          <div key={user.id} className='userItem'>
            <span className='username'>{user.username}</span>
            <select className='roleSelect' value={user.role} onChange={(x) => updateUserRole(user.id, x.target.value)}>
              {['User', 'Homeowner', 'Admin'].map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Users;
