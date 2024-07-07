/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { isUUID } from "../../../lib/utils/isUUID";

import "./PetQrScanner.css";

const PetQrScanner = () => {
    const scanner = useRef<QrScanner>();
    const videoEl = useRef<HTMLVideoElement>(null);
    const qrBoxEl = useRef<HTMLDivElement>(null);
    const [qrOn, setQrOn] = useState<boolean>(true);
    const navigate = useNavigate();

    const [scannedResult, setScannedResult] = useState<string | undefined>("");

    const onScanSuccess = (result: QrScanner.ScanResult) => {
        if (!result?.data) return;
        if (!isUUID(result?.data)) {
            toast.error("El código QR no corresponde a ninguna mascota.", { id: "invalid-qr" });
            return;
        }
        if (!videoEl?.current) scanner?.current?.stop();
        setScannedResult(result.data);
        navigate(`/pet/${result.data}`);
    };

    const onScanFail = (err: string | Error) => {
        console.warn(err);
    };

    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl?.current || undefined,
            });

            scanner?.current
                ?.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        return () => {
            if (!videoEl?.current) {
                scanner?.current?.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (!qrOn)
            toast.error(
                "Parece que no tenemos permisos para acceder a la cámara. Por favor, permite el acceso a la cámara y recarga la página."
            );
    }, [qrOn]);

    return (
        <div className="qr-reader">
            <video ref={videoEl}></video>
            <div ref={qrBoxEl} className="qr-box">
                <img
                    src={"/img/qr-frame.svg"}
                    alt="Qr Frame"
                    width={256}
                    height={256}
                    className="qr-frame"
                />
            </div>

            {scannedResult && toast.success(`Mascota detectada!`, {
                id: "scanned-result", action: {
                    label: "Ver mascota",
                    onClick: () => navigate(`/pet/${scannedResult}`),
                },
            })}
        </div>
    );
};

export default PetQrScanner;