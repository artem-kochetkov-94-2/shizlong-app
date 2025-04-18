import { observer } from "mobx-react-lite";
import { bookingsStore } from "@src/application/store/bookingsStore";
import styles from "./CurrentBookings.module.css";
import { BookingCard } from "@src/presentation/components/BookingCard";

export const CurrentBookings = observer(() => {
    const { currentBookings } = bookingsStore;

    return (
        <div className={styles.container}>
            {currentBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
            ))}
        </div>
    );
});
