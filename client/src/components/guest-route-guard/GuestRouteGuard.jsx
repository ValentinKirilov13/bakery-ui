import {Navigate, Outlet, useLocation} from "react-router";
import useUserContext from "../../hooks/useUserContext";

export default function GuestRouteGuard() {
    const {isAuthenticated} = useUserContext();
    const location = useLocation();

    if (!isAuthenticated)
        return <Navigate to="/login" state={{from: location}} replace />;

    return <Outlet />;
}
