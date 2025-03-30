import { observer } from "mobx-react-lite";
import styles from './ErrorModal.module.css';
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Icon } from "@src/presentation/ui-kit/Icon";

interface ErrorModalProps {
    onClose: () => void;
    message: string;
    text?: string | string[];
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
                <div className={styles.errorModalText}>
                    {typeof text === 'string' ? text : (
                        <ul>
                            {text?.map((t) => <li key={t}>{t}</li>)}
                        </ul>
                    )}
                </div>
                <div className={styles.errorModalButton}>
                    <IconButton onClick={onCancel} shape="rounded">
                        <Icon name="cross" size='small' />
                    </IconButton>
                </div>
            </div>
        </div>
    );
});
