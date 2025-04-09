import { AddCard } from "@src/presentation/components/AddCard";
import styles from './AddCardModal.module.css';
import { IconButton } from "@src/presentation/ui-kit/IconButton";
import { Icon } from "@src/presentation/ui-kit/Icon";

interface AddCardModalProps {
  onClose: () => void;
  successCb?: (tokenId?: number) => void;
}

export const AddCardModal = ({ onClose, successCb }: AddCardModalProps) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <AddCard successCb={successCb} errorCb={onClose} />

        <div className={styles.closeButton}>
          <IconButton onClick={onClose} shape="rounded">
            <Icon name="cross" size='small' />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
