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
    return this.bookings.filter((booking) => 
      booking.status.name === 'pending'
      || booking.status.name === 'confirmed'
      || booking.status.name === 'reserved'
      || booking.status.name === 'busy'
    );
  }

  get completedBookings() {
    return this.bookings.filter((booking) => booking.status.name === 'completed' || booking.status.name === 'cancelled');
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

  get isEmptyBookings() {
    return this.currentBookings.length === 0 && this.completedBookings.length === 0;
  }

  async cancelBooking(bookingId: number, successCb?: () => void) {
    try {
      this.isLoadingCancelBooking.set(bookingId, true);
      await this.bookingsService.cancelBooking(bookingId);
      await this.getMyBookings();
      successCb?.();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingCancelBooking.set(bookingId, false);
    }
  }
}

export const bookingsStore = new BookingsStore();
