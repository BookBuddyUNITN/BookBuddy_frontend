import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectAllLibri, selectLibriStatus, fetchLibri } from "../redux/features/libriSlice";

import BookList from "../components/bookList/bookList";

export default function LibreriaPersonale() {

    const dispatch = useDispatch();
    
    const libri = useSelector(selectAllLibri);
    const libriStatus = useSelector(selectLibriStatus);

    React.useEffect(() => {
        if (libriStatus === "idle") {
            dispatch<any>(fetchLibri());
        }
    }, [libriStatus, dispatch]);

    return (
        <div>
            <BookList stato={libriStatus} libri={libri} />
        </div>
    )
}