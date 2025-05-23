import { makeAutoObservable } from 'mobx';
import { RawLocation, RawSector } from '@src/infrastructure/Locations/types';
import { locationsService } from '@src/infrastructure/Locations/locationsService';
import { BookingsPages } from './bookingsPages';
import { CashierBookingResponse } from '@src/infrastructure/bookings/types';
import { bookingsService } from '@src/infrastructure/bookings/bookingsService';
import { bookingCardStore } from './bookingCardStore';

export class CashierStore {
  locations: RawLocation[] = [];
  sectors: RawSector[] = [];
  activeBookings: BookingsPages<CashierBookingResponse> | null = null;
  expectedBookings: BookingsPages<CashierBookingResponse> | null = null;
  historyBookings: BookingsPages<CashierBookingResponse> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    try {
      const [locations, sectors] = await Promise.all([
        this.fetchLocations(),
        this.fetchSectors(),
      ]);

      this.locations = locations;
      this.sectors = sectors;
    } catch (e) {
      console.error(e);
    }
  }

  async updateBooking(bookingId: number) {
    try {
      const booking = await bookingsService.getCashierBooking(bookingId);
      if (bookingCardStore.booking?.id === bookingId) bookingCardStore.setBooking(booking);
      if (booking) {
        this.activeBookings?.updateBookings(booking);
        this.expectedBookings?.updateBookings(booking);
        this.historyBookings?.updateBookings(booking);    
      };
    } catch(e) {
      console.log(e);
    }
  }

  initBookigns(sectorId?: number) {
    this.activeBookings = new BookingsPages(['busy'], sectorId, true);
    this.expectedBookings = new BookingsPages(['reserved', 'confirmed'], sectorId, true);
    this.historyBookings = new BookingsPages(['completed', 'cancelled'], sectorId, true);
  }

  async fetchLocations() {
    try {
      const locations = await locationsService.getCashierLocations();
      return locations;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fetchSectors() {
    try {
      const sectors = await locationsService.getCashierSectors();
      return sectors;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const cashierStore = new CashierStore();
