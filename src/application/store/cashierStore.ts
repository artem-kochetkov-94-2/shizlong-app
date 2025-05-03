import { makeAutoObservable } from 'mobx';
import { RawLocation, RawSector } from '@src/infrastructure/Locations/types';
import { locationsService } from '@src/infrastructure/Locations/locationsService';
import { BookingsPages } from './bookingsPages';
import { CashierBookingResponse } from '@src/infrastructure/bookings/types';

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

  initBookigns(sectorId?: number, statuses = []) {
    this.activeBookings = new BookingsPages(statuses, sectorId, true);
    this.expectedBookings = new BookingsPages(statuses, sectorId, true);
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
