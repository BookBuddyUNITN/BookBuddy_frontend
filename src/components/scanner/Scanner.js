import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const qrcodeRegionId = "html5qr-code-full-region";

const Html5QrcodePlugin = (props) => {
    const html5QrcodeScannerRef = useRef(null);

    useEffect(() => {
        const createConfig = () => {
            const config = {};
            if (props.fps) {
                config.fps = props.fps;
            }
            if (props.qrbox) {
                config.qrbox = props.qrbox;
            }
            if (props.aspectRatio) {
                config.aspectRatio = props.aspectRatio;
            }
            if (props.disableFlip !== undefined) {
                config.disableFlip = props.disableFlip;
            }
            return config;
        };

        const config = createConfig();
        const verbose = props.verbose === true;

        // Check if qrCodeSuccessCallback is defined
        if (!props.qrCodeSuccessCallback) {
            throw new Error("qrCodeSuccessCallback is a required callback.");
        }

        html5QrcodeScannerRef.current = new Html5QrcodeScanner(
            qrcodeRegionId,
            config,
            verbose
        );
        html5QrcodeScannerRef.current.render(
            props.qrCodeSuccessCallback,
            props.qrCodeErrorCallback
        );

        return () => {
            html5QrcodeScannerRef.current.clear().catch((error) => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return (
        <div className="w-[70%] h-[70%]"
            id={qrcodeRegionId}
        />
    );
};

export default Html5QrcodePlugin;
