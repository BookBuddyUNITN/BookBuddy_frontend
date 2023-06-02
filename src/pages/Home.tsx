import React from "react";

import { selectAllLibri, selectLibriStatus, riceraLocale } from "../redux/features/ricercaSlice";
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
            dispatch<any>(riceraLocale(
                {
                    location: [0, 0],
                    distanzaMassima: 100,
                    searchString: ""
                }
            ));
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