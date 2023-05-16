import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Login from "./Login";
import React from "react";

import { Navigate } from "react-router-dom";

import { validateToken } from "../utils/validateToken";


function Layout() {

    const token = localStorage.getItem("token") || false;

    if (!validateToken(token as string)) {
        return <Navigate to="/login" />
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow">
                <Outlet />
            </div>
            <div className="h-[80px]">
                <NavBar />
            </div>
        </div>
    );
}

export default Layout;