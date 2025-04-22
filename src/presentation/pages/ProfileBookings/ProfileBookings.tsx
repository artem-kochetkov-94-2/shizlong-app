import { PageHeader } from "@src/presentation/ui-kit/PageHeader";
import styles from './ProfileBookings.module.css';
import { observer } from "mobx-react-lite";
import { Tabs, useTabs } from "@src/presentation/ui-kit/Tabs";
import { bookingsStore } from "@src/application/store/bookingsStore";
import { BookingCard } from "./components/BookingCard/BookingCard";
import { profileStore } from "@src/application/store/profileStore";
import { useEffect } from "react";
import { verificationStore } from "@src/application/store/verificationStore";

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

                <div className={styles.bookings}>
                    {bookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
            </div>
        </div>
    );
});
