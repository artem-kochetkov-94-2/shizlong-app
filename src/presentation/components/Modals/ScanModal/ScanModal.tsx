import { observer } from "mobx-react-lite";
import { PageHeader } from "@src/presentation/ui-kit/PageHeader";
import { useEffect, useRef, useState } from "react";
import QrScanner from 'qr-scanner';
import { useNavigate } from "react-router-dom";
import styles from './ScanModal.module.css';
import { Routes } from "@src/routes";

interface ScanModalProps {
    onClose: () => void;
}

const qrBookingPattern = 'booking/qr/check/';

export const ScanModal = observer(({ onClose }: ScanModalProps) => {
    console.log('ScanModal');

    const videoRef = useRef<HTMLVideoElement>(null);
    const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleCloseModal = () => {
        // qrScanner?.destroy();

        if (videoRef.current) {
            const mediaStream = videoRef.current.srcObject;
            if (mediaStream instanceof MediaStream) {
                const tracks = mediaStream.getTracks();
                tracks.forEach(track => {
                    track.stop();
                });
        
                videoRef.current.srcObject = null;
            }
        }

        onClose();
    }

    const handleProcessResult = (data: string) => {
        if (!data) return;

        try {
            // todo - сканируем модуль
            // https://shezlonger.app/sector/19/?module=760
            if (data.includes('sector/') && data.includes('module=')) {
                const sectorIndex = data.indexOf('sector');
                const path = data.slice(sectorIndex);
                navigate(path);
                handleCloseModal();
            }

             // https://shezlonger.app/location/5
             if (data.includes('location/')) {
                const locationIndex = data.indexOf('location');
                const path = data.slice(locationIndex);
                navigate(path);
                handleCloseModal();
             }

             if (data.includes(qrBookingPattern)) {
                const qrIndex = data.indexOf(qrBookingPattern);
                const code = data.slice(qrIndex + qrBookingPattern.length);
                navigate(Routes.BookingDetails.replace(':id', code));
                handleCloseModal();
             }
        } catch (e) {
            console.log('e');
        }
    }

    const initQrScanner = (video: HTMLVideoElement) => {
        const qrScanner = new QrScanner(
            video,
            (result: QrScanner.ScanResult) => {
                handleProcessResult(result.data);   
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
        qrScanner.start();
    };

    useEffect(() => {
        if (videoRef.current) {
            if (!qrScanner) {
                initQrScanner(videoRef.current);
            }
        }
    }, [videoRef.current, qrScanner]);

    return (
        <div className={styles.scanModal}>
            <PageHeader topPadding onClose={handleCloseModal}>
                Сканирование QR-кода
            </PageHeader>
            <video ref={videoRef} style={{ width: '100%' }} />
        </div>
    );
});
