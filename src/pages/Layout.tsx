import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import React, { useEffect } from "react";

import { Navigate } from "react-router-dom";

import { validateToken } from "../utils/validateToken";


function Layout() {
    const [logged, setLogged] = React.useState<number>(1);
    const token = localStorage.getItem("token") || "";

    useEffect(() => {
        validateToken(token as string).then((res) => {
            if (!res) {
                setLogged(0);
            } else {
                setLogged(2);
            }
        }).catch((err) => {
            console.log(err);
            setLogged(0);
        });
    },[token]);

    if (logged === 0) {
        return <Navigate to="/login" />;
    } else if (logged === 1) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="h-[100svh] relative">
                <div className="w-screen h-[calc(100svh-65px)] overflow-scroll absolute top-0">
                    <Outlet />
                </div>
                <div className="h-[60px] absolute bottom-0 bg-white z-10">
                    <NavBar />
                </div>
            </div>
        );
    }


}

export default Layout;