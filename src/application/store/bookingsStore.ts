import { makeAutoObservable } from 'mobx';
import { bookingsService } from '@src/infrastructure/bookings/bookingsService';
import { RawBooking } from '@src/infrastructure/bookings/types';

class BookingsStore {
  private bookingsService = bookingsService;
  isLoading: boolean = false;
  bookings: RawBooking[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get currentBookings() {
    return this.bookings.filter((booking) => booking.status === 'pending' || booking.status === 'confirmed');
  }

  get completedBookings() {
    return this.bookings.filter((booking) => booking.status === 'completed' || booking.status === 'cancelled');
  }

  async getMyBookings() {
    try {
      this.isLoading = true;
      const bookings = await this.bookingsService.getMyBookings();
      this.bookings = bookings;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  get iosEmptyBookings() {
    return this.currentBookings.length === 0 && this.completedBookings.length === 0;
  }
}

export const bookingsStore = new BookingsStore();
