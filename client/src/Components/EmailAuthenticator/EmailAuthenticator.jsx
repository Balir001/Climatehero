// src/components/EmailAuthenticator/EmailAuthenticator.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useVerifyAuthCodeMutation } from '../../features/api/apiSlice';
import { setIsAuthenticated } from '../../features/auth/authSlice';
import AuthCodeInput from '../AuthCodeInput/AuthCodeInput';
import { useNavigate } from 'react-router-dom';

export const EmailAuthenticator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { service, redirectTo } = useSelector((state) => state.auth);
  const [verifyAuthCode, { isLoading, error }] = useVerifyAuthCodeMutation();

  const handleAuthComplete = async (code) => {
    try {
      await verifyAuthCode({ code, service }).unwrap();
      dispatch(setIsAuthenticated(true));
      navigate(redirectTo);
      
    } catch (err) {
      console.error('Failed to verify auth code:', err);
    }
  };

  return (
    <div>
      <h2>Enter Authentication Code</h2>
      <AuthCodeInput length={6} onComplete={handleAuthComplete} />
      {isLoading && <p>Verifying...</p>}
      {error && <p style={{ color: 'red' }}>{error.data?.message || 'An error occurred'}</p>}
    </div>
  );
};