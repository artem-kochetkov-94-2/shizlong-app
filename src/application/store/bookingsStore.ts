import { makeAutoObservable } from 'mobx';
import { bookingsService } from '@src/infrastructure/bookings/bookingsService';
import { BookingsPages } from './bookingsPages';
import { MyBookingsResponse } from '@src/infrastructure/bookings/types';

export class BookingsStore {
  private bookingsService = bookingsService;
  isLoadingCancelBooking: Map<number, boolean> = new Map();

  currentBookings: BookingsPages<MyBookingsResponse> | null = null;
  completedBookings: BookingsPages<MyBookingsResponse> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  initAllBookings() {
    this.currentBookings = new BookingsPages(['confirmed', 'reserved', 'busy']);
    this.completedBookings = new BookingsPages(['completed', 'cancelled']);
  }

  initCurrentBookings() {
    this.currentBookings = new BookingsPages(['confirmed', 'reserved', 'busy']);
  }

  initCompletedBookings() {
    this.completedBookings = new BookingsPages(['completed', 'cancelled']);
  }

  async cancelBooking(bookingId: number, successCb?: () => void) {
    try {
      this.isLoadingCancelBooking.set(bookingId, true);
      await this.bookingsService.cancelBooking(bookingId);
      // @todo update booking
      successCb?.();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingCancelBooking.set(bookingId, false);
    }
  }
}

export const bookingsStore = new BookingsStore();
