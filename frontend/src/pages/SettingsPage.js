import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./SettingsPage.css";

const settingsData = [
  {
    section: "Account",
    items: [
      { name: "Personal Information", icon: "👤", route: "/profile" },
      { name: "Payment", icon: "💰", route: "/payment" },
      { name: "Dashboard", icon: "📊", route: "/seller-dashboard" }, // Updated route
    ],
  },
  {
    section: "Privacy and Security",
    items: [
      { name: "Privacy Settings", icon: "🔐", route: "/privacy-settings" },
      { name: "Activity Status", icon: "📶", route: "/activity-status" },
      { name: "Storage and Data", icon:"📦", route: "/blocked-accounts" },
    ],
  },
  {
    section: "Notifications",
    items: [
      { name: "Contact Us", icon: "📱", route: "/contact-us" },  // Replaced Push Notifications with Contact Us
      { name: "Email Notifications", icon: "📧", route: "/email-notifications" },
    ],
  },
];

const Settings = () => {
  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(0);

  // Simulate fetching the notification count (replace this with actual API/Firebase logic)
  useEffect(() => {
    const fetchEmailNotifications = async () => {
      const notifications = Math.floor(Math.random() * 5); // Simulates 0-4 notifications
      setEmailNotifications(notifications);
    };

    fetchEmailNotifications();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleNavigation = (route) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>
      {settingsData.map((section, index) => (
        <div key={index} className="settings-section">
          <h2 className="section-title">{section.section}</h2>
          <ul className="settings-list">
            {section.items.map((item, idx) => (
              <li
                key={idx}
                className="settings-item"
                onClick={() => handleNavigation(item.route)}
              >
                <span className="item-icon">{item.icon}</span>
                <span className="item-name">
                  {item.name}
                  {item.name === "Email Notifications" && emailNotifications > 0 && (
                    <span className="notification-badge">{emailNotifications}</span>
                  )}
                </span>
                <span className="item-arrow">➡️</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={handleLogout} className="logout-button">
        Log Out
      </button>
    </div>
  );
};

export default Settings;
