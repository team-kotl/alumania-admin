import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RootLayout from "../layouts/RootLayout";

const ProtectedRoute = () => {
    const { token } = useAuth();
    return token ? <RootLayout /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
