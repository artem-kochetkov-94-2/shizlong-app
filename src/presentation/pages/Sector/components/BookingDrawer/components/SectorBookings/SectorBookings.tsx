import { observer } from 'mobx-react-lite';
import styles from './SectorBookings.module.css';
import { BookingCard } from '@src/presentation/components/BookingCard';
import { Virtuoso } from 'react-virtuoso';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { profileStore } from '@src/application/store/profileStore';
import { cashierStore } from '@src/application/store/cashierStore';
import { BookingCardByCashier } from '@src/presentation/components/BookingCardByCashier';
import { Tabs, useTabs } from '@src/presentation/ui-kit/Tabs';
import { TabItem } from '@src/presentation/ui-kit/Tabs/Tabs';
import { BookingsPages } from '@src/application/store/bookingsPages';
import { CashierBookingResponse } from '@src/infrastructure/bookings/types';

type TabName = 'active' | 'expected' | 'history';
const tabs: TabItem<TabName>[] = [
  {
    value: 'active',
    label: 'Активные',
  },
  {
    value: 'expected',
    label: 'Ожидаемые',
  },
  {
    value: 'history',
    label: 'Завершенные',
  },
];

export const SectorBookings = observer(() => {
  const { currentBookings } = bookingsStore;
  const { activeBookings, expectedBookings, historyBookings } = cashierStore;
  const { isCashier } = profileStore;

  const { currentTab, setCurrentTab } = useTabs<TabName>(tabs[0].value);
  const tabBookings: Record<TabName, BookingsPages<CashierBookingResponse> | null> = {
    active: activeBookings,
    expected: expectedBookings,
    history: historyBookings,
  };
  const cashierBookings = tabBookings[currentTab];

  if (isCashier && activeBookings && cashierBookings) {
    return (
      <div className={styles.container}>
        <div className={styles.navigation}>
          <Tabs
            tabs={tabs.map((t) => {
              let label = '';

              if (t.value === 'active') label = `${t.label} ${activeBookings?.bookingsData.length}`;
              if (t.value === 'expected') label = `${t.label} ${expectedBookings?.bookingsData.length}`;
              if (t.value === 'history') label = `${t.label} ${historyBookings?.bookingsData.length}`;

              return {
                ...t,
                label,
              };
            })}
            activeTab={currentTab}
            onTabChange={(t) => setCurrentTab(t as TabName)}
          />
        </div>

        <Virtuoso
          style={{ flex: 1 }}
          className={styles.virtuoso}
          totalCount={cashierBookings.bookingsData.length}
          itemContent={(index) => {
            const booking = cashierBookings.bookingsData[index];
            const isLast = index === cashierBookings.bookingsData.length - 1;
            return (
              <>
                <BookingCardByCashier key={booking.id} booking={booking} />
                {isLast && <div style={{ height: 100}} />}
              </>
            );
          }}
          endReached={() => cashierBookings.nextPage()}
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
