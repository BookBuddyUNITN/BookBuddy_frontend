import React from "react";
import { Link } from "react-router-dom";

import dots from "../../assets/img/3dots.png";
import trash from "../../assets/img/recycle-bin.png";

interface LibriListInterface {
    libri: any[],
    stato: string,
    removeLibro: ((ISBN: string) => void) | null,
    removeStatus: string
}


export default function BookList({ libri, stato, removeLibro, removeStatus }: LibriListInterface) {

    let content = [];

    if (stato === "loading" || removeStatus === "loading") {
        content.push(<div key="loading" className="lds-dual-ring"></div>)
    }
    else if (stato === "failed" || removeStatus === "failed") {
        if (removeStatus === "failed")
            content.push(<div key="error" >remove error</div>)
        else
            content.push(<div key="error" >error</div>)
    }
    else if (stato === "succeeded") {
        if (libri.length === 0) {
            content.push(<div className="w-full h-full relative" key="No_books_found" >
                <h1 className="text-2xl font-bold absolute top-[30%] left-[50%] translate-x-[-50%]">No books found</h1>
            </div>)
        }
        libri.map((libro: any) => (
            content.push(
                <Link key={libro._id} className="card z-0" to={`/libro/${libro._id}`} >
                    <div className="flex flex-row justify-between h-[100%]">
                        <div className="flex flex-row items-center flex-1">
                            <img src={"https://covers.openlibrary.org/b/isbn/" + libro.ISBN + "-M.jpg"} alt="book cover" className="w-[110px] max-h-[150px] mr-2" />
                            <div className="flex-1">
                                <h3>{libro.titolo}</h3>
                                <p>{libro.autore}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center w-[40px]">
                            <img src={trash} alt="right arrow" className="w-[40px] iconButton" onClick={(e) => {
                                e.preventDefault();
                                if (removeLibro !== null)
                                    removeLibro(libro.ISBN);
                                // dispatch<any>(removeLibro(libro.ISBN));
                            }} />
                            <img src={dots} alt="right arrow" className="w-[40px] iconButton" onClick={(e) => {
                                e.preventDefault();
                                // dispatch<any>(removeLibro(libro.ISBN));
                            }} />
                        </div>
                    </div>
                </Link >
            )
        ))
    }
    return (
        <div className="cardContainer w-full h-full">
            {content}
        </div>
    )
}