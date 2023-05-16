import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return(
        <div className="w-screen h-[100%] flex flex-row justify-evenly items-center border-t-4 border-black ">
            <div className="text-2xl font-bold">
                <Link to="/">Home</Link>
            </div>
            <div className="text-2xl font-bold">
                <Link to="/library">Library</Link>
            </div>
            <div className="text-2xl font-bold">
                <Link to="/library">Library</Link>
            </div>
            <div className="text-2xl font-bold">
                <Link to="/library">Library</Link>
            </div>
        </div>
    )
}