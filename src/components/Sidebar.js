// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
return (
    <div className="sidebar">
    <div className="profile-section">
        <img
          src="https://via.placeholder.com/100" // Replace with the actual profile picture URL
        alt="Profile"
          className="profile-picture"
        />
        <p className="profile-name">User Name</p>
    </div>
    <h3>Dashboard</h3>
    <ul>
        <li>
        <NavLink exact to="/dashboard" activeClassName="active">
            Home
        </NavLink>
        </li>
        <li>
        <NavLink to="/profile" activeClassName="active">
            Profile
        </NavLink>
        </li>
        <li>
        <NavLink to="/settings" activeClassName="active">
            Settings
        </NavLink>
        </li>
        <li>
        <NavLink to="/logout" activeClassName="active">
            Logout
        </NavLink>
        </li>
    </ul>
    </div>
  );
};

export default Sidebar;
