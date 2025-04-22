import { observer } from 'mobx-react-lite';
import { bookingsStore } from '@src/application/store/bookingsStore';
import styles from './CurrentBookings.module.css';
import { BookingCard } from '@src/presentation/components/BookingCard';
import { Virtuoso } from 'react-virtuoso';

export const CurrentBookings = observer(() => {
  const { currentBookings } = bookingsStore;

  return (
    <div className={styles.container}>
      <Virtuoso
        style={{ flex: 1 }}
        className={styles.virtuoso}
        totalCount={currentBookings.length}
        itemContent={(index) => {
          const booking = currentBookings[index];
          return <BookingCard key={booking.id} booking={booking} />;
        }}
      />
    </div>
  );
});
