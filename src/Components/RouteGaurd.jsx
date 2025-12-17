import { useContext } from "react"
import { Auth } from "../Context/Auth"
import { Navigate } from "react-router-dom";

//prevents the user from going to home page without login
const RouteGaurd = ({ children }) => {

    const { user } = useContext(Auth);

    if (!user) return <Navigate to="/Login" />;

    return children;
};

export default RouteGaurd;