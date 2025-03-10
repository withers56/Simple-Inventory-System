import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth/auth";

const ProtectedRoutes = () => {
    const user = isLoggedIn();

    return user ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes