import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './users.css';  // Import the CSS file
import Sidebar from './Sidebar';
const UserTable = () => {
const [users, setUsers] = useState([]);

useEffect(() => {
    const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/user/getAllUsers');
        setUsers(response.data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    };

    fetchUsers();
}, []);

const deleteUser = async (userId) => {
    try {
    await axios.delete(`http://localhost:4000/api/user/deleteUser/${userId}`);
    setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
    console.error('Error deleting user:', error);
    }
};

return (
    <div className="table-container">
        <Sidebar />
    <h2>User Table</h2>
    <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
};

export default UserTable;
