import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./HeaderBar.css";

const HeaderBar = ({ isLoggedIn }) => {
  const [searchText, setSearchText] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchButtonClick = () => {
    if (searchText.trim()) {
      navigate(`/search?query=${searchText}`);
    }
  };

  // Determine if the user is on the home page
  const isHomePage = location.pathname === "/";

  return (
    <header className="header-bar">
      <div className="nav-container">
        <h1 className="brand-name">CraftConnect</h1>

        <nav className="nav-links">
          {/* Show Home Button on non-home pages and Dashboard button only on HomePage */}
          {isHomePage && isLoggedIn ? (
            <Link to="/seller-dashboard" className="nav-link">
              Dashboard
            </Link>
          ) : (
            !isHomePage && (
              <Link to="/" className="nav-link">
                Home
              </Link>
            )
          )}

          <Link to="/about-us" className="nav-link">About Us</Link>
          <button
            onClick={() => navigate("/product-listing")} // Updated here
            className="nav-link shop-button"
          >
            Shop
          </button>
          <button
            onClick={() => navigate("/testimonials")}
            className="nav-link testimonial-button"
          >
            Testimonials
          </button>
        </nav>

        <div className="search-container">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={`search-input ${isSearchExpanded ? "expanded" : ""}`}
            onFocus={() => setIsSearchExpanded(true)}
            onBlur={() => setIsSearchExpanded(false)}
            placeholder="Search"
          />
          <button
            onClick={handleSearchButtonClick}
            className="search-button"
          >
            🔍
          </button>
        </div>

        <div className="auth-buttons">
          {!isLoggedIn ? (
            <Link to="/signup" className="signup-link">Sign Up</Link>
          ) : (
            <div className="profile-emoji" onClick={() => navigate("/profile")}>
              👤
            </div>
          )}

          {isLoggedIn && (
            <button
              onClick={() => navigate("/settings")}
              className="settings-button"
            >
              ⚙️
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
