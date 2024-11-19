import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // To get the state passed through navigation
import './ProfilePage.css';

const ProfilePage = () => {
  const { state } = useLocation(); // Access the state passed through navigation
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    avatar: "https://via.placeholder.com/150",
    name: state ? state.name : "John Doe", // Default to 'John Doe' if no state is passed
    email: state ? state.email : "johndoe@example.com", // Default to 'johndoe@example.com' if no state is passed
    phone: "+254 123 456 789", // Example with Kenya country code
    address: "123, Dream Street, Imagination City, Dreamland",
    bio: "A passionate crafter and artisan.",
  });

  const [newAvatar, setNewAvatar] = useState(null);

  // Toggle edit mode
  const handleEditToggle = () => {
    setEditing(!editing);
    if (!editing) setNewAvatar(null); // Reset avatar preview when switching to view mode
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle avatar image change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes to profile
  const handleSave = () => {
    setEditing(false);
    if (newAvatar) {
      setProfileData((prev) => ({ ...prev, avatar: newAvatar }));
    }
    console.log("Profile Updated:", profileData);
  };

  return (
    <div className="profile-page">
      {/* Header Section */}
      <div className="profile-header">
        <div className="avatar-section">
          <div className="avatar-container">
            <img
              src={newAvatar || profileData.avatar}
              alt="Avatar"
              className="avatar"
            />
            {editing && (
              <div className="avatar-edit-overlay">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  id="avatar-upload"
                  style={{ display: 'none' }}
                />
                <button
                  className="upload-button"
                  onClick={() => document.getElementById('avatar-upload').click()}
                >
                  Change Photo
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="info-section">
          {editing ? (
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="name-input"
              placeholder="Enter your full name"
            />
          ) : (
            <h1 className="name-display">{profileData.name}</h1>
          )}
          {editing ? (
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              className="bio-input"
              placeholder="Tell the world about you!"
            />
          ) : (
            <p className="bio-display">{profileData.bio}</p>
          )}
        </div>
        <button className="edit-button" onClick={handleEditToggle}>
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Personal Information Section */}
      <div className="profile-details">
        <h2>Personal Information</h2>

        {/* Name */}
        <div className="info-row">
          {editing && <label className="detail-label">Name:</label>}
          {editing ? (
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="detail-input"
              placeholder="Enter your full name"
            />
          ) : (
            <p className="detail-display">{profileData.name}</p>
          )}
        </div>

        {/* Bio */}
        <div className="info-row">
          {editing && <label className="detail-label">Bio:</label>}
          {editing ? (
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              className="detail-textarea"
              placeholder="Enter your bio"
            />
          ) : (
            <p className="detail-display">{profileData.bio}</p>
          )}
        </div>

        {/* Email */}
        <div className="info-row">
          {editing && <label className="detail-label">Email:</label>}
          {editing ? (
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="detail-input"
              placeholder="Enter your email"
            />
          ) : (
            <p className="detail-display">{profileData.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="info-row">
          {editing && <label className="detail-label">Phone:</label>}
          {editing ? (
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className="detail-input"
              placeholder="Enter your phone number"
            />
          ) : (
            <p className="detail-display">{profileData.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="info-row">
          {editing && <label className="detail-label">Address:</label>}
          {editing ? (
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              className="detail-input"
              placeholder="Enter your address"
            />
          ) : (
            <p className="detail-display">{profileData.address}</p>
          )}
        </div>

        {/* Save Changes Button */}
        {editing && (
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
