import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setService, setRedirectTo } from '../../../features/auth/authSlice';
import { useRequestPasswordResetMutation } from '../../../features/api/apiSlice';
import "./PasswordResetEmailRequest.css"

 export const PasswordResetEmailRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages

    try {
      const response = await requestPasswordReset(email).unwrap();
            // If the request is successful, the response should contain the success message
            setMessage('OTP sent successfully. Check your email.');
      
            // Set the service and redirect route in the Redux store
              if (response.success && response.nextStep) {
        dispatch(setService(response.nextStep.service));
        dispatch(setRedirectTo(response.nextStep.redirectTo));

        setTimeout(() => {
          navigate(response.nextStep.redirectTo);
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to request password reset:', err);
      if (err.data) {
        setMessage(err.data.message || 'An error occurred. Please try again.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
    
  };


  
  

  return (
    <div className='requestmaildiv'>
      <form onSubmit={handleSubmit} className='requestpasswordresetemailform'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset code'}
        </button>
        {message && <p className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</p>}
      </form>
    </div>
  );
};

export default PasswordResetEmailRequest;