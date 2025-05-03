// import { observer } from "mobx-react-lite";
// import { bookingsStore } from "@src/application/store/bookingsStore";
// import styles from "./CompletedBookings.module.css";
// import { BookingCard } from "@src/presentation/components/BookingCard";
// import { Virtuoso } from 'react-virtuoso';

// export const CompletedBookings = observer(() => {
//     const { completedBookings } = bookingsStore;

//     if (!completedBookings) return;

//     return (
//         <div className={styles.container}>
//             <Virtuoso
//                 style={{ flex: 1 }}
//                 className={styles.virtuoso}
//                 totalCount={completedBookings.bookingsData.length}
//                 itemContent={(index) => {
//                 const booking = completedBookings.bookingsData[index];
//                 const isLast = index === completedBookings.bookingsData.length - 1;
//                 return (
//                     <>
//                     <BookingCard key={booking.id} booking={booking} />
//                     {isLast && <div style={{ height: 100}} />}
//                     </>
//                 );
//                 }}
//                 endReached={() => completedBookings.nextPage()}
//                 increaseViewportBy={200}
//             />
//         </div>
//     )
// });
