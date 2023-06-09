import React, { useRef } from "react";
import { useState } from "react";
import Html5QrcodePlugin from "../components/scanner/Scanner";

import { addLibro, selectAddLibroStatus } from "../redux/features/libreriaPersonaleSlice";
import { useDispatch, useSelector } from "react-redux";

interface result {
    decodedText: string,
    result: {
        text: string,
        format: {
            format: string,
            formatName: string,
        }
        debugData: {
            decodedName: string,
        }
    }
}


export default function AddLibro() {
    const [ISBN, setISBN] = useState<string>("");
    const html5QrcodeScanner = useRef<any>(
        <Html5QrcodePlugin
            fps={10}
            qrbox={280}
            disableFlip={false}
            qrCodeSuccessCallback={(decodedText: string, decodedResult: result) => {
                if (decodedResult.result.format.formatName === "EAN_13") {
                    setISBN(decodedResult.result.text);
                }
            }}
        />
    );
    const dispatch = useDispatch();

    const addLibroStatus = useSelector(selectAddLibroStatus);
    

    const handleAdd = (ISBN: string) => {
        dispatch<any>(addLibro({
            ISBN: ISBN,
            location: [0,0]
        }));
        setISBN("");
    };
    //TODO: aggiungere status aggiunta libro

    const inputColor = addLibroStatus === "failed" ? "border-red-500" : "border-black";

    return (
        <div className="h-full w-full">
            {addLibroStatus === "loading" ?
                (
                    <div className="w-full h-full flex justify-center">
                        <div key="loading" className="lds-dual-ring"></div>
                    </div>
                ) :
                (
                    <div className="h-full w-full flex flex-col items-center justify-center">
                        <h1>Add book using ISBN</h1>
                        <form className="flex flex-col items-center justify-center gap-2" id="input_isbn" >
                            <input id="ISBN_input" className={"border-2 rounded-md p-1 " + inputColor} type="text" placeholder={addLibroStatus === "failed" ? "invalid ISBN try again" : "ISBN"} value={ISBN} onChange={(e: any) => setISBN(e.target.value)} />
                            <button className="border-2 border-black rounded-md p-1" type="button" onClick={() => handleAdd(ISBN as string)}>Add</button>
                        </form>
                        <div className="h-[20px]" />
                        Or
                        <div className="h-[20px]" />
                        <h1>Use the scanner</h1>
                        {html5QrcodeScanner.current}
                    </div>
                )}

        </div>
    );
};