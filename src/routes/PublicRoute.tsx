import { Navigate, Outlet, useLocation } from "react-router";
import { selectIsAuthenticated, useAuthStore } from "../state-management/authStore";

function PublicRoute() {

    const isAuthenticated = useAuthStore(selectIsAuthenticated);
    const location = useLocation();
    // const from = (location.state as {from?: {pathname: string}}).from?.pathname;
    // console.log("🚀 ~ PublicRoute ~ from:", from)

    if(isAuthenticated) {
        return <Navigate to={'/dashboard'} replace/>
    }

    return <Outlet />
}

export default PublicRoute;