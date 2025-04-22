import { PageHeader } from '@src/presentation/ui-kit/PageHeader';
import { observer } from 'mobx-react-lite';
import { Tabs, useTabs } from '@src/presentation/ui-kit/Tabs';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { BookingCard } from './components/BookingCard/BookingCard';
import { Virtuoso } from 'react-virtuoso';
import { profileStore } from '@src/application/store/profileStore';
import { useEffect } from 'react';
import { verificationStore } from '@src/application/store/verificationStore';
import styles from './ProfileBookings.module.css';

const tabs = [
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
  const { bookings } = bookingsStore;
  const { currentTab, setCurrentTab } = useTabs(tabs[0].value);

  // @todo: change to cashier bookings
  useEffect(() => {
    if (!verificationStore.isVerified || !profileStore.profile) return;

    bookingsStore.getMyBookings();
  }, [verificationStore.isVerified, profileStore.profile]);

  return (
    <div className={styles.wrapper}>
      <PageHeader topPadding={true}>Бронирования</PageHeader>

      <div className={styles.container}>
        <div className={styles.navigation}>
          <Tabs
            tabs={tabs.map((t) => {
              let label = '';

              if (t.value === 'active') label = `${t.label} ${bookings.length}`;
              if (t.value === 'expected') label = `${t.label} ${bookings.length}`;
              if (t.value === 'history') label = `${t.label} ${bookings.length}`;

              return {
                ...t,
                label,
              };
            })}
            activeTab={currentTab}
            onTabChange={setCurrentTab}
          />
        </div>

        <Virtuoso
          style={{ flex: 1 }}
          className={styles.virtuoso}
          totalCount={bookings.length}
          itemContent={(index) => {
            const booking = bookings[index];
            return <BookingCard key={booking.id} booking={booking} />;
          }}
        />
      </div>
    </div>
  );
});
