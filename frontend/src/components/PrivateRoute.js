// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/firebase-config';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const PrivateRoute = ({ component: Component }) => {
  return auth.currentUser ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
