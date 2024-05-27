import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetAndUpdatePasswordForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://localhost:4000/api/user/resetAndUpdatePassword', {
                email: formData.email,
                newPassword: formData.newPassword
            });
            toast.success('Password reset and updated successfully');
            // Redirect to login page after successful password reset and update
            setTimeout(() => {
                history.push('/login');
            }, 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error resetting and updating password');
        }
    };

    return (
        <div className="form-container">
            <ToastContainer position="top-right" />
            <form className="form" onSubmit={handleSubmit}>
            <h2>Reset password</h2>
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
                    <label>New Password:</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetAndUpdatePasswordForm;
