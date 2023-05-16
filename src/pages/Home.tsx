import React from "react";

import { selectAllLibri,selectLibriError, selectLibriStatus, fetchLibri } from "../redux/features/libriSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import BookList from "../components/bookList/bookList";
import SearchBar from "../components/searchBar/searchBar";

export default function Home() {

    const dispatch = useDispatch();

    const libri = useSelector(selectAllLibri);
    const libriStatus = useSelector(selectLibriStatus);
    const libriError = useSelector(selectLibriError);

    useEffect(() => {
        if (libriStatus === "idle") {
            dispatch<any>(fetchLibri());
        }
    }, [libriStatus, dispatch]);

    return(
        <>
            <SearchBar />
            <BookList libri={libri} stato={libriStatus} />  
        </>
    )
}