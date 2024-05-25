import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const ResetAndUpdatePasswordForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://localhost:4000/api/user/resetAndUpdatePassword', {
                email: formData.email,
                newPassword: formData.newPassword
            });
            setSuccess('Password reset and updated successfully');
            setError(null);
            // Redirect to login page after successful password reset and update
            history.push('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'Error resetting and updating password');
            setSuccess(null);
        }
    };

    return (
        <div className="form-container">
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default ResetAndUpdatePasswordForm;
