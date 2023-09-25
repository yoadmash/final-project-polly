import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.username
            ? <Outlet />
            : <Navigate to='/auth' />
    )
}

export default RequireAuth;