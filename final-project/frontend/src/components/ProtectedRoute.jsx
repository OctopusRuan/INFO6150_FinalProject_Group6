import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * @param {Element} element - The component you want to protect
 * @param {Array} allowedTypes - Allowedd user roles ['admin', 'employee']
 */
const ProtectedRoute = ({ element: Element, allowedTypes }) => {
  const user = useSelector((state) => state.user.user);

  // Not login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role mismatch（e.g., employee trying to access admin pages）
  if (!allowedTypes.includes(user.type)) {
    return <Navigate to="/home" />;
  }

  return <Element />;
};

export default ProtectedRoute;
