import { observer } from "mobx-react-lite";
import { bookingsStore } from "@src/application/store/bookingsStore";
import styles from "./CompletedBookings.module.css";
import { BookingCard } from "@src/presentation/components/BookingCard";

export const CompletedBookings = observer(() => {
    const { completedBookings } = bookingsStore;

    return (
        <div className={styles.container}>
            {completedBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
            ))}
        </div>
    )
});
