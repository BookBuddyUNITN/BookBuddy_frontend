import React from 'react';

import xbutton from "../../assets/img/xbutton.png";

const Popup = (props: any) => {
    return (
        <div className="w-[70%] h-[80%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-black border-2 rounded-xl p-2 bg-white">
            <div className="w-full h-full flex flex-col">
                <div className="w-full flex flex-row justify-between">
                    <h1 className="text-2xl font-bold">Add book</h1>
                    <img className="w-8 h-8" src={xbutton} alt="add button" onClick={props.onClose} />
                </div>
                {props.children}
            </div>
        </div>
    );
};

export default Popup;
