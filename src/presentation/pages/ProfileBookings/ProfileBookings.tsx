import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import { observer } from 'mobx-react-lite';
import { Tabs, useTabs } from '@src/presentation/ui-kit/Tabs';
import { Virtuoso } from 'react-virtuoso';
import { cashierStore } from '@src/application/store/cashierStore';
import styles from './ProfileBookings.module.css';
import { useEffect } from 'react';
import { CashierBookingResponse } from '@src/infrastructure/bookings/types';
import { BookingsPages } from '@src/application/store/bookingsPages';
import { TabItem } from '@src/presentation/ui-kit/Tabs/Tabs';
import { BookingCardByCashier } from '@src/presentation/components/BookingCardByCashier';

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

export const ProfileBookings = observer(() => {
  const { activeBookings, expectedBookings, historyBookings } = cashierStore;
  const { currentTab, setCurrentTab } = useTabs<TabName>(tabs[0].value);

  const tabBookings: Record<TabName, BookingsPages<CashierBookingResponse> | null> = {
    active: activeBookings,
    expected: expectedBookings,
    history: historyBookings,
  };

  const bookings = tabBookings[currentTab];

  console.log('booiings', bookings?.bookingsData.length);

  useEffect(() => {
    cashierStore.initBookigns();
  }, [])

  return (
    <div className={styles.wrapper}>
      <PageHeader topPadding={true}>Бронирования</PageHeader>

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
          totalCount={bookings?.bookingsData.length}
          itemContent={(index) => {
            const booking = bookings?.bookingsData[index];
            // @ts-ignore
            const isLast = index === bookings?.bookingsData?.length - 1;

            return (
              <>
                {booking && <BookingCardByCashier key={booking.id} booking={booking} />}
                {isLast && <div style={{ height: 100 }} />}
              </>
            );
          }}
        />
      </div>
    </div>
  );
});
