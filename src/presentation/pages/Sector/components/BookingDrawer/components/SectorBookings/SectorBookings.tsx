import { observer } from 'mobx-react-lite';
import styles from './SectorBookings.module.css';
import { BookingCard } from '@src/presentation/components/BookingCard';
import { Virtuoso } from 'react-virtuoso';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { profileStore } from '@src/application/store/profileStore';
import { cashierStore } from '@src/application/store/cashierStore';
import { BookingCardByCashier } from '@src/presentation/components/BookingCardByCashier';

export const SectorBookings = observer(() => {
  const { currentBookings } = bookingsStore;
  const { activeBookings } = cashierStore;
  const { isCashier } = profileStore;

  if (isCashier && activeBookings) {
    return (
      <div className={styles.container}>
        <Virtuoso
          style={{ flex: 1 }}
          className={styles.virtuoso}
          totalCount={activeBookings.bookingsData.length}
          itemContent={(index) => {
            const booking = activeBookings.bookingsData[index];
            const isLast = index === activeBookings.bookingsData.length - 1;
            return (
              <>
                <BookingCardByCashier key={booking.id} booking={booking} />
                {isLast && <div style={{ height: 100}} />}
              </>
            );
          }}
          endReached={() => activeBookings.nextPage()}
          increaseViewportBy={200}
        />
      </div>
    )
  }

  if (!currentBookings) return;

   return (
    <div className={styles.container}>
      <Virtuoso
        style={{ flex: 1 }}
        className={styles.virtuoso}
        totalCount={currentBookings.bookingsData.length}
        itemContent={(index) => {
          const booking = currentBookings.bookingsData[index];
          const isLast = index === currentBookings.bookingsData.length - 1;
          return (
            <>
              <BookingCard key={booking.id} booking={booking} />
              {isLast && <div style={{ height: 100}} />}
            </>
          );
        }}
        endReached={() => currentBookings.nextPage()}
        increaseViewportBy={200}
      />
    </div>
  );
});
