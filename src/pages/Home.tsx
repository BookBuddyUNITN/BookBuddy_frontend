import React from "react";

import { selectAllLibri, selectLibriStatus, fetchLibri } from "../redux/features/libriSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import BookList from "../components/bookList/bookList";
import SearchBar from "../components/searchBar/searchBar";

export default function Home() {

    const dispatch = useDispatch();

    const libri = useSelector(selectAllLibri);
    const libriStatus = useSelector(selectLibriStatus);

    useEffect(() => {
        if (libriStatus === "idle") {
            dispatch<any>(fetchLibri());
        }
    }, [libriStatus, dispatch]);

    return (
        <>
            <div className="sticky top-0">
                <SearchBar />
            </div>
            <BookList libri={libri} stato={libriStatus} />
        </>
    )
}