import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import React from "react";

import { Navigate } from "react-router-dom";

import { validateToken } from "../utils/validateToken";


function Layout() {

    const [logged, setLogged] = React.useState<number>(1);

    const token = localStorage.getItem("token") || false;

    validateToken(token as string).then((res) => {
        if (!res) {
            setLogged(0);
        } else {
            setLogged(2);
        }
    })

    if (logged === 0) {
        return <Navigate to="/login" />;
    } else if (logged === 1) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="flex flex-col h-screen">
                <div className="flex-grow overflow-scroll">
                    <Outlet />
                </div>
                <div className="h-[80px]">
                    <NavBar />
                </div>
            </div>
        );
    }


}

export default Layout;