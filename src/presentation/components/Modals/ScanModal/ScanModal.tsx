import { observer } from "mobx-react-lite";
import { PageHeader } from "@src/presentation/ui-kit/PageHeader";
import { QrReader } from 'react-qr-reader';
import { useState } from "react";

interface ScanModalProps {
    onClose: () => void;
}

export const ScanModal = observer(({ onClose }: ScanModalProps) => {
    const onCancel = () => onClose();
    const [data, setData] = useState('No result');

    return (
        <div>
            <PageHeader topPadding>Сканирование QR-кода</PageHeader>
            <div>
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                          setData(result?.text);
                        }
              
                        if (!!error) {
                          console.info(error);
                        }
                    }}
                    style={{ width: '100%' }}
                />
                <p>{data}</p>
            </div>
        </div>
    );
});
