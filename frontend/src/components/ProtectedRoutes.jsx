import {Outlet, Navigate} from "react-router-dom";

const ProtectedRoutes = () => {
    const user = localStorage.getItem("isAuthenticated") === "true";
    return user ? <Outlet/> : <Navigate to = "/"/>;
}

export default ProtectedRoutes