import { IconButton } from '@src/presentation/ui-kit/IconButton';
import styles from './OrderDrawer.module.css';
import { observer } from 'mobx-react-lite';
import { Sheet } from 'react-modal-sheet';
import { DRAG_VELOCITY_THRESHOLD } from '@src/const';
import { useDrawer } from '@src/presentation/pages/Beach/useDrawer';
import { BookingCardByCashier } from '@src/presentation/components/BookingCardByCashier';
import { bookingCardStore } from '@src/application/store/bookingCardStore';
import { Button } from '@src/presentation/ui-kit/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Routes } from '@src/routes';
import { formatFullDate } from '@src/application/utils/formatDate';

const bookingStatusMap = {
  reserved: 'Не оплачена',
  confirmed: 'Оплачена',
  busy: 'Активна',
  cancelled: 'Отменена',
  completed: 'Завершена',
};

export const OrderDrawer = observer(() => {
  const { isOpen, ref, setSnap } = useDrawer();
  const { booking } = bookingCardStore;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const onClose = () => {
    searchParams.delete('show-booking-details');
    setSearchParams(searchParams);
  }

  return (
    <Sheet
      ref={ref}
      isOpen={isOpen}
      onClose={onClose}
      onSnap={(snap) => setSnap(snap)}
      detent='content-height'
      dragVelocityThreshold={DRAG_VELOCITY_THRESHOLD}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className={styles.navigation}>
            <div className={styles.texts}>
              <div className={styles.title}>Запланированная бронь</div>
              <div className={styles.subtitle}>
                <span>
                  {new Date(booking.booking_modules?.[0]?.start_time).toLocaleString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  -{' '}
                  {new Date(booking.booking_modules?.[0]?.end_time).toLocaleString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>,{' '}
                <span>
                  {formatFullDate(new Date(booking.booking_modules?.[0]?.start_time))}
                </span>,{' '}
                <span>{bookingStatusMap[booking.status.name]}</span>
              </div>
            </div>
            <IconButton
              iconName='cross'
              size='large'
              shape="rounded"
              withShadow={false}
              onClick={onClose}
            />
          </div>

          <Sheet.Scroller>
            <div className={styles.content}>
              <BookingCardByCashier key={booking.id} booking={booking} />
            </div>
          </Sheet.Scroller>
          <div className={styles.footer}>
            <Button
              size='medium'
              variant='tertiary'
              onClick={() => navigate(Routes.BookingDetails.replace(':id', booking.id.toString()))}
            >
              <span>Перейти в бронь</span>
            </Button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
});
