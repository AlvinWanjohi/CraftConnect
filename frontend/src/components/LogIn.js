// src/components/LogIn.js
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase-config'; // Import the auth instance
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LogIn = () => {
  // Google Auth Provider
  const provider = new GoogleAuthProvider();

  // Handle sign-in
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Signed in user:", user);
        // Handle signed-in user (e.g., set user state, redirect, etc.)
      })
      .catch((error) => {
        console.error("Sign-in error:", error.message);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
    </div>
  );
};

export default LogIn;
