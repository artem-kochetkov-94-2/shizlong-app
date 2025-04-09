import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { Sheet, SheetRef } from 'react-modal-sheet';
import { Button } from '@src/presentation/ui-kit/Button';
import { DRAG_VELOCITY_THRESHOLD } from '@src/const';
import styles from './CancelBookingPanel.module.css';

interface CancelBookingPanelProps {
  bookingId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const CancelBookingPanel = observer(
  ({ bookingId, isOpen, onClose }: CancelBookingPanelProps) => {
    const ref = useRef<SheetRef>(null);
    const { isLoadingCancelBooking } = bookingsStore;

    return (
      <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        detent='content-height'
        dragVelocityThreshold={DRAG_VELOCITY_THRESHOLD}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className={styles.headerDrawer}>
              Вы уверены, что хотите отменить эту бронь?
            </div>
            <div className={styles.buttons}>
              <Button
                variant={'yellow'}
                onClick={() => bookingsStore.cancelBooking(bookingId, onClose)}
                disabled={isLoadingCancelBooking.get(bookingId)}
                isLoading={isLoadingCancelBooking.get(bookingId)}
              >
                <span>Да</span>
              </Button>
              <Button variant={'gray2'} onClick={onClose}>
                <span>Нет</span>
              </Button>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={onClose} />
      </Sheet>
    );
  }
);
