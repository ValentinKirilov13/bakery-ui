import {Navigate, Outlet, useLocation} from "react-router";
import useUserContext from "../../hooks/useUserContext";

export default function UserRouteGuard() {
    const {isAuthenticated} = useUserContext();
    const {state} = useLocation();
    const from = state?.from?.pathname || "/";

    if (isAuthenticated) return <Navigate to={from} replace />;

    return <Outlet />;
}
