import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return(
        <div className="w-screen h-[100%] flex flex-row justify-evenly items-center border-t-4 border-black ">
            <div className="text-2xl font-bold">
                <Link to="/">Home</Link>
            </div>
            <div className="text-2xl font-bold">
                <Link to="/libreriapersonale">Library</Link>
            </div>
            <div className="text-2xl font-bold">
                <Link to="/wishlist">Wishlist</Link>
            </div>
            <div className="text-2xl font-bold">
                <Link to="/TEST">TEST</Link>
            </div>
        </div>
    )
}