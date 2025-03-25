import React, { ReactNode } from 'react';
import { Navigate, useLocation } from "react-router-dom";


interface StudentProtectedRouteProps {
    children: ReactNode;
}

const StudentProtectedRoute: React.FC<StudentProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const auth = localStorage.getItem('profile');

    if (!auth) {
        return <Navigate to="/student/auth" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};

export default StudentProtectedRoute;

