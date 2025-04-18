import { makeAutoObservable } from 'mobx';
import { BookingsStore, bookingsStore } from './bookingsStore';

class BookingCardStore {
  isLoading: boolean = false;
  // @todo
  bookingId: number | null = null;
  bookingsStore: BookingsStore = bookingsStore;

  constructor() {
    makeAutoObservable(this);
    this.bookingsStore = bookingsStore;
  }

  // @todo
  async setBookingId(id: number) {
    this.bookingId = id;

    try {
      this.isLoading = true;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  get booking() {
    return this.bookingsStore.bookings.find((booking) => booking.id === this.bookingId);    
  }
}

export const bookingCardStore = new BookingCardStore();
