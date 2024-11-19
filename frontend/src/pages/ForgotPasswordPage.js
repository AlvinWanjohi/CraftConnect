import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset link sent! Check your email.");
      setError('');
      setEmail('');
      setTimeout(() => navigate('/login'), 5000); // Redirect after 5 seconds
    } catch (err) {
      setError("Failed to send password reset email. Please check your email.");
      setSuccess('');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Your Password?</h2>
        <p>Enter your email below and we'll send you a password reset link.</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="email-input"
        />

        <button onClick={handleForgotPassword} className="reset-button">
          Send Reset Link
        </button>

        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="back-to-login">
          <p>Remembered your password? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
