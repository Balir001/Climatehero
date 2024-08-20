import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubmitNewPasswordMutation } from '../../../features/api/apiSlice';
import "./PasswordReset.css"

export const PasswordReset = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [submitNewPassword, { isLoading }] = useSubmitNewPasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await submitNewPassword(newPassword).unwrap();
            alert('Password reset successful');
            navigate('/signin');
        } catch (err) {
            setError(err.data?.message || 'An error occurred while resetting the password');
        }
    };

    return (
        <div>
           
            <form onSubmit={handleSubmit} className='newpaswordform'>
            <h2>Reset Password</h2>
                <div className='newpasswordinput' >
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='newpasswordinput'>
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};