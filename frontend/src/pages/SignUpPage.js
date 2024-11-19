import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for navigation
import { auth } from '../config/firebase-config'; // Assuming you're using Firebase Auth
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUpPage.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // To handle errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior
    setErrorMessage(''); // Clear any previous error messages

    try {
      // Create user with email and password using Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User created:', user);

      // After successful signup, navigate to profile page and pass user info
      navigate('/profile', { state: { name, email } });
    } catch (error) {
      console.error('Error signing up:', error.message);
      setErrorMessage(error.message); // Show error message
    }
  };

  return (
    <div className="signup-container">
      {/* Background Image Section */}
      <div className="bg-image-container">
        <img alt="Background" className="background-image" src="./assets/Home.png" />
      </div>

      {/* Sign-Up Form Section */}
      <div className="form-container">
        {/* Logo */}
        <div className="logo-container">
          <a href="/">
            <img className="logo" src="../Mainlogo.png" alt="Logo" />
          </a>
        </div>

        {/* Form Header */}
        <div className="form-header">
          <h2>Create a free account!</h2>
          <p>Please enter your details below to sign up</p>
        </div>

        {/* Error Message Display */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="signup-form">
          {/* Name Field */}
          <div className="input-group">
            <input
              type="text"
              id="name"
              name="name"
              className="input-field"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Full name</label>
          </div>

          {/* Email Field */}
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              className="input-field"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email address</label>
          </div>

          {/* Password Field */}
          <div className="input-group relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>

            {/* Show/Hide Toggle Button */}
            <button
              type="button"
              className="show-hide-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Newsletter Checkbox */}
          <div className="newsletter-section">
            <p>Sign up now to enter in the world of your Online Dream Store Craft.</p>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={newsletter}
                onChange={() => setNewsletter(!newsletter)}
              />
              <label htmlFor="newsletter">Yes, sign me up for updates.</label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Create account now
          </button>
        </form>

        {/* Login Redirect Button */}
        <div className="login-redirect">
          <p>Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="login-button"
          >
            Login here
          </button>
        </div>

        {/* Terms & Conditions */}
        <div className="terms">
          By creating an account, you're agreeing to our{' '}
          <a href="/terms/" target="_blank" rel="noopener">
            terms and conditions
          </a>{' '}
          and to the way we collect and use your personal data as set out in our{' '}
          <a href="/privacy-policy/" target="_blank" rel="noopener">
            privacy policy
          </a>.
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
