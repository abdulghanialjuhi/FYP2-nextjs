import React, { useContext, useEffect } from "react";
import { Context } from "../../context/GlobalState";

export const RedirectRoutes = ({ children }) => {

    const { isAuth } = useContext(Context)

    useEffect(() => {
        if (isAuth) {
            window.location = '/profile'
        }
    }, [isAuth])

    return children;
};