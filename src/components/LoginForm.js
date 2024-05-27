import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginForm.css'; // Import the shared CSS file

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const history = useHistory(); // Initialize useHistory

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting login form...");
            const response = await axios.post('http://localhost:4000/api/user/loginUser', formData);
            console.log("Login response:", response.data);
            toast.success('Login successful');
            // Redirect to dashboard after a delay to ensure toast appears
            setTimeout(() => {
                history.push('/dashboard');
            }, 1000);
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error(error.response?.data?.message || 'Error logging in');
        }
    };

    return (
        <div className="form-container">
            <ToastContainer position="top-right" />
            <form className="form" onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                <button type="submit">Login</button>
                <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
            </form>
        </div>
    );
};

export default LoginForm;
