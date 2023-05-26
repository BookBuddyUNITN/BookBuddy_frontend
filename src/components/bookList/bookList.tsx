import React from "react";
import { Link } from "react-router-dom";

import "./bookList.component.css"

interface LibriListInterface {
    libri: any[],
    stato: string
}


export default function BookList({ libri, stato }: LibriListInterface) {


    let content = [];

    if (stato === "loading") {
        content.push(<div key="loading" className="lds-dual-ring"></div>)
    }
    else if (stato === "failed") {
        content.push(<div key="error" >error</div>)
    }
    else if (stato === "succeeded") {
        libri.map((libri: any) => (
            content.push(
                <Link key={libri._id} className="card" to={`/libro/${libri._id}`} >
                    <div className="mr-2">
                        <img src="https://via.placeholder.com/150" alt="book cover" />
                    </div>
                    <div>
                        <h3>{libri.titolo}</h3>
                        <p>{libri.autore}</p>
                    </div>
                </Link>
            )
        ))
    }



    return (
        <div className="cardContainer">
            {content}
        </div>
    )
}