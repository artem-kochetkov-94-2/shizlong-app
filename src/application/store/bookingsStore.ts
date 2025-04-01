import { makeAutoObservable } from 'mobx';
import { bookingsService } from '@src/infrastructure/bookings/bookingsService';
import { RawBooking } from '@src/infrastructure/bookings/types';

export class BookingsStore {
  private bookingsService = bookingsService;
  isLoading: boolean = false;
  bookings: RawBooking[] = [];
  isLoadingCancelBooking: Map<number, boolean> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  get currentBookings() {
    return this.bookings.filter((booking) => booking.status === 'pending' || booking.status === 'confirmed' || booking.status === 'reserved');
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

  async cancelBooking(bookingId: number) {
    try {
      this.isLoadingCancelBooking.set(bookingId, true);
      await this.bookingsService.cancelBooking(bookingId);
      await this.getMyBookings();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingCancelBooking.set(bookingId, false);
    }
  }
}

export const bookingsStore = new BookingsStore();
