import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterForm.css'; // Import the CSS file

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/user/addUser', formData);
            console.log("Register response:", response.data);
            toast.success('Registration successful');
            // Redirect to login page after successful registration
            setTimeout(() => {
                history.push('/login');
            }, 1000);
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error(error.response?.data?.message || 'Error in registration');
        }
    };

    return (
        <div className="form-container">
            <ToastContainer position="top-right" />
            <form className="form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p className="already-have-account">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default RegisterForm;
