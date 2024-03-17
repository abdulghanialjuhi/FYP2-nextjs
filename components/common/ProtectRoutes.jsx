import { useContext } from "react";
import { Context } from "../../context/GlobalState";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }) => {

    const { isAuth } = useContext(Context)

    useEffect(() => {
        if (!isAuth) {
            window.location = '/login'
        }
    }, [isAuth])

    return children;
};