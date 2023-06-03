import React from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectLibLriById, fetchLibri, selectLibriStatus } from "../redux/features/libriSlice";

import BackButton from "../components/back_button/BackButton";


function infoLibro(libro: any) {
    return (
        <div className="m-3">
            <div className="w-[100%]">
                <BackButton />
            </div>
            <div className="flex h-[400px] flex-row mt-2 justify-evenly">
                <img className="h-[400px]" src={"https://covers.openlibrary.org/b/isbn/" + libro.ISBN + "-M.jpg"} alt="book cover" />
                <div className="flex-grow ml-2">
                    <p>{libro.titolo}</p>
                    <p>{libro.autore}</p>
                </div>
            </div>
        </div>

    );
}

export default function Libro() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const status = useSelector(selectLibriStatus);
    const libro = useSelector((state) => selectLibLriById(state as any, id as string));

    if (libro !== undefined) {
        return infoLibro(libro);
    } else {
        if (status === "idle"){
            dispatch<any>(fetchLibri());
        }
        if (status === "loading") return <h1>Loading...</h1>;
        else if (status === "failed") return <h1>Error</h1>;
        else if (status === "succeeded") {
            return infoLibro(libro);
        } else {
            return <h1>Error</h1>
        }
    }

}