import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from './LoginContext';
const ProtectedRoute = ({ children }) => {
    const { token } = useContext(LoginContext);
    const isLoggedIn = token != null
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;