import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import React from "react";

function Layout() {
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