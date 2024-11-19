import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { auth } from "../config/firebase-config"; 
import { signInWithEmailAndPassword } from "firebase/auth"; 
import PropTypes from "prop-types"; 
import "./LoginPage.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [isResetMode, setIsResetMode] = useState(false); 
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setEmail(""); 
      setPassword(""); 
      
      // After successful login, redirect to Seller Dashboard
      navigate("/seller-dashboard"); 
    } catch (err) {
      console.error("Error:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleResetSubmit = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="login-page">
      {/* Left Side: Background Image */}
      <div className="left-side">
        <img
          alt="Background"
          className="background-image"
          src="/assets/Back.jpg" 
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="right-side">
        <div className="form-container">
          <h2>Welcome back!</h2>
          <p>Please enter your details below to log in</p>
          
          <form
            onSubmit={isResetMode ? handleResetSubmit : handleLoginSubmit}
            className="login-form"
          >
            {/* Email Field */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Email"
              required
            />

            {/* Password Field (only shown in login mode) */}
            {!isResetMode && (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Password"
                required
              />
            )}

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-button">
              {isResetMode ? "Send Reset Link" : "Login"}
            </button>
          </form>

          <div className="footer-links">
            <p>Don't have an account?</p>
            <Link to="/signup" className="sign-up-link">Sign Up</Link>
            
            {!isResetMode && (
              <p
                className="forgot-password-link"
                onClick={() => setIsResetMode(true)}
              >
                Forgot your password?
              </p>
            )}

            {isResetMode && (
              <p
                className="forgot-password-link"
                onClick={() => setIsResetMode(false)}
              >
                Back to Login
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginPage;
