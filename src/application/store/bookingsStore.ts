import { makeAutoObservable } from 'mobx';
import { bookingsService } from '@src/infrastructure/bookings/bookingsService';

class BookingsStore {
  private bookingsService = bookingsService;
  currentBookings: unknown[] = [];
  completedBookings: unknown[] = [];

  constructor() {
    makeAutoObservable(this);
    this.getCurrentBookings();
    this.getCompletedBookings();
  }

  getCurrentBookings() {
    this.currentBookings = this.bookingsService.getCurrentBookings();
  }

  getCompletedBookings() {
    this.completedBookings = this.bookingsService.getCompletedBookings();
  }

  get iosEmptyBookings() {
    return this.currentBookings.length === 0 && this.completedBookings.length === 0;
  }
}

export const bookingsStore = new BookingsStore();
