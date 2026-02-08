import { Navigate } from "react-router-dom"; // Use 'react-router-dom' to match your App.tsx
import { useAuth } from "../helpers/useAuth";
import type { JSX, ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}