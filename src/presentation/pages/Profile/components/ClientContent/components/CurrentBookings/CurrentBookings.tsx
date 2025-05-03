// import { observer } from 'mobx-react-lite';
// import { bookingsStore } from '@src/application/store/bookingsStore';
// import styles from './CurrentBookings.module.css';
// import { BookingCard } from '@src/presentation/components/BookingCard';
// import { Virtuoso } from 'react-virtuoso';

// export const CurrentBookings = observer(() => {
//   const { currentBookings } = bookingsStore;

//   if (!currentBookings) return;

//    return (
//     <div className={styles.container}>
//       <Virtuoso
//         style={{ flex: 1 }}
//         className={styles.virtuoso}
//         totalCount={currentBookings.bookingsData.length}
//         itemContent={(index) => {
//           const booking = currentBookings.bookingsData[index];
//           const isLast = index === currentBookings.bookingsData.length - 1;
//           return (
//             <>
//               <BookingCard key={booking.id} booking={booking} />
//               {isLast && <div style={{ height: 100}} />}
//             </>
//           );
//         }}
//         endReached={() => currentBookings.nextPage()}
//         increaseViewportBy={200}
//       />
//     </div>
//   );
// });
