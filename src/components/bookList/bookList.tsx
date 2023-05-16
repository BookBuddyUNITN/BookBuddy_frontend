import React from "react";

import "./bookList.component.css"

interface LibriListInterface {
    libri: any[],
    stato: string
}


export default function BookList({ libri, stato }: LibriListInterface) {


    let content

    if (stato === "loading") {
        content = <div className="lds-dual-ring"></div>
    }
    else if (stato === "failed") {
        content = <div>error</div>
    }
    else if (stato === "succeeded") {
        content = libri.map((libri: any) => (
            <div className="card" key={libri._id}>
                <div className="mr-2">
                    <img src="https://via.placeholder.com/150" alt="book cover" />
                </div>
                <div>
                    <h3>{libri.titolo}</h3>
                    <p>{libri.autore}</p>
                </div>
            </div>
        ))
    }


    return (
        <div className="cardContainer">
            {content}
        </div>
    )
}