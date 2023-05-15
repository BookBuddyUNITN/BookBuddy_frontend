import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import React from "react";

function Layout() {
    return <>
        <div id="left">
            <NavBar />
        </div>

        <div id="right">
            <div id="content">
                <Outlet />
            </div>
        </div>
    </>;
}

export default Layout;