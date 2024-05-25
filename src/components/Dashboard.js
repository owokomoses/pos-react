// src/components/Dashboard.js
import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './Dashboard.css';

const Dashboard = () => {
return (
    <div className="dashboard-container">
      <Sidebar /> {/* Sidebar in its own div */}
    <div className="dashboard-main">
        <div className="dashboard-content">
        <h2>Welcome to the Dashboard</h2>
          {/* You can add more dashboard content here */}
        </div>
    </div>
    </div>
);
};

export default Dashboard;
