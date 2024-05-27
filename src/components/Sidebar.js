// src/components/Sidebar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = ({ username }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img
          src="data:image/png;base64,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" // Replace with the actual profile picture URL
          alt="Profile"
          className="profile-picture"
        />
        <p className="profile-name">{ username }</p>
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
        <li>
          <NavLink to="/users" activeClassName="active">
            Users
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
