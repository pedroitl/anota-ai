import { Navigate } from "react-router-dom";

function ProtectedRoutes({children, allowedRoles}) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");


    if(!token) {
        return <Navigate to="/login" />;
    }

    if(role !== allowedRoles) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoutes;