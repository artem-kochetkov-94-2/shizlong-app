import { observer } from "mobx-react-lite";
import styles from './ErrorModal.module.css';

interface ErrorModalProps {
    onClose: () => void;
    message: string;
    text?: string;
    closeCb?: () => void;
}

export const ErrorModal = observer(({ onClose, closeCb, message, text }: ErrorModalProps) => {
    const onCancel = () => {
        closeCb?.();
        onClose();
    };

    return (
        <div className={styles.errorModalOverlay} onClick={onCancel}>
            <div className={styles.errorModal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.errorModalMessage}>{message}</div>
                <div className={styles.errorModalText}>{text}</div>
                <div className={styles.errorModalButton}>
                    <button onClick={onCancel}>Закрыть</button>
                </div>
            </div>
        </div>
    );
});
