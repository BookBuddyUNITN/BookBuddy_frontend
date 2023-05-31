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
    const [scanResult, setScanResult] = useState<string | null>(null);

    const onNewScanResult = (decodedText: string, decodedResult: result) => {
        if (decodedResult.result.format.formatName = "EAN_13") {
            setScanResult(decodedResult.result.text);
        }
    };

    //TODO: card info libro

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h1>Scanner</h1>
            <Html5QrcodePlugin
                fps={10}
                qrbox={280}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
        </div>
    );
};