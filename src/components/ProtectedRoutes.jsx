import { Navigate } from "react-router-dom";

function ProtectedRoutes({children, allowedRoles}) {

    const userLogado = JSON.parse(localStorage.getItem("user"));

    console.log(userLogado);
    console.log(allowedRoles);

    if(!userLogado) {
        return <Navigate to="/home-funcionario" />;
    }

    if(userLogado.role !== allowedRoles) {
        return <Navigate to="/home-funcionario" />;
    }

    return children;
}

export default ProtectedRoutes;