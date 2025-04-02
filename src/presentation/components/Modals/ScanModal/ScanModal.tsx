import { observer } from "mobx-react-lite";
import { PageHeader } from "@src/presentation/ui-kit/PageHeader";
import { QrReader } from 'react-qr-reader';
import { useEffect, useState } from "react";
import styles from './ScanModal.module.css';

interface ScanModalProps {
    onClose: () => void;
}

export const ScanModal = observer(({ onClose }: ScanModalProps) => {
    const [data, setData] = useState('No result');
    const [access, setAccess] = useState(false);
    console.log('ScanModal');

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                console.log('stream', stream);
                setAccess(true);
            })
            .catch((error) => {
                console.error('Ошибка доступа к камере:', error);
                onClose();
            });
    }, []);

    if (!access) {
        return null;
    }

    return (
        <div className={styles.scanModal}>
            <PageHeader
                topPadding
                onClose={onClose}
            >
                Сканирование QR-кода
            </PageHeader>

            <div>
                <QrReader
                    constraints={{ facingMode: 'user' }}
                    onResult={(result, error) => {
                        if (!!result) {
                          setData(result?.text);
                        }
              
                        if (!!error) {
                          console.info(error);
                        }
                    }}
                    videoContainerStyle={{
                        width: '500px',
                        height: '500px',
                        backgroundColor: 'red',
                    }}
                    videoStyle={{
                        width: '500px',
                        height: '500px',
                        backgroundColor: 'red',
                    }}
                />
                <p>{data}</p>
            </div>
        </div>
    );
});
