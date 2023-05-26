import React from "react";
import back_button from "../../assets/img/back-button.png";


export default function BackButton() {
    return (
        <img className="w-[30px] h-[30px] cursor-pointer" src={back_button} alt="back" onClick={
            () => {
                window.history.back()
            }
        } />
    )
}