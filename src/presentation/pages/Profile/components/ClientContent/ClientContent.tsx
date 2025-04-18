import styles from './ClientContent.module.css';
import { observer } from "mobx-react-lite";
import bookingsEmptyImg from './assets/empty.svg';
import { bookingsStore } from '@src/application/store/bookingsStore';
import { Tabs, useTabs } from '@src/presentation/ui-kit/Tabs';
import { CompletedBookings } from './components/CompletedBookings/CompletedBookings';
import { CurrentBookings } from './components/CurrentBookings/CurrentBookings';
import { Tab } from '@src/presentation/ui-kit/Tabs/Tabs';

export const bookingsTabs: Tab[] = [
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
  const { isEmptyBookings } = bookingsStore;
  const { currentTab, setCurrentTab } = useTabs(bookingsTabs[0].value);
  const { currentBookings, completedBookings } = bookingsStore;

  return (
    <div className={styles.bookings}>
        <div className={styles.bookingsTitle}>Бронирования</div>

        {isEmptyBookings ? (
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
                                ? `Актуальные ${currentBookings.length}`
                                : `Завершённые ${completedBookings.length}`,
                            };
                        }
                    )}
                    activeTab={currentTab}
                    onTabChange={setCurrentTab}
                />

                {currentTab === 'current' && <CurrentBookings />}
                {currentTab === 'completed' && <CompletedBookings />}
            </>
        )}
    </div>
  );
});
