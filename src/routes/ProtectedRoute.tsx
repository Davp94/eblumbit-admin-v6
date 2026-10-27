import { Navigate, Outlet, useLocation } from "react-router";
import { selectIsAuthenticated, useAuthStore } from "../state-management/authStore";

function ProtectedRoute() {

    const isAuthenticated = useAuthStore(selectIsAuthenticated);
    // const location = useLocation();

    if(!isAuthenticated) {
        return <Navigate to={'/login'} replace/>
    }

    return <Outlet />
}

export default ProtectedRoute;