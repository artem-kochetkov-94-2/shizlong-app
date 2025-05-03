import styles from './ClientContent.module.css';
import { observer } from "mobx-react-lite";
import bookingsEmptyImg from './assets/empty.svg';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { Tabs, useTabs } from '@src/presentation/ui-kit/Tabs';
import { TabItem } from '@src/presentation/ui-kit/Tabs/Tabs';
import { useEffect } from 'react';
import { BookingsPages } from '@src/application/store/bookingsPages';
import { MyBookingsResponse } from '@src/infrastructure/bookings/types';
import { BookingCard } from '@src/presentation/components/BookingCard';
import { Virtuoso } from 'react-virtuoso';

type TabName = 'current' | 'completed';

export const bookingsTabs: TabItem<TabName>[] = [
  {
    value: 'current',
    label: 'Актуальные',
  },
  {
    value: 'completed',
    label: 'Завершённые',
  },
];
  
export const ClientContent = observer(() => {
  const { currentTab, setCurrentTab } = useTabs<TabName>(bookingsTabs[0].value);
  const { currentBookings, completedBookings } = bookingsStore;

  const isAllEmpty = currentBookings?.isEmptyBookings && completedBookings?.isEmptyBookings;
  const isLoading = currentBookings?.isLoading || completedBookings?.isLoading;

  useEffect(() => {
    bookingsStore.initAllBookings();
  }, []);

  useEffect(() => {
    if (currentTab === 'current') {
      bookingsStore.initCurrentBookings();
    }
    if (currentTab === 'completed') {
      bookingsStore.initCompletedBookings();
    }
  }, [currentTab]);

  const tabBookings: Record<TabName, BookingsPages<MyBookingsResponse> | null> = {
    current: currentBookings,
    completed: completedBookings,
  };

  const bookings = tabBookings[currentTab];

  return (
    <div className={styles.bookings}>
      <div className={styles.bookingsTitle}>Бронирования</div>

      {isAllEmpty && !isLoading ? (
        <div className={styles.bookingsEmpty}>
          <div className={styles.bookingsEmptyTitle}>У вас пока нет броней</div>
          <img src={bookingsEmptyImg} />
        </div>
      ) : (
        <>
          <Tabs
            tabs={bookingsTabs.map((t) => {
              return {
                ...t,
                label:
                  t.value === 'current'
                  ? `Актуальные ${currentBookings?.isLoading ? '...' : currentBookings?.bookingsData.length}`
                  : `Завершённые ${completedBookings?.isLoading ? '...' : completedBookings?.bookingsData.length}`,
                };
              }
            )}
            activeTab={currentTab}
            onTabChange={(t) => setCurrentTab(t as TabName)}
          />

          {bookings && (
            <div className={styles.container}>
              <Virtuoso
                style={{ flex: 1 }}
                className={styles.virtuoso}
                totalCount={bookings.bookingsData.length}
                itemContent={(index) => {
                  const booking = bookings.bookingsData[index];
                  const isLast = index === bookings.bookingsData.length - 1;
                  return (
                    <>
                      <BookingCard key={booking.id} booking={booking} />
                      {isLast && <div style={{ height: 100}} />}
                    </>
                  );
                }}
                endReached={() => bookings.nextPage()}
                increaseViewportBy={200}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
});
