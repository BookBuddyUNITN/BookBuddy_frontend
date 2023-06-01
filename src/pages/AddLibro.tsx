import React from "react";
import { useState } from "react";
import Html5QrcodePlugin from "../components/scanner/Scanner";

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

    const onNewScanResult = (decodedText: string, decodedResult: result) => {
        if (decodedResult.result.format.formatName === "EAN_13") {
            setISBN(decodedResult.result.text);
        }
    };

    function handleAdd(ISBN: string) {
        
    }

    //TODO: card info libro

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h1>Add book using ISBN</h1>
            <form className="flex flex-col items-center justify-center gap-2">
                <input className="border-2 border-black rounded-md p-1" type="text" placeholder="ISBN" value={ISBN} onChange={(e : any) => setISBN(e.target)}/>
                <button className="border-2 border-black rounded-md p-1" type="button" onClick={() => handleAdd(ISBN as string)}>Add</button>
            </form>
            <div className="h-[20px]"/>
            Or
            <div className="h-[20px]"/>
            <h1>Use the scanner</h1>
            <Html5QrcodePlugin
                fps={10}
                qrbox={280}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
        </div>
    );
};