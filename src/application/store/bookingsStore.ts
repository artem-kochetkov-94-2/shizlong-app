import { makeAutoObservable } from 'mobx';
import { bookingsService } from '@src/infrastructure/bookings/bookingsService';
import { BookingsPages } from './bookingsPages';
import { MyBookingsResponse } from '@src/infrastructure/bookings/types';
import { bookingCardStore } from './bookingCardStore';
import { cashierStore } from './cashierStore';

export class BookingsStore {
  private bookingsService = bookingsService;

  isLoadingCancelBooking: Map<number, boolean> = new Map();
  isLoadingConfirmBooking: Map<number, boolean> = new Map();
  isLoadingCloseBooking: Map<number, boolean> = new Map();

  currentBookings: BookingsPages<MyBookingsResponse> | null = null;
  completedBookings: BookingsPages<MyBookingsResponse> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  initAllBookings() {
    this.currentBookings = new BookingsPages(['confirmed', 'reserved', 'busy']);
    this.completedBookings = new BookingsPages(['completed', 'cancelled']);
  }

  initCurrentBookings(sectorId?: number) {
    this.currentBookings = new BookingsPages(['confirmed', 'reserved', 'busy'], sectorId);
  }

  initCompletedBookings() {
    this.completedBookings = new BookingsPages(['completed', 'cancelled']);
  }

  async cancelBookingByClient(bookingId: number, successCb?: () => void) {
    try {
      this.isLoadingCancelBooking.set(bookingId, true);
      await this.bookingsService.cancelBookingByClient(bookingId);

      const booking = await this.bookingsService.getClientBooking(bookingId);
      if (bookingCardStore.booking?.id === bookingId) bookingCardStore.setBooking(booking);
      if (booking) bookingsStore.currentBookings?.updateBookings(booking);
      successCb?.();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingCancelBooking.set(bookingId, false);
    }
  }

  async cancelBookingByCashier(bookingId: number, successCb?: () => void) {
    try {
      this.isLoadingCancelBooking.set(bookingId, true);
      await this.bookingsService.cancelBookingByCashier(bookingId);
      await cashierStore.updateBooking(bookingId);
      successCb?.();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingCancelBooking.set(bookingId, false);
    }
  }

  async confirmBookingByCashier(bookingId: number, successCb?: () => void) {
    try {
      this.isLoadingConfirmBooking.set(bookingId, true);
      await this.bookingsService.confirmBookingByCashier(bookingId);
      await cashierStore.updateBooking(bookingId);
      successCb?.();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingConfirmBooking.set(bookingId, false);
    }
  }

  async closeBookingByClient(bookingId: number, successCb?: () => void) {
    try {
      this.isLoadingCloseBooking.set(bookingId, true);
      await this.bookingsService.closeBookingByClient(bookingId);

      const booking = await this.bookingsService.getClientBooking(bookingId);
      if (bookingCardStore.booking?.id === bookingId) bookingCardStore.setBooking(booking);
      if (booking) bookingsStore.currentBookings?.updateBookings(booking);
      successCb?.();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingCloseBooking.set(bookingId, false);
    }
  }

  async closeBookingByCashier(bookingId: number, successCb?: () => void) {
    try {
      this.isLoadingCloseBooking.set(bookingId, true);
      await this.bookingsService.closeBookingByCashier(bookingId);
      await cashierStore.updateBooking(bookingId);
      successCb?.();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingCloseBooking.set(bookingId, false);
    }
  }
}

export const bookingsStore = new BookingsStore();
