import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { Sheet, SheetRef } from 'react-modal-sheet';
import { Button } from '@src/presentation/ui-kit/Button';
import { DRAG_VELOCITY_THRESHOLD } from '@src/const';
import styles from './CloseBookingPanel.module.css';
import { profileStore } from '@src/application/store/profileStore';

interface CloseBookingPanelProps {
  bookingId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const CloseBookingPanel = observer(
  ({ bookingId, isOpen, onClose }: CloseBookingPanelProps) => {
    const ref = useRef<SheetRef>(null);
    const { isLoadingCloseBooking } = bookingsStore;
    const { isCashier } = profileStore;

    const onCloseBooking = () => {
      if (isCashier) {
        bookingsStore.closeBookingByCashier(bookingId, onClose)
      } else {
        bookingsStore.closeBookingByClient(bookingId, onClose)
      }
    }

    return (
      <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        detent='content-height'
        dragVelocityThreshold={DRAG_VELOCITY_THRESHOLD}
        style={{zIndex: '10000'}}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className={styles.headerDrawer}>
              Вы уверены, что хотите завершить эту бронь?
            </div>
            <div className={styles.buttons}>
              <Button
                variant={'yellow'}
                onClick={onCloseBooking}
                disabled={isLoadingCloseBooking.get(bookingId)}
                isLoading={isLoadingCloseBooking.get(bookingId)}
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
