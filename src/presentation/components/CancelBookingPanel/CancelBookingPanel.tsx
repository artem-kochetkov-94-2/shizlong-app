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

const SNAP_POINTS = [758, 309, 79];
const INITIAL_SNAP_POINT = 1;

export const CancelBookingPanel = observer(
  ({ bookingId, isOpen, onClose }: CancelBookingPanelProps) => {
    const ref = useRef<SheetRef>(null);

    useEffect(() => {
      if (isOpen) {
        setTimeout(() => {
          ref.current?.snapTo(1);
        }, 300);
      }
    }, [isOpen]);

    return (
      <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        detent='content-height'
        snapPoints={SNAP_POINTS}
        initialSnap={INITIAL_SNAP_POINT}
        dragVelocityThreshold={DRAG_VELOCITY_THRESHOLD}
        style={{ zIndex: 9999 }}
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
                onClick={() => bookingsStore.cancelBooking(bookingId)}
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
