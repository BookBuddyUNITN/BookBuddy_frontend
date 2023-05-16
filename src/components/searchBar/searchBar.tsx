import React from "react";

import "./searchBar.component.css"

export default function SearchBar() {
    return (
        <div className="cont">
            <input className="search" type="text" placeholder="Search.." />
        </div>
    )
}