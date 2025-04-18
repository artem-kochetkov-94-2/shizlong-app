import { makeAutoObservable } from 'mobx';
import { RawLocation, RawSector } from '@src/infrastructure/Locations/types';
import { locationsService } from '@src/infrastructure/Locations/locationsService';

export class CashierStore {
  locations: RawLocation[] = [];
  sectors: RawSector[] = [];

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
