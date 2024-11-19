import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './config/firebase-config';
import 'leaflet/dist/leaflet.css';

// Importing Components and Pages
import HeaderBar from './components/HeaderBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailsPage';
import ProductListingPage from './pages/ProductListingPage'; 
import AddCraftPage from './pages/AddCraftPage';
import AboutUsPage from './pages/AboutUsPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import UpdateProductPage from './pages/UpdateProductPage';
import ContactUsPage from './pages/ContactUsPage';
import ProductAdd from './components/ProductAdd';
import SettingsPage from './pages/SettingsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PaymentPage from './components/PaymentPage';
import EmailNotificationsPage from './pages/EmailNotificationsPage'; 
import MapComponent from './components/MapComponent';
import SellerDashboardPage from './pages/SellerDashboardPage';

// Auth Context for Global Auth State
export const AuthContext = React.createContext();

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const { isLoggedIn } = React.useContext(AuthContext);

  return isLoggedIn ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Monitor Firebase Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <HeaderBar isLoggedIn={isLoggedIn} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/product-listing" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/add-craft" element={<AddCraftPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} /> {/* Updated route path */}
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/map" element={<MapComponent />} />

          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />
          <Route path="/payment" element={<ProtectedRoute element={<PaymentPage />} />} />
          <Route path="/email-notifications" element={<ProtectedRoute element={<EmailNotificationsPage />} />} />
          <Route path="/seller-dashboard" element={<ProtectedRoute element={<SellerDashboardPage />} />} />
          
          {/* Update and Add Product Routes */}
          <Route path="/add-craft/:id" element={<ProtectedRoute element={<AddCraftPage />} />} />
          <Route path="/add-product" element={<ProtectedRoute element={<ProductAdd />} />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
