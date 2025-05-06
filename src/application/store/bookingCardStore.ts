import { makeAutoObservable } from 'mobx';
import { BookingsStore, bookingsStore } from './bookingsStore';
import { ProfileStore, profileStore } from './profileStore';
import { bookingsService } from '@src/infrastructure/bookings/bookingsService';
import { RawBooking, RawCashierBooking } from '@src/infrastructure/bookings/types';

export class BookingCardStore {
  isLoading: boolean = false;
  bookingId: number | null = null;
  bookingsStore: BookingsStore = bookingsStore;
  profileStore: ProfileStore = profileStore;
  _booking: RawBooking | RawCashierBooking | null = null;

  constructor() {
    makeAutoObservable(this);
    this.bookingsStore = bookingsStore;
  }

  get booking() {
    if (this.profileStore.isCashier) {
      return this._booking as RawCashierBooking;
    }

    return this._booking as RawBooking;
  }

  async setBookingId(id: number) {
    this.bookingId = id;

    try {
      this.isLoading = true;
      this.fetchBooking(id);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  setBooking(booking: RawBooking | RawCashierBooking | null) {
    this._booking = booking;
  }

  async fetchBooking(id: number) {
    try {
      if (this.profileStore.isCashier) {
        const result = await bookingsService.getCashierBooking(id);
        this._booking = result;
      } else {
        const result = await bookingsService.getClientBooking(id);
        this._booking = result;
      }
      
    } catch(e) {
      console.log(e);
    }
  }
}

export const bookingCardStore = new BookingCardStore();
