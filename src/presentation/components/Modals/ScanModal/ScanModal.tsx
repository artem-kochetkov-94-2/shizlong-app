import { observer } from "mobx-react-lite";
import { PageHeader } from "@src/presentation/ui-kit/PageHeader";
import { useEffect, useRef, useState } from "react";
import QrScanner from 'qr-scanner';
import { useNavigate } from "react-router-dom";
import styles from './ScanModal.module.css';

interface ScanModalProps {
    onClose: () => void;
}

export const ScanModal = observer(({ onClose }: ScanModalProps) => {
    console.log('ScanModal');

    const videoRef = useRef(null);
    const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleProcessResult = (data: string) => {
        if (!data) return;

        try {
            // todo - сканируем модуль
            // https://shezlonger.app/sector/19/?module=760
            if (data.includes('sector/') && data.includes('module=')) {
                const sectorIndex = data.indexOf('sector');
                const path = data.slice(sectorIndex);
                navigate(path);
                onClose();
            }

             // https://shezlonger.app/location/5
             if (data.includes('location/')) {
                const locationIndex = data.indexOf('location');
                const path = data.slice(locationIndex);
                navigate(path);
                onClose();
             }
        } catch (e) {
            console.log('e');
        }
    }

    const initQrScanner = (video: HTMLVideoElement) => {
        const qrScanner = new QrScanner(
            video,
            result => {
                handleProcessResult(result.data);
                console.log('decoded qr code:', result);
            },
            {
                highlightScanRegion: true,
                highlightCodeOutline: true,
                onDecodeError: error => {
                    setError(error.toString());
                },
            },
        );

        setQrScanner(qrScanner);
    };

    // useEffect(() => {
    //     if (!videoRef.current) return;
    //     initQrScanner(videoRef.current);
    // }, [videoRef.current]);

    // useEffect(() => {
    //     qrScanner?.start();
    // }, [qrScanner]);

    return (
        <div className={styles.scanModal}>
            <PageHeader
                topPadding
                onClose={() => {
                    qrScanner?.stop();
                    qrScanner?.destroy();
                    onClose();
                }}
            >
                Сканирование QR-кода
            </PageHeader>

            <button
                onClick={() => {
                    qrScanner?.stop()
                }}
            >
                stop
            </button>
            <button
                onClick={() => {
                    qrScanner?.start();
                    if (videoRef.current) {
                        initQrScanner(videoRef.current);
                    }
                }}
            >
                start
            </button>
            <div>{qrScanner ? '1' : '0'}</div>
            <div>{error}</div>
            <video ref={videoRef} style={{ width: '100%' }} />
        </div>
    );
});
