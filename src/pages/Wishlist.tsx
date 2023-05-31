import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectAllLibri, selectLibriStatus, selectLibriError, fetchLibri } from "../redux/features/wishlistSlice";

import BookList from "../components/bookList/bookList";

export default function Wishlist() {

    const dispatch = useDispatch();
    
    const libri = useSelector(selectAllLibri);
    const libriStatus = useSelector(selectLibriStatus);
    const libriError = useSelector(selectLibriError);

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