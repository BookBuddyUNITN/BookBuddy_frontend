import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectAllLibri, selectLibriStatus, selectLibriError, fetchLibri } from "../redux/features/wishlistSlice";

import AddLibro from "./AddLibro";

import plus_button from "../assets/img/plus_button.png";
import Popup from "../components/popUpPage/popUpPage";

import BookList from "../components/bookList/bookList";

export default function Wishlist() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const dispatch = useDispatch();

    const libri = useSelector(selectAllLibri);
    const libriStatus = useSelector(selectLibriStatus);
    const libriError = useSelector(selectLibriError);

    React.useEffect(() => {
        if (libriStatus === "idle") {
            dispatch<any>(fetchLibri());
        }
    }, [libriStatus, dispatch]);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="w-full h-full relative">
            <div className="h-full w-full flex flex-col p-[3%] absolute top-0 left-0">
                <div className="w-full flex flex-row justify-between">
                    <h1 className="text-2xl font-bold">Wishlist</h1>
                    <img className="w-8 h-8" src={plus_button} alt="add button" onClick={handleOpenPopup} />
                </div>
                <div>
                    <BookList stato={libriStatus} libri={libri} />
                </div>
            </div>
            {isPopupOpen && <Popup onClose={handleClosePopup} >
                    <AddLibro />
                </Popup>}
        </div>

    )
}