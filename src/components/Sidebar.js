// src/components/Sidebar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
      <h3>Homechoice Supermarket</h3>
      <ul>
        <li>
          <NavLink exact to="/dashboard" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active">
            Profile
          </NavLink>
        </li>
        <li onClick={toggleDropdown} className="dropdown-toggle">
          Items
          {dropdownOpen && (
            <ul className="dropdown-menu">
            <li>
                <NavLink to="/items/add" activeClassName="active">
                Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/items/makesale" activeClassName="active">
                  Make sale
                </NavLink>
              </li>
              <li>
                <NavLink to="/items/itemlist" activeClassName="active">
                Item List
                </NavLink>
              </li>
            </ul>
          )}
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
