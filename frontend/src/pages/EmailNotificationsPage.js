import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./EmailNotificationsPage.css"; // Importing CSS styles

const EmailNotificationPage = () => {
  const navigate = useNavigate();

  // State to track form inputs
  const [preferences, setPreferences] = useState({
    promotions: false,
    updates: false,
    reminders: false,
  });

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Here you would save preferences to a database or API
    console.log("Preferences saved:", preferences);
    alert("Your preferences have been saved!");
  };

  // Navigate back to settings
  const handleBackClick = () => {
    navigate("/settings");
  };

  return (
    <div className="email-notification-page">
      <h1 className="page-title">Email Notifications</h1>
      <p className="page-description">Manage your email notification preferences below:</p>

      <form onSubmit={handleFormSubmit} className="email-notification-form">
        <div className="notification-option">
          <input
            type="checkbox"
            id="promotions"
            name="promotions"
            checked={preferences.promotions}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="promotions">Promotional Emails</label>
        </div>
        <div className="notification-option">
          <input
            type="checkbox"
            id="updates"
            name="updates"
            checked={preferences.updates}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="updates">Product Updates</label>
        </div>
        <div className="notification-option">
          <input
            type="checkbox"
            id="reminders"
            name="reminders"
            checked={preferences.reminders}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="reminders">Reminders & Alerts</label>
        </div>

        <button type="submit" className="save-button">Save Preferences</button>
      </form>

      <button onClick={handleBackClick} className="back-button">Back</button>
    </div>
  );
};

export default EmailNotificationPage;
