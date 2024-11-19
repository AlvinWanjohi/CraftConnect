// src/services/authService.js

// Import necessary Firebase modules
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// Function to send password reset email
export const sendResetPasswordEmail = (email) => {
  const auth = getAuth();

  // Send a password reset email
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!");
      return true; // Success
    })
    .catch((error) => {
      console.error(`Error: ${error.code}, ${error.message}`);
      throw error; // Propagate error
    });
};
